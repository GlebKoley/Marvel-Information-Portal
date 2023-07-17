import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useMarvelRequestServices } from "../../../services/marvel-service";
import { SpinnerBlock } from "../../UI/spinner-block/spinner-block";

const FindInputChar = ({ loading }) => {
   const { getSingleCharacterByName } = useMarvelRequestServices();
   const charUlRef = useRef(null);

   const [charName, setCharName] = useState("spider");
   const [load, setLoad] = useState(false);
   const [emptyName, setEmptyName] = useState(false);
   const [charList, setCharList] = useState(null);
   // const [charFound, setCharFound] = useState(false);

   const findCharHandler = () => {
      if (charUlRef.current !== null) {
         charUlRef.current.style.maxHeight = "170px";
      }
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

   const onEnterClick = (e) => {
      if (charUlRef.current !== null) {
         charUlRef.current.style.maxHeight = "170px";
      }
      if (e.key === "Enter") {
         findCharHandler();
      }
   };

   const plusHeigth = () => {
      let value = +charUlRef.current.style.maxHeight.replace("px", "") + 1000;
      charUlRef.current.style.maxHeight = `${+value}px`;
   };

   return (
      <>
         {loading ? null : (
            <div className="char__selected-input-find">
               <p>Or find a character by name:</p>
               <div className="char__selected-input-find-container">
                  <div className="form-container">
                     <input
                        type="text"
                        placeholder="Enter name"
                        value={charName}
                        onChange={(e) => setCharName(e.target.value)}
                        onKeyDown={onEnterClick}></input>
                     {charName && (
                        <button
                           className="clear-button"
                           type="reset"
                           title="Click me to clear the input field"
                           onClick={() => setCharName("")}>
                           ✖
                        </button>
                     )}
                  </div>
                  <button className="button-main" onClick={findCharHandler}>
                     FIND
                  </button>
               </div>
               {emptyName && <p>This field is required</p>}
               {load ? <SpinnerBlock /> : ""}
               {charList !== null && (
                  <>
                     <p style={{ color: "#03710E", fontSize: "18px" }}>{charList.length} characters were found by this name:</p>
                     <ul ref={charUlRef} className="char__selected-input-char-list">
                        {charList.map((item) => (
                           <li className="char__selected-input-char-list-item" onClick={() => console.log(item.id)}>
                              <Link to={`${item.id}`} target="_blank">
                                 {item.name}
                              </Link>
                           </li>
                        ))}
                     </ul>
                     {charList !== null && charList.length > 5 && (
                        <button className="button-main" onClick={plusHeigth}>
                           Show all
                        </button>
                     )}
                  </>
               )}
            </div>
         )}
      </>
   );
};

export { FindInputChar };
