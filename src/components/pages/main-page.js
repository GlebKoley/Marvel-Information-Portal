import { Randomchar } from "../random-char/random-char";
import { CharContent } from "../char-content/char-content";

const MainPage = () => {
   return (
      <div className="container" style={{ position: "relative", maxWidth: "100%" }}>
         <Randomchar />
         <CharContent />
         <img className="bg__img" src="../images/bgAsset.png" alt="bg"></img>
      </div>
   );
};

export { MainPage };
