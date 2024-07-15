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
  comments: { characterId: number, comment: string, username:string }[];
  comments_game: {gameId: number, comment: string, username:string}[];
  favoriteRatings: { characterId: number, rating: number }[];
  favoriteGameRatings: { gameId: number, rating: number }[];
}
const users: User[] = [];

const characters = [
  { id: 1, name: 'Leon S. Kennedy', game: 'Resident Evil 2', image: 'https://i.pinimg.com/736x/29/a1/83/29a1831a380662b25cfc373ab44a596c.jpg', gender: "male",
    desc: "Leon Scott Kennedy, more commonly known as Leon S. Kennedy is an American of Italian descent currently employed as a federal agent by the Division of Security Operations (D.S.O.), a counter-terrorism agency under direct Presidential command. Kennedy is a known survivor of the 1998 Raccoon City Destruction Incident, at the time a police officer. Following his escape, he was forcefully recruited into a top secret anti-Umbrella team under USSTRATCOM devoted to anti-B.O.W. combat, serving it until 2011 in repeated operations around the world.",
    status: "Alive", 
    rating: 0
  },
  { id: 2, name: 'Claire Redfield', game: 'Resident Evil 2', image:  'https://i.pinimg.com/736x/86/a0/d0/86a0d074294241e259e01a4839ab9bc4.jpg', gender: "female",
    desc: "Claire Redfield (クレア・レッドフィールド Kurea Reddofīrudo) is a current member of the human rights organization, TerraSave. She is the younger sister of BSAA operative and former S.T.A.R.S. member Chris Redfield. Since her survival in the Raccoon City incident in 1998, Claire would become involved or end up in the midst of several Biohazard outbreaks around the world, prompting her, as well as Chris, to devote her career to combating the threat of Bio Organic Weapons.", 
    status: "Alive", 
    rating: 0
  },
  { id: 3, name: 'Chris Redfield', game: 'Resident Evil', image:  'https://i.pinimg.com/550x/cc/08/28/cc0828db45b3eab088a97c7f8710c97a.jpg', gender: "male", 
    desc: "Captain Chris Redfield (クリス・レッドフィールド Kurisu Reddofīrudo) is an American Special Operations Unit operator in the Bioterrorism Security Assessment Alliance, in which he has served since its foundation in 2003. Redfield has built up and dedicated his career in destroying Bio Organic Weapons and fighting against producers and sellers of bioweapons after his experiences with bioterrorism in 1998. He is the older brother of TerraSave member Claire Redfield. He is also the mentor of American superhuman Rosemary Winters.", 
    status: "Alive", 
    rating: 0
  },
  { id: 4, name: 'Jill Valentine', game: 'Resident Evil', image:  'https://i.pinimg.com/736x/01/39/c2/0139c21440cfe0e5f82d1dbe911cba96.jpg', gender: "female", 
    desc: "Jill Valentine (ジル・バレンタイン Jiru Barentain) is an American Special Operations Agent (SOA) of the Bioterrorism Security Assessment Alliance, of which she is a co-founder and an original member. She is a respected high-ranking operator, owing to her commitment in eradicating bioterrorism and her survival amid to the Biohazardous outbreaks in Arklay County in 1998.", 
    status: "Alive", 
    rating: 0
  },
  { id: 5, name: 'Albert Wisker', game: 'Resident Evil', image:  'https://i.pinimg.com/736x/2e/48/19/2e48199a01edefb3581995787b761d24.jpg', gender: "male", 
    desc: `Dr. Albert Wesker (アルバート・ウェスカー) (c.1960-2009) was an accomplished virologist notorious for his work with groups affiliated with the bio-weapons black market. Originally one of the test subjects in Project W who specialized in biotechnology and bioengineering, Wesker was an elite perfectionist individual of absolute coldness, always wearing deep-black sunglasses that gave him an even more unapproachable air. As a senior researcher linked to the t-Virus Project as early as 1978, he bore witness to, and at times shaped, Umbrella's B.O.W. research. He officially left the company soon after a stall in the Tyrant Project and began work as a spy, leading to a career in the United States Army and eventually with S.T.A.R.S. as its Captain.

Wesker ultimately chose to betray Umbrella and work with other groups to steal its research data, benefiting from a mutation brought on by a prototype virus that gave him superhuman powers. This made him, in his self-assertion, believe that he was chosen to achieve the ultimate goal of causing the mass extinction of humanity in favor of evolution. He was killed in March 2009 during a BSAA operation which uncovered his role in a doomsday project dubbed Uroboros.`, 
    status: "Deceased", 
    rating: 0
  },
  { id: 6, name: 'Rebecca Chambers', game: 'Resident Evil', image:  'https://i.pinimg.com/736x/74/18/2a/74182a32db584ab97807cb8c69769406.jpg', gender: "female", 
    desc: `Dr. Rebecca Chambers (レベッカ・チェンバース Rebekka Chembāsu) is an advisor for the Bioterrorism Security Assessment Alliance and a former rookie member of the Special Tactics and Rescue Service assigned to S.T.A.R.S. Bravo team, being charge of medical needs due to her extensive knowledge in biochemistry.`, 
    status: "Alive", 
    rating: 0
  },
  { id: 7, name: 'Billy Coen', game: 'Resident Evil 0', image:  'https://i.pinimg.com/736x/33/e0/b4/33e0b4fab03a954b01062e232490dd56.jpg', gender: "male", 
    desc: `Billy Coen (ビリー・コーエン Birī Kōen) was a U.S. Marine Corps Second Lieutenant-turned death-row inmate that escaped into the Arklay Mountains after the military transport vehicle escorting him was forced off the road by a pack of Cerberus. He took refuge in the nearby Ecliptic Express where he would later meet Rebecca Chambers, who had arrived with S.T.A.R.S. to investigate reports of murders in the vicinity.`, 
    status: "Unkown", 
    rating: 0
  },
  { id: 8, name: 'Barry Burton', game: 'Resident Evil', image:  'https://i.pinimg.com/474x/2b/fc/18/2bfc1853e52b1e8da0211421b9dc8b00.jpg', gender: "male", 
    desc: `Barry Burton (バリー・バートン Barī Bāton) is a consultant and combat specialist for the Bioterrorism Security Assessment Alliance. Formerly, he was a member of the Special Tactics and Rescue Service and the backup man for the S.T.A.R.S. Alpha team, being in charge of maintaining and supplying weapons for his fellow unit members.`, 
    status: "Alive", 
    rating: 0
  },
  { id: 9, name: 'Ada Wong', game: 'Resident Evil 2', image: 'https://i.pinimg.com/736x/1b/77/fa/1b77fa3601bb8b7c4efa5950e0cf62ad.jpg', gender: "female", 
    desc: `Ada Wong (エイダ・ウォン Eida Won) is the pseudonym of an enigmatic unnamed spy of Asian-American descent. She has gained notoriety in the corporate world for being able to handle serious situations and the most difficult requests without guilt.
Wong has acted secretly in the background of many biohazard incidents and collected information which became useful to several organisations, while at the same time operating to undermine them. However, Wong follows only her own "true purpose" and has often betrayed the organisations and customers she is affiliated with to achieve it.`, 
status: "Alive", 
rating: 0},
  { id: 10, name: 'Sherry Birkin', game: 'Resident Evil 2', image:  'https://i.pinimg.com/736x/ed/fc/c6/edfcc65afdff60c00d510a583604b3aa.jpg', gender: "female", 
    desc: `Sherry Birkin (シェリー・バーキン Sherī Bākin) is an American federal agent attached to the Division of Security Operations. As a child, she was placed in protective custody after her parents' deaths during the Raccoon City Destruction Incident. During the outbreak, Sherry was infected with the G-Virus but was treated with the vaccine soon after. Because of her exposure to the virus, Sherry gained lifelong regenerative abilities.
Years later, her G-Virus laced blood would be used by bio-terrorist and Neo-Umbrella leader Carla Radames to engineer the C-Virus and its enhanced strain. It was primarily used during the 2012-2013 Global Bioterrorist Attacks.`, 
 status: "Alive", 
 rating: 0
  },
  { id: 11, name: 'HUNK', game: 'Resident Evil 2', image:  'https://preview.redd.it/about-hunk-v0-hiha0zkpinhb1.jpg?auto=webp&s=48b80baa6064f266af173b08d6ab2cfe0927cba6', gender: "male", 
    desc: `"HUNK" (ハンク Hanku) is the code-name of an Umbrella Security Service operator, who was the leader of the ill-fated Alpha Team in the employment of Umbrella. Cold, silent, and devoid of emotion, he is ruthless. He and the U.B.C.S. Sergeant, Nikolai Zinoviev, were considered to be "rivals".`, 
    status: "Alive", 
    rating: 0
  },
  { id: 12, name: 'Carlos Oliveira', game: 'Resident Evil 3:Nemesis', image:  'https://i.pinimg.com/736x/35/27/4d/35274dbf61427ba64c76488189e74fdf.jpg', gender: "male", 
    desc: `Carlos Oliveira (カルロス・オリヴェイラ Karurosu Oriveira) was a mercenary for the Umbrella Biohazard Countermeasure Service (U.B.C.S.). He held the rank of Corporal, and served in their Delta Platoon as rear security for Alpha Squad, where he was also their heavy weapons specialist. Oliveira is also one of the few survivors of the deployed squads who served during Raccoon City Destruction Incident.`, 
    status: "Alive", 
    rating: 0
  },
  { id: 13, name: 'Nikolai Zinoviev', game: 'Resident Evil 3:Nemesis', image:  'https://i.pinimg.com/736x/73/95/cd/7395cd85a0dae265d0543166871ae87a.jpg', gender: "male", 
    desc: `Nikolai Zinoviev (ニコライ・ジノビェフ Nikorai Jinobyefu, Russian: Николай Зиновьев), codenamed "Silver Wolf", is a Soviet Army veteran who served in Umbrella's paramilitary as a Sergeant in the UBCS as well as a Monitor. He and the USS commando, HUNK were considered to be "rivals",[2] and he was a close friend of Col. Sergei Vladimir,[3] whom he may have served with in the Soviet Army.`, 
    status: "Unknown", 
    rating: 0
  },
  { id: 14, name: 'Steve Burnside', game: 'Resident Evil CODE:Veronica', image:  'https://residentevilpodcast.com/wp-content/uploads/2021/08/steveburnside.jpg', gender: "male", 
    desc: `Steve Burnside (スティーブ・バーンサイド Sutību Bānsaido) was a prisoner sent to Rockfort Island along with his father. This was due to his father, an Umbrella employee that was selling the company's secrets at auction, but he was caught. He and Steve are taken prisoner while Steve's mother was killed.`, 
    status: "Deceased", 
    rating: 0
  },
  { id: 15, name: 'Ashley Graham', game: 'Resident Evil 4', image:  'https://i.pinimg.com/originals/be/9b/6a/be9b6aa3064ee54c1af4a45515ab8ba0.jpg', gender: "female", 
    desc: `Ashley Graham (アシュリー・グラハム Ashurī Gurahamu) (born c.1984) was the daughter of former President Graham. In 2004, Graham was victim to an international conspiracy to turn influential American citizens into hosts for a mind-control parasite, Las Plagas, and was rescued in a classified government operation.`, 
    status: "Alive", 
    rating: 0
  },
  { id: 16, name: 'Ingrid Hunnigan', game: 'Resident Evil 4', image:  'https://i.pinimg.com/564x/e8/44/d8/e844d8b64bacce82224590786c3692d9.jpg', gender: "female", 
    desc: `Ingrid Hunnigan (イングリッド・ハニガン Inguriddo Hanigan) is a U.S. federal agent for the Field Operations Support (FOS) and often works with Leon S. Kennedy.`, 
    status: "Alive", 
    rating: 0
  },
  { id: 17, name: 'Jack Krauser', game: 'Resident Evil 4', image:  'https://pbs.twimg.com/media/FV4RjBOWQAYWUcV.jpg', gender: "male", 
    desc: `Major Jack Krauser (ジャック・クラウザー Jakku Kurauzā) was an agent for the 3rd Organization during the War on Terror, and a supporter of Dr. Albert Wesker. Previously a soldier within USSOCOM known as "Silverdax," he was forced into retirement after a 2002 mission to South America with USSTRATCOM agent Leon S. Kennedy. During his employment within The Organization, Krauser took part in the infiltration of Los Iluminados to obtain a Plaga parasite. Krauser was killed in late 2004 during the rescue operation of Ashley Graham.`, 
    status: "Unknown", 
    rating: 0
  },
  { id: 18, name: 'Jessica Sherawat', game: 'Resident Evil Revelations', image:  'https://i.pinimg.com/736x/de/05/c4/de05c47e72a150262c0c07b3b9ebb064.jpg', gender: "female", 
    desc: `Jessica Sherawat (ジェシカ・シェラワット jeshika sherawatto) was a member of the Federal Bioterrorism Commission who later became a member of the Bioterrorism Security Assessment Alliance. She was secretly a spy, working as a triple agent for TRICELL all along.`, 
    status: "Alive", 
    rating: 0
  },
  { id: 19, name: 'Sheva Alomar', game: 'Resident Evil 5', image:  'https://i.pinimg.com/474x/8d/ee/e5/8deee5dddfacab21e40f43a8d0f56926.jpg', gender: "female", 
    desc: `Sheva Alomar (シェバ・アローマ sheba arōma) is an agent for the Bioterrorism Security Assessment Alliance, operating as part of its West African branch.[2] She was assigned to the current mission to assist Chris Redfield, who was unfamiliar with the area. A versatile fighter with extensive in-field experience, her ability to use firearms is on par with Redfield. She is much smaller and more flexible than Redfield, enabling her to perform certain manoeuvres that Redfield cannot. In turn, this allows Redfield to throw her up to high ledges, or over large gaps in order to reach areas or objectives that a lone operator couldn't reach.`, 
    status: "Alive", 
    rating: 0
  },
  { id: 20, name: 'Moira Burton', game: 'Resident Evil Revelations 2', image:  'https://i.pinimg.com/originals/79/8a/62/798a628fa1cc59a187856a8157a11894.png', gender: "female", 
    desc: `Moira Burton (b.c.1991) is an American charity worker for TerraSave, an NGO which provides relief for victims of bioterrorism and medical malpractice. Burton is the older daughter of Barry and Kathy Burton, and sister to Polly Burton. Burton's upbringing was complicated by two major factors in her life. One was accidental shooting of Polly left her deeply traumatized and fearful of firearms for the rest of her adolescence. The other was the aftermath of the 1998 Mansion Incident, where the family were moved to Canada to avoid becoming targets of organised crime in Raccoon City. Since then the family have had permeant residency, and Burton has continued to have close contact during her career in TerraSave following her abduction by Alex Wesker. It is this incident in which she was infected with t-Phobos virus, and owing to its may have mutated from this disease.`, 
    status: "Alive", 
    rating: 0
  },
  { id: 21, name: 'Natalia Korda', game: 'Resident Evil Revelations 2', image:  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUpYJVzE8Kw9jo13as-1lKXtJra7APIuNf3f1dwpmQTFxmfyJkXJI_6oZXq5f9XlAHc_4&usqp=CAU', gender: "female", 
    desc: `Natalia Korda (born c.2001) is a Hungarian superhuman birthed by the t-Phobos Project. Orphaned by the Terragrigia Panic, Korda's trauma left her unable to feel fear, making her an ideal candidate for the virus which selected those based on the quantities of stress hormones produced. During this experiment in 2011, advanced technology was used to transfer the consciousness of the virus' creator, Dr. Alex Wesker, into her brain with the goal of realising the Wesker Project's goal of creating the Übermensch and attaining godhood over mankind. Following her rescue from Sein Island by BSAA Advisor Barry Burton, she was adopted by his family and raised in Canada.`, 
    status: "Alive", 
    rating: 0
  },
  { id: 22, name: 'Alex Wesker', game: 'Resident Evil Revelations 2', image:  'https://i.pinimg.com/originals/f5/5d/0e/f55d0e1fafdc96fc1ffd08e74169360a.jpg', gender: "female", 
    desc: `Dr. Alex Wesker (アレックス・ウェスカー?) was a high-ranking Umbrella Pharmaceuticals employee who was part of the Project Wesker eugenics program. In the years following Umbrella's downfall, Wesker took control of a number of islands where she began viral research while ruling over a people that hailed her as the Messiah or even a goddess.`, 
    status: "Deceased", 
    rating: 0
  },
  { id: 23, name: 'Jake Muller', game: 'Resident Evil 6', image:  'https://i.pinimg.com/564x/24/67/5d/24675db2375d3f0950e1a35757211f46.jpg', gender: "male", 
    desc: `Jake Muller (ジェイク・ミューラー Jeiku Myūrā) is a mercenary raised in Eastern Europe. The son of bioweapons developer Dr. Albert Wesker, he was dragged into a conspiracy to launch major terrorist attacks with the C-Virus.`, 
    status: "Alive", 
    rating: 0
  },
];

