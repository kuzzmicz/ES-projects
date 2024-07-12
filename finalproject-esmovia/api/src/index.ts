import express, { Request, Response } from 'express';
var cors = require('cors')
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';


const app = express();
app.use(cors())
app.use(bodyParser.json());
const port = 3000;

interface User {
  id: string;
  username: string;
  password: string;
  favorites: number[];
  favorites_games: number[];
  comments: { characterId: number, comment: string }[];
  comments_game: {gameId: number, comment: string}[];
}
const users: User[] = [];

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
  { id: 1, title: 'Resident Evil', releaseYear: 1996, image:  "https://upload.wikimedia.org/wikipedia/en/a/a6/Resident_Evil_1_cover.png", 
    desc: "Resident Evil (バイオハザード, spelled Baiohazādo or simply Bio Hazard in Japan) is a survival horror game developed by Capcom and is the first game in the Resident Evil series. Originally released in 1996 for the PlayStation, it has since been ported to the Sega Saturn and PC. It was then re-released twice on the PlayStation in the form of a Director's Cut. A Game Boy Color version of Resident Evil was planned for release in 1999, but Capcom later canceled it, citing poor quality of the port. Instead, Capcom released a new game in the series for the platform, titled Resident Evil Gaiden. In 2002, a remake of the game was released for the Nintendo GameCube, featuring new graphics, voice acting, and other significant changes. A Nintendo DS port of the original, with added modes and the subtitle Deadly Silence, was released in early 2006."
  },
  { id: 2, title: 'Resident Evil 2', releaseYear: 1998, image: "https://upload.wikimedia.org/wikipedia/en/4/40/NTSC_Resident_Evil_2_Cover.png",
    desc: `Resident Evil 2, known as Biohazard 2 (バイオハザード2 Baiohazādo Tsū?) in Japan, is a survival horror video game that was originally released for the PlayStation in 1998. Developed by Capcom as the second installment in the Resident Evil series, the game's story takes place two months after the events of the first game, Resident Evil, and is set in Raccoon City, a Midwestern American mountain community. The city's residents have been transformed into zombies by the t-Virus, a biological weapon developed by the pharmaceutical company Umbrella. As they escape from the city, the two protagonists, Leon S. Kennedy and Claire Redfield, encounter other survivors and are confronted by William Birkin, the mutated creator of the even more powerful G-virus, a variation of the t-Virus. The gameplay of Resident Evil 2 focuses on exploration, puzzle-solving, and combat and features typical survival horror elements such as limited saves and ammunition. The game's main difference from its predecessor is the "Zapping System," which provides each playable character with unique storylines and obstacles. Developed by a team of 40 to 50 people over the course of one year and nine months, Resident Evil 2 was directed by Hideki Kamiya and produced by Shinji Mikami. The initial version of the game, commonly referred to as BIOHAZARD 1.5, differed drastically from the released product and was scrapped at a development stage of 60-80 percent after being deemed "dull and boring" by the producer. The resulting redesign introduced different settings and a more cinematic story presentation supported by a soundtrack that employs "desperation" as an underlying theme. Resident Evil 2 received critical acclaim, with praise for its atmosphere, setting, graphics, audio, scenarios, and overall gameplay, as well as its improvements over the original game, but with some criticism towards its controls, voice acting, and certain gameplay elements. It has appeared on a number of lists of the best video games ever made. The game has become a million-seller and is the franchise's most successful title on a single platform. Years after its first release, Resident Evil 2 was included in several lists of the 100 best games. Following its initial success on the PlayStation, it was ported to Microsoft Windows, the Nintendo 64, Dreamcast, and Nintendo GameCube and was released as a modified 2.5D version for the Game.com handheld. The story of Resident Evil 2 was retold and built upon in several later games and has been adapted into a variety of licensed works. A remake of the game was released on January 25, 2019.`
  },
  { id: 3, title: 'Resident Evil 3: Nemesis', releaseYear: 1999, image:  "https://upload.wikimedia.org/wikipedia/en/a/a5/Resident_Evil_3_Cover.jpg", 
    desc: `Resident Evil 3: Nemesis, known in Japan as Biohazard 3: Last Escape (バイオハザード3　ラストエスケープ Baiohazādo Surī Rasuto Esukēpu?), is a survival horror video game and the third installment in the Resident Evil series developed and published by Capcom. The game was initially released for the Sony PlayStation and was subsequently ported to the Dreamcast, Microsoft Windows, and Nintendo GameCube. It is also available for download on the PlayStation Network for use with both the PlayStation 3 and the PlayStation Portable. The game's storyline is divided into two parts: the first half takes place 24 hours before the events of Resident Evil 2, while the second half occurs two days after. Through this, the game expands upon the settings and events of the t-Virus outbreak in Raccoon City and provides a conclusion to the fate of the city and its infected population. The game's storyline served as the inspiration for the 2004 film Resident Evil: Apocalypse.`
  },
  { id: 4, title: 'Resident Evil Survivor', releaseYear: 2000, image: "https://upload.wikimedia.org/wikipedia/en/e/e3/RE_Survivor_front.jpg", 
    desc: `Resident Evil Survivor, known in Japan as Biohazard Gun Survivor (バイオハザード ガンサバイバー Baiohazādo Gan Sabaibā?) and initially known as BIOHAZARD GUN SURVIVOR behind the mask (バイオハザードガンサバイバー マスクの後ろに?, Baiohazādo Gan Sabaibā masuku no ushironi) was the first Biohazard game designed to be used with the PlayStation light-gun peripheral "GunCon45". The game is a major departure from the original series, deviating from the fixed camera angles of the previous games to a first-person view. The Japanese and PAL versions of the game allowed the use of the Namco GunCon, a light gun that gave the game a more arcade feel. It was decided by Capcom U.S.A. that the American version would not allow the use of the GunCon, due to the then-recent Columbine High School massacre. The game is set in the isolated city of Sheena Island around November 1998. It was re-released in March 2001 in Japan as part of the Capcom Collection (Japanese: "Kapukore"). The game was also released for PC in Taiwan in 2002. This version allowed mouse-aiming and had graphic-filtering, although it is also known for being buggy suffering from flat lighting, messed up sounds, low-quality FMV cut-scenes compared to PS1, some enemies have messed up animations are lacking general AI scripts. This version does not use real fonts, instead, it uses images with texts and alpha transparency possibly due to the use of Chinese letters. It is also problematic in terms of installing and playing on modern systems.`
  },
  { id: 5, title: 'Resident Evil – Code: Veronica', releaseYear: 2000, image:  "https://upload.wikimedia.org/wikipedia/en/4/44/RECV_boxart.jpg", 
    desc: `Resident Evil CODE:Veronica (BIOHAZARD CODE:Veronica in Japan) is a survival horror game that was originally released in 2000. Instead of being developed by Capcom, the game was outsourced and created by Nextech and Tose as a replacement for a Saturn port of Resident Evil 2, which Capcom and Nextech believed would be subpar. Originally intended as a Dreamcast-exclusive title, Sega's departure from the console industry led to a modified port of the game being released for the Dreamcast, GameCube, and PlayStation 2 the following year, titled Resident Evil CODE:Veronica X, known in Japan as BIOHAZARD CODE:Veronica 完全版 (Kanzenban, lit. "Perfect Complete Edition"). An HD remaster was released for PlayStation 3 and Xbox 360, and the PlayStation 2 version was made available as a "PS2 Classic" on PlayStation 4. Thanks to backward compatibility, the HD Xbox 360 version can be played on Xbox One and Xbox Series X/S, while the PlayStation 5 runs the emulated version from PS4. The HD remaster is also accessible through PlayStation Now. The game is set on 27–28 December 1998, three months after the events of Resident Evil 2 and Resident Evil 3: Nemesis. It is the first Resident Evil game released for a sixth-generation console and features full polygonal environments instead of the static, pre-rendered backgrounds that were characteristic of the previous installments .`
  },
  
  { id: 6, title: 'Resident Evil Survivor 2 – Code: Veronica', releaseYear: 2001, image: "https://upload.wikimedia.org/wikipedia/en/c/ca/RESurvivor2CV.jpg", 
    desc: `Resident Evil Survivor 2 CODE:Veronica (GUN SURVIVOR 2 BIOHAZARD CODE:Veronica in Japan) is a first-person shooter game by Capcom developed in conjunction with Namco exclusive to PAL regions and Japan. The game has no bearing on the Resident Evil plot, although it does feature characters, enemies, and bosses from Resident Evil CODE:Veronica. The game also features a Nemesis-T Type, which appears on the map to chase you if you run out of time.`
  },
  { id: 7, title: 'Resident Evil Gaiden', releaseYear: 2001, image:  "https://upload.wikimedia.org/wikipedia/en/d/dd/Resident_Evil_Gaiden_Boxart.gif", 
    desc: `Resident Evil Gaiden (バイオハザード外伝 Baiohazado Gaiden?) is a Resident Evil game for the Game Boy Color first released on December 14, 2001. While the technical implementation of the title was done by the now defunct British company M4 Limited, two employees of Capcom were involved with the development as well. Shinji Mikami served as an adviser for the game and the story was created by Hiroki Katō, the director of Resident Evil CODE:Veronica.[1] This game is non-canon, as its plot is contradicted by the main series in key parts, and its events are ignored.
`
  },
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

