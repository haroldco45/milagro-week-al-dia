import subprocess, math, sys
from comun import *

W, H, FPS = 1080, 1920, 30
ESC = [  # (foto, segundos, etiqueta, grande, sub, color grande, contador)
    ('foto2.jpg', 4.2, 'NUEVA YORK · 16–18 NOV 2026', 'MILAGRO WEEK', '¿Qué se anunció y qué llega de verdad a Colombia?', BLANCO, None),
    ('foto4.jpg', 5.0, 'BALANCE OFICIAL DE CIERRE', 'US$43.205 M', 'en inversión y crédito: 11 sectores, 24 departamentos', ORO2, 43205),
    ('foto8.jpg', 4.6, 'PERO OJO', 'US$21.400 M', 'son préstamos del Banco Mundial, el BID y la CAF a cuatro años', (140, 175, 255), 21400),
    ('foto6.jpg', 4.6, 'FIRMADO Y VERIFICADO HOY', 'US$0', 'Anunciar no es invertir. Seguimos cada anuncio hasta que sea obra.', (255, 123, 125), None),
    ('foto1.jpg', 4.6, '¿Y EL BAJO CAUCA?', 'SIN CONFIRMAR', 'Mineros anunció US$600 M y opera en El Bagre, pero no dijo dónde invertirá', ORO2, None),
    ('foto7.jpg', 4.4, 'USTED PUEDE PREGUNTAR', 'PETICIÓN', 'Un derecho de petición a 6 entidades, enviado de una sola vez desde la app', BLANCO, None),
]
FIN = 5.5
XF = 0.45  # cruce entre escenas

fotos = {}
for f, *_ in ESC:
    im = Image.open(F + f).convert('RGB')
    fotos[f] = cover(im, int(W * 1.18), int(H * 1.18))

fEt = font(FIRAB, 40); fSub = font(FIRASB, 50); fCred = font(FIRA, 26); fMarca = font(FIRAB, 34)
def fGrande(txt):
    s = 230
    while font(ANTON, s).getlength(txt) > W - 140: s -= 6
    return font(ANTON, s)

degr = Image.new('L', (1, H))
for y in range(H):
    t = y / H
    u = max(0, min(1, (t - 0.3) / 0.45)); degr.putpixel((0, y), int(255 * (0.22 + 0.74 * u * u * (3 - 2 * u))))
degr = degr.resize((W, H))
NEGRO = Image.new('RGB', (W, H), NOCHE)

def ease(x): x = max(0, min(1, x)); return 1 - (1 - x) ** 3

def escena(i, t):
    f, dur, et, gr, sub, col, cont = ESC[i]
    base = fotos[f]
    p = t / dur
    z = 1.0 + 0.12 * p
    cw, ch = int(base.width / z * (1 / 1.18) * 1.18 / 1.0), 0
    cw = int(W * 1.18 / z); ch = int(H * 1.18 / z)
    dx = (base.width - cw) * (0.5 + 0.25 * math.sin(i * 1.7) * p); dy = (base.height - ch) * (0.45)
    im = base.crop((int(dx), int(dy), int(dx) + cw, int(dy) + ch)).resize((W, H), Image.BILINEAR)
    im = Image.composite(NEGRO, im, degr)
    d = ImageDraw.Draw(im)
    # marca arriba
    d.rounded_rectangle((60, 90, 132, 162), 18, fill=ORO); d.text((96, 126), 'MW', font=font(ARCH, 30), fill=NOCHE, anchor='mm')
    d.text((152, 126), 'Milagro Week al Día', font=fMarca, fill=BLANCO, anchor='lm')
    a1, a2, a3 = ease((t - .15) / .5), ease((t - .4) / .6), ease((t - .8) / .6)
    y0 = 1080
    # etiqueta
    if a1 > 0:
        w = d.textlength(et, font=fEt)
        lay = Image.new('RGBA', (W, H)); dl = ImageDraw.Draw(lay)
        dl.rounded_rectangle((70, y0, 70 + w + 44, y0 + 70), 35, fill=ORO + (int(255 * a1),))
        dl.text((92, y0 + 35), et, font=fEt, fill=NOCHE + (int(255 * a1),), anchor='lm')
        im.paste(lay, (int(-40 * (1 - a1)), 0), lay)
    # grande (con contador)
    txt = gr
    if cont: txt = f"US${int(cont * ease((t - .4) / 1.6)):,}".replace(',', '.') + ' M'
    fg = fGrande(gr)
    if a2 > 0:
        lay = Image.new('RGBA', (W, H)); dl = ImageDraw.Draw(lay)
        dl.text((70, y0 + 110 + int(60 * (1 - a2))), txt, font=fg, fill=col + (int(255 * a2),))
        im.paste(lay, (0, 0), lay)
    gh = fg.getbbox(gr)[3]
    if a3 > 0:
        lay = Image.new('RGBA', (W, H)); dl = ImageDraw.Draw(lay)
        yy = y0 + 140 + gh
        dl.rectangle((70, yy, 70 + int(140 * a3), yy + 8), fill=ORO + (255,))
        for k, ln in enumerate(wrap(dl, sub, fSub, W - 150)):
            dl.text((70, yy + 40 + k * 66), ln, font=fSub, fill=BLANCO + (int(240 * a3),))
        im.paste(lay, (0, 0), lay)
    d = ImageDraw.Draw(im)
    d.text((W - 50, H - 60), 'Foto: ' + CRED.get(f, ''), font=fCred, fill=(200, 205, 220), anchor='rs')
    # barra de progreso
    d.rectangle((0, H - 10, int(W * p), H), fill=ORO)
    return im

