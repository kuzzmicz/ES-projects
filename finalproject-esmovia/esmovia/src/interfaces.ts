export interface Character {
    id: number;
    name: string;
    game: string;
    image: string;
    gender: string;
    desc: string;
    status: string;
  }
  
 export interface Game {
    id: number;
    title: string;
    releaseYear: number;
    image:string;
    desc: string;
  }
