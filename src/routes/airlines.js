import { Router } from 'express';
import * as authMiddleware from '../middlewares/auth.js';
import * as commonValidationMiddleware from '../middlewares/validation/common.js';
import * as airlineController from '../controllers/airline.js';
import * as airlineMiddleware from '../middlewares/airline.js';
import * as airlineValidation from '../middlewares/validation/airline.js';

export default (app) => {
  const router = Router();
  app.use('/airlines', router);

  router.post(
    '/',
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    airlineValidation.createAirlineValidation,
    airlineMiddleware.checkAirlineCodeOrNameExist,
    airlineController.createAirline
  );

  router.get('/', airlineController.getAllAirlines);

  router.get(
    '/:id',
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    commonValidationMiddleware.validateIdParams,
    airlineMiddleware.checkAirlineById,
    airlineController.getAirlineById
  );

  router.put(
    '/:id',
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    commonValidationMiddleware.validateIdParams,
    airlineValidation.updateAirlineValidation,
    airlineMiddleware.checkAirlineById,
    airlineMiddleware.checkAirlineCodeOrNameExist,
    airlineController.updateAirline
  );

  router.delete(
    '/:id',
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    commonValidationMiddleware.validateIdParams,
    airlineMiddleware.checkAirlineById,
    airlineController.deleteAirline
  );
};
