import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { TaskDocument } from './document';

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Status',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Initialise mongoose paginate
TaskSchema.plugin(mongoosePaginate);

export default mongoose.model(
  'Task',
  TaskSchema
) as mongoose.PaginateModel<TaskDocument>;
