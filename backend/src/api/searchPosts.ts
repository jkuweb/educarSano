import type { Endpoint } from 'payload'

export const searchPostsEndpoint: Endpoint = {
  path: '/search/posts',
  method: 'get',
  handler: async (req) => {
    const { payload, query } = req

    console.log('Search endpoint called with query:', query)

    try {
      if (!payload) {
        return Response.json(
          {
            success: false,
            message: 'Payload not initialized',
          },
          { status: 500 },
        )
      }

      const searchQuery = (query?.q as string) || ''
      const categoryFilter = (query?.category as string) || ''
      const tagFilter = (query?.tag as string) || ''
      const pageNumber = parseInt((query?.page as string) || '1', 10)
      const limitNumber = parseInt((query?.limit as string) || '9', 10)

      // Validar parámetros numéricos
      if (isNaN(pageNumber) || pageNumber < 1) {
        return Response.json(
          {
            success: false,
            message: 'Invalid page parameter',
          },
          { status: 400 },
        )
      }

      if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 100) {
        return Response.json(
          {
            success: false,
            message: 'Invalid limit parameter (must be between 1 and 100)',
          },
          { status: 400 },
        )
      }

      const whereQuery: any = {
        status: {
          equals: 'published',
        },
      }

      if (searchQuery.trim()) {
        whereQuery.or = [
          {
            title: {
              contains: searchQuery.trim(),
            },
          },
          {
            excerpt: {
              contains: searchQuery.trim(),
            },
          },
        ]
      }

      if (categoryFilter.trim()) {
        whereQuery.categories = {
          contains: categoryFilter.trim(),
        }
      }

      if (tagFilter.trim()) {
        whereQuery.tags = {
          contains: tagFilter.trim(),
        }
      }

      const results = await payload.find({
        collection: 'posts',
        where: whereQuery,
        page: pageNumber,
        limit: limitNumber,
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
          limit: results.limit,
        },
        query: {
          q: searchQuery || null,
          category: categoryFilter || null,
          tag: tagFilter || null,
        },
      })
    } catch (error) {
      console.error('Search endpoint error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        query: query,
      })

      return Response.json(
        {
          success: false,
          message: 'Error al buscar posts',
          error:
            process.env.NODE_ENV === 'development'
              ? error instanceof Error
                ? error.message
                : 'Unknown error'
              : 'Internal server error',
        },
        { status: 500 },
      )
    }
  },
}

export const searchPostsSimple: Endpoint = {
  path: '/search/posts-simple',
  method: 'get',
  handler: async (req) => {
    try {
      const { payload } = req

      const results = await payload.find({
        collection: 'posts',
        limit: 10,
      })

      return Response.json({
        success: true,
        total: results.totalDocs,
        posts: results.docs.map((doc) => ({
          id: doc.id,
          title: doc.title,
          status: doc.status,
        })),
      })
    } catch (error) {
      return Response.json(
        {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
        },
        { status: 500 },
      )
    }
  },
}
