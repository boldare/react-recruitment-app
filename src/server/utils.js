import mongoose from 'mongoose';
import { randomBytes } from 'crypto';
import os from 'os';

export const getId = (value) => {
  if (!value || typeof value === 'string' || value instanceof String) {
    return value;
  }
  if (value._id) {
    return value.id;
  }
  return value.toHexString();
};

export const toMongoId = value => mongoose.Types.ObjectId(value);

export const isValidId = value => mongoose.Types.ObjectId.isValid(value);

export const getIds = values => values.map(value => getId(value));

export const generateToken = (length, format = 'hex') => new Promise((resolve, reject) => {
  randomBytes(length, (err, buffer) => {
    if (err) {
      return reject(err);
    }
    return resolve(buffer.toString(format));
  });
});

export const hexToUrlSafeBase64 = hex => Buffer.from(hex, 'hex').toString('base64')
  .replace(/\//g, '-')
  .replace(/=/g, '_');

export const urlSafeBase64ToHex = (urlSafeBase64) => {
  if (!urlSafeBase64) {
    throw new Error('');
  }
  const base64 = urlSafeBase64
    .replace(/-/g, '/')
    .replace(/_/g, '=');
  return Buffer.from(base64, 'base64').toString('hex');
};

export const localIp = () => Object.values(os.networkInterfaces())
  .reduce((addresses, iface) => addresses.concat(Object.values(iface)), [])
  .filter(iface => iface.family === 'IPv4' && !iface.internal)
  .map(iface => iface.address)[0];
