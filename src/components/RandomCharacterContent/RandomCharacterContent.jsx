import { useState } from "react";

import { ErrorMessage } from "../UI/ErrorMessage/ErrorMessage";
import { SpinnerBlock } from "../UI/SpinnerBlock/SpinnerBlock";

import { useGetCharById } from "../../hooks/useGetCharById";

const RandomCharacterContent = () => {
   const randomId = () => Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

   const [id, setId] = useState(randomId);
   const { charByIdQuery } = useGetCharById(id);

   return (
      <div className="randomchar">
         {charByIdQuery.isLoading ? <SpinnerBlock /> : <CharBlock charByIdQuery={charByIdQuery.data} />}

         <div className="randomchar__static">
            <p className="randomchar__static-title">
               Random character for today!
               <br></br>
               Do you want to get to know him better?
            </p>
            <p className="randomchar__static-title">Or choose another one</p>
            <button className="button-main" onClick={() => setId(randomId)}>
               TRY IT
            </button>
            <img className="randomchar__static-decoration" src="../images/Decoration.png" alt="mjolnir"></img>
         </div>
      </div>
   );
};

const CharBlock = ({ charByIdQuery }) => {
   if (charByIdQuery === undefined) {
      return (
         <div className="randomchar__block">
            <ErrorMessage />
         </div>
      );
   }

   const { name, description, thumbnail, homepage, wiki } = charByIdQuery[0];
   return (
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
   );
};

export default RandomCharacterContent;
