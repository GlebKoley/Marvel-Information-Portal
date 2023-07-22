import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTrail, useSpring, animated, config } from "@react-spring/web";
import { useMarvelRequestServices } from "../../../services/marvel-service";

import { SkeletonLoader } from "../../UI/SkeletonLoader/SkeletonLoader";
import { SpinnerBlock } from "../../UI/SpinnerBlock/SpinnerBlock";

const SelectedCharContent = ({ currentCharSelected }) => {
   const { getSingleCharacterById, loading } = useMarvelRequestServices();
   const [selectedCharacterContent, setSelectedCharacterContent] = useState([]);

   useEffect(() => {
      if (currentCharSelected === null) return;
      getSingleCharacterById(currentCharSelected).then((res) => {
         setSelectedCharacterContent(res);
      });
   }, [currentCharSelected]);

   useEffect(() => {
      handleClick();
   }, [selectedCharacterContent]);

   const [animatedComicsList, api] = useTrail(
      selectedCharacterContent?.comics?.length > 0 ? selectedCharacterContent.comics.length : 10,
      () => ({
         from: { transform: "translateX(100px)" },
         // config: { ...config.gentle, duration: 100 },
         config: { mass: 1, tension: 3000, friction: 100 },
      })
   );

   const [animatedCharContetn, apiTwo] = useSpring(() => ({
      from: { transform: "translateX(100px)" },
      config: { mass: 2, tension: 1500, friction: 100 },
   }));

   const handleClick = () => {
      api.start({
         from: {
            transform: "translateX(100px)",
         },
         to: {
            transform: "translateX(0px)",
         },
      });
      apiTwo.start({
         from: {
            transform: "translateX(100px)",
         },
         to: {
            transform: "translateX(0px)",
         },
      });
   };

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
               <h1
                  className={
                     selectedCharacterContent.description ? "char__selected-description" : "char__selected-description not-aviable"
                  }>
                  {selectedCharacterContent.description ? selectedCharacterContent.description : "Description not aviable"}
               </h1>
            </animated.div>

            {selectedCharacterContent.comics === undefined || selectedCharacterContent.comics.length === 0 ? (
               <p className="char__selected-comics-text">Comics not aviable</p>
            ) : (
               <>
                  <p className="char__selected-comics-text">Comics :</p>
                  <ul className="char__selected-comics-lists">
                     {animatedComicsList.map((props, index) => {
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
                  </ul>
               </>
            )}
         </>
      );
   }
};

export { SelectedCharContent };
