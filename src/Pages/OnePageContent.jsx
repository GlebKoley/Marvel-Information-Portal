import { AppBanner } from "../components/AppBanner/AppBanner";
import { SinglePageContent } from "../components/SinglePageContent/SinglePageContent";

const SingleContentPage = () => {
   return (
      <div className="container">
         <AppBanner />
         <SinglePageContent />
      </div>
   );
};

export default SingleContentPage;
