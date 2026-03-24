const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
   const response = await axios.get('https://real-time-product-search.p.rapidapi.com/search-v2', {
      params: {
        q: query,
        country: 'in',
        language: 'en',
        page: '1',
        limit: '10',
        sort_by: 'BEST_MATCH',
        product_condition: 'ANY',
        return_filters: 'true'
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});