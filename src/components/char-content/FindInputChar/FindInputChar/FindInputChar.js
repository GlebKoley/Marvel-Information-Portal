import { useState } from "react";
import { Link } from "react-router-dom";
import { useMarvelRequestServices } from "../../../../services/marvel-service";

const FindInputChar = ({ loading }) => {
   const { getSingleCharacterByName } = useMarvelRequestServices();

   const [charName, setCharName] = useState("");
   const [emptyName, setEmptyName] = useState(false);
   const [charFound, setCharFound] = useState(false);
   const [charList, setCharList] = useState(null);

   const findCharHandler = () => {
      if (!charName) {
         setEmptyName((emptyName) => !emptyName);
         return;
      } else {
         getSingleCharacterByName(charName).then((res) => {
            setCharList(res.data.results);
         });
      }
   };

   const charNameHandler = (e) => {
      setCharName(e.target.value);
   };

   return (
      <>
         {loading ? null : (
            <div className="char__selected-input-find">
               <p>Or find a character by name:</p>
               <div className="char__selected-input-find-container">
                  <input className="test" type="text" placeholder="Enter name" value={charName} onChange={charNameHandler} />
                  <Link to={""} className="button-main" onClick={findCharHandler}>
                     FIND
                  </Link>
                  {/* <Link to={`${item.id}`} className="button-main" onClick={findCharHandler}>
                     FIND
                  </Link> */}
               </div>
               {emptyName && <p>This field is required</p>}
               {/* {!emptyName && charFound ? <p>The character was not found. Check the name and try again</p> : <p>There is! Visit page?</p>} */}
               {charList !== null &&
                  charList.map((item) => (
                     <li className="char__selected-comics-list-item" onClick={() => console.log(item.id)}>
                        <Link to={`${item.id}`}>{item.name}</Link>
                     </li>
                  ))}
            </div>
         )}
      </>
   );
};

export { FindInputChar };
