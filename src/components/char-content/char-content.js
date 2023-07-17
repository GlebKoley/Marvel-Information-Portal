import { useState, useEffect } from "react";

import { useMarvelRequestServices } from "../../services/marvel-service";
import { GenerateCharsList } from "./GenerateCharList/generate-char-list";
import { GenerateLoadNewCharsList } from "./GenerateLoadNewCharsList/generate-load-new-chars-list";
import { GenerateSelectedCharContent } from "./GenerateSelectCharContent/generate-select-char-content";
import { FindInputChar } from "./FindInputChar/FindInputChar";

const CharContent = () => {
   const { loading, getAllCharacters, getSingleCharacter } = useMarvelRequestServices();

   const [characters, setCharacters] = useState([]);
   const [charSelected, setCharSelected] = useState(null);
   const [charComicsList, setCharComicsList] = useState(null);
   const [newListCharsLoad, setNewListCharsLoad] = useState(true);

   useEffect(() => {
      updateChars();
   }, []);

   const updateChars = () => {
      getAllCharacters().then((res) => {
         setCharacters([...res]);
         setCharSelected(res[0]);
         setCharComicsList(res[0].comics);
         setNewListCharsLoad(false);
      });
   };

   const selectChar = (id) => {
      if (id === charSelected.id) {
         return;
      }

      getSingleCharacter(id).then((res) => {
         setCharSelected(res);
         setCharComicsList(res.comics);
      });
   };
   console.log("render");

   const resetCharacters = () => {
      setNewListCharsLoad(true);

      window.scrollTo(0, 0);
      let randomcharOffset = Math.floor(Math.random() * 1450);

      localStorage.setItem("userOffset", randomcharOffset);
      localStorage.setItem("userLimit", 9);
      localStorage.setItem("currentOffset", randomcharOffset);

      updateChars();
   };

   return (
      <div className="char__content">
         <div className="char__list">
            <GenerateCharsList
               newListCharsLoad={newListCharsLoad}
               characters={characters}
               charSelected={charSelected}
               selectChar={selectChar}
            />
            <GenerateLoadNewCharsList newListCharsLoad={newListCharsLoad} setCharacters={setCharacters} resetCharacters={resetCharacters} />
         </div>
         <div className="char__selected">
            <div className="char__selected-container">
               <GenerateSelectedCharContent loading={loading} charSelected={charSelected} charComicsList={charComicsList} />
               <FindInputChar loading={loading} />
            </div>
         </div>
      </div>
   );
};

export { CharContent };
