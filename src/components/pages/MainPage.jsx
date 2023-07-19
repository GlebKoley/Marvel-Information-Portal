import { RandomCharacterContent } from "../RandomCharacterContent/RandomCharacterContent";
import { CharContent } from "../CharContent/CharContent";

const MainPage = () => {
   return (
      <div className="container" style={{ position: "relative", maxWidth: "100%" }}>
         <RandomCharacterContent />
         <CharContent />
         <img className="bg__img" src="../images/bgAsset.png" alt="bg"></img>
      </div>
   );
};

export { MainPage };
