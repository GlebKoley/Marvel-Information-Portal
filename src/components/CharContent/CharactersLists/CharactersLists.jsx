import { SpinnerBlock } from "../../UI/SpinnerBlock/SpinnerBlock";
import { useMarvelRequestServices } from "../../../services/marvel-service";
import { useEffect, useState } from "react";
import { ModaWindow } from "../../UI/ModalWindow/ModalWindow";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const CharactersLists = ({ selectedСharacter }) => {
   const { getAllCharacters, loadNewCharacters, loading } = useMarvelRequestServices();

   const [characters, setCharacters] = useState([]);
   const [listsAppearAnimation, setListsAppearAnimation] = useState(false);
   const [backgroundCharById, setBackgroundCharById] = useState(null);
   const [resetLoading, setResetLoading] = useState(false);

   const [showModal, setShowModal] = useState(false);
   const [charEnded, setCharEnded] = useState(false);

   useEffect(() => {
      getAllCharacters().then((res) => {
         setCharacters([...res]);
      });
      setListsAppearAnimation(true);
   }, []);

   const charIdHandler = (id) => {
      setBackgroundCharById(id);

      selectedСharacter(id);
   };

   const loadMoreCharacters = () => {
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

   const resetAllCharacters = () => {
      window.scrollTo(0, 0);
      setResetLoading(true);
      let randomcharOffset = Math.floor(Math.random() * 1450);

      localStorage.setItem("userOffset", randomcharOffset);
      localStorage.setItem("userLimit", 9);
      localStorage.setItem("currentOffset", randomcharOffset);

      getAllCharacters().then((res) => {
         setCharacters([...res]);
         setResetLoading(false);
      });
   };

   const openModalHandler = () => {
      document.body.style.overflow = "hidden";
      setShowModal(true);
   };

   if (characters.length < 1 || resetLoading) return <SpinnerBlock />;

   return (
      <>
         <CSSTransition classNames="char__grid__animation" timeout={600} in={listsAppearAnimation} appear={true}>
            <TransitionGroup component={"ul"} className="char__grid">
               {characters.map((item) => (
                  <CSSTransition key={item.id} classNames="char__list__animation" timeout={600}>
                     <li
                        className={backgroundCharById === item.id ? "char__item selected" : "char__item"}
                        onClick={() => charIdHandler(item.id)}>
                        <img className="char__img" src={item.thumbnail} alt=""></img>
                        <div className="char__name-container">{item.name}</div>
                     </li>
                  </CSSTransition>
               ))}
            </TransitionGroup>
         </CSSTransition>

         {loading ? (
            <SpinnerBlock />
         ) : (
            !charEnded && (
               <div className="char__list-buttons">
                  <button className="button-main" onClick={() => loadMoreCharacters()} title="Click to load new 9 characters">
                     LOAD MORE
                  </button>
                  <button className="button-secondary" onClick={() => openModalHandler()}>
                     RESET CHARACTERS
                  </button>
                  {showModal ? <ModaWindow setShowModal={setShowModal} resetAllCharacters={resetAllCharacters} /> : null}
               </div>
            )
         )}
      </>
   );
};

export { CharactersLists };
