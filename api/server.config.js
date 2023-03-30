/**
 * This file allows you to configure the Fastify Server settings
 * used by the RedwoodJS dev server.
 *
 * It also applies when running RedwoodJS with `yarn rw serve`.
 *
 * For the Fastify server options that you can set, see:
 * https://www.fastify.io/docs/latest/Reference/Server/#factory
 *
 * Examples include: logger settings, timeouts, maximum payload limits, and more.
 *
 * Note: This configuration does not apply in a serverless deploy.
 */

/** @type {import('fastify').FastifyServerOptions} */
const config = {
  requestTimeout: 15_000,
  logger: {
    // Note: If running locally using `yarn rw serve` you may want to adust
    // the default non-development level to `info`
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'warn',
  },
}

/**
 * You can also register Fastify plugins and additional routes for the API and Web sides
 * in the configureFastify function.
 *
 * This function has access to the Fastify instance and options, such as the side
 * (web, api, or proxy) that is being configured and other settings like the apiRootPath
 * of the functions endpoint.
 *
 * Note: This configuration does not apply in a serverless deploy.
 */

/** @type {import('@redwoodjs/api-server/dist/fastify').FastifySideConfigFn} */
const configureFastify = async (fastify, options) => {
  if (options.side === 'api') {
    fastify.log.info({ custom: { options } }, 'Configuring api side')

    fastify.register(require('fastify-sse-v2'))

    fastify.register(async (fastify) => {
      fastify.get('/generate', async (req, reply) => {
        const payload = {
          model: 'text-davinci-003',
          prompt: req.query.prompt,
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          max_tokens: 200,
          stream: true,
          n: 1,
        }

        const res = await fetch('https://api.openai.com/v1/completions', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
          },
          method: 'POST',
          body: JSON.stringify(payload),
        })

        const decoder = new TextDecoder()

        for await (const chunk of res.body) {
          const decodedChunk = decoder.decode(chunk).replace(/^data: /, '')
          reply.sse({ data: decodedChunk })
        }
      })
    })
  }

  if (options.side === 'web') {
    fastify.log.info({ custom: { options } }, 'Configuring web side')
  }

  return fastify
}

module.exports = {
  config,
  configureFastify,
}
