"""Generate the $ISOLD follow-up memes and X header from one shared ape.

Run: python3 make.py   (writes SVGs next to this file; render with headless Chromium)
"""
import base64, os

HERE = os.path.dirname(os.path.abspath(__file__))
INK = '#1a0f09'
FONT = "Impact, 'Arial Black', 'DejaVu Sans', sans-serif"

DEFS = '''<defs>
  <linearGradient id="fur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3521"/><stop offset="1" stop-color="#3b2216"/></linearGradient>
  <linearGradient id="face" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8b584"/><stop offset="1" stop-color="#c98d5c"/></linearGradient>
  <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1c33"/><stop offset="1" stop-color="#08101f"/></linearGradient>
  <radialGradient id="rage" cx="0.3" cy="0.4" r="0.9"><stop offset="0" stop-color="#ff8a3d"/><stop offset="0.55" stop-color="#e2352a"/><stop offset="1" stop-color="#7c0f14"/></radialGradient>
  <radialGradient id="yellow" cx="0.5" cy="0.45" r="0.8"><stop offset="0" stop-color="#ffe066"/><stop offset="1" stop-color="#f59e1b"/></radialGradient>
  <linearGradient id="dull" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3350"/><stop offset="1" stop-color="#1a2136"/></linearGradient>
</defs>'''

TUFT = '<polygon points="82,310 130,296 118,248 167,251 172,202 218,222 239,178 275,212 311,178 332,222 378,202 383,251 432,248 420,296 468,310" fill="#4a2c1c" stroke="#1a0f09" stroke-width="10" stroke-linejoin="round"/>'
BASE = f'''<circle cx="105" cy="385" r="58" fill="url(#fur)" stroke="{INK}" stroke-width="10"/>
<circle cx="105" cy="385" r="28" fill="#c98d5c"/>
{{tuft}}
<circle cx="275" cy="380" r="178" fill="url(#fur)" stroke="{INK}" stroke-width="12"/>
<path d="M255 285 C 305 250, 410 270, 418 332 C 426 382, 405 402, 410 432 C 426 530, 300 565, 228 522 C 176 490, 168 440, 184 398 C 196 360, 190 308, 255 285 Z" fill="url(#face)" stroke="{INK}" stroke-width="8"/>
<ellipse cx="330" cy="428" rx="9" ry="7" fill="{INK}"/><ellipse cx="360" cy="428" rx="9" ry="7" fill="{INK}"/>'''

RAGE_FACE = f'''<path d="M208 316 L 292 350" stroke="{INK}" stroke-width="22" stroke-linecap="round"/>
<path d="M322 350 L 404 312" stroke="{INK}" stroke-width="22" stroke-linecap="round"/>
<ellipse cx="258" cy="378" rx="31" ry="25" fill="#fff" stroke="{INK}" stroke-width="6"/>
<ellipse cx="360" cy="376" rx="31" ry="25" fill="#fff" stroke="{INK}" stroke-width="6"/>
<g stroke="#e0283a" stroke-width="3" fill="none"><path d="M232 372 L 246 376 L 240 386"/><path d="M335 370 L 348 374 L 342 384"/></g>
<circle cx="274" cy="377" r="9" fill="{INK}"/><circle cx="376" cy="375" r="9" fill="{INK}"/>
<path d="M236 486 C 248 448, 290 438, 325 440 C 360 438, 402 448, 414 486 C 420 546, 380 578, 325 578 C 270 578, 230 546, 236 486 Z" fill="#3b0c0c" stroke="{INK}" stroke-width="8"/>
<path d="M254 476 C 284 454, 366 454, 396 476 L 389 492 C 360 478, 290 478, 261 492 Z" fill="#fff"/>
<ellipse cx="325" cy="548" rx="42" ry="14" fill="#e04a5a"/>
<path d="M280 560 C 305 569, 345 569, 370 560 L 363 547 C 340 553, 310 553, 287 547 Z" fill="#fff"/>
<path d="M236 486 L 218 506" stroke="{INK}" stroke-width="7" stroke-linecap="round"/><path d="M414 486 L 432 506" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>
<g stroke="#ff3346" stroke-width="10" stroke-linecap="round" fill="none"><path d="M168 262 Q 185 272 190 256"/><path d="M200 252 Q 190 268 206 276"/><path d="M196 288 Q 186 276 172 286"/></g>
<g fill="#fff" opacity="0.85"><circle cx="150" cy="190" r="26"/><circle cx="125" cy="160" r="20"/><circle cx="410" cy="200" r="24"/><circle cx="440" cy="170" r="18"/></g>'''

