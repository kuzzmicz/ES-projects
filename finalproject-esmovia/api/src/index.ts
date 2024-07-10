import express, { Request, Response } from 'express';
var cors = require('cors')


const app = express();
app.use(cors())
const port = 3000;

const characters = [
  { id: 1, name: 'Leon S. Kennedy', game: 'Resident Evil 2', image: 'https://i.pinimg.com/736x/29/a1/83/29a1831a380662b25cfc373ab44a596c.jpg', gender: "male" },
  { id: 2, name: 'Claire Redfield', game: 'Resident Evil 2', image:  'https://i.pinimg.com/736x/86/a0/d0/86a0d074294241e259e01a4839ab9bc4.jpg', gender: "female"},
  { id: 3, name: 'Chris Redfield', game: 'Resident Evil', image:  'https://i.pinimg.com/550x/cc/08/28/cc0828db45b3eab088a97c7f8710c97a.jpg', gender: "male"},
  { id: 4, name: 'Jill Valentine', game: 'Resident Evil', image:  'https://i.pinimg.com/736x/01/39/c2/0139c21440cfe0e5f82d1dbe911cba96.jpg', gender: "female"},
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
