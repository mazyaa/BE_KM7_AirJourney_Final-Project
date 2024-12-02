import * as airlineServices from '../services/airline.js';
import { HttpError } from '../utils/error.js';

export async function checkAirlineNameExist(req, res, next) {
  const { name } = req.body;

  const airline = await airlineServices.getAirlineByName(name);

  if (airline) {
    throw new HttpError('Airline with the same name already exists!', 400);
  }

  next();
}

export async function checkAirlineById(req, res, next) {
  const { id } = req.params;

  const airline = await airlineServices.getAirlineById(id);

  if (!airline) {
    throw new HttpError('Airline data not found!', 404);
  }

  next();
}
