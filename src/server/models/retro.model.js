import mongoose from 'mongoose';

import { getId, hexToUrlSafeBase64 } from '../utils';
import { conversionOptions } from './utils';

const columnSchema = new mongoose.Schema({
  position: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    required: 'Column name is required'
  },
  icon: {
    type: String,
    enum: ['positive', 'negative', 'action', 'remark'],
    required: 'Icon is required'
  }
});
columnSchema.set('toJSON', conversionOptions);
columnSchema.set('toObject', conversionOptions);

const cardSchema = new mongoose.Schema({
  text: String,
  columnId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column'
  },
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});
cardSchema.set('toJSON', conversionOptions);
cardSchema.set('toObject', conversionOptions);

const retroSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  name: String,
  columns: [columnSchema],
  cards: [cardSchema],
  voteLimit: Number,
  step: {
    type: String,
    default: 'write',
    enum: ['write', 'vote', 'take-actions', 'closed'],
    required: true
  },
  users: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    votes: Number
  }],
  scrumMaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

retroSchema.methods.participates = function participates(user) {
  const userId = getId(user);
  return !!this.users.find(u => getId(u.user) === userId);
};

retroSchema.methods.isScrumMaster = function isScrumMaster(user) {
  const userId = getId(user);
  return getId(this.scrumMaster) === userId;
};

retroSchema.virtual('shareId').get(function getShareId() {
  return hexToUrlSafeBase64(this.id);
});

retroSchema.set('toJSON', conversionOptions);
retroSchema.set('toObject', conversionOptions);

export default mongoose.model('Retro', retroSchema);
