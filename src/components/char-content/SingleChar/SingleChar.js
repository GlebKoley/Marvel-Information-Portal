import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMarvelRequestServices } from "../../../services/marvel-service";
import { SpinnerBlock } from "../../UI/spinner-block/spinner-block";

const SingleChar = () => {
   const { charId } = useParams();
   const { getSingleCharacter, loading } = useMarvelRequestServices();
   const [char, setChar] = useState(null);

   useEffect(() => {
      getSingleCharacter(charId).then((res) => setChar(res));
   }, [charId]);

   console.log(char);
   if (loading || char == null) return <SpinnerBlock />;

   return (
      <div className="single_char-container">
         <img className="single_char-container-img" src={char.thumbnail} alt=""></img>
         <div className="single_char-container-descr-wrapper">
            <h1 className="single_char-title">{char.name}</h1>
            <p className="single_char-descr">{char.description.length > 800 ? char.description.slice(0, 800) + "..." : char.description}</p>
         </div>
      </div>
   );
};

export { SingleChar };
