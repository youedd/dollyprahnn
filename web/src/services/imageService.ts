import type { Image } from '../graphql/generated/sdk'
import { useSanityClient } from 'astro-sanity';
import { createImageBuilder } from 'astro-sanity';

export const builder = createImageBuilder(useSanityClient());

export const urlfFor = (source: Image) => {
    if (import.meta.env.DEV) {
        const asset = source.asset

        const fake = {
            url: () => asset?.url ?? '',
            blur: (_: number) => fake,
            width: (_: number) => fake,
            height: (_: number) => fake,
        }

        return fake
    }

    return builder.image(source)
}