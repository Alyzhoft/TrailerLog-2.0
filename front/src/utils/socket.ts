import React from 'react';
import socketio from 'socket.io-client';

export const socket = socketio('https://trailermanagementbe-stage.azurewebsites.net');
export const SocketContext = React.createContext(socket);
