import express, { Request, Response } from 'express';
var cors = require('cors')


const app = express();
app.use(cors())
const port = 3000;

const characters = [
  { id: 1, name: 'Leon S. Kennedy', game: 'Resident Evil 2' },
  { id: 2, name: 'Claire Redfield', game: 'Resident Evil 2' },
];

const games = [
  { id: 1, title: 'Resident Evil', releaseYear: 1996 },
  { id: 2, title: 'Resident Evil 2', releaseYear: 1998 },

];

app.get('/api/characters', (req: Request, res: Response) => {
  res.json(characters);
});

app.get('/api/games', (req: Request, res: Response) => {
  res.json(games);
});

app.get('/api/characters/:id', (req: Request, res: Response) => {
  const character = characters.find(c => c.id === parseInt(req.params.id, 10));
  if (character) {
    res.json(character);
  } else {
    res.status(404).send('Character not found');
  }
});

app.get('/api/games/:id', (req: Request, res: Response) => {
  const game = games.find(g => g.id === parseInt(req.params.id, 10));
  if (game) {
    res.json(game);
  } else {
    res.status(404).send('Game not found');
  }
});

app.listen(port, () => {
  console.log(`Resident Evil API is running at http://localhost:${port}`);
});
