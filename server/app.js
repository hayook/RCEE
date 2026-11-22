import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/run', async (req, res) => {
	const { code, lang } = req.body;

	try {
		const response = await fetch('http://localhost:8000/run', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ code, lang }),
		});
		const data = await response.json();
		res.status(response.status).json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Something went wrong."});
	}
});

app.listen(5000, () => console.log('Server Started On Port 5000'));  