app.post('/api/games/:id/comment', (req: Request, res: Response) => {
  const { userId, comment } = req.body;
  const gameId = parseInt(req.params.id, 10);
  const user = users.find(user => user.id === userId);
  if (user) {
    user.comments_game.push({ gameId, comment });
    res.status(201).json({ message: 'Comment added successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.get('/api/games/:id/comments', (req: Request, res: Response) => {
  const gameId = parseInt(req.params.id, 10);
  const comments = users.flatMap(user => user.comments_game.filter(comment => comment.gameId === gameId));
  res.json(comments);
});


app.post('/api/register', (req: Request, res: Response) => {
  const { username, password } = req.body;
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  const newUser: User = { id: uuidv4(), username, password, favorites: [], favorites_games: [], comments: [], comments_game:[]};
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  console.log("Login request received:", { username, password });

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
      console.log("User found:", user);
      res.json({ message: 'Login successful', userId: user.id });
  } else {
      console.log("Invalid login attempt:", { username, password });
      res.status(400).json({ message: 'Invalid username or password' });
  }
});
app.post('/api/characters/:id/comment', (req: Request, res: Response) => {
  const { userId, comment } = req.body;
  const characterId = parseInt(req.params.id, 10);
  const user = users.find(user => user.id === userId);
  if (user) {
    user.comments.push({ characterId, comment });
    res.status(201).json({ message: 'Comment added successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.get('/api/characters/:id/comments', (req: Request, res: Response) => {
  const characterId = parseInt(req.params.id, 10);
  const comments = users.flatMap(user => user.comments.filter(comment => comment.characterId === characterId));
  res.json(comments);
});

app.post('/api/users/:userId/favorites', (req: Request, res: Response) => {
  const { userId } = req.params;
  const { characterId } = req.body;
  console.log(userId);
  const user = users.find(user => user.id === userId);
  if (user) {
    if (!user.favorites.includes(characterId)) {
      user.favorites.push(characterId);
      res.status(201).json({ message: 'Character added to favorites' });
    } else {
      res.status(400).json({ message: 'Character is already in favorites' });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
app.get('/api/users/:userId/favorites', (req: Request, res: Response) => {
  const user = users.find(user => user.id === req.params.userId);
  if (user) {
    const favorites = characters.filter(character => user.favorites.includes(character.id));
    res.json(favorites);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.post('/api/users/:userId/favoritesgames', (req: Request, res: Response) => {
  const { gameId } = req.body;
  const user = users.find(user => user.id === req.params.userId);
  if (user) {
    if (!user.favorites_games.includes(gameId)) {
      user.favorites_games.push(gameId);
      res.status(201).json({ message: 'Game added to favorites' });
    } else {
      res.status(400).json({ message: 'Game already in favorites' });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.get('/api/users/:userId/favoritesgames', (req: Request, res: Response) => {
  const user = users.find(user => user.id === req.params.userId);
  if (user) {
    const favoriteGames = games.filter(game => user.favorites_games.includes(game.id));
    res.json(favoriteGames);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Resident Evil API is running at http://localhost:${port}`);
});
