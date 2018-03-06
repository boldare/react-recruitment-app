/* eslint-disable no-param-reassign */

export const conversionOptions = {
  virtuals: true,
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
};
