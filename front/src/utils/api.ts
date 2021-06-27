import axios from 'axios';

export async function getTrailers() {
	try {
		const res = await axios.get('http://localhost:4000/api/trailer');
		return res.data;
	} catch (e) {
		alert(e);
	}
}
