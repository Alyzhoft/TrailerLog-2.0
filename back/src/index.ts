import express from 'express';
import cors from 'cors';

// const userRoutes = require('./routes/user');
const trailerRoutes = require('./routes/trailer');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// app.use('/api/user', userRoutes);
app.use('/api/trailer', trailerRoutes);

app.listen(4000, () => {
	console.log('Working');
});
