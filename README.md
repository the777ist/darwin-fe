# Frontend client for Darwin

_“Blushing is the most peculiar and most human of all expressions.”_

### Installation and local development

Install dependencies with command `npm install`.  
Make sure [darwin-be](https://github.com/the777ist/darwin-be) server is running. Follow instructions in [README.md](https://github.com/the777ist/darwin-be/blob/master/README.md) for more.
Start local dev server with command `npm run dev`. Navigate to `http://localhost:3000/` in your browser.

### Explanation of architecture decisions

While the project is extremely rough around the edges, I tried to follow some best practices and patterns.

- Reusable Components in `/components/ui` leveraging shadcn/ui.
- Custom components in `/components` using the reusable components and modifying them as needed.
- Global styles in `app/globals.css`, including fonts, colors, spacing, etc.
- Next `dynamic` for lazy loading CSR components.
- Skeletons for init states.
- Hooks for ws in `/hooks`.
- No external / global state manegement library used as I didn;t feel it was necessary.

### Suggestions for future improvements

- Better de-duplication of global styles, many styles are duplicated, ideally.
- Add `tailwind.config.js` for better class name and theme management.
- Move over more styles to globals.css. Some components are still using tailwind classes, ideally no component should be adding its own margins, font sizes etc. to maintain the project's standard.
- Implement atomic design for somponents - `atoms`, `molecules` and `organisms`. Either that, ot better structure the folders. More modularization can definitely be done e.g. `h3`s are used in many places that can be their own reusable component.
- Better breakpoint management and definition. Currently its just using default tailwind breakpoints where necessary.
- No sharing of types between client and server
- We can make this a monorepo and be able to easily share types between client and server.
- Skeletons should be in the layouts. The main components can be re-structured to move as much code as possible into SSR layouts, and only dynamically rendered jsx in client side rendered files.
