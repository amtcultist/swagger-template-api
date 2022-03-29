import { object, string } from 'yup';

/* Payload of Session */
const payload = {
  body: object({
    token: string().required('token is required'),
  }),
};

export const tokenDecoderSchema = object({ ...payload });
