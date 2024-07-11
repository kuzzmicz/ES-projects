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
  { id: 5, name: 'Albert Wisker', game: 'Resident Evil', image:  'https://i.pinimg.com/736x/2e/48/19/2e48199a01edefb3581995787b761d24.jpg', gender: "male"},
  { id: 6, name: 'Rebecca Chambers', game: 'Resident Evil', image:  'https://i.pinimg.com/736x/74/18/2a/74182a32db584ab97807cb8c69769406.jpg', gender: "female"},
  { id: 7, name: 'Billy Coen', game: 'Resident Evil 0', image:  'https://i.pinimg.com/736x/33/e0/b4/33e0b4fab03a954b01062e232490dd56.jpg', gender: "male"},
  { id: 8, name: 'Barry Burton', game: 'Resident Evil', image:  'https://i.pinimg.com/474x/2b/fc/18/2bfc1853e52b1e8da0211421b9dc8b00.jpg', gender: "male"},
  { id: 9, name: 'Ada Wong', game: 'Resident Evil 2', image: 'https://i.pinimg.com/736x/1b/77/fa/1b77fa3601bb8b7c4efa5950e0cf62ad.jpg', gender: "female" },
  { id: 10, name: 'Sherry Birkin', game: 'Resident Evil 2', image:  'https://i.pinimg.com/736x/ed/fc/c6/edfcc65afdff60c00d510a583604b3aa.jpg', gender: "female"},
  { id: 11, name: 'HANK', game: 'Resident Evil 2', image:  'https://preview.redd.it/about-hunk-v0-hiha0zkpinhb1.jpg?auto=webp&s=48b80baa6064f266af173b08d6ab2cfe0927cba6', gender: "male"},
  { id: 12, name: 'Carlos Oliveira', game: 'Resident Evil 3:Nemesis', image:  'https://i.pinimg.com/736x/35/27/4d/35274dbf61427ba64c76488189e74fdf.jpg', gender: "male"},
  { id: 13, name: 'Nikolai Zinoviev', game: 'Resident Evil 3:Nemesis', image:  'https://i.pinimg.com/736x/73/95/cd/7395cd85a0dae265d0543166871ae87a.jpg', gender: "male"},
  { id: 14, name: 'Steve Burnside', game: 'Resident Evil CODE:Veronica', image:  'https://residentevilpodcast.com/wp-content/uploads/2021/08/steveburnside.jpg', gender: "male"},
  { id: 15, name: 'Ashley Graham', game: 'Resident Evil 4', image:  'https://i.pinimg.com/originals/be/9b/6a/be9b6aa3064ee54c1af4a45515ab8ba0.jpg', gender: "female"},
  { id: 16, name: 'Ingrid Hunnigan', game: 'Resident Evil 4', image:  'https://i.pinimg.com/564x/e8/44/d8/e844d8b64bacce82224590786c3692d9.jpg', gender: "female"},
  { id: 17, name: 'Jack Krauser', game: 'Resident Evil 4', image:  'https://pbs.twimg.com/media/FV4RjBOWQAYWUcV.jpg', gender: "male"},
  { id: 18, name: 'Jessica Sherawat', game: 'Resident Evil Revelations', image:  'https://i.pinimg.com/736x/de/05/c4/de05c47e72a150262c0c07b3b9ebb064.jpg', gender: "female"},
  { id: 19, name: 'Sheva Alomar', game: 'Resident Evil 5', image:  'https://i.pinimg.com/474x/8d/ee/e5/8deee5dddfacab21e40f43a8d0f56926.jpg', gender: "female"},
  { id: 20, name: 'Moira Burton', game: 'Resident Evil Revelations 2', image:  'https://i.pinimg.com/originals/79/8a/62/798a628fa1cc59a187856a8157a11894.png', gender: "female"},
  { id: 21, name: 'Natalia Korda', game: 'Resident Evil Revelations 2', image:  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUpYJVzE8Kw9jo13as-1lKXtJra7APIuNf3f1dwpmQTFxmfyJkXJI_6oZXq5f9XlAHc_4&usqp=CAU', gender: "female"},
  { id: 22, name: 'Alex Wesker', game: 'Resident Evil Revelations 2', image:  'https://i.pinimg.com/originals/f5/5d/0e/f55d0e1fafdc96fc1ffd08e74169360a.jpg', gender: "female"},
  { id: 23, name: 'Jake Muller', game: 'Resident Evil 6', image:  'https://i.pinimg.com/564x/24/67/5d/24675db2375d3f0950e1a35757211f46.jpg', gender: "male"},
];

