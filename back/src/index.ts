import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import { addTrailer, getTrailers } from './controller/trailer';

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
	Socket.on('addTrailer', async (trailer: trailer) => {
		const res = await addTrailer(trailer);
		const trailers = await getTrailers();
		Socket.emit('returnTrailerAdded', { newTrailer: res, trailers });
	});
});
