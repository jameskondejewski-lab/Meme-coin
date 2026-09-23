#!/usr/bin/env bash
# Adversarial post-launch check. Tries to abuse a freshly launched token with
# the ORIGINAL payer key and expects every attack to be rejected on-chain:
#   mint more supply, freeze a holder, rename via metadata, re-point metadata.
# A normal transfer must still succeed.
#
# Usage: scripts/adversarial-check.sh <MINT> <PAYER_KEYPAIR> [RPC_URL]
# Needs the Agave CLI (solana, spl-token, solana-keygen) on PATH.
# Run on localnet/devnet only: the attacks cost fees and the transfer moves 1 token.
set -euo pipefail

MINT=${1:?mint address}
KP=${2:?payer keypair}
URL=${3:-http://127.0.0.1:8899}
case "$URL" in *mainnet*) echo "Refusing to run against mainnet." >&2; exit 2 ;; esac

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
solana config set -C "$WORK/cli.yml" --url "$URL" --keypair "$KP" >/dev/null
st() { spl-token -C "$WORK/cli.yml" "$@"; }

pass=0; fail=0
expect_reject() { # name, expected log fragment, command...
  local name=$1 want=$2; shift 2
  local out
  if out=$("$@" 2>&1); then
    echo "✗ $name: ACCEPTED (security failure)"; fail=$((fail + 1))
  elif grep -qiE "$want" <<<"$out"; then
    echo "✓ $name: rejected ($(grep -oiE "$want" <<<"$out" | head -1))"; pass=$((pass + 1))
  else
    echo "? $name: failed for an unexpected reason:"; tail -3 <<<"$out"; fail=$((fail + 1))
  fi
}

solana-keygen new --no-bip39-passphrase -s -o "$WORK/recipient.json" --force >/dev/null
R=$(solana-keygen pubkey "$WORK/recipient.json")

if st transfer "$MINT" 1 "$R" --fund-recipient --allow-unfunded-recipient >/dev/null 2>&1 \
  && [ "$(st balance "$MINT" --owner "$R")" = "1" ]; then
  echo "✓ transfer: works"; pass=$((pass + 1))
else
  echo "✗ transfer: FAILED (token may be non-transferable or hooked)"; fail=$((fail + 1))
fi
ATA=$(st address --token "$MINT" --owner "$R" --verbose | awk '/Associated token address/{print $4}')

SUPPLY_BEFORE=$(st supply "$MINT")
expect_reject "mint more supply" "supply of this token is fixed|owner does not match" st mint "$MINT" 1 --mint-authority "$KP"
expect_reject "freeze a holder" "cannot freeze accounts" st freeze "$ATA" --freeze-authority "$KP"
expect_reject "rename via metadata" "0x35c2b5c1|immutable|incorrect account|authority" st update-metadata "$MINT" name Hijacked --authority "$KP"
expect_reject "re-point metadata" "No authority exists" st update-metadata-address "$MINT" "$R" --authority "$KP"
[ "$(st supply "$MINT")" = "$SUPPLY_BEFORE" ] && { echo "✓ supply unchanged: $SUPPLY_BEFORE"; pass=$((pass + 1)); } \
  || { echo "✗ supply changed!"; fail=$((fail + 1)); }

echo "passed $pass, failed $fail"
[ "$fail" -eq 0 ]
