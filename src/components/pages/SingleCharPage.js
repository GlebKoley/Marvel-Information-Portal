import { AppBanner } from "../app-banner/app-banner";
import { SingleCharContent } from "../char-content/SingleCharContent/SingleCharContent";

const SingleCharPage = (props) => {
   return (
      <div className="container">
         <AppBanner />
         <SingleCharContent />
      </div>
   );
};

export { SingleCharPage };
