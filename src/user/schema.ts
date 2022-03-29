import { date, object, string } from 'yup';

import { omit } from 'lodash';
import { yupParseDateStringCommon } from '@/utils/date';

// Common user payload
const bodyPayload = {
  username: string().required('username is required'),
  password: string().required('password is required'),
  email: string().required('email is required'),
  name: string().required('name is required'),
  phone: string().required('phone is required'),
  dateOfBirth: date()
    .transform(yupParseDateStringCommon)
    .required('dateOfBirth is required')
    .max(new Date()),
  gender: string().required('gender is required'),
};

// Common user _id params
const userIdParams = {
  params: object({
    userId: string().required('userId is required'),
  }),
};

export const createUserSchema = object({
  body: object(bodyPayload),
});

export const loginSchema = object({
  body: object({
    username: string().required('Username or email is required to login'),
    password: string().required('Password is required to login'),
  }),
});

export const findUserByIdSchema = object({ ...userIdParams });

export const updateUserSchema = object({
  ...userIdParams,
  ...{ body: object(omit(bodyPayload, 'password')) },
});
