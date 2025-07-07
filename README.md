<p align="center">
    <a href="https://exifoo.vercel.app" target="_blank"><img src="src/assets/images/exifoo_logo_large.png" width="300px"></a>
    <h3 align="center">Shoot more. Organize less.</h3>
</p>

---

The website of exifoo, a tool to keep your photos organized by adding the date and time of capture to the filename.

Built with Next.js, TypeScript, and TailwindCSS.

Visit: [exifoo.vercel.app](https://exifoo.vercel.app)
<br>
App Repository: [codeofandrin/exifoo](https://github.com/codeofandrin/exifoo)

<br>

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone https://github.com/codeofandrin/exifoo-website.git
cd exifoo-website
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Environment Variables

This project uses environment variables for configuration. To set up your environment, copy 
[`.env.example`](.env.example) to `.env` in the root directory and adjust values as needed.

## Project Structure

- `src/app` - Next.js app directory (routing, pages, layouts)
- `src/assets` - Fonts, icons, and images
- `src/components` - Components of the app
- `src/content` - Markdown content for legal and privacy pages
- `src/hooks` - Custom react hooks
- `src/utils` - Utility functions and constants
- `src/styles` - CSS modules and global styles

## Copyright

Copyright (c) codeofandrin 

This source code is licensed under the MIT license found in the
[LICENSE](LICENSE) file in the root directory of this source tree.
