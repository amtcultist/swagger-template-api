import { object, string } from 'yup';

// Common Gender payload
const payload = {
  body: object({
    name: string().required('name is required'),
  }),
};

// Common gender _id params
const genderIdParams = {
  params: object({
    genderId: string().required('genderId is required'),
  }),
};

const genderNameParams = {
  params: object({
    genderName: string().required('genderName is required'),
  }),
};

export const createGenderSchema = object({ ...payload });

export const findGenderByIdSchema = object({ ...genderIdParams });

export const findGenderByNameSchema = object({ ...genderNameParams });

export const updateGenderByIdSchema = object({
  ...payload,
  ...genderIdParams,
});
