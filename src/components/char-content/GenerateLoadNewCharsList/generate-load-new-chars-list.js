import { useState } from "react";
import { useMarvelRequestServices } from "../../../services/marvel-service";

import { SpinnerBlock } from "../../UI/spinner-block/spinner-block";
import { ModaWindow } from "../../UI/modal-window/modal-window";

const GenerateLoadNewCharsList = ({ newListCharsLoad, setCharacters, resetCharacters }) => {
   const { loading, loadNewCharacters } = useMarvelRequestServices();

   const [showModal, setShowModal] = useState(false);
   const [charEnded, setCharEnded] = useState(false);

   const loadMoreChars = () => {
      localStorage.setItem("currentOffset", +localStorage.getItem("currentOffset") + 9);
      localStorage.setItem("userLimit", +localStorage.getItem("userLimit") + 9);

      loadNewCharacters().then((res) => {
         if (res.length < 9) {
            setCharEnded(true);
         } else {
            setCharacters((characters) => [...characters, ...res]);
         }
      });
   };

   const openModalHandler = () => {
      document.body.style.overflow = "hidden";
      setShowModal(true);
   };

   if (newListCharsLoad) return null; //скрытие блока кнопок полностью при загрузке данных первый раз или при 'RESET'
   if (loading) return <SpinnerBlock />; // скрытие кнопки "LOAD MORE" когда подгружаются персонажи
   else if (charEnded) return null; //скрытие кнопки "RESET" и скрытие кнопок со страницы когда все персонажи закончились
   return (
      <div className="char__list-buttons">
         <button className="button-main" onClick={() => loadMoreChars()} title="Click to load new 9 characters">
            LOAD MORE
         </button>
         <button className="button-secondary" onClick={() => openModalHandler()}>
            RESET CHARACTERS
         </button>

         {showModal ? <ModaWindow setShowModal={setShowModal} resetCharacters={resetCharacters} /> : null}
      </div>
   );
};

export { GenerateLoadNewCharsList };
