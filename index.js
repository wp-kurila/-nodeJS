import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';

const PORT = 5050;
const DB_URL = `mongodb+srv://Nikita:userNikita@cluster0.5808v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();

app.use(express.json());
app.use('/api', router);;

async function startApp() {
	try {
		await mongoose.connect(DB_URL);
		app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
	} catch (error) {
		console.log(error);
	}
}

startApp();

async function fetchGoogleReviews() {
	const placeId = 'ChIJD_eix-43UDARlqezo_di3hk';
	const apiKey = 'AIzaSyCgduk_6in_hms3d5wXYV8PUYk3qv2uP8s';
	const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;
	// const url1 = `https://mybusiness.googleapis.com/v4/accounts/${apiKey}/locations/${placeId}/reviews`;


	try {
		const response = await fetch(url);
		const data = await response.json();

		console.log(data.result);
		return data.result.reviews;
	} catch (error) {
		console.error('Failed to fetch reviews:', error);
		throw error;
	}
}

fetchGoogleReviews();