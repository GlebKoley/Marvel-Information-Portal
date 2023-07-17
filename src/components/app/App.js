import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import { AppHeader } from "../app-header/app-header";
import { MainPage } from "../pages/main-page";
import { ComicsListPage } from "../pages/comics-list-page";
import { SingleContentPage } from "../pages/single-content-page";
import { Page404 } from "../pages/404page";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<AppHeader />}>
         {/* <Route path="/" element={<MainPage />} /> */}
         <Route path="characters" element={<MainPage />} />
         <Route path="characters/:id" element={<SingleContentPage />} />
         <Route path="comics" element={<ComicsListPage />} />
         <Route path="comics/:id" element={<SingleContentPage />} />
         <Route path="*" element={<Page404 />}></Route>
      </Route>
   )
);

const App = () => {
   return (
      <div className="app">
         <RouterProvider router={router} />
      </div>
   );
};

export { App };
