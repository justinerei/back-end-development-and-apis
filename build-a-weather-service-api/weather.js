import express from 'express';

const router = express.Router();

const SUPPORTED_CITIES = [
  'London',
  'New York',
  'Tokyo',
  'Manila'
];

router.get('/', (req, res) => {
  res.status(200).json(SUPPORTED_CITIES);
});

router.get('/:city', async (req, res) => {
  const { city } = req.params;

  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({
        error: 'City not found'
      });
    }

    const { latitude, longitude, name } = geoData.results[0];

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
    );

    const weatherData = await weatherResponse.json();

    res.status(200).json({
      city: name,
      temperature: weatherData.current.temperature_2m,
      description: 'Current weather'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch weather data'
    });
  }
});

export default router;