import { AppBanner } from "../AppBanner/AppBanner";
import { ComicsList } from "../ComicsLists/ComicsLists";

const ComicsListPage = () => {
   return (
      <div className="container">
         <AppBanner />
         <ComicsList />
      </div>
   );
};

export default ComicsListPage;
