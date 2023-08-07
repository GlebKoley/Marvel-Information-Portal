import { useRef } from "react";

import { CharactersLists } from "./CharactersLists/CharactersLists";
import { SelectedCharContent } from "./SelectedCharContent/SelectedCharContent";
import { FindCharacterForm } from "./FindCharacterForm/FindCharacterForm";

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
         <div className="char__selected">
            <div ref={scrollRef} className="char__selected-container">
               <SelectedCharContent />
               <FindCharacterForm />
            </div>
         </div>
      </div>
   );
};

export default CharContent;
