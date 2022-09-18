import { defineConfig } from 'astro/config';
import image from "@astrojs/image";

import sanity from "astro-sanity";



const SANITY_DATASET = process.env.SANITY_DATASET
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID

if (!SANITY_DATASET) {
  console.log("SANITY_DATASET env variable is undefined")
  process.exit(-1)
}

if (!SANITY_PROJECT_ID) {
  console.log("SANITY_PROJECT_ID env variable is undefined")
  process.exit(-1)
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    image(),
    sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      useCdn: false,
    })
  ]
});