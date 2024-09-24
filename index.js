import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';

const PORT = 5050;
const DB_URL = `mongodb+srv://Nikita:userNikita@cluster0.5808v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();

app.use(express.json());
app.use('/api', router);

async function startApp() {
	try {
		await mongoose.connect(DB_URL);
		app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
	} catch (error) {
		console.log(error);
	}
}

startApp();
