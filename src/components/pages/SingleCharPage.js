import { AppBanner } from "../app-banner/app-banner";
import { SingleChar } from "../char-content/SingleChar/SingleChar";

const SingleCharPage = (props) => {
   return (
      <div className="container">
         <AppBanner />
         <SingleChar />
      </div>
   );
};

export { SingleCharPage };
