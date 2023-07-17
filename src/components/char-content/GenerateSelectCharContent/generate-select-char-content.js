import { Link } from "react-router-dom";
import { SpinnerBlock } from "../../UI/spinner-block/spinner-block";
import { memo } from "react";

const GenerateSelectedCharContent = ({ loading, charSelected, charComicsList }) => {
   if (loading || !charSelected) return <SpinnerBlock />;
   else {
      let descriptionValue = "Description is not aviable",
         comicsValue = "Comics is not aviable",
         descriptionClasess = "char__selected-description";
      if (charSelected.description) descriptionValue = charSelected.description;
      else {
         descriptionClasess += " not-aviable";
      }
      if (charComicsList.length !== 0) comicsValue = "Comics :";

      function generateComicsList() {
         return (
            <ul className="char__selected-comics-lists">
               {charComicsList.map((item, index) => {
                  if (index >= 10) return null;
                  return (
                     <li key={+item.resourceURI.match(/\w+$/gm)}>
                        <Link
                           className="char__selected-comics-list-item"
                           to={`../comics/${item.resourceURI.match(/\w+$/gm).join("")}`}
                           target="_blank">
                           {item.name}
                        </Link>
                     </li>
                  );
               })}
            </ul>
         );
      }

      return (
         <>
            <div className="char__selected-content">
               <img className="char__selected-image" src={charSelected.thumbnail} alt=""></img>
               <div className="char__selected-description-container">
                  <p className="char__selected-name">{charSelected.name}</p>
                  <div className="char__selected-buttons">
                     <button className="button-main">
                        <a href={charSelected.homepage} target="_blank" rel="noreferrer">
                           HOMEPAGE
                        </a>
                     </button>
                     <button className="button-secondary">
                        <a href={charSelected.wiki} target="_blank" rel="noreferrer">
                           WIKI
                        </a>
                     </button>
                  </div>
               </div>
            </div>
            <h1 className={descriptionClasess}>{descriptionValue}</h1>
            <p className="char__selected-comics-text">{comicsValue}</p>
            {generateComicsList()}
         </>
      );
   }
};

export { GenerateSelectedCharContent };
