import { AppBanner } from "../components/AppBanner/AppBanner";
import { ComicsList } from "../components/ComicsLists/ComicsLists";

const ComicsListPage = () => {
   return (
      <div className="container">
         <AppBanner />
         <ComicsList />
      </div>
   );
};

export default ComicsListPage;
