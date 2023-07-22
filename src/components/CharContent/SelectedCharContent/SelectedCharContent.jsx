import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { useMarvelRequestServices } from "../../../services/marvel-service";

import { SkeletonLoader } from "../../UI/SkeletonLoader/SkeletonLoader";
import { SpinnerBlock } from "../../UI/SpinnerBlock/SpinnerBlock";

import { useTrail, useSpring, animated } from "@react-spring/web";

const SelectedCharContent = ({ currentCharSelected }) => {
   const { getSingleCharacterById, loading } = useMarvelRequestServices();
   const [selectedCharacterContent, setSelectedCharacterContent] = useState([]);
   const [appearCharAnimation, setAppearCharAnimation] = useState(false);

   useEffect(() => {
      if (currentCharSelected === null) return;
      getSingleCharacterById(currentCharSelected).then((res) => {
         setSelectedCharacterContent(res);
         setAppearCharAnimation(true);
         console.log(selectedCharacterContent);
      });
   }, [currentCharSelected]);

   const animatedComicsList = useTrail(10, {
      config: { mass: 4, tension: 2000, friction: 60 },
      transform: !loading ? "translateX(0px)" : "translateX(-20px)",
      from: { transform: "translateX(0px)" },
   });

   const animatedCharContetn = useSpring({
      config: { mass: 2, tension: 1500, friction: 100 },
      transform: !loading ? "translateX(0px)" : "translateX(-20px)",
      from: { transform: "translateX(0px)" },
   });

   if (!currentCharSelected) return <SkeletonLoader />;
   if (loading) return <SpinnerBlock />;
   else {
      return (
         <>
            <animated.div style={animatedCharContetn}>
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
            </animated.div>

            <h1 className={selectedCharacterContent.description ? "char__selected-description" : "char__selected-description not-aviable"}>
               {selectedCharacterContent.description ? selectedCharacterContent.description : "Description not aviable"}
            </h1>

            {selectedCharacterContent.comics === undefined || selectedCharacterContent.comics.length === 0 ? (
               <p className="char__selected-comics-text">Comics not aviable</p>
            ) : (
               <>
                  <p className="char__selected-comics-text">Comics :</p>
                  <ul className="char__selected-comics-lists">
                     {animatedComicsList.map((props, index) => {
                        console.log(index);
                        if (selectedCharacterContent.comics[index] === undefined || index >= 10) return null;
                        return (
                           <animated.li style={props} key={+selectedCharacterContent.comics[index].resourceURI.match(/\w+$/gm).join("")}>
                              <Link
                                 className="char__selected-comics-list-item"
                                 to={`../comics/${selectedCharacterContent.comics[index].resourceURI.match(/\w+$/gm).join("")}`}
                                 target="_blank">
                                 {selectedCharacterContent.comics[index].name}
                              </Link>
                           </animated.li>
                        );
                     })}

                     {/* {selectedCharacterContent.comics.map((comic, index) => {
                     if (index >= 10) return null;
                     return (
                        <li>
                           <Link
                              className="char__selected-comics-list-item"
                              to={`../comics/${comic.resourceURI.match(/\w+$/gm).join("")}`}
                              target="_blank">
                              {comic.name}
                           </Link>
                        </li>
                     );
                  })} */}
                  </ul>
               </>
            )}
         </>
      );
   }
};

export { SelectedCharContent };
