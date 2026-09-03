import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server) => {
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    server.log.info('Connected to PostgreSQL database');
  } catch (err) {
    server.log.warn(err, 'PostgreSQL database connection deferred/failed in local dev:');
  }

  server.decorate('prisma', prisma);

  server.addHook('onClose', async (serverInstance) => {
    try {
      await serverInstance.prisma.$disconnect();
    } catch {
      // ignore disconnect errors
    }
  });
});

export default prismaPlugin;
