import { FastifyPluginAsync } from 'fastify';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

const authRoutes: FastifyPluginAsync = async (server) => {
  const authService = new AuthService(server.prisma);
  const authController = new AuthController(authService);

  server.post('/request-otp', (req, reply) => authController.requestOtp(req, reply));
  server.post('/verify-otp', (req, reply) => authController.verifyOtp(req, reply));
  server.post('/register', (req, reply) => authController.register(req, reply));
  server.get('/me', { preHandler: [server.authenticate] }, (req, reply) => authController.me(req, reply));
};

export default authRoutes;
