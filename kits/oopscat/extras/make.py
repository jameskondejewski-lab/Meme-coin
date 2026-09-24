"""Generate the $OOPSCAT X banner and pre-launch memes from the coin art.

Run: python3 make.py   (writes SVGs next to this file; render with headless Chromium)
"""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
INK = '#16182B'
FONT = "Impact, 'Arial Black', 'DejaVu Sans', sans-serif"

# The coin art without its own background square, so it sits on any scene.
_src = open(os.path.join(HERE, '..', 'art.svg')).read()
CAT = re.sub(r'<rect width="1000" height="1000" fill="url\(#bg\)"/>', '', _src.split('>', 1)[1].rsplit('</svg>', 1)[0])


def cat(x, y, size):
    return f'<svg x="{x}" y="{y}" width="{size}" height="{size}" viewBox="0 0 1000 1000" overflow="visible">{CAT}</svg>'


def text(x, y, size, s, fill='#fff', anchor='start', stroke=10, stroke_color=INK):
    return (f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" font-weight="900" fill="{fill}" '
            f'text-anchor="{anchor}" stroke="{stroke_color}" stroke-width="{stroke}" stroke-linejoin="round" '
            f'paint-order="stroke">{s}</text>')


def mug(x, y, s=1.0, angle=0):
    """Upright red mug with coffee; (x, y) is the bottom-left of the body."""
    return f'''<g transform="translate({x} {y}) rotate({angle}) scale({s})">
  <path d="M132 -115 C198 -118 204 -24 132 -24" fill="none" stroke="{INK}" stroke-width="42" stroke-linecap="round"/>
  <path d="M132 -115 C198 -118 204 -24 132 -24" fill="none" stroke="#E63946" stroke-width="20" stroke-linecap="round"/>
  <rect x="0" y="-150" width="132" height="150" rx="14" fill="#E63946" stroke="{INK}" stroke-width="12"/>
  <ellipse cx="66" cy="-150" rx="58" ry="12" fill="#6F3B1A" stroke="{INK}" stroke-width="8"/>
  <rect x="18" y="-122" width="22" height="100" rx="11" fill="#FF8C95"/>
</g>'''


def table(y, x0=-20, x1=1020):
    return (f'<rect x="{x0}" y="{y}" width="{x1 - x0}" height="40" fill="#C9803F" stroke="{INK}" stroke-width="12"/>'
            f'<rect x="{x0}" y="{y + 40}" width="{x1 - x0}" height="400" fill="#8A4B24" stroke="{INK}" stroke-width="12"/>')


def svg(w, h, body, bg=True):
    defs = '''<defs>
  <radialGradient id="sunny" cx="0.42" cy="0.4" r="0.85"><stop offset="0" stop-color="#FFE68A"/><stop offset="1" stop-color="#FFB10F"/></radialGradient>
  <linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2B3354"/><stop offset="1" stop-color="#1B2038"/></linearGradient>
</defs>'''
    back = f'<rect width="{w}" height="{h}" fill="url(#sunny)"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{defs}{back}{body}</svg>'


def drops(pts):
    return ''.join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#6F3B1A" stroke="{INK}" stroke-width="7"/>' for x, y, r in pts)


# 1500x500 X header: wordmark left, the cat mid-crime on the right.
banner = svg(1500, 500, ''.join([
    drops([(70, 70, 12), (1000, 60, 11), (930, 430, 16), (560, 420, 10), (660, 60, 9)]),
    # Text stays in the upper two thirds: X puts the profile picture over the bottom-left corner.
    text(90, 180, 146, 'OOPS CAT', fill='#fff', stroke=18),
    text(94, 272, 80, '$OOPSCAT', fill='#E63946', stroke=14),
    text(96, 330, 32, 'Knocked your coffee off the desk. Not sorry.', fill=INK, stroke=0),
    cat(1000, -20, 530),
]))

# Meme 1: classic setup / punchline over the coin art.
meme_morning = svg(1000, 1000, ''.join([
    '<rect width="1000" height="270" fill="#fff"/>',
    f'<line x1="0" y1="270" x2="1000" y2="270" stroke="{INK}" stroke-width="10"/>',
    text(60, 115, 60, 'ME: TODAY I WILL BE', fill=INK, stroke=0),
    text(60, 190, 60, 'PRODUCTIVE AND CALM', fill=INK, stroke=0),
    text(60, 250, 44, 'THE CAT:', fill='#E63946', stroke=0),
    cat(170, 285, 720),
]))

# Meme 2: what you see vs what the cat sees.
reticle = f'''<g transform="translate(750 610)">
  <circle r="170" fill="none" stroke="#E63946" stroke-width="14"/>
  <circle r="95" fill="none" stroke="#E63946" stroke-width="10"/>
  <path d="M0 -215 V-120 M0 120 V215 M-215 0 H-120 M120 0 H215" stroke="#E63946" stroke-width="14" stroke-linecap="round"/>
</g>'''
meme_sees = svg(1000, 1000, ''.join([
    '<rect x="500" width="500" height="1000" fill="url(#night)"/>',
    table(760, -20, 1020),
    mug(180, 760),
    mug(680, 760),
    reticle,
    f'<line x1="500" y1="0" x2="500" y2="760" stroke="{INK}" stroke-width="12"/>',
    text(250, 150, 54, 'WHAT YOU SEE', fill=INK, anchor='middle', stroke=0),
    text(750, 120, 54, 'WHAT THE', fill='#fff', anchor='middle', stroke=12),
    text(750, 185, 54, 'CAT SEES', fill='#fff', anchor='middle', stroke=12),
    text(250, 890, 56, 'a coffee', fill='#fff', anchor='middle', stroke=12),
    text(750, 890, 66, 'A MISSION', fill='#fff', anchor='middle', stroke=14),
]))

for name, body in [('x-header', banner), ('meme-morning', meme_morning), ('meme-what-cat-sees', meme_sees)]:
    with open(os.path.join(HERE, f'{name}.svg'), 'w') as f:
        f.write(body)
    print('wrote', name + '.svg')
