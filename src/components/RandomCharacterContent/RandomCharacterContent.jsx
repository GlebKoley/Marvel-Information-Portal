import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import { useMarvelRequestServices } from "../../services/marvel-service";
import { ErrorMessage } from "../UI/ErrorMessage/ErrorMessage";
import { SpinnerBlock } from "../UI/SpinnerBlock/SpinnerBlock";

const RandomCharacterContent = () => {
   const { loading, error, getSingleCharacterById, clearError } = useMarvelRequestServices();
   const [char, setChar] = useState({});

   useEffect(() => {
      updateChar();
   }, []);

   const updateChar = () => {
      clearError();
      const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
      getSingleCharacterById(id).then(onCharLoaded);
   };

   const onCharLoaded = (char) => {
      setChar(char);
   };

   return (
      <div className="randomchar">
         {error ? <ErrorMessage /> : loading ? <SpinnerBlock /> : <View char={char} />}
         <div className="randomchar__static">
            <p className="randomchar__static-title">
               Random character for today!
               <br></br>
               Do you want to get to know him better?
            </p>
            <p className="randomchar__static-title">Or choose another one</p>
            <button className="button-main" onClick={updateChar}>
               TRY IT
            </button>
            <img className="randomchar__static-decoration" src="../images/Decoration.png" alt="mjolnir"></img>
         </div>
      </div>
   );
};

const View = ({ char }) => {
   const { name, description, thumbnail, homepage, wiki } = char;
   return (
      <CSSTransition classNames="randomchar__block__animation" in={true} appear={true} timeout={400}>
         <div className="randomchar__block">
            <img className="randomchar__block-img" src={thumbnail} alt=""></img>
            <div className="randomchar__block-info">
               <h1 className="randomchar__name">{name}</h1>
               <p className="randomchar__selected-descriptioniption">{description ? description : "Description is not aviable"}</p>
               <div className="randomchar__button-flex">
                  <button className="button-main">
                     <a href={homepage} target="_blank" rel="noreferrer">
                        HOMEPAGE
                     </a>
                  </button>
                  <button className="button-secondary">
                     <a href={wiki} target="_blank" rel="noreferrer">
                        WIKI
                     </a>
                  </button>
               </div>
            </div>
         </div>
      </CSSTransition>
   );
};

export default RandomCharacterContent;
