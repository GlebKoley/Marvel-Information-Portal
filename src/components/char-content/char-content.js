import { useState } from "react";

import { GenerateCharsList } from "./GenerateCharList/generate-char-list";
import { GenerateSelectedCharContent } from "./GenerateSelectCharContent/generate-select-char-content";
import { FindInputChar } from "./FindInputChar/FindInputChar";

const CharContent = () => {
   const [currentCharSelected, setCurrentCharSelected] = useState(null);

   const selectedСharacter = (id) => {
      setCurrentCharSelected(id);
   };

   return (
      <div className="char__content">
         <div className="char__list">
            <GenerateCharsList selectedСharacter={selectedСharacter} />
         </div>
         <div className="char__selected">
            <div className="char__selected-container">
               <GenerateSelectedCharContent currentCharSelected={currentCharSelected} />
               <FindInputChar />
            </div>
         </div>
      </div>
   );
};

export { CharContent };
