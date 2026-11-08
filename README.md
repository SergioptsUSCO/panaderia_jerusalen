# Panadería Jerusalén

Sitio web de la panadería, desarrollado con React y Vite.

## Idiomas y ubicación

El selector **ES / EN** traduce la interfaz, el catálogo, el carrito y el
formulario. La preferencia se guarda en el navegador; al visitar por primera
vez se usa inglés si el navegador está configurado en inglés y español en
los demás casos. Las traducciones se mantienen en `src/i18n/en.js`.
El formato de precios cambia con el idioma y conserva los valores en COP.

La dirección está configurada en `src/data/business.js` como
**433 NY-52, Woodbourne, NY 12788**. Nominatim restringe la búsqueda a Estados
Unidos. Si la consulta no responde, el mapa utiliza las coordenadas verificadas
de respaldo: `41.7553553, -74.5817047`.

## Desarrollo local

Requiere Node.js 24 y npm.

```sh
npm ci
cp .env.example .env
npm run dev
```

Completa las variables de EmailJS en `.env` para habilitar el envío de pedidos.
Los archivos `.env` quedan fuera de Git. Las variables `VITE_*` se incluyen
en el navegador al compilar: usa únicamente los identificadores y la clave
pública de EmailJS, nunca claves privadas.

## GitHub Pages

Sitio: https://SergioptsUSCO.github.io/panaderia_jerusalen/

Cada push a `main` compila y publica automáticamente mediante
[GitHub Actions](.github/workflows/deploy.yml).

En **Settings → Pages**, la fuente de publicación debe ser **GitHub Actions**.
En **Settings → Secrets and variables → Actions → Variables**, configura:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

La ruta base se obtiene de GitHub Pages durante el despliegue. La navegación
usa rutas con `#` (por ejemplo, `/#/menu`) para permitir abrir y recargar
enlaces directamente en el alojamiento estático de GitHub Pages.

Autoriza el dominio publicado en EmailJS si tienes restricciones de origen.

Para compilar y revisar localmente:

```sh
npm run build
npm run preview
```

Referencia: [desplegar Vite en GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages).
