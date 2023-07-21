import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useMarvelRequestServices } from "../../../services/marvel-service";

import { SkeletonLoader } from "../../UI/SkeletonLoader/SkeletonLoader";
import { SpinnerBlock } from "../../UI/SpinnerBlock/SpinnerBlock";

const SelectedCharContent = ({ currentCharSelected }) => {
   const { getSingleCharacterById, loading } = useMarvelRequestServices();
   const [selectedCharacterContent, setSelectedCharacterContent] = useState([]);
   const [appearCharAnimation, setAppearCharAnimation] = useState(false);

   useEffect(() => {
      if (currentCharSelected === null) return;
      getSingleCharacterById(currentCharSelected).then((res) => {
         setSelectedCharacterContent(res);
         setAppearCharAnimation(true);
      });
   }, [currentCharSelected]);

   if (!currentCharSelected) return <SkeletonLoader />;
   if (loading) return <SpinnerBlock />;
   else {
      return (
         <>
            <CSSTransition
               classNames="char__selected__content__animation"
               in={appearCharAnimation}
               appear={true}
               timeout={300}
               onEntered={() => setAppearCharAnimation(false)}>
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
            </CSSTransition>

            <h1 className={selectedCharacterContent.description ? "char__selected-description" : "char__selected-description not-aviable"}>
               {selectedCharacterContent.description ? selectedCharacterContent.description : "Description not aviable"}
            </h1>

            {selectedCharacterContent.comics === undefined || selectedCharacterContent.comics.length === 0 ? (
               <p className="char__selected-comics-text">Comics not aviable</p>
            ) : (
               <>
                  <p className="char__selected-comics-text">Comics :</p>
                  <TransitionGroup component={"ul"} className="char__selected-comics-lists">
                     {selectedCharacterContent.comics.map((comic, index) => {
                        if (index >= 10) return null;
                        return (
                           <CSSTransition
                              in={appearCharAnimation}
                              key={+comic.resourceURI.match(/\w+$/gm)}
                              classNames="char__selected-comics-list-animation"
                              appear={true}
                              timeout={200}>
                              <li>
                                 <Link
                                    className="char__selected-comics-list-item"
                                    to={`../comics/${comic.resourceURI.match(/\w+$/gm).join("")}`}
                                    target="_blank">
                                    {comic.name}
                                 </Link>
                              </li>
                           </CSSTransition>
                        );
                     })}
                  </TransitionGroup>
               </>
            )}
         </>
      );
   }
};

export { SelectedCharContent };
