import { useState, useRef, useEffect } from "react";
import { useGetCharByName } from "../../../hooks/useGetCharByName";
import { useQuery } from "@tanstack/react-query";

import { NavLink } from "react-router-dom";
import { api } from "../../../services/api";

import { SpinnerBlock } from "../../UI/SpinnerBlock/SpinnerBlock";

const FindCharacter = () => {
   const { request } = api();
   const charUlRef = useRef(null);
   const inputRef = useRef(null);

   const [charName, setCharName] = useState("");
   const [findCharByName, setFindCharByName] = useState("");
   const [emptyName, setEmptyName] = useState(false);
   const [refButtonValue, setRefButtonValue] = useState(true);

   const [requestik, setRequest] = useState(false);

   // const { charByNameQuery } = useGetCharByName(findCharByName);

   const findCharHandler = () => {
      console.log(findCharByName);
      if (charName === "") {
         setEmptyName(true);
         inputRef.current.focus();
         return;
      } else {
         setRequest(true);
         setEmptyName(false);
         setRefButtonValue(true);
         getChar(charName);
         setFindCharByName(charName);
         setCharName("");
      }
   };

   // console.log(charByNameQuery?.data);
   // useEffect(() => {
   //    setFindCharByName("");
   // }, [findCharByName]);

   const onEnterClick = (e) => {
      if (e.key === "Enter") {
         if (charUlRef.current !== null) {
            charUlRef.current.style.maxHeight = "160px";
            setRefButtonValue(true);
         }
         findCharHandler();
      }
   };

   const getChar = (name) => {
      return request(`/characters?nameStartsWith=${name}`);
   };

   function fet() {}
   const charByNameQuery = useQuery(["characters", findCharByName], () => getChar(), {
      // select: (data) => data.data.data.results,
      enabled: Boolean(requestik),
      onSuccess: (data) => console.log(data),
   });

   // console.log(charByNameQuery.data);

   // if (charByNameQuery.isFetching) return <SpinnerBlock />;

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
                     <button className="clear-button" type="reset" title="Click me to clear the input field" onClick={() => setCharName("")}>
                        ✖
                     </button>
                  )}
               </div>
               <button className="button-main" onClick={findCharHandler}>
                  FIND
               </button>
            </div>
            {emptyName ? <p style={{ color: "#9f0013", fontSize: "18px" }}>This field is required</p> : ""}

            {/* {charByNameQuery.isSuccess && (
               <>
                  <p style={{ color: "#03710E", fontSize: "18px" }}>{charByNameQuery.data.length} characters were found by this name</p>
                  <ul ref={charUlRef} className="char__selected-input-char-list">
                     {charByNameQuery.data.map((item) => (
                        <li key={item.id} className="char__selected-input-char-list-item">
                           <NavLink to={`characters/${item.id}`} target="_blank">
                              {item.name}
                           </NavLink>
                        </li>
                     ))}
                  </ul>
                  {charByNameQuery.data !== null && charByNameQuery.data.length > 5 && (
                     <button className="button-main" onClick={"changeMaxHeigth"}>
                        {refButtonValue ? "Show all" : "Hide"}
                     </button>
                  )}
               </>
            )} */}
         </div>
      </>
   );
};

export { FindCharacter };
