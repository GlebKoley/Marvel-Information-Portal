import { useState, useRef } from "react";

import { CharactersLists } from "./CharactersLists/CharactersLists";
import { SelectedCharContent } from "./SelectedCharContent/SelectedCharContent";
import { FindCharacter } from "./FindCharacter/FindCharacter";
import { SkeletonLoader } from "../UI/SkeletonLoader/SkeletonLoader";

const CharContent = () => {
   const scrollRef = useRef(null);

   const scrollToCharacterBlock = () => {
      if (window.pageYOffset > 800) scrollRef.current.scrollIntoView({ behavior: "smooth" });
   };

   return (
      <div className="char__content">
         <div className="char__list">
            <CharactersLists scrollToCharacterBlock={scrollToCharacterBlock} />
         </div>
         <div ref={scrollRef} className="char__selected">
            <div className="char__selected-container">
               {/* {currentCharSelected ? <SelectedCharContent currentCharSelected={currentCharSelected} /> : <SkeletonLoader />} */}
               {/* <SelectedCharContent currentCharSelected={currentCharSelected} /> */}
               <SelectedCharContent />
               <FindCharacter />
            </div>
         </div>
      </div>
   );
};

export default CharContent;
