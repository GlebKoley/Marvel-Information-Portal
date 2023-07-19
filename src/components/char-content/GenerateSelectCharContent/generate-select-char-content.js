import { Link } from "react-router-dom";
import { SkeletonLoader } from "../../UI/skeleton";
import { useMarvelRequestServices } from "../../../services/marvel-service";
import { useEffect, useState } from "react";
import { SpinnerBlock } from "../../UI/spinner-block/spinner-block";

const GenerateSelectedCharContent = ({ currentCharSelected }) => {
   console.log("GenerateSelectedCharContent render 4");

   const { getSingleCharacterById, loading } = useMarvelRequestServices();
   const [selectedCharacterContent, setSelectedCharacterContent] = useState([]);

   useEffect(() => {
      if (currentCharSelected === null) return;
      getSingleCharacterById(currentCharSelected).then((res) => {
         setSelectedCharacterContent(res);
      });
   }, [currentCharSelected]);

   if (!currentCharSelected) return <SkeletonLoader />;
   if (loading) return <SpinnerBlock />;
   else {
      return (
         <>
            <div className="char__selected-content">
               <img className="char__selected-image" src={selectedCharacterContent.thumbnail} alt=""></img>
               <div className="char__selected-description-container">
                  <p className="char__selected-name">{selectedCharacterContent.name}</p>
                  <div className="char__selected-buttons">
                     <button className="button-main">
                        <a href={selectedCharacterContent.homepage} target="_blank" rel="noreferrer">
                           HOMEPAGE
                        </a>
                     </button>
                     <button className="button-secondary">
                        <a href={selectedCharacterContent.wiki} target="_blank" rel="noreferrer">
                           WIKI
                        </a>
                     </button>
                  </div>
               </div>
            </div>
            <h1 className={selectedCharacterContent.description ? "char__selected-description" : "char__selected-description not-aviable"}>
               {selectedCharacterContent.description ? selectedCharacterContent.description : "Description not aviable"}
            </h1>

            {selectedCharacterContent.comics === undefined || selectedCharacterContent.comics.length === 0 ? (
               <p className="char__selected-comics-text">Comics not aviable</p>
            ) : (
               <ul className="char__selected-comics-lists">
                  <p className="char__selected-comics-text">Comics :</p>
                  {selectedCharacterContent.comics.map((comic, index) => {
                     if (index >= 10) return null;
                     return (
                        <li key={+comic.resourceURI.match(/\w+$/gm)}>
                           <Link
                              className="char__selected-comics-list-item"
                              to={`../comics/${comic.resourceURI.match(/\w+$/gm).join("")}`}
                              target="_blank">
                              {comic.name}
                           </Link>
                        </li>
                     );
                  })}
               </ul>
            )}
         </>
      );
   }
};

export { GenerateSelectedCharContent };
