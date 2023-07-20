import { AppBanner } from "../AppBanner/AppBanner";
import { OnePageContent } from "../OnePageContent/OnePageContent";

const SingleContentPage = () => {
   return (
      <div className="container">
         <AppBanner />
         <OnePageContent />
      </div>
   );
};

export default SingleContentPage;
