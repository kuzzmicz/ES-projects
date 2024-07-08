import { useEffect, useState } from "react";
import { Answer, CharacterResult } from "../interfaces";
import bringCharacters from "../services/api-calls";
import "./Home.css";

function Home() {
  const [characters, setCharacters] = useState<CharacterResult[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const [msgError, setMsgError] = useState<string>("");

  useEffect(() => {
    if (characters?.length === 0) {
      //we call the characters.....
      const fetchDataRickMorty = async (): Promise<any> => {
        const fetched: Answer = await bringCharacters();

        if (fetched.success) {
          setFlag(true);
          setCharacters(fetched.data.results);
        } else {
          setMsgError(fetched.message);
        }
      };

      if (!flag) {
        fetchDataRickMorty();
      }
    }
  }, [characters]);



  return (
    <>
      {characters?.length > 0 ? (
        <div>
          {characters.slice(0, 6).map((character) => {
            return <div key={character.id}>{character.name}</div>;
          })}
        </div>
      ) : (
        <div>{msgError}</div>
      )}
    </>
  );
}

export default Home;