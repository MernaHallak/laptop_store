# Responsive Marketplace Homepage (Next.js)

Stack:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- No ESLint configuration

## Development

```bash
npm install
npm run dev
```

## Notes / Enhancements included
- Kept the UI and behavior identical to the original Vite + React project.
- Moved the app entry from `src/main.tsx` to Next App Router `src/app/page.tsx`.
- Global styling tokens were preserved from the original `src/styles/globals.css`.
- Marked UI components as Client Components to ensure Radix/shadcn-style components work seamlessly in the App Router.
