import { Answer, CharactersAnswer } from "../interfaces";

const root: string = "https://rickandmortyapi.com/api/";

async function bringCharacters(): Promise<Answer> {
  try {
    const response: any = await fetch(`${root}character/?page=2`);

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: Problem encountered retrieving data`
      );
    }

    const rawData: CharactersAnswer = await response.json();
    console.log(rawData);
    const data: Answer = {
      message: "Data properly fetched",
      success: true,
      data: rawData,
    };

    return data;
  } catch (error: any) {
    const errorAnswer: Answer = {
      message: error,
      success: false,
      data: {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null
        },
        results: []
      },
    };

    return errorAnswer;
  }
}

export default bringCharacters;