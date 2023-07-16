import { AppBanner } from "../app-banner/app-banner";
import { SingleComic } from "../comics-list/SingleComic/single-comics";

const SingleComicPage = () => {
   return (
      <div className="container">
         <AppBanner />
         <SingleComic />
      </div>
   );
};

export { SingleComicPage };

// const ComicsListPage = () => {
//     return (
//        <div className="container">
//           <AppBanner />
//           <ComicsList />
//        </div>
//     );
//  };
