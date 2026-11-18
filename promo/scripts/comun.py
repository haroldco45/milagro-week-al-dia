from PIL import Image, ImageDraw, ImageFont, ImageFilter
import qrcode, json
F='/home/claude/milagro-week-al-dia/promo/fotos/'
CRED={x['archivo'].split('/')[-1]:x['fuente'] for x in json.load(open(F+'creditos.json'))}
import subprocess
def fpath(fam,style=''):
    return subprocess.run(['fc-match','-f','%{file}',f'{fam}:{style}'],capture_output=True,text=True).stdout
ANTON=fpath('Anton'); ARCH=fpath('Archivo Black'); FIRA=fpath('Fira Sans','style=Regular'); FIRAB=fpath('Fira Sans','style=Bold'); FIRASB=fpath('Fira Sans','style=SemiBold')
def font(p,s): return ImageFont.truetype(p,s)
NOCHE=(11,16,32); ORO=(245,183,0); ORO2=(255,211,77); ROJO=(229,56,59); AZUL=(47,107,255); BLANCO=(255,255,255)
URL='milagro-week-al-dia.netlify.app'
def qr(size):
    q=qrcode.QRCode(border=2,box_size=10,error_correction=qrcode.constants.ERROR_CORRECT_M); q.add_data('https://'+URL+'/'); q.make()
    return q.make_image(fill_color=(11,16,32),back_color='white').convert('RGB').resize((size,size),Image.NEAREST)
def cover(im,w,h):
    r=max(w/im.width,h/im.height); im=im.resize((int(im.width*r+1),int(im.height*r+1)),Image.LANCZOS)
    x=(im.width-w)//2; y=(im.height-h)//2; return im.crop((x,y,x+w,y+h))
def wrap(d,txt,f,maxw):
    words=txt.split(); lines=[]; cur=''
    for w in words:
        t=(cur+' '+w).strip()
        if d.textlength(t,font=f)<=maxw: cur=t
        else: lines.append(cur); cur=w
    if cur: lines.append(cur)
    return lines
