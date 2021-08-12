/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from 'http';
import React from 'react';
import socketio from 'socket.io-client';
//import { Server } from "socket.io";



// const socketio = new Server(server, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"],
//     },
//   });

// const io = new Server(Server, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"],
//     },
//   });
  

export const socket = socketio('http://localhost:4000');
export const SocketContext = React.createContext(socket);
