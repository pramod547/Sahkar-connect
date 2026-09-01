import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { RequestOtpSchema, VerifyOtpSchema, RegisterUserSchema } from '@sahakar/shared-types';

export class AuthController {
  constructor(private authService: AuthService) {}

  async requestOtp(request: FastifyRequest, reply: FastifyReply) {
    const parseResult = RequestOtpSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({ error: 'Validation Error', details: parseResult.error.format() });
    }

    const result = await this.authService.requestOtp(parseResult.data.phone_number);
    return reply.send(result);
  }

  async verifyOtp(request: FastifyRequest, reply: FastifyReply) {
    const parseResult = VerifyOtpSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({ error: 'Validation Error', details: parseResult.error.format() });
    }

    try {
      const result = await this.authService.verifyOtp(parseResult.data);
      if (!result.is_registered) {
        return reply.send({
          is_registered: false,
          phone_number: result.phone_number,
          message: 'Phone number verified. Registration required.',
        });
      }

      const token = request.server.jwt.sign(result.payload as any);
      return reply.send({
        access_token: token,
        user: result.user,
      });
    } catch (err: any) {
      if (err.message === 'INVALID_OTP') {
        return reply.status(400).send({ error: 'Invalid OTP', message: 'The OTP code provided is invalid' });
      }
      throw err;
    }
  }

  async register(request: FastifyRequest, reply: FastifyReply) {
    const parseResult = RegisterUserSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({ error: 'Validation Error', details: parseResult.error.format() });
    }

    try {
      const result = await this.authService.register(parseResult.data);
      const token = request.server.jwt.sign(result.payload as any);
      return reply.status(201).send({
        access_token: token,
        user: result.user,
      });
    } catch (err: any) {
      if (err.message === 'USER_ALREADY_EXISTS') {
        return reply.status(409).send({ error: 'Conflict', message: 'User with this phone number already exists' });
      }
      if (err.message === 'SOCIETY_ID_REQUIRED_FOR_WORKER') {
        return reply.status(400).send({ error: 'Bad Request', message: 'Worker registration requires a valid society_id' });
      }
      throw err;
    }
  }

  async me(request: FastifyRequest, reply: FastifyReply) {
    const userPayload = request.user;
    const profile = await this.authService.getUserProfile(userPayload.user_id);
    return reply.send(profile);
  }
}
