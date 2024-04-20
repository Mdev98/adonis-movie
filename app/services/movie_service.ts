import app from "@adonisjs/core/services/app"
import { readdir } from "node:fs/promises"
import { Exception } from '@adonisjs/core/exceptions'
import { readFileSync } from "node:fs"

export default class MovieService {
    static getSlugUrl(slug: string) {
        if (!slug.endsWith('.html')) {
            slug = `${slug}.html`
        }

        return app.makeURL(`resources/movies/${slug}`)
    }

    static async getSlugs() {
        const files = await readdir(app.makeURL('resources/movies'))

        return files.map((file) => file.replace('.html', ''))
    }

    static getContent(slug: string){
        const url = this.getSlugUrl(slug)
        try {
            return readFileSync(url, 'utf-8')
        }catch (error) {
            throw new Exception(`Movie ${slug} not found`, {
                code : 'E_NOT_FOUND',
                status : 404
            })
        }
    }

    static getTitle(slug: string) {
        const content = this.getContent(slug)
        const title = content.match(/<h1>(.*?)<\/h1>/)
        return title ? title[1] : ''
    }

    static getBody(slug: string) {
        const content = this.getContent(slug)
        const body = content.match(/<p>(.*?)<\/p>/)
        return body ? body[1] : ''
    }
}