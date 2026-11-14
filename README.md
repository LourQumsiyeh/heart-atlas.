# Heart Atlas

Static site: HTML, CSS and JavaScript. The 3D heart is `assets/human-heart.glb`, shown with Google's `<model-viewer>`.

## Run locally
The model must be loaded over HTTP, so double-clicking `index.html` will not show it.

    python3 -m http.server 8000   # then open http://localhost:8000

## Publish
GitHub repo > Settings > Pages > deploy from the `main` branch.
