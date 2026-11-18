// Baja fotos reales (no infografías) de las noticias para el video y el flyer promocional
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36';
const n = JSON.parse(await readFile('data/noticias.json', 'utf8'));
await mkdir('promo/fotos', { recursive: true });
const lista = [];
for (const it of n.items.filter(i => i.imagen && !/infograf|grafic|logo|banner/i.test(i.imagen))) {
  if (lista.length >= 10) break;
  try {
    const r = await fetch(it.imagen, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(15000) });
    const buf = Buffer.from(await r.arrayBuffer());
    const { data, info } = await sharp(buf).resize(64, 64, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    let b = 0; for (let i = 0; i < data.length; i += 3) if (data[i] > 235 && data[i+1] > 235 && data[i+2] > 235) b++;
    const m = await sharp(buf).metadata();
    if (b / (info.width * info.height) > 0.18 || m.width < 700) continue;
    const f = `promo/fotos/foto${lista.length + 1}.jpg`;
    await sharp(buf).jpeg({ quality: 90 }).toFile(f);
    lista.push({ archivo: f, fuente: it.fuente, titulo: it.titulo, url: it.url, imagen: it.imagen });
  } catch (e) { console.log('falló', it.imagen, e.message); }
}
await writeFile('promo/fotos/creditos.json', JSON.stringify(lista, null, 1));
console.log('fotos:', lista.length);
