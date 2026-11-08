# Panadería Jerusalén

Sitio web de la panadería, desarrollado con React y Vite.

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
