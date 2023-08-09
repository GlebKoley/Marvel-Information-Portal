import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import { useGetCharByName } from "../../../hooks/useGetCharByName";

import { Link } from "react-router-dom";
import { SpinnerBlock } from "../../UI/SpinnerBlock/SpinnerBlock";

import { useContext } from "react";
import { CharacterSelectedContext } from "../../../context/CharacterSelectedContext";

import AnimateHeight from "react-animate-height";

const FindCharacterForm = () => {
   let searchInput = useRef(null);
   let listRef = useRef(null);
   const { findCharacterList } = useContext(CharacterSelectedContext);

   const [characterName, setCharacterName] = useState(findCharacterList || null);
   const [showCharactersList, setShowCharactersList] = useState(false);
   const [height, setHeight] = useState(160);

   const {
      register,
      handleSubmit,
      reset,
      clearErrors,
      formState: { errors, isDirty: inputNotEmpty },
   } = useForm();

   const { ref, ...inputRest } = register("charaterName", {
      required: "This field is required",
      minLength: { value: 3, message: "Minimum length 3 symbol" },
      maxLength: { value: 17, message: "adwdawd" },
   });

   const onSubmit = (data) => {
      searchInput.current.blur();
      reset();
      clearErrors();
      setCharacterName(data.charaterName);
   };

   console.log("render");

   const { charByNameQuery } = useGetCharByName(characterName);

   return (
      <>
         <div className="char__selected-input-find">
            <p>Or find a character by name:</p>
            <form className="char__selected-input-find-container" onSubmit={handleSubmit(onSubmit)}>
               <div className="form-container">
                  <input
                     {...inputRest}
                     name="charaterName"
                     ref={(e) => {
                        ref(e);
                        searchInput.current = e;
                     }}
                     placeholder="Enter character name"></input>

                  {inputNotEmpty && (
                     <button className="clear-button" type="reset" title="Click me to clear the input field" onClick={() => reset()}>
                        ✖
                     </button>
                  )}
               </div>
               <input type="submit" value="FIND" className="button-main" />
            </form>
            {errors?.charaterName?.message && <p style={{ color: "#9f0013", fontSize: "18px" }}>{errors?.charaterName?.message}</p>}
            {charByNameQuery.isInitialLoading && <SpinnerBlock />}
            {charByNameQuery?.data?.length > 1 && (
               <>
                  <p style={{ color: "#03710E", fontSize: "18px" }}>{charByNameQuery.data.length} characters were found by this name</p>
                  <AnimateHeight duration={1000} height={height}>
                     <ul ref={listRef} className="char__selected-input-char-list">
                        {charByNameQuery?.data.map((item) => (
                           <li key={item.id} className="char__selected-input-char-list-item">
                              <Link to={`characters/${item.id}`}>{item.name}</Link>
                           </li>
                        ))}
                     </ul>
                  </AnimateHeight>
                  {charByNameQuery?.data !== null && charByNameQuery?.data.length > 5 && (
                     <button
                        className="button-main"
                        onClick={() => {
                           setShowCharactersList(!showCharactersList);
                           setHeight(height === 160 ? "auto" : 160);
                        }}>
                        {showCharactersList ? "Hide" : "Show all"}
                     </button>
                  )}
               </>
            )}
         </div>
      </>
   );
};

export { FindCharacterForm };
