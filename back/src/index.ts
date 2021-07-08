import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import { addTrailer, getTrailers, deleteTrailer, updateTrailer } from './controller/trailer';
import { Requests, Trailer } from '@prisma/client';
import { addRequest, completed, getRequests, inRequest } from './controller/request';

const app = express();
const server = http.createServer(app);

// const userRoutes = require('./routes/user');
const trailerRoutes = require('./routes/trailer');
const carrierRoutes = require('./routes/carrier');
const categoryRoutes = require('./routes/category');
const requestRoutes = require('./routes/request');
const trailerLocationRoutes = require('./routes/trailerLocation');
const spotRputes = require('./routes/spots');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api/trailer', trailerRoutes);
app.use('/api/carrier', carrierRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/trailerLocation', trailerLocationRoutes);
app.use('/api/spot', spotRputes);

server.listen(4000, () => {
	console.log('Working');
});

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (Socket) => {
	Socket.on('addTrailer', async (trailer: Trailer) => {
		const res = await addTrailer(trailer);
		const trailers = await getTrailers();
		//If error send do socket.emit
		io.emit('returnTrailerAdded', { newTrailer: res, trailers });
	});

	Socket.on('updateTrailer', async (trailer: Trailer) => {
		const res = await updateTrailer(trailer);
		const trailers = await getTrailers();
		//If error send do socket.emit

		console.log('Updated');

		io.emit('returnTrailerUpdated', { newTrailer: res, trailers });
	});

	Socket.on('deleteTrailer', async (trailer: Trailer) => {
		const res = await deleteTrailer(trailer.id);
		const trailers = await getTrailers();
		//If error send do socket.emit
		io.emit('returnTrailerDeleted', { newTrailer: res, trailers });
	});

	Socket.on('addRequest', async (request: Requests) => {
		const res = await addRequest(request);
		const requests = await getRequests();

		io.emit('returnRequestAdded', { newRequest: res, requests });
	});

	Socket.on('inRequest', async (request: Requests) => {
		const res = await inRequest(request);
		const requests = await getRequests();

		io.emit('returnInRequest', { newRequest: res, requests });
	});

	Socket.on('complete', async (request: Requests) => {
		const res = await completed(request);
		const requests = await getRequests();
		const trailers = await getTrailers();

		io.emit('returnCompleted', { request: res, requests, trailers });
	});
});
