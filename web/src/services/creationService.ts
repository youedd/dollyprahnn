import client from "../graphql/client";
import type { Creation } from "../graphql/generated/sdk";

const fakes = import.meta.env.DEV ? import('../fakes.json') : null

export const getAllCreations = async (): Promise<Creation[]> => {

    if (fakes) {
        return (await fakes).creations
    }

    const response = await client().allCreation({
        limit: -1,
        offset: 0,
    });

    return response.allCreation
}