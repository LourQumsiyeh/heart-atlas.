# Heart Atlas

Static site: HTML, CSS and JavaScript. The 3D heart is `assets/human-heart.glb`, shown with Google's `<model-viewer>`.

## Run locally
The model must be loaded over HTTP, so double-clicking `index.html` will not show it.

    python3 -m http.server 8000   # then open http://localhost:8000

## Publish
GitHub repo > Settings > Pages > deploy from the `main` branch.

## AI prompt used

This project was generated with an AI tool using the following prompt:

```
Can you make me a website using HTML, CSS and JavaScript (3 separate files: index.html, style.css, script.js) with the components below? Use the heart I attached (human-heart.glb) as the 3D heart. The whole site must be responsive and work in both English and Arabic (Arabic should switch the page to right-to-left).

1. Header
- It must have a visible drop shadow.
- Language toggle button that switches between "عربي" and "English". All text on the page should change language, including the sidebar and any added items.
- "Add content" button: each click adds a new item (a small pill like "Added item 1") to the header. The header should grow in height smoothly without breaking or overlapping anything below it.
- Every added item has a × on it. Clicking the × removes only that one item, and the header height shrinks smoothly each time.
- "Clear content" button: removes all added items at once, and the header must go back to exactly its original size with no leftover empty space.

2. Resizable left sidebar menu
- I can click and drag the edge of the sidebar to make it wider or smaller. It should work in English and in Arabic (in Arabic the sidebar moves to the right side and the drag edge flips too).
- Resizing must automatically adjust the main content, the footer and the floating button so nothing overlaps or breaks.
- Menu labels must be short, 1 to 2 words only (for example: Animation, 3D Heart, Chambers, Valves, Rhythm, Arteries, Symptoms, Sources, and Arabic versions too).
- The sidebar must stop getting smaller at the width of the longest word, so no word is ever cut off. Work this out with JavaScript and recalculate it when the language changes.
- Maximum width should be half the screen.
- If the content overflows, show clean, thin scrollbars so nothing is hidden.

3. CSS animation section
- Show the text "CSS Animation" with a text shadow. It must stay perfectly centered horizontally and vertically, even when I resize the window or the sidebar. The font size should scale with the section, not the screen, so it always fits.
- Add a custom CSS animation on the text (a heartbeat style pulse).
- Behind the text, add a moving animated background made only with CSS (a shifting gradient, a sliding grid and a glowing light that drifts around).
- Respect "reduce motion" settings.

4. Interactive 3D model section
- Show my 3D human heart using the <model-viewer> web component.
- I must be able to rotate, orbit and zoom in and out with the mouse or touch.
- It should rotate by itself automatically (no delay, about 25 degrees per second) and load straight away.

5. Floating action button
- It must sit exactly on the line between the main content and the footer, half on each.
- It should have a smooth hover effect (lifts up and grows a little). Clicking it scrolls the main content back to the top.

6. Fixed footer
- Fixed at the bottom of the screen and always visible while scrolling.
- Its width must line up with the main content only and must never go under the sidebar, including after resizing and in Arabic.

7. Code quality
- Clean, efficient code with as few HTML tags as possible (no unnecessary wrapper divs).
- Use CSS variables, add short comments, and make it work on phones, tablets and desktop.
- Include a README with steps to run it locally (the model needs a local server like VS Code Live Server) and how to put it on GitHub.
- Give me the whole project as a folder/zip, not a single HTML file, so I can upload it to a GitHub repository and invite my professor.
```