QR = qr(520)
def final(t):
    im = Image.new('RGB', (W, H), NOCHE); d = ImageDraw.Draw(im)
    for r in range(900, 0, -30):
        a = int(40 * (1 - r / 900)); d.ellipse((W - r, -r // 2, W + r, r * 3 // 2 - r), fill=(11 + a, 16 + a // 2, 32))
    a = ease(t / .6)
    d.rounded_rectangle((W // 2 - 70, 230, W // 2 + 70, 370), 34, fill=ORO); d.text((W // 2, 300), 'MW', font=font(ARCH, 64), fill=NOCHE, anchor='mm')
    d.text((W // 2, 470), 'Milagro Week', font=font(ANTON, 120), fill=BLANCO, anchor='mm')
    d.text((W // 2, 590), 'AL DÍA', font=font(ANTON, 110), fill=ORO, anchor='mm')
    d.text((W // 2, 700), 'Seguimiento ciudadano al 100 %', font=fSub, fill=(220, 225, 240), anchor='mm')
    s = int(520 * (0.85 + 0.15 * a)); q = QR.resize((s, s))
    pad = 28; x = (W - s) // 2; y = 790 + (520 - s) // 2
    d.rounded_rectangle((x - pad, y - pad, x + s + pad, y + s + pad), 36, fill=BLANCO); im.paste(q, (x, y))
    d.text((W // 2, 1420), URL, font=font(FIRAB, 52), fill=ORO2, anchor='mm')
    for k, ln in enumerate(['Noticias que se actualizan solas cada 30 minutos', 'Español e inglés · Derecho de petición']):
        d.text((W // 2, 1510 + k * 62), ln, font=font(FIRA, 42), fill=(210, 215, 230), anchor='mm')
    d.text((W // 2, 1720), 'Vibras Positivas HM', font=font(FIRAB, 46), fill=BLANCO, anchor='mm')
    d.text((W // 2, 1782), 'Caucasia, Antioquia · WhatsApp 311 770 0431', font=font(FIRA, 36), fill=(190, 196, 214), anchor='mm')
    return im

ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                       '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo', '-shortest',
                       '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-movflags', '+faststart',
                       'milagro-week-al-dia.mp4'], stdin=subprocess.PIPE)
inicios = []; acc = 0
for e in ESC: inicios.append(acc); acc += e[1]
total = acc + FIN
n = int(total * FPS)
for k in range(n):
    t = k / FPS
    if t >= acc:
        fr = final(t - acc)
        if t - acc < XF: fr = Image.blend(escena(len(ESC) - 1, ESC[-1][1] - 0.001), fr, (t - acc) / XF)
    else:
        i = max(j for j, s in enumerate(inicios) if s <= t)
        fr = escena(i, t - inicios[i])
        nxt = inicios[i] + ESC[i][1]
        if nxt - t < XF:
            sig = escena(i + 1, 0) if i + 1 < len(ESC) else final(0)
            fr = Image.blend(fr, sig, 1 - (nxt - t) / XF)
    ff.stdin.write(fr.tobytes())
    if k % 150 == 0: print(k, '/', n, flush=True)
ff.stdin.close(); ff.wait()
print('listo', total, 's')
