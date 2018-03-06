import io from 'socket.io-client';
import { userConnect, userDisconnect } from '../../actions/user';

const API_URL = process.env.REACT_APP_API_HOST ? `http://${process.env.REACT_APP_API_HOST}` : `http://${window.location.hostname}:5000`;

export const connectToSocket = token => (dispatch) => {
  const socket = io(API_URL);
  socket.on('connect', () => {
    dispatch(userConnect(socket, token));
  });
  socket.on('disconnect', () => {
    dispatch(userDisconnect());
  });
  return socket;
};
