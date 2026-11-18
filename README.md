# Milagro Week al Día

App ciudadana (PWA) de **Vibras Positivas HM** para seguir al 100 % la Milagro Week (Nueva York, 16–18 nov 2026): cada anuncio, cuánto es crédito y cuánto inversión, qué llega a las regiones y un derecho de petición a todas las entidades.

- `data/anuncios.json` — anuncios, cifras, agenda (se edita a mano cuando un anuncio cambia de estado: `anunciado` → `firmado` → `desembolsado` → `obra`).
- `data/noticias.json`, `data/videos.json` — los llena el robot.
- `.github/workflows/robot.yml` — robot cada 30 min: noticias, fotos reales (og:image), videos de YouTube y la imagen de vista previa `portada.jpg`.

Publicada en Netlify: https://milagro-week-al-dia.netlify.app
