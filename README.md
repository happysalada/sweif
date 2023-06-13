# Template

This is a template for frontend projects with sveltekit, typescript, tailwindcss and nodejs polyfills.

To reuse this template, degit is the easiest way.
```bash
degit happysalada/sveltekit-typescrypt-tailwind-polyfills-template
```

## Developing

if you have nix and direnv installed, the dependencies required to run the project will automatically be installed for you. Otherwise, you just need `pnpm` or `npm`

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