const games = [
  { id: 1, title: 'Resident Evil', releaseYear: 1996, image:  "https://upload.wikimedia.org/wikipedia/en/a/a6/Resident_Evil_1_cover.png"},
  { id: 2, title: 'Resident Evil 2', releaseYear: 1998, image: "https://upload.wikimedia.org/wikipedia/en/4/40/NTSC_Resident_Evil_2_Cover.png"},
  { id: 3, title: 'Resident Evil 3: Nemesis', releaseYear: 1999, image:  "https://upload.wikimedia.org/wikipedia/en/a/a5/Resident_Evil_3_Cover.jpg"},
  { id: 4, title: 'Resident Evil Survivor', releaseYear: 2000, image: "https://upload.wikimedia.org/wikipedia/en/e/e3/RE_Survivor_front.jpg"},
  { id: 5, title: 'Resident Evil – Code: Veronica', releaseYear: 2000, image:  "https://upload.wikimedia.org/wikipedia/en/4/44/RECV_boxart.jpg"},
  { id: 6, title: 'Resident Evil Survivor 2 – Code: Veronica', releaseYear: 2001, image: "https://upload.wikimedia.org/wikipedia/en/c/ca/RESurvivor2CV.jpg"},
  { id: 7, title: 'Resident Evil Gaiden', releaseYear: 2001, image:  "https://upload.wikimedia.org/wikipedia/en/d/dd/Resident_Evil_Gaiden_Boxart.gif"},
  { id: 8, title: 'Resident Evil', releaseYear: 2002, image: "https://upload.wikimedia.org/wikipedia/en/a/ab/Resident_Evil_2002_cover.jpg"},
  { id: 9, title: 'Resident Evil Zero', releaseYear: 2002, image:  "https://upload.wikimedia.org/wikipedia/en/c/c6/Rezerobox.jpg"},
  { id: 10, title: 'Resident Evil: Dead Aim', releaseYear: 2003, image: "https://upload.wikimedia.org/wikipedia/en/a/a5/Residentevildeadaim.jpg"},
  { id: 11, title: 'Resident Evil Outbreak', releaseYear: 2003, image:  "https://upload.wikimedia.org/wikipedia/en/a/ad/Re_outbreak_a.jpg"},
  { id: 12, title: 'Resident Evil Outbreak: File #2', releaseYear: 2004, image: "https://upload.wikimedia.org/wikipedia/en/9/9c/Resident_Evil_Outbreak_File_2.jpg"},
  { id: 13, title: 'Resident Evil 4', releaseYear: 2005, image:  "https://upload.wikimedia.org/wikipedia/en/d/d9/Resi4-gc-cover.jpg"},
  { id: 14, title: 'Resident Evil: Deadly Silence', releaseYear: 2006, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTr6skNghFbFIEoZU6frn1sUeQxO1MoIxFbwjk5p9JKaqR8_1qnI_Sx1NtjdpWzQb-sTwyvytEmVTz1Grbbn_3u2QSghZxP0HTLLSnLik4"},
  { id: 15, title: 'Resident Evil: The Umbrella Chronicles', releaseYear: 2007, image:  "https://upload.wikimedia.org/wikipedia/en/d/d8/Resident_evil_the_umbrella_chronicles_uscover.jpg"},
  { id: 16, title: 'Resident Evil 5', releaseYear: 2009, image: "https://upload.wikimedia.org/wikipedia/en/5/58/Resident_Evil_5_Box_Artwork.jpg"},
  { id: 17, title: 'Resident Evil: The Darkside Chronicles', releaseYear: 2009, image:  "https://upload.wikimedia.org/wikipedia/en/9/91/REDC_Cover.jpg"},
  { id: 18, title: 'Resident Evil: The Mercenaries 3D', releaseYear: 2011, image: "https://upload.wikimedia.org/wikipedia/en/4/40/The_Mercenaries_3D.jpg"},
  { id: 19, title: 'Resident Evil: Revelations', releaseYear: 2012, image:  "https://upload.wikimedia.org/wikipedia/en/f/f9/Resident_evil_rev._2012_Capcom.png"},
  { id: 20, title: 'Resident Evil: Operation Raccoon City', releaseYear: 2012, image: "https://upload.wikimedia.org/wikipedia/en/5/52/OperationRaccoonCity.jpg"},
  { id: 21, title: 'Resident Evil 6', releaseYear: 2012, image:  "https://upload.wikimedia.org/wikipedia/en/1/11/Resident_Evil_6_box_artwork.png"},
  { id: 22, title: 'Resident Evil: Revelations 2', releaseYear: 2015, image: "https://upload.wikimedia.org/wikipedia/en/7/74/ResidentEvilRevelations2.jpg"},
  { id: 23, title: 'Umbrella Corps', releaseYear: 2016, image:  "https://upload.wikimedia.org/wikipedia/en/1/1b/Umbrella_Corps_cover_art.jpg"},
  { id: 24, title: 'Resident Evil 7: Biohazard', releaseYear: 2017, image: "https://upload.wikimedia.org/wikipedia/en/f/fd/Resident_Evil_7_cover_art.jpg"},
  { id: 25, title: 'Resident Evil 2', releaseYear: 2019, image:  "https://upload.wikimedia.org/wikipedia/en/f/fd/Resident_Evil_2_Remake.jpg"},
  { id: 26, title: 'Resident Evil 3', releaseYear: 2020, image: "https://upload.wikimedia.org/wikipedia/en/d/dc/Resident_Evil_3.jpg"},
  { id: 27, title: 'Resident Evil: Resistance', releaseYear: 2020, image:  "https://upload.wikimedia.org/wikipedia/en/0/00/Resident_Evil_Resistance.jpg"},
  { id: 28, title: 'Resident Evil Village', releaseYear: 2021, image: "https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png"},
  { id: 29, title: 'Resident Evil Re:Verse', releaseYear: 2022, image:  "https://m.media-amazon.com/images/M/MV5BM2E3NmVjOTctZDJmMC00ZjViLTgzOTMtM2Q4MWFmZTlhMGRiXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_.jpg"},
  { id: 30, title: 'Resident Evil 4', releaseYear: 2023, image: "https://upload.wikimedia.org/wikipedia/en/d/df/Resident_Evil_4_remake_cover_art.jpg"},
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
