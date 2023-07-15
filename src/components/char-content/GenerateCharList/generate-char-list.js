import { SpinnerBlock } from "../../UI/spinner-block/spinner-block";

const GenerateCharsList = ({ newListCharsLoad, characters, charSelected, selectChar }) => {
   if (newListCharsLoad) return <SpinnerBlock />;
   else {
      return (
         <>
            <ul className="char__grid">
               {characters.map((item) => {
                  let classes = "";
                  if (charSelected.id === item.id) {
                     classes += "char__item char__item_selected";
                  } else {
                     classes = "char__item";
                  }
                  return (
                     <li className={classes} key={item.id} onClick={() => selectChar(item.id)}>
                        <img className="char__img" src={item.thumbnail} alt=""></img>
                        <div className="char__name-container">{item.name}</div>
                     </li>
                  );
               })}
            </ul>
         </>
      );
   }
};

export { GenerateCharsList };
