import fp from 'fastify-plugin';
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { UserRole } from '@sahakar/shared-types';

declare module 'fastify' {
  interface FastifyInstance {
    authorize: (allowedRoles: UserRole[]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

const rbacPlugin: FastifyPluginAsync = fp(async (server) => {
  server.decorate('authorize', (allowedRoles: UserRole[]) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      // Must run after request.jwtVerify() / authenticate
      const user = request.user;
      if (!user) {
        reply.status(401).send({ error: 'Unauthorized', message: 'User payload not found' });
        return;
      }

      if (!allowedRoles.includes(user.role as UserRole)) {
        reply.status(403).send({
          error: 'Forbidden',
          message: `Role '${user.role}' is not authorized to perform this action`,
        });
        return;
      }
    };
  });
});

export default rbacPlugin;
