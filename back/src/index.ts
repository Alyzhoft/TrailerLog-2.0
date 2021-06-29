import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import { addTrailer, getTrailers, deleteTrailer, updateTrailer } from './controller/trailer';
import { Trailer, TrailerLocation } from '@prisma/client';

const app = express();
const server = http.createServer(app);

// const userRoutes = require('./routes/user');
const trailerRoutes = require('./routes/trailer');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// app.use('/api/user', userRoutes);
app.use('/api/trailer', trailerRoutes);

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
		io.emit('returnTrailerUpdated', { newTrailer: res, trailers });
	});

	Socket.on('deleteTrailer', async (trailer: Trailer) => {
		const res = await deleteTrailer(trailer.id);
		const trailers = await getTrailers();
		//If error send do socket.emit
		io.emit('returnTrailerDeleted', { newTrailer: res, trailers });
	});
});
