import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import Redis from 'ioredis';

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis;
  }
}

const redisPlugin: FastifyPluginAsync = fp(async (server) => {
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  const redis = new Redis(redisUrl, {
    lazyConnect: true,
    maxRetriesPerRequest: null,
  });

  try {
    await redis.connect();
    server.log.info('connected to Redis');
  } catch (err) {
    server.log.warn(err, 'Redis connection deferred/failed in local dev:');
  }

  server.decorate('redis', redis);

  server.addHook('onClose', async (serverInstance) => {
    await serverInstance.redis.quit();
  });
});

export default redisPlugin;
