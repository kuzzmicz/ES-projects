import React from "react";
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
    <div className="container">
      <h1 className="title">Rick and Morty Characters</h1>
      {characters?.length > 0 ? (
        <div className="characters-grid">
          {characters.slice(0, 18).map((character) => {
            return (
              <div key={character.id} className="character-card">
                <div className="character-name">{character.name}</div>
                <img src={character.image}/>
                <div className="character-text"><b>Gender:</b> {character.gender}</div>
                <div className="character-text"><b>Species:</b> {character.species}</div>
                <div className="character-text"><b>Loc: </b>{character.location.name}</div>
                <div className="character-text"><b>Status: </b>{character.status}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="error-message">{msgError}</div>
      )}
    </div>
  );
}

export default Home;
