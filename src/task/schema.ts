import { date, object, string } from 'yup';

import { omit } from 'lodash';
import { yupParseDateStringCommon } from '@/utils/date';

// Common user payload
const bodyPayload = {
  title: string().required('title is required'),
};

// Common task _id params
const taskIdParams = {
  params: object({
    taskId: string().required('taskId is required'),
  }),
};

export const createTaskSchema = object({
  body: object(bodyPayload),
});

export const findTaskByIdSchema = object({ ...taskIdParams });

export const updateTaskSchema = object({
  ...taskIdParams,
  ...{ body: object(bodyPayload) },
});
