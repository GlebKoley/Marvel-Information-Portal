import { AppBanner } from "../app-banner/app-banner";
import { ComicsList } from "../comics-list/comics-list";

const ComicsListPage = () => {
   return (
      <div className="container">
         <AppBanner />
         <ComicsList />
      </div>
   );
};

export { ComicsListPage };
