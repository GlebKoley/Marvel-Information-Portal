import { useState } from "react";
import { useInfinityQueryContent } from "../../hooks/useInfinityQueryContent";

import { SpinnerBlock } from "../UI/SpinnerBlock/SpinnerBlock";
import { ModaWindow } from "../UI/ModalWindow/ModalWindow";

import { useContext } from "react";
import { CharacterSelectedContext } from "../../context/CharacterSelectedContext";

import { motion } from "framer-motion";

const CharactersLists = () => {
   const { setCharacterSelected } = useContext(CharacterSelectedContext);

   const [backgroundCharById, setBackgroundCharById] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [resetOffset, setResetOffset] = useState(null);

   const { data, fetchNextPage, isFetchingNextPage, isLoading, isError } = useInfinityQueryContent({ queryName: "characters", offset: resetOffset });

   const charIdHandler = (id) => {
      setBackgroundCharById(id);
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

   if (isError) return <p>ОШИБКА ЗАПРОСА</p>;

   if (isLoading) return <SpinnerBlock />;

   return (
      <div className="char__content">
         <div className="char__list">
            <motion.ul transition={{ duration: 0.4 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="char__grid">
               {data.map((item) => (
                  <li className={backgroundCharById === item.id ? "char__item selected" : "char__item"} onClick={() => charIdHandler(item.id)} key={item.id}>
                     <img className="char__img" src={item.thumbnail} alt=""></img>
                     <div className="char__name-container">{item.name}</div>
                  </li>
               ))}
            </motion.ul>
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
         </div>
      </div>
   );
};

export { CharactersLists };
