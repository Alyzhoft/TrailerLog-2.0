import axios from 'axios';

export async function getTrailers() {
	try {
		const res = await axios.get('http://localhost:4000/api/trailer');
		return res.data;
	} catch (e) {
		alert(e);
	}
}

export async function getCarriers() {
	try {
		const res = await axios.get('http://localhost:4000/api/carrier');
		return res.data;
	} catch (e) {
		alert(e);
	}
}

export async function getCategories() {
	try {
		const res = await axios.get('http://localhost:4000/api/category');
		return res.data;
	} catch (e) {
		alert(e);
	}
}

export async function getRequests() {
	try {
		const res = await axios.get('http://localhost:4000/api/request');
		return res.data;
	} catch (e) {
		alert(e);
	}
}

export async function getTrailerLocations() {
	try {
		const res = await axios.get('http://localhost:4000/api/trailerLocation');
		return res.data;
	} catch (e) {
		alert(e);
	}
}
