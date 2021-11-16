import axios from 'axios';
import { env } from 'process';
// import { env } from 'process';

export async function getTrailers() {
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}trailer`);
		return res.data;
	} catch (e) {
		alert(e);
	}
}

export async function getCarriers() {
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}carrier`);
		return res.data;
	} catch (e) {
		alert(e);
	}
}

export async function getCategories() {
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}category`);
		return res.data;
	} catch (e) {
		alert(e);
	}
}

export async function getRequests() {
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}request`);
		return res.data;
	} catch (e) {
		alert(e);
	}
}

export async function getTrailerLocations() {
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}trailerLocation`);
		return res.data;
	} catch (e) {
		alert(e);
	}
}

export async function getAvalibleTrailerLocations() {
	try {
		const res = await axios.get(
			`${process.env.REACT_APP_API_URL}trailerLocation/avalibleLocations`,
		);
		return res.data;
	} catch (e) {
		alert(e);
	}
}
