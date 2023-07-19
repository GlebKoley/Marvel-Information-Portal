import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useMarvelRequestServices } from "../../../services/marvel-service";
import { SpinnerBlock } from "../../UI/spinner-block/spinner-block";

const FindInputChar = () => {
   const { getSingleCharacterByName } = useMarvelRequestServices();
   const charUlRef = useRef(null);
   const inputRef = useRef(null);

   const [charName, setCharName] = useState("");
   const [load, setLoad] = useState(false);
   const [emptyName, setEmptyName] = useState(false);
   const [charList, setCharList] = useState(null);
   const [refButtonValue, setRefButtonValue] = useState(true);

   const findCharHandler = () => {
      if (charName === "") {
         setEmptyName(true);
         inputRef.current.focus();
         return;
      } else {
         setEmptyName(false);
         setLoad(true);
         setRefButtonValue(true);

         getSingleCharacterByName(charName).then((res) => {
            setCharList(res.data.results);
            setLoad(false);
         });

         setCharName("");
      }
   };

   const onEnterClick = (e) => {
      if (e.key === "Enter") {
         if (charUlRef.current !== null) {
            charUlRef.current.style.maxHeight = "160px";
            setRefButtonValue(true);
         }
         findCharHandler();
      }
   };

   console.log("FindInputChar render 1");

   const changeMaxHeigth = () => {
      setRefButtonValue((value) => !value);
      console.log(refButtonValue);
      if (!refButtonValue) {
         charUlRef.current.style.maxHeight = `160px`;
      } else {
         charUlRef.current.style.maxHeight = `1000px`;
      }
   };

   return (
      <>
         <div className="char__selected-input-find">
            <p>Or find a character by name:</p>
            <div className="char__selected-input-find-container">
               <div className="form-container">
                  <input
                     ref={inputRef}
                     type="text"
                     placeholder="Enter character name"
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
            {emptyName ? <p style={{ color: "#9f0013", fontSize: "18px" }}>This field is required</p> : ""}

            {load ? (
               <SpinnerBlock />
            ) : (
               charList !== null && (
                  <>
                     <p style={{ color: "#03710E", fontSize: "18px" }}>{charList.length} characters were found by this name</p>
                     <ul ref={charUlRef} className="char__selected-input-char-list">
                        {charList.map((item) => (
                           <li key={item.id} className="char__selected-input-char-list-item">
                              <NavLink to={`characters/${item.id}`} target="_blank">
                                 {item.name}
                              </NavLink>
                           </li>
                        ))}
                     </ul>
                     {charList !== null && charList.length > 5 && (
                        <button className="button-main" onClick={changeMaxHeigth}>
                           {refButtonValue ? "Show all" : "Hide"}
                        </button>
                     )}
                  </>
               )
            )}
         </div>
      </>
   );
};

export { FindInputChar };
