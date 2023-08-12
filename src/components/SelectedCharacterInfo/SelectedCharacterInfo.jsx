import { useContext } from "react";
import { useGetCharById } from "../../hooks/useGetCharById";

import { CharacterSelectedContext } from "../../context/CharacterSelectedContext";
import { Link } from "react-router-dom";

import { SpinnerBlock } from "../UI/SpinnerBlock/SpinnerBlock";
import { SkeletonLoader } from "../UI/SkeletonLoader/SkeletonLoader";

const SelectedCharacterInfo = () => {
   const { characterSelected } = useContext(CharacterSelectedContext);

   const { charByIdQuery } = useGetCharById(characterSelected, "character selected");

   if (characterSelected === null) return <SkeletonLoader />;

   if (charByIdQuery.isLoading) return <SpinnerBlock />;

   const { name, thumbnail, homepage, wiki, description, comics } = charByIdQuery?.data[0];

   return (
      <>
         <div className="char__selected-content">
            <img className="char__selected-image" src={thumbnail} alt=""></img>
            <div className="char__selected-description-container">
               <p className="char__selected-name">{name}</p>
               <div className="char__selected-buttons">
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
         <h1 className={description ? "char__selected-description" : "char__selected-description not-aviable"}>
            {description ? description : "Description not aviable"}
         </h1>
         {comics.length < 1 ? (
            <p className="char__selected-comics-text">Comics not aviable</p>
         ) : (
            <>
               <p className="char__selected-comics-text">Comics :</p>
               <ul className="char__selected-comics-lists">
                  {comics.map((_, index) => {
                     if (comics[index] === undefined || index >= 10) return null;

                     return (
                        <li key={+comics[index].resourceURI.match(/\w+$/gm).join("")}>
                           <Link
                              to={{ pathname: `../comics/${comics[index].resourceURI.match(/\w+$/gm).join("")}`, state: "comicsPage" }}
                              className="char__selected-comics-list-item">
                              {comics[index].name}
                           </Link>
                        </li>
                     );
                  })}
               </ul>
            </>
         )}
      </>
   );
};

export { SelectedCharacterInfo };
