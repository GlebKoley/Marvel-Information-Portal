import { useState, useRef } from "react";

import { CharactersLists } from "./CharactersLists/CharactersLists";
import { SelectedCharContent } from "./SelectedCharContent/SelectedCharContent";
import { FindCharacter } from "./FindCharacter/FindCharacter";

const CharContent = () => {
   const scrollRef = useRef(null);
   const [currentCharSelected, setCurrentCharSelected] = useState(null);

   const selectedСharacter = (id) => {
      if (window.pageYOffset > 800) scrollRef.current.scrollIntoView({ behavior: "smooth" });
      setCurrentCharSelected(id);
   };

   return (
      <div className="char__content">
         <div className="char__list">
            <CharactersLists selectedСharacter={selectedСharacter} />
         </div>
         <div ref={scrollRef} className="char__selected">
            <div className="char__selected-container">
               <SelectedCharContent currentCharSelected={currentCharSelected} />
               <FindCharacter />
            </div>
         </div>
      </div>
   );
};

export default CharContent;
