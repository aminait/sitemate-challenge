import mongoose, { Document, Schema } from 'mongoose';

export interface IIssue extends Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const IssueSchema: Schema = new Schema(
  {
    id: { type: Schema.Types.ObjectId },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

IssueSchema.pre('save', function (next) {
  this.id = this._id;
  next();
});

export const IssueModel = mongoose.model<IIssue>('Issue', IssueSchema);
