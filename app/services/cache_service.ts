import redis from '@adonisjs/redis/services/main'

class CacheService {
    static #instance: CacheService | null = null;
    private constructor() {}

    static getInstance(): CacheService {
        if (!this.#instance) {
            this.#instance = new CacheService();
        }

        return this.#instance;
    }

    async has(...keys: string[]) {
        return redis.exists(keys)
    }

    async get(key: string) {
        const value = await redis.get(key);
        return value && JSON.parse(value)
    }

    async set(key: string, value: any) {
        return redis.set(key, JSON.stringify(value))
    }

    async forget(...keys: string[]) {
        return redis.del(keys)
    }

    async flush() {
        return redis.flushdb()
    }
}

export default CacheService;

