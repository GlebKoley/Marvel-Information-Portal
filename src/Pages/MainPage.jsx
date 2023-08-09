import { RandomCharacterBlock } from "../components/RandomCharacterBlock/RandomCharacterBlock";
import { SelectedCharacterInfo } from "../components/SelectedCharacterInfo/SelectedCharacterInfo";
import { CharactersLists } from "../components/CharactersLists/CharactersLists";
import { CharacterSearchBlock } from "../components/CharacterSearchBlock/CharacterSearchBlock";

const MainPage = () => {
   return (
      <>
         <div className="main" style={{ position: "relative", maxWidth: "100%" }}>
            <RandomCharacterBlock />
            <div className="char__content">
               <div className="char__list">
                  <CharactersLists />
               </div>
               <div className="char__selected">
                  <div className="char__selected-container">
                     <SelectedCharacterInfo />
                     <CharacterSearchBlock />
                  </div>
               </div>
            </div>
         </div>
         <div className="footer">
            <img className="footer_img" src="../images/bgAsset.png" alt="bg"></img>
         </div>
      </>
   );
};

export default MainPage;
