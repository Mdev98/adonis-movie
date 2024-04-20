import MovieService from "#services/movie_service"
import CacheService from "#services/cache_service"

const cache = CacheService.getInstance()

export default class Movie  {
  declare title?:string

  declare slug:string

  declare content:string

  static async find(slug:string) {
    if (await cache.has(slug)) {
      console.log(`Cache hit for ${slug}`)
      return cache.get(slug)
    }

    const movie = new Movie()
    movie.title = MovieService.getTitle(slug)
    movie.content = MovieService.getBody(slug)
    movie.slug = slug


    await cache.set(slug, movie)

    return movie
  }

  static async all() {
    const slugs = await MovieService.getSlugs()

    const movies: Movie[] = await Promise.all(slugs.map(async (slug) => {
      return await this.find(slug)
    }))

    return movies
  }
}