import { object, string } from 'yup';

// Common Status payload
const payload = {
  body: object({
    name: string().required('Status name is required'),
  }),
};

// Common status _id params
const statusIdParams = {
  params: object({
    statusId: string().required('statusId is required'),
  }),
};

const statusNameParams = {
  params: object({
    statusName: string().required('statusName is required'),
  }),
};

export const createStatusSchema = object({ ...payload });

export const findStatusByIdSchema = object({ ...statusIdParams });

export const findStatusByNameSchema = object({ ...statusNameParams });

export const updateStatusByIdSchema = object({
  ...payload,
  ...statusIdParams,
});
