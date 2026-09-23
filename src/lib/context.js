export const WSOL_MINT = 'So11111111111111111111111111111111111111112';
export const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
export const USDT_MINT = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB';

// Base58, 32–44 chars. Mints are interpolated into API URLs, so reject anything else.
const BASE58_ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
export const isValidAddress = (s) => typeof s === 'string' && BASE58_ADDRESS.test(s);

/**
 * Everything a data source needs: an injectable fetch (so tests and --fixtures
 * never touch the network), a clock, and endpoint/key configuration.
 */
export function createContext({ env = process.env, fetchImpl = globalThis.fetch, now = () => new Date() } = {}) {
  return {
    fetchImpl,
    now,
    config: {
      solanaRpcUrl: env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
      coingeckoApiKey: env.COINGECKO_API_KEY || null,
      // Keyless lite-api is being phased out by Jupiter; a key switches to api.jup.ag.
      jupiterApiBase: (env.JUPITER_API_BASE || (env.JUPITER_API_KEY ? 'https://api.jup.ag' : 'https://lite-api.jup.ag')).replace(/\/+$/, ''),
      jupiterApiKey: env.JUPITER_API_KEY || null,
    },
  };
}
