import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";
import node from "@astrojs/node";
import swup from '@swup/astro';


// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: "server",
  adapter: vercel(),
  prefetch: true,
});