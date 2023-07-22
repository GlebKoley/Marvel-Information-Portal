import { useState, useEffect } from "react";
import { animated, useSpring, config } from "@react-spring/web";

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
      getSingleCharacterById(id)
         .then(onCharLoaded)
         .then(() => handleClick());
   };

   const onCharLoaded = (char) => {
      setChar(char);
   };

   const [props, api] = useSpring(
      () => ({
         from: { transform: "translateY(-500px)", opacity: 0 },
         config: config.stiff,
      }),
      []
   );

   const handleClick = () => {
      api.start({
         from: {
            transform: "translateY(-500px)",
            opacity: 0,
         },
         to: {
            transform: "translateY(0px)",
            opacity: 1,
         },
      });
   };

   return (
      <div className="randomchar">
         {error ? <ErrorMessage /> : loading ? <SpinnerBlock /> : <View char={char} props={props} />}
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

const View = ({ char, props }) => {
   const { name, description, thumbnail, homepage, wiki } = char;
   return (
      <animated.div style={props}>
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
      </animated.div>
   );
};

export default RandomCharacterContent;
