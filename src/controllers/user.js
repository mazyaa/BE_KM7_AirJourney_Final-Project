import * as userService from '../services/user.js';

export async function createUser(req, res) {
  const { name, email, phoneNumber, password } = req.body;

  const user = await userService.createUser(name, email, phoneNumber, password);

  res.status(201).json({
    message: 'User created successfully',
    data: user
  });
}

export async function getCurrentUser(_req, res) {
  const user = res.locals.user;
  res.status(200).json({
    message: 'User found successfully',
    data: user
  });
}

export async function updateUserById(req, res) {
  const user = res.locals.user;
  const { name, phoneNumber } = req.body;

  const userData = await userService.updateUserById(user.id, {
    name,
    phoneNumber
  });

  res.status(200).json({
    message: 'Update user successfully',
    data: userData
  });
}
