import { HttpError } from '../utils/error.js';
import * as airportService from '../services/airport.js';

export async function checkAirportCodeOrNameExist(req, res, next) {
  const { name, code } = req.body;
  const currentAirport = res.locals.airport;

  const skipUniqueCheck =
    currentAirport?.name === name && currentAirport?.code === code;

  if (!skipUniqueCheck) {
    const airport = await airportService.getAirportByNameOrCode(name, code);

    if (airport) {
      throw new HttpError(
        'Airport with the same name and code already exists',
        409
      );
    }
  }

  next();
}

export async function checkAirportIdExist(req, res, next) {
  const { id } = req.params;

  const airport = await airportService.getAirportById(id);

  if (!airport) {
    throw new HttpError('Airport not found', 404);
  }

  res.locals.airport = airport;

  next();
}
