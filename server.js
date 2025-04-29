import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Update path to look for dist in the correct location
// If dist is at the project root level:
app.use(express.static(join(__dirname, './dist')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, './dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving files from: ${join(__dirname, './dist')}`);
});