# Holding: bored, half-lidded, flat mouth. Same character, zero drama.
CALM_FACE = f'''<path d="M212 330 L 292 334" stroke="{INK}" stroke-width="16" stroke-linecap="round"/>
<path d="M322 334 L 402 330" stroke="{INK}" stroke-width="16" stroke-linecap="round"/>
<path d="M227 372 A 31 22 0 0 0 289 372 Z" fill="#fff" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>
<path d="M329 370 A 31 22 0 0 0 391 370 Z" fill="#fff" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>
<circle cx="262" cy="381" r="8" fill="{INK}"/><circle cx="364" cy="379" r="8" fill="{INK}"/>
<path d="M285 500 Q 325 494 365 500" fill="none" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>'''

def ape(expr, x, y, s):
    """Ape head centred at (x, y) with scale s (source head centre is 275,380)."""
    face = RAGE_FACE if expr == 'rage' else CALM_FACE
    body = BASE.replace('{tuft}', TUFT if expr == 'rage' else '') + face
    return f'<g transform="translate({x - 275 * s:.1f} {y - 380 * s:.1f}) scale({s})">{body}</g>'

def text(x, y, size, s, fill='#fff', anchor='start', stroke=10):
    return (f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" font-weight="900" fill="{fill}" '
            f'text-anchor="{anchor}" stroke="#0b0e16" stroke-width="{stroke}" stroke-linejoin="round" paint-order="stroke">{s}</text>')

def monitor(x, y, w, h, chart):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="22" fill="#1b2130" stroke="#0b0e16" stroke-width="10"/>'
            f'<rect x="{x + 22}" y="{y + 22}" width="{w - 44}" height="{h - 44}" rx="10" fill="url(#screen)"/>{chart}')

def rocket_chart(pts, sold, now_label=None):
    p = ' '.join(f'{a},{b}' for a, b in pts)
    out = (f'<polyline points="{p}" fill="none" stroke="#2bff7a" stroke-width="30" stroke-linejoin="round" stroke-linecap="round" opacity="0.25"/>'
           f'<polyline points="{p}" fill="none" stroke="#2bff7a" stroke-width="13" stroke-linejoin="round" stroke-linecap="round"/>'
           f'<circle cx="{sold[0]}" cy="{sold[1]}" r="15" fill="#ff3346" stroke="#08101f" stroke-width="5"/>')
    if now_label:
        out += f'<rect x="{now_label[0]}" y="{now_label[1]}" width="92" height="40" rx="8" fill="#2bff7a"/>' + \
               f'<text x="{now_label[0] + 46}" y="{now_label[1] + 31}" font-family="{FONT}" font-size="28" font-weight="900" fill="#052714" text-anchor="middle">NOW</text>'
    return out

