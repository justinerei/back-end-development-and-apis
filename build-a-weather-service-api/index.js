
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import weatherRouter from './weather.js';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/info', (req, res) => {
  res.status(200).json({
    name: 'Weather Service API',
    version: '1.0.0',
    endpoints: [
      '/api/weather/:city',
      '/api/greet/:name',
      '/api/data'
    ]
  });
});

app.get('/api/greet/:name', (req, res) => {
  res.status(200).json({
    greeting: `Hello, ${req.params.name}!`
  });
});

app.route('/api/data')
  .get((req, res) => {
    res.status(200).json({
      message: 'Data retrieved successfully'
    });
  })
  .post((req, res) => {
    res.status(201).json({
      message: 'Data created successfully'
    });
  });

app.use('/api/weather', weatherRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
