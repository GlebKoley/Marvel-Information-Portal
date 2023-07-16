import { useState } from "react";
import { Link } from "react-router-dom";
import { useMarvelRequestServices } from "../../../../services/marvel-service";
import { SpinnerBlock } from "../../../UI/spinner-block/spinner-block";

const FindInputChar = ({ loading }) => {
   const { getSingleCharacterByName } = useMarvelRequestServices();

   const [charName, setCharName] = useState("");
   const [load, setLoad] = useState(false);
   const [emptyName, setEmptyName] = useState(false);
   const [charFound, setCharFound] = useState(false);
   const [charList, setCharList] = useState(null);

   const findCharHandler = () => {
      if (!charName) {
         setEmptyName(false);
         return;
      } else {
         setLoad(true);
         getSingleCharacterByName(charName).then((res) => {
            setCharList(res.data.results);
            setLoad(false);
         });
         setCharName("");
      }
   };

   return (
      <>
         {loading ? null : (
            <div className="char__selected-input-find">
               <p>Or find a character by name:</p>
               <div className="char__selected-input-find-container">
                  <input type="text" placeholder="Enter name" value={charName} onChange={(e) => setCharName(e.target.value)}></input>
                  {charName && (
                     <button
                        className="clear-button"
                        type="reset"
                        title="Click me to clear the input field"
                        onClick={() => setCharName("")}>
                        ✖
                     </button>
                  )}
                  <button className="button-main" onClick={findCharHandler}>
                     FIND
                  </button>
               </div>
               {emptyName && <p>This field is required</p>}
               {load ? <SpinnerBlock /> : ""}
               {charList !== null && (
                  <>
                     <p style={{ color: "#03710E", fontSize: "18px" }}>{charList.length} characters were found by this name:</p>
                     <ul className="char__selected-input-char-list">
                        {charList.map((item) => (
                           <li className="char__selected-input-char-list-item" onClick={() => console.log(item.id)}>
                              <Link to={`${item.id}`} target="_blank">
                                 {item.name}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </>
               )}
            </div>
         )}
      </>
   );
};

export { FindInputChar };
