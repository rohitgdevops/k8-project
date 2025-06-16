const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/books', (req, res) => {
  res.json([
    { id: 1, title: "Clean Code" },
    { id: 2, title: "The Pragmatic Programmer" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
