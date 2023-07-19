import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import { AppHeader } from "../AppHeader/AppHeader";
import { MainPage } from "../Pages/MainPage";
import { ComicsListPage } from "../Pages/ComicsListsPage";
import { SingleContentPage } from "../Pages/SingleContentPage";
import { Page404 } from "../Pages/404page";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<AppHeader />}>
         <Route index element={<MainPage />} />
         {/* <Route path="characters" element={<MainPage />} /> */}
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
