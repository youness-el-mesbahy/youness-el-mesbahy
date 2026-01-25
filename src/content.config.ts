import {defineCollection} from "astro:content";
import {z} from "astro/zod";
import {file} from "astro/loaders";


const projects = defineCollection({
    loader: file("src/contents/portfolio/projects/index.json"),
    schema: z.object({
        title: z.string(),
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

export const collections = {
    projects,
    skills
}