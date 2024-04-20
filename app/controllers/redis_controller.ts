import CacheService from '#services/cache_service'
import type { HttpContext } from '@adonisjs/core/http'

const cache = CacheService.getInstance()

export default class RedisController {
    public async destroy({ response, params }: HttpContext) {
        await cache.forget(params.slug)
        return response.redirect().back()
    }


    public async flush({ response }: HttpContext) {
        await cache.flush()
        return response.redirect().back()
    }
}