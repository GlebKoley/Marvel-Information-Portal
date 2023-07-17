import { AppBanner } from "../app-banner/app-banner";
import { OnePageContent } from "../OnePageContent/OnePageContent";

const SingleContentPage = (props) => {
   return (
      <div className="container">
         <AppBanner />
         <OnePageContent />
      </div>
   );
};

export { SingleContentPage };