const games = [
  { id: 1, title: 'Resident Evil', releaseYear: 1996, image:  "https://upload.wikimedia.org/wikipedia/en/a/a6/Resident_Evil_1_cover.png", 
    desc: "Resident Evil (バイオハザード, spelled Baiohazādo or simply Bio Hazard in Japan) is a survival horror game developed by Capcom and is the first game in the Resident Evil series. Originally released in 1996 for the PlayStation, it has since been ported to the Sega Saturn and PC. It was then re-released twice on the PlayStation in the form of a Director's Cut. A Game Boy Color version of Resident Evil was planned for release in 1999, but Capcom later canceled it, citing poor quality of the port. Instead, Capcom released a new game in the series for the platform, titled Resident Evil Gaiden. In 2002, a remake of the game was released for the Nintendo GameCube, featuring new graphics, voice acting, and other significant changes. A Nintendo DS port of the original, with added modes and the subtitle Deadly Silence, was released in early 2006."
    , rating: 0
  },
  { id: 2, title: 'Resident Evil 2', releaseYear: 1998, image: "https://upload.wikimedia.org/wikipedia/en/4/40/NTSC_Resident_Evil_2_Cover.png",
    desc: `Resident Evil 2, known as Biohazard 2 (バイオハザード2 Baiohazādo Tsū) in Japan, is a survival horror video game that was originally released for the PlayStation in 1998. Developed by Capcom as the second installment in the Resident Evil series, the game's story takes place two months after the events of the first game, Resident Evil, and is set in Raccoon City, a Midwestern American mountain community. The city's residents have been transformed into zombies by the t-Virus, a biological weapon developed by the pharmaceutical company Umbrella. As they escape from the city, the two protagonists, Leon S. Kennedy and Claire Redfield, encounter other survivors and are confronted by William Birkin, the mutated creator of the even more powerful G-virus, a variation of the t-Virus. The gameplay of Resident Evil 2 focuses on exploration, puzzle-solving, and combat and features typical survival horror elements such as limited saves and ammunition. The game's main difference from its predecessor is the "Zapping System," which provides each playable character with unique storylines and obstacles. Developed by a team of 40 to 50 people over the course of one year and nine months, Resident Evil 2 was directed by Hideki Kamiya and produced by Shinji Mikami. The initial version of the game, commonly referred to as BIOHAZARD 1.5, differed drastically from the released product and was scrapped at a development stage of 60-80 percent after being deemed "dull and boring" by the producer. The resulting redesign introduced different settings and a more cinematic story presentation supported by a soundtrack that employs "desperation" as an underlying theme. Resident Evil 2 received critical acclaim, with praise for its atmosphere, setting, graphics, audio, scenarios, and overall gameplay, as well as its improvements over the original game, but with some criticism towards its controls, voice acting, and certain gameplay elements. It has appeared on a number of lists of the best video games ever made. The game has become a million-seller and is the franchise's most successful title on a single platform. Years after its first release, Resident Evil 2 was included in several lists of the 100 best games. Following its initial success on the PlayStation, it was ported to Microsoft Windows, the Nintendo 64, Dreamcast, and Nintendo GameCube and was released as a modified 2.5D version for the Game.com handheld. The story of Resident Evil 2 was retold and built upon in several later games and has been adapted into a variety of licensed works. A remake of the game was released on January 25, 2019.`
    , rating: 0
  },
  { id: 3, title: 'Resident Evil 3: Nemesis', releaseYear: 1999, image:  "https://upload.wikimedia.org/wikipedia/en/a/a5/Resident_Evil_3_Cover.jpg", 
    desc: `Resident Evil 3: Nemesis, known in Japan as Biohazard 3: Last Escape (バイオハザード3　ラストエスケープ Baiohazādo Surī Rasuto Esukēpu), is a survival horror video game and the third installment in the Resident Evil series developed and published by Capcom. The game was initially released for the Sony PlayStation and was subsequently ported to the Dreamcast, Microsoft Windows, and Nintendo GameCube. It is also available for download on the PlayStation Network for use with both the PlayStation 3 and the PlayStation Portable. The game's storyline is divided into two parts: the first half takes place 24 hours before the events of Resident Evil 2, while the second half occurs two days after. Through this, the game expands upon the settings and events of the t-Virus outbreak in Raccoon City and provides a conclusion to the fate of the city and its infected population. The game's storyline served as the inspiration for the 2004 film Resident Evil: Apocalypse.`
    , rating: 0
  },
  { id: 4, title: 'Resident Evil Survivor', releaseYear: 2000, image: "https://upload.wikimedia.org/wikipedia/en/e/e3/RE_Survivor_front.jpg", 
    desc: `Resident Evil Survivor, known in Japan as Biohazard Gun Survivor (バイオハザード ガンサバイバー Baiohazādo Gan Sabaibā) and initially known as BIOHAZARD GUN SURVIVOR behind the mask (バイオハザードガンサバイバー マスクの後ろに?, Baiohazādo Gan Sabaibā masuku no ushironi) was the first Biohazard game designed to be used with the PlayStation light-gun peripheral "GunCon45". The game is a major departure from the original series, deviating from the fixed camera angles of the previous games to a first-person view. The Japanese and PAL versions of the game allowed the use of the Namco GunCon, a light gun that gave the game a more arcade feel. It was decided by Capcom U.S.A. that the American version would not allow the use of the GunCon, due to the then-recent Columbine High School massacre. The game is set in the isolated city of Sheena Island around November 1998. It was re-released in March 2001 in Japan as part of the Capcom Collection (Japanese: "Kapukore"). The game was also released for PC in Taiwan in 2002. This version allowed mouse-aiming and had graphic-filtering, although it is also known for being buggy suffering from flat lighting, messed up sounds, low-quality FMV cut-scenes compared to PS1, some enemies have messed up animations are lacking general AI scripts. This version does not use real fonts, instead, it uses images with texts and alpha transparency possibly due to the use of Chinese letters. It is also problematic in terms of installing and playing on modern systems.`
    , rating: 0
  },
  { id: 5, title: 'Resident Evil – Code: Veronica', releaseYear: 2000, image:  "https://upload.wikimedia.org/wikipedia/en/4/44/RECV_boxart.jpg", 
    desc: `Resident Evil CODE:Veronica (BIOHAZARD CODE:Veronica in Japan) is a survival horror game that was originally released in 2000. Instead of being developed by Capcom, the game was outsourced and created by Nextech and Tose as a replacement for a Saturn port of Resident Evil 2, which Capcom and Nextech believed would be subpar. Originally intended as a Dreamcast-exclusive title, Sega's departure from the console industry led to a modified port of the game being released for the Dreamcast, GameCube, and PlayStation 2 the following year, titled Resident Evil CODE:Veronica X, known in Japan as BIOHAZARD CODE:Veronica 完全版 (Kanzenban, lit. "Perfect Complete Edition"). An HD remaster was released for PlayStation 3 and Xbox 360, and the PlayStation 2 version was made available as a "PS2 Classic" on PlayStation 4. Thanks to backward compatibility, the HD Xbox 360 version can be played on Xbox One and Xbox Series X/S, while the PlayStation 5 runs the emulated version from PS4. The HD remaster is also accessible through PlayStation Now. The game is set on 27–28 December 1998, three months after the events of Resident Evil 2 and Resident Evil 3: Nemesis. It is the first Resident Evil game released for a sixth-generation console and features full polygonal environments instead of the static, pre-rendered backgrounds that were characteristic of the previous installments .`
    , rating: 0
  },
  
  { id: 6, title: 'Resident Evil Survivor 2 – Code: Veronica', releaseYear: 2001, image: "https://upload.wikimedia.org/wikipedia/en/c/ca/RESurvivor2CV.jpg", 
    desc: `Resident Evil Survivor 2 CODE:Veronica (GUN SURVIVOR 2 BIOHAZARD CODE:Veronica in Japan) is a first-person shooter game by Capcom developed in conjunction with Namco exclusive to PAL regions and Japan. The game has no bearing on the Resident Evil plot, although it does feature characters, enemies, and bosses from Resident Evil CODE:Veronica. The game also features a Nemesis-T Type, which appears on the map to chase you if you run out of time.`
    , rating: 0
  },
  { id: 7, title: 'Resident Evil Gaiden', releaseYear: 2001, image:  "https://upload.wikimedia.org/wikipedia/en/d/dd/Resident_Evil_Gaiden_Boxart.gif", 
    desc: `Resident Evil Gaiden (バイオハザード外伝 Baiohazado Gaiden) is a Resident Evil game for the Game Boy Color first released on December 14, 2001. While the technical implementation of the title was done by the now defunct British company M4 Limited, two employees of Capcom were involved with the development as well. Shinji Mikami served as an adviser for the game and the story was created by Hiroki Katō, the director of Resident Evil CODE:Veronica.[1] This game is non-canon, as its plot is contradicted by the main series in key parts, and its events are ignored.
`, rating: 0
  },
  { id: 8, title: 'Resident Evil', releaseYear: 2002, image: "https://upload.wikimedia.org/wikipedia/en/a/ab/Resident_Evil_2002_cover.jpg", 
    desc: `Resident Evil, known in Japan as biohazard (バイオハザード Baiohazādo) is a 2002 survival horror video game developed by Capcom. It is a remake of the 1996 video game of the same name. The game has often been colloquially referred to by developers and fans alike as "REmake" or "REbirth" to distinguish it from the original.
The game was initially released as a GameCube-exclusive title, fulfilling Shinji Mikami's commitment to making Studio 4 titles Nintendo exclusives. The remake was developed alongside Resident Evil 4, which became a Nintendo exclusive due to the unrelated Capcom Five agreement, and Studio 3's Resident Evil 0, which was also intended to be a Nintendo exclusive before development was temporarily halted in 1999.
While Mikami's support for exclusivity ended in 2005, the game was absent when the Capcom Five games were ported to the more successful PlayStation 2. The remake would only receive a single port for the (already backwards-compatible) Nintendo Wii several years later in 2009 as part of the Resident Evil Archives collection alongside Resident Evil 0.
In 2014, Capcom announced an high-definition remaster would be arriving on January 20, 2015 for PlayStation 4, Xbox One, and Steam entitled "Resident Evil: HD Remaster". The game launched in Japan on November 27, 2014 for the Xbox 360 and PlayStation 3 and was an overwhelming financial success, breaking numerous digital sales records, such as becoming PlayStation Network's biggest launch game and Capcom's fastest-selling title of all time across North America and Europe. By April of 2015, Capcom announced that the remaster had already exceeded sales of one million copies.[3] The game was later featured in the Resident Evil Origins Collection, which would be ported to the Nintendo Switch.
As of 2023, the remaster alone has sold over 3.8 million copies, while the game has sold an overall combined total of 6.1 million, making it one of the best-selling titles in the franchise. As a result of the title's success, a subsequent remaster of Resident Evil 0 was announced, as well as a remake of Resident Evil 2, the latter of which released to widespread critical and financial acclaim in early 2019.`
, rating: 0},
  { id: 9, title: 'Resident Evil Zero', releaseYear: 2002, image:  "https://upload.wikimedia.org/wikipedia/en/c/c6/Rezerobox.jpg", 
    desc: `Resident Evil 0, known in Japan as biohazard 0 (バイオハザード０ baiohazādo 0), is a survival horror video game that was developed and published by Capcom for the Nintendo GameCube and released in 2002. It is the seventh home console game in the Resident Evil series by release order and was the last of the title to use the original Multi-View gameplay system prior to the release of Resident Evil 4.
A remastered, high-definition version of the game has been released in January 2016, known in Japan as the biohazard 0 HD remaster (バイオハザード0 HDリマスター?). It was also included in the Origins Collection. A port of the remaster was released on May 21, 2019, for the Nintendo Switch.
The game's storyline is standalone, but ties in to the stories of Resident Evil, Resident Evil CODE:Veronica and the cancelled "Castle" game, with the plot involving the S.T.A.R.S. Bravo Team ahead of the Mansion Incident, Dr. Albert Wesker's betrayal of Umbrella, the backstory of an Umbrella founder, and new lore on the Progenitor Virus.`
, rating: 0},
  { id: 10, title: 'Resident Evil: Dead Aim', releaseYear: 2003, image: "https://upload.wikimedia.org/wikipedia/en/a/a5/Residentevildeadaim.jpg", 
    desc: `Resident Evil: Dead Aim, known as Gun Survivor 4 Biohazard Heroes Never Die (ガンサバイバー4 バイオハザード ヒーローズ・ネバー・ダイ Gan Sabaibā Fō Baiohazādo Hīrōzu Nebā Dai) in Japan, is a 2003 PlayStation game produced by Production Studio 3. Dead Aim was produced under the Gun Survivor title, which was used for several games made for the Namco light gun controllers. The game was not part of Shinji Mikami's Nintendo exclusivity plan for neighbouring Studio 4, and did not get a GameCube release.`
    , rating: 0},
  { id: 11, title: 'Resident Evil Outbreak', releaseYear: 2003, image:  "https://upload.wikimedia.org/wikipedia/en/a/ad/Re_outbreak_a.jpg", 
    desc: `Resident Evil Outbreak, Known in Japan as BIOHAZARD OUTBREAK (バイオハザード アウトブレイク Baiohazādo Autobureiku) Is a Survival Horror video game developed by the former Capcom Production Studio 1 (Now known as Division 1), The Game was first released in Japan on December 11, 2003 And its direct sequel (Resident Evil Oubreak File #2) on September 9, 2004 in Japan. Outbreak was the first RESIDENT EVIL/BIOHAZARD game with multiplayer capability, using the PlayStation's online network. Up to four players could participate simultaneously in one scenario; alternately, in single-player mode, the player is accompanied by two AI-controlled characters. Outbreak introduces the "virus gauge," which limits the amount of time players may spend on a scenario. The virus gauge rises at different rates for different characters, and increases rapidly if the character is attacked or crawling on the ground. The game lost all online play capabilities for the USA servers in 2007. The Japan servers stayed up but finally went down in July 2011.`
    , rating: 0},
  { id: 12, title: 'Resident Evil Outbreak: File #2', releaseYear: 2004, image: "https://upload.wikimedia.org/wikipedia/en/9/9c/Resident_Evil_Outbreak_File_2.jpg", 
    desc: `Resident Evil Outbreak File #2, known as Biohazard Outbreak File 2 (バイオハザード アウトブレイク ファイル２ baiohazādo autobureiku fairu 2) in Japan, is an online game for the PlayStation 2 which was first released in September 2004 in Japan. It is a sequel and expansion on Resident Evil Outbreak, which was originally envisioned as a much larger game before being cut into multiple releases, containing levels which failed to be completed in time for the original game's release. The same eight characters from the first title return with similar abilities, and the game takes place once again in a zombie-run Raccoon City.
While the first title was a reasonable success worldwide, File #2 failed to satisfy the Japanese market even with its offer of a pre-order promotional demo of Devil May Cry 3. Consequently, it was decided that the remaining unfinished levels for the original game were to be shelved.`
, rating: 0},
  { id: 13, title: 'Resident Evil 4', releaseYear: 2005, image:  "https://upload.wikimedia.org/wikipedia/en/d/d9/Resi4-gc-cover.jpg", 
    desc: `Resident Evil 4, known as Biohazard 4 (バイオハザード４ Baiohazādo Fō) in Japan, is a 2005 survival horror video game published and developed by Capcom. It is the sixth installment of the Resident Evil series. The game debuted in North America on January 11, 2005, for the Nintendo GameCube, and was later released in Japan and Europe. As of the release of the 2023 remake of the same name, this game is now officially known as "Resident Evil 4 (2005)".`
    , rating: 0},
  { id: 14, title: 'Resident Evil: Deadly Silence', releaseYear: 2006, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTr6skNghFbFIEoZU6frn1sUeQxO1MoIxFbwjk5p9JKaqR8_1qnI_Sx1NtjdpWzQb-sTwyvytEmVTz1Grbbn_3u2QSghZxP0HTLLSnLik4", 
    desc: `Resident Evil: The Umbrella Chronicles, known in Japan as Biohazard Umbrella Chronicles (バイオハザード アンブレラ・クロニクルズ Baiohazādo Anburera Kuronikuruzu), is an on-rails shooter video game in Capcom's Resident Evil series. It was released for the Wii console in Japan on November 15, 2007. On June 26, 2012, an HD bundle of Resident Evil: The Umbrella Chronicles and Resident Evil: The Darkside Chronicles games titled Resident Evil Chronicles HD Collection was released. They were sold separately starting July 17 on PSN, in HD.`
    , rating: 0},
  { id: 15, title: 'Resident Evil: The Umbrella Chronicles', releaseYear: 2007, image:  "https://upload.wikimedia.org/wikipedia/en/d/d8/Resident_evil_the_umbrella_chronicles_uscover.jpg", 
    desc: `Resident Evil 5, known in Japan as Biohazard 5 (バイオハザード5 Baiohazādo Faibu), is the seventh installment in the Resident Evil video game series. It was developed and published by Capcom for the PlayStation 3, Xbox 360, and PC. Capcom officially announced the game on July 20, 2005. It was first released in Japan on March 5, 2009, and later on March 13, 2009, in North America and Europe. The following year, a Gold Edition of the game was released. In the fall of 2019, Resident Evil 5 was released for the Nintendo Switch. The game has been ported to several platforms, with the Gold Edition serving as the base. In 2015, the game was re-ported to Microsoft Windows via Steam, based on the Xbox 360 Gold Edition version. This version was subsequently released on Nvidia SHIELD TV in 2016. The next-gen consoles, PlayStation 4, Xbox One and Nintendo Switch, also received ports featuring all previously released Gold Edition content. Additionally, the next-gen ports introduced an exclusive mode called The Mercenaries United, along with the previously PC-exclusive No Mercy variant of The Mercenaries mode.`
    , rating: 0},
  { id: 16, title: 'Resident Evil 5', releaseYear: 2009, image: "https://upload.wikimedia.org/wikipedia/en/5/58/Resident_Evil_5_Box_Artwork.jpg", 
    desc: `Resident Evil 5, known in Japan as Biohazard 5 (バイオハザード5 Baiohazādo Faibu), is the seventh installment in the Resident Evil video game series. It was developed and published by Capcom for the PlayStation 3, Xbox 360, and PC. Capcom officially announced the game on July 20, 2005. It was first released in Japan on March 5, 2009, and later on March 13, 2009, in North America and Europe. The following year, a Gold Edition of the game was released. In the fall of 2019, Resident Evil 5 was released for the Nintendo Switch.The game has been ported to several platforms, with the Gold Edition serving as the base. In 2015, the game was re-ported to Microsoft Windows via Steam, based on the Xbox 360 Gold Edition version. This version was subsequently released on Nvidia SHIELD TV in 2016. The next-gen consoles, PlayStation 4, Xbox One and Nintendo Switch, also received ports featuring all previously released Gold Edition content. Additionally, the next-gen ports introduced an exclusive mode called The Mercenaries United, along with the previously PC-exclusive No Mercy variant of The Mercenaries mode.`
    , rating: 0},
  { id: 17, title: 'Resident Evil: The Darkside Chronicles', releaseYear: 2009, image:  "https://upload.wikimedia.org/wikipedia/en/9/91/REDC_Cover.jpg", 
    desc: `Resident Evil: The Darkside Chronicles, known as BIOHAZARD THE DARKSIDE CHRONICLES (バイオハザードダークサイド・クロニクルズ Baiohazādo dākusaido kuronikuruzu) in Japan, is an on-rails-shooting video game for the Nintendo Wii developed by Cavia and Capcom. The game was released on November 17, 2009, in North America. It was released in Europe on November 27, 2009, bundled with the Wii Zapper accessory. The game, along with Resident Evil: The Umbrella Chronicles, was included in the Resident Evil Chronicles HD Collection for the PlayStation 3.`
    , rating: 0},
  { id: 18, title: 'Resident Evil: The Mercenaries 3D', releaseYear: 2011, image: "https://upload.wikimedia.org/wikipedia/en/4/40/The_Mercenaries_3D.jpg", 
    desc: `Resident Evil: The Mercenaries 3D, known as Biohazard: The Mercenaries 3D (バイオハザード ザ・マーセナリーズ 3D Baiohazādo za Māsenarīzu 3D) in Japan, is a video game announced by Capcom for the Nintendo 3DS at the 2010 Nintendo conference in Japan and was first released on June 2, 2011. The game is essentially a blend of the The Mercenaries mini-games previously featured in Resident Evil 4 and Resident Evil 5, in which players must defeat as many enemies as possible within a set time limit in order to achieve the highest score, while also adding new features.The game includes a Co-op mode, which can be either played locally or via Wi-Fi.
A demo of Resident Evil: Revelations is included within the game. If pre-ordered through Capcom's official site, one was offered a free 3DS case as a pre-order bonus.`
, rating: 0},
  { id: 19, title: 'Resident Evil: Revelations', releaseYear: 2012, image:  "https://upload.wikimedia.org/wikipedia/en/f/f9/Resident_evil_rev._2012_Capcom.png", 
    desc: `Resident Evil: Revelations, known as Biohazard Revelations (バイオハザードリベレーションズ Baiohazādo Riberēshonzu) in Japan, is a console video game that was announced at E3 2010 and first released in the US on February 7, 2012. Starring original series leads Chris Redfield and Jill Valentine, the game displays hallways reminiscent of the mansions of the original Resident Evil and Resident Evil 5. While most of the game takes place aboard the luxurious cruiser Queen Zenobia, players also briefly visit other settings. A brief demo of the game was put on Resident Evil: The Mercenaries 3D, but Nintendo later released a downloadable free demo on the Nintendo eShop, a piece of software on the 3DS. The demo was released a week before the game was released in Japan. Resident Evil Revelations is the first game in the series to receive dubs into multiple languages such as Japanese, French, Italian, German, and Spanish. 8 years after it's release in 2020, It was dubbed in Russian, making it the first entry to receive a Russian-language dub.`
    , rating: 0},
  { id: 20, title: 'Resident Evil: Operation Raccoon City', releaseYear: 2012, image: "https://upload.wikimedia.org/wikipedia/en/5/52/OperationRaccoonCity.jpg",
    desc: `Resident Evil: Operation Raccoon City, known in Japan as Biohazard: Operation Raccoon City (バイオハザード　オペレーション・ラクーンシティ Baiohazādo Operēshon Rakūn Shiti), is a 2012 third-person-shooter video game with online playability for Microsoft Windows, Xbox 360, and PlayStation 3. It was developed by Slant Six Games and published by Capcom. It is set at the same time as Resident Evil 2 and Resident Evil 3: Nemesis, but is unrelated to the main series storyline and is a "what-if" entry in the series outside of Mainstream canon.`
    , rating: 0},
  { id: 21, title: 'Resident Evil 6', releaseYear: 2012, image:  "https://upload.wikimedia.org/wikipedia/en/1/11/Resident_Evil_6_box_artwork.png", 
    desc: `Resident Evil 6, known in Japan as Biohazard 6 (バイオハザード6 Baiohazādo Shikkusu) is the ninth video game installment in the Resident Evil series. The official reveal trailer was released on Capcom's YouTube channel on January 29, 2012, with the release date set to November 20, 2012. However, the Captivate 2012 trailer showed a different release date, being October 2, 2012; the game ultimately released on the latter date worldwide, and on October 4 in Japan. In its first week, the game sold 4.5 million copies, with its Japanese sales of 676,585 surpassing Resident Evil 5's already impressive 398,747. Despite this, the game failed to reach its six-month target of 7 million units by 31 March 2013.`
    , rating: 0},
  { id: 22, title: 'Resident Evil: Revelations 2', releaseYear: 2015, image: "https://upload.wikimedia.org/wikipedia/en/7/74/ResidentEvilRevelations2.jpg", 
    desc: `Resident Evil: Revelations 2, known as BIOHAZARD REVELATIONS 2 (バイオハザードリベレーションズ2 Baiohazādo Riberēshonzu 2) in Japan, is another video game entry into the Resident Evil franchise and second title in the newly formed "Revelations" series. Formally announced at Sony's pre-TGS 2014 conference on 1 September 2014, the game was scheduled for a Japanese release sometime in early 2015. It was released episodically and eventually a complete version was released and is available for the PS3, PS4, PlayStation Vita, Xbox 360, Xbox One, Steam and Nintendo Switch. The first episode of the game was released on February 24, 2015 in North America with the final episode along with the Retail Disc Version on March 17. 5 years after it's release in 2020, It was dubbed in Russian.`, 
    rating: 0
  },
  { id: 23, title: 'Umbrella Corps', releaseYear: 2016, image:  "https://upload.wikimedia.org/wikipedia/en/1/1b/Umbrella_Corps_cover_art.jpg", 
    desc: `Resident Evil: Umbrella Corps (styled: "UMBRELLA CORPS."), known in Japan as BIOHAZARD UMBRELLA CORPS. (バイオハザードアンブレラコア Baiohazādo anburera koa) is an online multiplayer video game published by Capcom. It was released on 21 June 2016 on Steam (PC/Microsoft Windows) and PlayStation 4 to coincide with the franchise's 20th Anniversary. This is only game post Resident Evil Revelations to not have it be dub in any other language outside of English.`
    , rating: 0
  },
  { id: 24, title: 'Resident Evil 7: Biohazard', releaseYear: 2017, image: "https://upload.wikimedia.org/wikipedia/en/f/fd/Resident_Evil_7_cover_art.jpg", 
    desc: `Resident Evil 7: Biohazard (stylized as RESIDENT EVII. biohazard), known in Japan as BIOHAZARD 7 resident evil (stylized as BIOHA7.ARD resident evil) (バイオハザード7　レジデント イービル Baiohazādo Sebun Rejidento Ībiru), is a first-person survival horror game produced by Capcom Co., Ltd. It was officially announced during the E3 2016 games convention. It released overseas on 24 January 2017, launching in Japan two days later on the 26th. A series of demos for the game had been released as part of its promotion starting with "KITCHEN" at E3 2015. KITCHEN then made a cameo in a second demo, Resident Evil 7 Teaser Demo: Beginning Hour was released 13 June 2016 for the PlayStation Network, to users with PlayStation Plus memberships. A third demo, "LANTERN" was available at TGS 2016, and was also played by select YouTubers at Capcom offices.`
    , rating: 0
  },
  { id: 25, title: 'Resident Evil 2', releaseYear: 2019, image:  "https://upload.wikimedia.org/wikipedia/en/f/fd/Resident_Evil_2_Remake.jpg", 
    desc: `Resident Evil 2, also known as BIOHAZARD RE:2 (バイオハザード RE:2) in Japan, is a Survival Horror game developed by Capcom's R&D Division 1 studio. It is a remake of 1998's Resident Evil 2, described by Capcom as a "reimagining" and first announced on 12 August 2015 by Yoshiaki Hirabayashi and released wordwide on 25 January 2019 for the PlayStation, Xbox One and Windows operating systems.Unlike the 2002 Resident Evil remake, Resident Evil 2 was not developed with the intent of improving the original. Rather than improving the visuals and polishing the same script, this game is instead more a "reimagining" of the original story, with redesigned maps, characters and story elements. Gameplay mechanics are more similar to 2017's Resident Evil 7: Biohazard, which also used the RE Engine, though with the use of an over-the-shoulder camera. Like that game, the Japanese version was subject to unique censoring to remove the more gory sequences. Resident Evil 2 is the first entry in the series to receive a Chinese-language Dub. Its also the first entry to credit all of the different language voice casts. On June 22 of 2024, Resident Evil 2 Remake officially sold 13.9 million copies since it's release, which makes it the highest selling game in the series, surpassing Resident Evil 5`
    , rating: 0
  },
  { id: 26, title: 'Resident Evil 3', releaseYear: 2020, image: "https://upload.wikimedia.org/wikipedia/en/d/dc/Resident_Evil_3.jpg", 
    desc: `Resident Evil 3, known in Japan as BIOHAZARD RE:3 (バイオハザード RE:3), is a survival horror game developed by Capcom. It is a remake of the 1999 PlayStation game, Resident Evil 3: Nemesis. It was released on 3 April 2020. As with Resident Evil 7: Biohazard and Resident Evil 2, Resident Evil 3 will be released in Japan in two versions relating to local censorship. These are the standard version, the most censored, and the "Z Version", the least. The game follows Jill Valentine as she attempts to escape a zombie outbreak while hunted by an intelligent bioweapon known as Nemesis-T Type. The game comes bundled with Resident Evil: Resistance, an online asymmetrical game.`
    , rating: 0
  },
  { id: 27, title: 'Resident Evil: Resistance', releaseYear: 2020, image:  "https://upload.wikimedia.org/wikipedia/en/0/00/Resident_Evil_Resistance.jpg", 
    desc: `Resident Evil: Resistance, known in Japan as Biohazard Resistance (バイオハザード レジスタンス) is an asymmetrical survival horror game developed by Capcom. During the development, it was known under the title "Project Resistance", which was revealed at Tokyo Game Show 2019. A closed beta took place between 4–7 October 2019[6] and an open beta ran between March 27 - April 3. The game was released on April 3, 2020, and was bundled with Resident Evil 3 (2020).`
    , rating: 0
  },
  { id: 28, title: 'Resident Evil Village', releaseYear: 2021, image: "https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png", 
    desc:`Resident Evil Village, stylized as VII.I.AGE RESIDENT EVIL, and known in Japan as BIOHAZARD VILLAGE (バイオハザード　ヴィレッジ baiohazādo virejji), stylized as VII.I.AGE BIOHAZARD, is a first-person Survival Horror title developed by Capcom. It was released on 7 May 2021. It is the first Resident Evil game for the ninth console generation. A Gold Edition of the game was released on October 28, 2022 with the Winters' Expansion included which comprises 3 more additional characters to The Mercenaries, third-person perspective and over-the-shoulder gameplay and new story Shadows of Rose which focuses on Rosemary Winters 16 years after the main game. The PSVR2 version was released on February 22, 2023 as a free DLC to Resident Evil Village and its Gold Edition on PlayStation 5.`
    , rating: 0
  },
  { id: 29, title: 'Resident Evil Re:Verse', releaseYear: 2022, image:  "https://m.media-amazon.com/images/M/MV5BM2E3NmVjOTctZDJmMC00ZjViLTgzOTMtM2Q4MWFmZTlhMGRiXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_.jpg", 
    desc: `Resident Evil Re:Verse, known in Japan as Biohazard RE:Verse (バイオハザード RE:バース Baiohazādo RE:Bāsu) is a multiplayer video game first announced during the Resident Evil Showcase (January 2021) as celebration of the franchise's 25th Anniversary.[1] It was originally set for a 2021 release with a download code included as part of a bundle with Resident Evil Village, but was delayed until October 28, 2022. A closed beta took place between January 28–30 and an open beta took place for three periods: April 8–11, 14–16 and 21.[3] During the Resident Evil Showcase (October 2022), Re:Verse was announced to have an early access play period for owners of Resident Evil Village prior to its official launch, which took place on October 23, 2022, 19:00 PDT to October 25, 2022, 23:00 PDT.`
    , rating: 0
  },
  { id: 30, title: 'Resident Evil 4', releaseYear: 2023, image: "https://upload.wikimedia.org/wikipedia/en/d/df/Resident_Evil_4_remake_cover_art.jpg", 
    desc: `Resident Evil 4, known in Japan as BIOHAZARD RE:4 (バイオハザード RE:4 baiohazādo RE:4) is a survival horror video game developed by Capcom Division 1. It is a remake of the 2005 game of the same name, and was released on March 24, 2023. The Mercenaries mode was released as free DLC after the game's initial release on April 7, 2023. The DLC Separate Ways which centers on Ada Wong's story during the events of the game was released on September 21, 2023. Following that, VR mode was released as a free DLC on December 8, 2023 and a Gold Edition of the game was released on February 9, 2024.`
    , rating: 0
  },
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
app.post('/api/games/:id/rate', (req: Request, res: Response) => {
  const gameId = parseInt(req.params.id, 10);
  const { rating } = req.body;

  const game = games.find(g => g.id === gameId);
  if (game) {
    game.rating = rating;
    res.status(200).json({ message: 'Rating updated successfully' });
  } else {
    res.status(404).json({ message: 'Game not found' });
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
    user.comments_game.push({ gameId, comment, username: user.username }); 
    res.status(201).json({ message: 'Comment added successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.get('/api/games/:id/comments', (req: Request, res: Response) => {
  const gameId = parseInt(req.params.id, 10);
  const comments = users.flatMap(user =>
    user.comments_game
      .filter(comment => comment.gameId === gameId)
      .map(comment => ({ ...comment, username: user.username }))
  );
  res.json(comments);
});


app.post('/api/register', (req: Request, res: Response) => {
  const { username, password } = req.body;
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  const newUser: User = { id: uuidv4(), username, password, favorites: [], favorites_games: [], comments: [], comments_game:[], favoriteRatings:[], favoriteGameRatings:[]};
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
    user.comments.push({ characterId, comment, username: user.username }); 
    res.status(201).json({ message: 'Comment added successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
app.get('/api/users/:id/ratings', (req, res) => {
  const userId = req.params.id;
  const user = users.find(u => u.id === userId);
  if (user) {
      res.json({
          characterRatings: user.favoriteRatings,
          gameRatings: user.favoriteGameRatings
      });
  } else {
      res.status(404).json({ message: 'User not found' });
  }
});


app.post('/api/users/:id/ratings', (req, res) => {
  const userId = req.params.id;
  const { characterId, gameId, rating } = req.body;

  const user = users.find(u => u.id === userId);
  if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }

  
  if (characterId) {
      const existingRating = user.favoriteRatings.find(r => r.characterId === characterId);
      if (existingRating) {
          existingRating.rating = rating; 
      } else {
          user.favoriteRatings.push({ characterId, rating }); 
      }
  }

  if (gameId) {
      const existingRating = user.favoriteGameRatings.find(r => r.gameId === gameId);
      if (existingRating) {
          existingRating.rating = rating; 
      } else {
          user.favoriteGameRatings.push({ gameId, rating }); 
      }
  }

  res.json({ message: 'Rating updated successfully' });
});


app.get('/api/characters/:id/comments', (req: Request, res: Response) => {
  const characterId = parseInt(req.params.id, 10);
  const comments = users.flatMap(user =>
    user.comments
      .filter(comment => comment.characterId === characterId)
      .map(comment => ({ ...comment, username: user.username })) 
  );
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

app.delete('/api/users/:userId/favoritesgames/:gameId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const gameId = parseInt(req.params.gameId, 10);
  const user = users.find(user => user.id === userId);

  if (user) {
      const gameIndex = user.favorites_games.indexOf(gameId);
      if (gameIndex > -1) {
          user.favorites_games.splice(gameIndex, 1);
          res.status(200).json({ message: 'Game removed from favorites' });
      } else {
          res.status(400).json({ message: 'Game not found in favorites' });
      }
  } else {
      res.status(404).json({ message: 'User not found' });
  }
});

app.delete('/api/users/:userId/favorites/:characterId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const characterId = parseInt(req.params.characterId, 10);
  const user = users.find(user => user.id === userId);

  if (user) {
      const characterIndex = user.favorites.indexOf(characterId);
      if (characterIndex > -1) {
          user.favorites.splice(characterIndex, 1);
          res.status(200).json({ message: 'Character removed from favorites' });
      } else {
          res.status(400).json({ message: 'Character not found in favorites' });
      }
  } else {
      res.status(404).json({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Resident Evil API is running at http://localhost:${port}`);
});