def svg(w, h, body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{DEFS}{body}</svg>\n'

# 1) Me holding / the second I sell
flat = '<polyline points="510,300 580,318 650,305 720,330 790,322 860,345 920,340" fill="none" stroke="#ff6b6b" stroke-width="11" stroke-linejoin="round" stroke-linecap="round"/>'
hold_sell = svg(1000, 1000,
    '<rect width="1000" height="500" fill="url(#dull)"/>'
    + monitor(470, 150, 490, 320, flat)
    + text(40, 95, 70, 'ME HOLDING')
    + ape('calm', 230, 335, 0.82)
    + '<rect y="500" width="1000" height="500" fill="url(#rage)"/>'
    + monitor(470, 640, 490, 330, rocket_chart([(510, 700), (560, 760), (610, 900), (670, 820), (720, 850), (800, 730), (850, 750), (920, 680)], (610, 900), (770, 668)))
    + text(40, 595, 64, 'THE SECOND I SELL')
    + ape('rage', 230, 820, 0.82)
    + '<rect y="494" width="1000" height="12" fill="#0b0e16"/>')

# 2) World's most accurate bottom signal
signal = svg(1000, 1000,
    '<rect width="1000" height="1000" fill="url(#yellow)"/>'
    + text(500, 105, 62, "WORLD'S MOST ACCURATE", anchor='middle')
    + text(500, 200, 92, 'BOTTOM SIGNAL', fill='#ff3346', anchor='middle', stroke=12)
    + monitor(690, 260, 280, 230, rocket_chart([(725, 320), (765, 350), (800, 440), (840, 380), (870, 400), (935, 300)], (800, 440)))
    # button
    + '<ellipse cx="560" cy="880" rx="260" ry="62" fill="#2a2f3d" stroke="#0b0e16" stroke-width="10"/>'
    + '<rect x="345" y="800" width="430" height="80" fill="#3a3f4d" stroke="#0b0e16" stroke-width="10"/>'
    + '<ellipse cx="560" cy="800" rx="215" ry="70" fill="#ff3346" stroke="#0b0e16" stroke-width="10"/>'
    + '<ellipse cx="520" cy="782" rx="120" ry="24" fill="#fff" opacity="0.25"/>'
    + text(560, 830, 84, 'SELL', anchor='middle', stroke=8)
    # torso behind the head, arm from the shoulder, fist slamming the button
    + '<ellipse cx="235" cy="820" rx="175" ry="215" fill="url(#fur)" stroke="#1a0f09" stroke-width="12"/>'
    + '<path d="M345 690 Q 440 700 520 735" fill="none" stroke="#1a0f09" stroke-width="104" stroke-linecap="round"/>'
    + '<path d="M345 690 Q 440 700 520 735" fill="none" stroke="#4a2c1c" stroke-width="80" stroke-linecap="round"/>'
    + '<circle cx="540" cy="735" r="62" fill="#5b3624" stroke="#1a0f09" stroke-width="10"/>'
    + '<g fill="none" stroke="#1a0f09" stroke-width="7" stroke-linecap="round"><path d="M515 700 Q 533 710 551 700"/><path d="M520 728 Q 538 738 556 728"/></g>'
    + '<g stroke="#fff" stroke-width="10" stroke-linecap="round"><line x1="640" y1="700" x2="690" y2="670"/><line x1="655" y1="745" x2="715" y2="745"/><line x1="440" y1="700" x2="400" y2="672"/></g>'
    + ape('rage', 260, 470, 0.78))

# 3) X header (1500x500), coin art on the right, text clear of the avatar zone
art = base64.b64encode(open(os.path.join(HERE, '..', 'art.png'), 'rb').read()).decode()
header = svg(1500, 500,
    '<defs><linearGradient id="hdr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0c1222"/><stop offset="0.6" stop-color="#3a1020"/><stop offset="1" stop-color="#c0262a"/></linearGradient></defs>'
    '<rect width="1500" height="500" fill="url(#hdr)"/>'
    '<polyline points="260,440 380,400 480,470 600,330 700,370 840,190 930,220 990,110" fill="none" stroke="#2bff7a" stroke-width="14" stroke-linejoin="round" stroke-linecap="round" opacity="0.25"/>'
    + text(280, 200, 66, 'SOLD THE BOTTOM', stroke=10)
    + text(280, 300, 86, '$ISOLD', fill='#2bff7a', stroke=12)
    + text(282, 360, 28, 'The chart was waiting for me to leave.', stroke=6)
    + f'<image href="data:image/png;base64,{art}" x="1000" y="0" width="500" height="500" preserveAspectRatio="xMidYMid slice"/>'
    )

for name, content in (('meme-hold-vs-sell.svg', hold_sell), ('meme-bottom-signal.svg', signal), ('x-header.svg', header)):
    open(os.path.join(HERE, name), 'w').write(content)
    print('wrote', name)
