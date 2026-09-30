# Portfolio handoff

## Preview locally

From this folder, run `npm run dev` and open the Local URL printed in the terminal (normally http://localhost:8080; Vite chooses another port if it is occupied). Stop with Ctrl+C.

Validation: `npm run build`, `npx tsc --noEmit`, and `npm run lint`.

This project retains the existing React / TanStack Start / Vite stack. Nothing has been published.

## Content updates

Edit the `projects` collection in `src/routes/index.tsx`. Each entry contains its copy, short brief, intended audience, approach, contribution, verified tools, and image gallery. Reorder entries to reorder the page.

For each supplied artwork file, place a web-optimized copy in `public/work/` and add an image entry:

```ts
{ src: "/work/your-file.webp", alt: "Describe the actual design and its message", width: 1200, height: 1500 }
```

Use the file's real pixel dimensions. Images retain their natural aspect ratios, with no text cropping. Each image links to the original-size asset in a new tab; project details use keyboard-accessible native disclosures. Empty galleries produce no placeholder artwork.

Edit the `contact` object alongside the projects with confirmed details:

```ts
const contact = {
  email: "your actual email",
  linkedin: "your actual profile URL", // optional
  resume: "/your-resume.pdf", // only after adding the supplied file to public/
};
```

## Still needed before forwarding

- Actual Money Has a Backend artwork.
- Actual InnoPlasticity advertisement artwork.
- Tools used to make each design; only the confirmed InnoPlasticity system tools are currently listed.
- Optional: personal LinkedIn URL and résumé PDF.

The old sample JPEGs remain on disk but are not imported or presented as Abrielle's work. No third project, metrics, public product availability, portrait placeholder, or invented contact links are shown. Review the proposed audience and contribution descriptions when supplying artwork.
