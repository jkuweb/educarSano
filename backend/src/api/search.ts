import type { Endpoint } from 'payload'

export const searchPosts: Endpoint = {
  path: '/search/posts',
  method: 'get',
  handler: async (req) => {
    const { payload, query } = req

    try {
      const q = typeof query?.q === 'string' ? query.q : ''
      const category = typeof query?.category === 'string' ? query.category : ''
      const tag = typeof query?.tag === 'string' ? query.tag : ''
      const page = typeof query?.page === 'string' ? parseInt(query.page, 10) : 1
      const limit = typeof query?.limit === 'string' ? parseInt(query.limit, 10) : 10

      const where: any = {}

      if (q.trim()) {
        where.or = [
          {
            title: {
              contains: q.trim(),
            },
          },
        ]
      }

      if (category.trim()) {
        where.categories = {
          contains: category.trim(),
        }
      }

      if (tag.trim()) {
        where.tags = {
          contains: tag.trim(),
        }
      }

      const results = await payload.find({
        collection: 'posts',
        where,
        page,
        limit,
        sort: '-publishedAt',
        depth: 2,
      })

      return Response.json({
        success: true,
        data: results.docs,
        pagination: {
          page: results.page,
          totalPages: results.totalPages,
          totalDocs: results.totalDocs,
          hasNextPage: results.hasNextPage,
          hasPrevPage: results.hasPrevPage,
        },
      })
    } catch (error) {
      console.error('Error en búsqueda:', error)

      return Response.json(
        {
          success: false,
          message: 'Error al buscar posts',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 },
      )
    }
  },
}
