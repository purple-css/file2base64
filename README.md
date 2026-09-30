# File to Base64

A fast, private, client-side developer tool for converting files and text to Base64, decoding Base64 as UTF-8 text, creating Data URIs, and downloading results. No backend, uploads, analytics, or external conversion services are used.

## Features

- File → Base64 and Text → Base64
- Base64 → Text with UTF-8 support
- Drag & Drop and file picker
- Clipboard copy and Blob downloads
- Data URI generation
- File information and Base64 statistics
- Dark/Light theme with LocalStorage and system preference
- PWA manifest
- Offline/client-side processing
- Responsive UI for desktop and mobile

## Tech Stack

HTML5, CSS3, JavaScript ES Modules, Web APIs, File API, Clipboard API, Blob API, LocalStorage, and PWA.

## Privacy

Files are processed locally in your browser and never leave your device. No file content is sent over the network.

## Project Structure

```text
File-to-Base64/
├── index.html
├── main.js
├── manifest.json
├── README.md
├── LICENSE
└── src/
    ├── css/
    │   ├── styles.css
    │   ├── fonts.css
    │   └── originalText-andBase64-Fonts.css
    ├── js/
    │   ├── script.js
    │   ├── base64.js
    │   └── base64words.json
    ├── favicon-512.svg
    └── favicon-128.svg
```

`public/` mirrors the static files so the included Next.js preview can serve the no-build browser app at `/index.html`.

## How to run

Serve the project with any static HTTP server and open its URL. For example, use the static server built into your editor or a local HTTP server. ES Modules and PWA features may require `http://` or `https://` rather than `file://`.

## License

WTFPL 2.0. See `LICENSE`.
