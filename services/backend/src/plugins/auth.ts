import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { JwtPayload } from '@sahakar/shared-types';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JwtPayload;
    user: JwtPayload;
  }
}

const authPlugin: FastifyPluginAsync = fp(async (server) => {
  const secret = process.env.JWT_ACCESS_SECRET || 'sahakar_connect_dev_access_secret_32chars_min';

  await server.register(fastifyJwt, {
    secret,
    sign: {
      expiresIn: '7d',
    },
  });

  server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({ error: 'Unauthorized', message: 'Invalid or expired token' });
    }
  });
});

export default authPlugin;
