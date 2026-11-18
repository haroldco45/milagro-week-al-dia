from comun import *
W,H=1080,1350
im=Image.new('RGB',(W,H),NOCHE)
foto=cover(Image.open(F+'foto2.jpg').convert('RGB'),W,760)
im.paste(foto,(0,0))
g=Image.new('L',(1,760))
for y in range(760):
    u=max(0,min(1,(y/760-0.35)/0.65)); g.putpixel((0,y),int(255*(0.15+0.85*u*u*(3-2*u))))
im.paste(Image.new('RGB',(W,760),NOCHE),(0,0),g.resize((W,760)))
d=ImageDraw.Draw(im)
d.rounded_rectangle((50,50,122,122),18,fill=ORO); d.text((86,86),'MW',font=font(ARCH,30),fill=NOCHE,anchor='mm')
d.text((140,86),'Vibras Positivas HM',font=font(FIRAB,32),fill=BLANCO,anchor='lm')
et='SEGUIMIENTO CIUDADANO AL 100 %'; f=font(FIRAB,30); w=d.textlength(et,font=f)
d.rounded_rectangle((60,440,60+w+40,496),28,fill=ORO); d.text((80,468),et,font=f,fill=NOCHE,anchor='lm')
d.text((56,500),'MILAGRO WEEK',font=font(ANTON,148),fill=BLANCO)
d.text((60,680),'AL DÍA',font=font(ANTON,86),fill=ORO)
d.text((300,725),'¿Qué se anunció y qué llega de verdad?',font=font(FIRASB,34),fill=(225,230,242),anchor='lm')
# cifras
cajas=[('US$37.350 M','anunciados en Nueva York',ORO2),('US$21.400 M','son préstamos a 4 años',(150,182,255)),('US$0','firmado y verificado hoy',(255,123,125))]
x=50; cw=(W-100-2*20)//3
for n,t,c in cajas:
    d.rounded_rectangle((x,795,x+cw,978),24,fill=(22,29,54),outline=(50,60,95),width=2)
    fs=60
    while font(ANTON,fs).getlength(n)>cw-40: fs-=2
    d.text((x+22,815),n,font=font(ANTON,fs),fill=c)
    for k,l in enumerate(wrap(d,t,font(FIRA,26),cw-44)): d.text((x+22,898+k*32),l,font=font(FIRA,26),fill=(205,210,228))
    x+=cw+20
# pie con QR
d.rounded_rectangle((50,1000,W-50,1308),28,fill=BLANCO)
q=qr(250); im.paste(q,(80,1029))
d=ImageDraw.Draw(im)
d.text((360,1028),'Escanee y abra la app',font=font(FIRAB,40),fill=NOCHE)
for k,l in enumerate(['Cada anuncio, uno por uno','Noticias solas cada 30 minutos','Derecho de petición a 6 entidades','Español e inglés']):
    d.rectangle((362,1097+k*38,374,1109+k*38),fill=ORO); d.text((388,1087+k*38),l,font=font(FIRA,28),fill=(40,46,66))
d.text((360,1286),URL,font=font(FIRAB,34),fill=(20,60,200),anchor='ls')
d.text((W-50,1335),'Foto: '+CRED['foto2.jpg']+'  ·  WhatsApp 311 770 0431  ·  Caucasia, Antioquia',font=font(FIRA,22),fill=(160,168,190),anchor='rs')
im.save('flyer-milagro-week-al-dia.png'); im.convert('RGB').save('flyer-milagro-week-al-dia.jpg',quality=92)
