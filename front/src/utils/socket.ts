/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import socketio from 'socket.io-client';

export const socket = socketio('http://localhost:4000');
export const SocketContext = React.createContext(socket);
