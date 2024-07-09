export interface Answer {
    message: string,
    success: boolean,
    data: CharactersAnswer
}

export interface CharactersAnswer {
  info: CharactersInfo;
  results: any[];
}

export interface CharactersInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterResult {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: NameUrl;
  location: NameUrl;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface NameUrl {
  name: string;
  url: string;
}