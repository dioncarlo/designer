const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
   res.send('Welcome to the Online Design Tool');
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
