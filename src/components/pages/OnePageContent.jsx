import { AppBanner } from "../AppBanner/AppBanner";
import { SinglePageContent } from "../SinglePageContent/SinglePageContent";

const SingleContentPage = () => {
   return (
      <div className="container">
         <AppBanner />
         <SinglePageContent />
      </div>
   );
};

export default SingleContentPage;
