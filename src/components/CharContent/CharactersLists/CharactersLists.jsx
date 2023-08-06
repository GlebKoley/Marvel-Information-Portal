import { useState, useRef } from "react";
import { useInfinityQueryContent } from "../../../hooks/useInfinityQueryContent";

import { SpinnerBlock } from "../../UI/SpinnerBlock/SpinnerBlock";
import { ModaWindow } from "../../UI/ModalWindow/ModalWindow";

import { useContext } from "react";
import { CharacterSelectedContext } from "../../../context/CharacterSelectedContext";

const CharactersLists = ({ scrollToCharacterBlock }) => {
   const { setCharacterSelected } = useContext(CharacterSelectedContext);

   const charGridRef = useRef();
   const [backgroundCharById, setBackgroundCharById] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [resetOffset, setResetOffset] = useState(null);

   const { data, fetchNextPage, isFetchingNextPage, isLoading } = useInfinityQueryContent({ queryName: "characters", offset: resetOffset });

   const charIdHandler = (id) => {
      setBackgroundCharById(id);
      scrollToCharacterBlock(id);
      setCharacterSelected(id);
   };

   const resetAllCharacters = () => {
      window.scrollTo(0, 0);
      let randomcharOffset = Math.floor(Math.random() * 1450);
      setResetOffset(randomcharOffset);
   };

   const openModalHandler = () => {
      document.body.style.overflow = "hidden";
      setShowModal(true);
   };

   if (isLoading) return <SpinnerBlock />;

   return (
      <>
         <ul className="char__grid" ref={charGridRef}>
            {data.map((item) => (
               <li className={backgroundCharById === item.id ? "char__item selected" : "char__item"} onClick={() => charIdHandler(item.id)} key={item.id}>
                  <img className="char__img" src={item.thumbnail} alt=""></img>
                  <div className="char__name-container">{item.name}</div>
               </li>
            ))}
         </ul>
         {isFetchingNextPage && <SpinnerBlock />}
         <div className="char__list-buttons">
            <button className="button-main" onClick={() => fetchNextPage()} title="Click to load new 9 characters">
               LOAD MORE
            </button>
            <button className="button-secondary" onClick={() => openModalHandler()}>
               RESET CHARACTERS
            </button>
            {showModal ? <ModaWindow setShowModal={setShowModal} resetAllCharacters={resetAllCharacters} /> : null}
         </div>
      </>
   );
};

export { CharactersLists };
