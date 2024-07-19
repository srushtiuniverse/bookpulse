const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const book = response.data.docs[0];
    if (book) {
      res.json({
        title: book.title,
        author: book.author_name ? book.author_name[0] : 'Unknown',
        ratings_count: book.ratings_count || 0,
        average_rating: book.average_rating || 0
      });
    } else {
      res.json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));