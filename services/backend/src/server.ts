import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import Fastify from 'fastify';
import cors from '@fastify/cors';
import { Server as SocketIOServer } from 'socket.io';

import prismaPlugin from './plugins/prisma';
import redisPlugin from './plugins/redis';
import authPlugin from './plugins/auth';
import rbacPlugin from './plugins/rbac';

import authRoutes from './modules/auth/auth.routes';
import bookingRoutes from './modules/booking/booking.routes';

const port = Number(process.env.PORT) || 4000;
const host = process.env.HOST || '0.0.0.0';

const server = Fastify({
  logger: true,
});

async function bootstrap() {
  try {
    // 1. CORS
    await server.register(cors, {
      origin: true,
      credentials: true,
    });

    // 2. Custom Plugins
    await server.register(prismaPlugin);
    await server.register(redisPlugin);
    await server.register(authPlugin);
    await server.register(rbacPlugin);

    // 3. Socket.io Gateway setup
    const io = new SocketIOServer(server.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    server.decorate('io', io);

    io.on('connection', (socket) => {
      server.log.info(`Socket connected: ${socket.id}`);

      socket.on('join_room', (room: string) => {
        socket.join(room);
        server.log.info(`Socket ${socket.id} joined room ${room}`);
      });

      socket.on('disconnect', () => {
        server.log.info(`Socket disconnected: ${socket.id}`);
      });
    });

    // 4. API Routes
    server.get('/health', async () => {
      return { status: 'ok', timestamp: new Date().toISOString(), service: 'SahakarConnect API' };
    });

    await server.register(authRoutes, { prefix: '/api/v1/auth' });
    await server.register(bookingRoutes, { prefix: '/api/v1' });

    // 5. Start Server
    await server.listen({ port, host });
    server.log.info(`🚀 SahakarConnect Fastify backend listening on http://${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

bootstrap();
