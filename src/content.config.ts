import {defineCollection} from "astro:content";
import {z} from "astro/zod";
import {file} from "astro/loaders";


const projects = defineCollection({
    loader: file("src/contents/portfolio/projects/index.json"),
    schema: z.object({
        title: z.string(),
        imageUrl: z.string().url(),
        description: z.string(),
        technologies: z.array(z.object({
            name: z.string(),
            icon: z.string(),
        })),
        year: z.coerce.number()
    })
})

const skills = defineCollection({
    loader: file("src/contents/portfolio/skills/index.json"),
    schema:
        z.object({

            category: z.string(),
            items: z.array(z.object({
                name: z.string(),
                icon: z.string(),
            })),
        })

})

const about = defineCollection({
    loader: file("src/contents/portfolio/about/index.json"),
    schema: z.object({
        headline: z.string(),
        summary: z.array(z.string()),
    })
})

const education = defineCollection({
    loader: file("src/contents/portfolio/education/index.json"),
    schema: z.object({
        startYear: z.coerce.number(),
        endYear: z.coerce.number().nullable(),
        title: z.string(),
        heading: z.string(),
        institution: z.string(),
        location: z.string(),
        descriptionBlocks: z.array(
            z.object({
                type: z.literal("list"),
                items: z.array(z.string()),
            })
        ),
    })
})

export const collections = {
    projects,
    skills,
    about,
    education
}