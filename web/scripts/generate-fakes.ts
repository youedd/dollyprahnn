import { faker } from '@faker-js/faker';
import type { Creation, Image, Textblock } from "../src/graphql/generated/sdk";
import { fileURLToPath } from 'url';
import { writeFile } from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFakeImage = (): Image => {
    const getDimensions = () => {
        const r = Math.floor(Math.random() * 4)
        switch (r) {
            case 0:
                return { width: 480, height: 320 }
            case 1:
                return { width: 640, height: 480 }
            case 2:
                return { width: 800, height: 600 }
            case 3:
                return { width: 1024, height: 768 }
        }
    }
    const dimensions = getDimensions();

    return {
        asset: {
            source: {
                url: faker.image.abstract(dimensions?.width, dimensions?.height)
            }
        }
    };
}

const getFakeTextBlock = (): Textblock => {
    const withTitle = Math.random() < 0.5

    const title = withTitle ? faker.lorem.sentence() : undefined
    const content = faker.lorem.paragraphs(Math.ceil(Math.random() * 3))

    return {
        title,
        content,
    }
}

const getFakeCreation = (): Creation => {
    const title = `${faker.word.adjective()} ${faker.animal.type()}`
    const slug = title.replace(/[^a-z]+/gmi, "-")
    const images = Array.from({ length: Math.ceil(Math.random() * 5) }).map(getFakeImage)
    const blocks = Array.from({ length: Math.floor(Math.random() * 4) }).map(getFakeTextBlock)

    return {
        title,
        slug: {
            current: slug
        },
        images,
        blocks
    }
}

const getFakeCreations = (): Creation[] => {
    return Array
        .from({ length: 10 + Math.floor(Math.random() * 10) })
        .map(getFakeCreation)
}

type Fakes = {
    creations: Creation[]
}

const fakes: Fakes = {
    creations: []
}

if (process.env.DEV === '1') {
    fakes.creations = getFakeCreations()
}

console.log('Generating fake data 🥸')

writeFile(
    path.join(__dirname, '../src/fakes.json'),
    JSON.stringify(fakes)
    ,
    {},
    (err) => {
        if (err) {
            console.error(err);
            process.exit(-1)
        }
    })

