import { useState, useRef } from "react";
import { useContext } from "react";
import { useGetCharByName } from "../../hooks/useGetCharByName";
import { useDebounce } from "../../hooks/useDebounce";

import AnimateHeight from "react-animate-height";
import { Link } from "react-router-dom";

import { CharacterSelectedContext } from "../../context/CharacterSelectedContext";

const CharacterSearchBlock = () => {
   const currentCharListHeightValue = useRef(null);
   const { findCharacterList } = useContext(CharacterSelectedContext);

   const [characterName, setCharacterName] = useState(findCharacterList || null);
   const [showCharactersList, setShowCharactersList] = useState(false);
   const [height, setHeight] = useState(370);
   const [resetListValue, setResetListValue] = useState(false);

   const debouncedValue = useDebounce(characterName, 400, resetListValue);

   const { charByNameQuery } = useGetCharByName(debouncedValue);

   return (
      <div className="char__selected-input-find">
         <p>Or find a character by name:</p>

         <form className="char__selected-input-find-container" onSubmit={(event) => event.preventDefault()}>
            <div className="form-container">
               <input
                  value={characterName}
                  onChange={(e) => {
                     setResetListValue(false);
                     setCharacterName(e.target.value);
                  }}
                  placeholder="Start typing the character's name"
               />
               {characterName && (
                  <button
                     className="form__clear-button"
                     type="reset"
                     title="Click me to clear the input field"
                     onClick={() => {
                        setResetListValue(true);
                        setCharacterName("");
                     }}>
                     ✖
                  </button>
               )}
            </div>
         </form>
         {charByNameQuery?.data?.length === 0 && <p style={{ color: "#9f0013", fontSize: "18px" }}>Couldn't find a character by this name</p>}
         {charByNameQuery?.data?.length > 0 && (
            <>
               <AnimateHeight
                  duration={500}
                  height={currentCharListHeightValue?.current?.clientHeight < 370 ? currentCharListHeightValue?.current?.clientHeight : height}>
                     <ul  ref={currentCharListHeightValue} className="char__selected-input-char-list">
                        {charByNameQuery?.data.map((item) => (
                           <li key={item.id}>
                              <Link to={`characters/${item.id}`} className="char__selected-input-char-list-item">
                                 <img className="char__selected-input-char-list-image" src={item.thumbnail} alt=""></img>
                                 {item.name}
                              </Link>
                           </li>
                        ))}
                     </ul>
               </AnimateHeight>
               {charByNameQuery?.data?.length > 5 && (
                  <button
                     className="button-main"
                     onClick={() => {
                        setHeight(height === 370 ? "auto" : 370);
                        setShowCharactersList(!showCharactersList);
                     }}>
                     {showCharactersList ? "Hide" : "Show all"}
                  </button>
               )}
            </>
         )}
      </div>
   );
};

export { CharacterSearchBlock };
