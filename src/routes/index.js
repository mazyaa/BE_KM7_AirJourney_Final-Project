import { Router } from 'express';
import root from './root.js';
import auth from './auth.js';
import otp from './otp.js';

export default (app) => {
  const router = Router();

  app.use('/api/v1', router);

  auth(router);
  otp(router);
  root(router);
};
