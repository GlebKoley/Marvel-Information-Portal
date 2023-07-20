import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { lazy } from "react";

import AppHeader from "../AppHeader/AppHeader";
const MainPage = lazy(() => import("../Pages/MainPage"));
const ComicsListPage = lazy(() => import("../Pages/ComicsListsPage"));
const SingleContentPage = lazy(() => import("../Pages/SingleContentPage"));
const Page404 = lazy(() => import("../Pages/404page"));

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<AppHeader />}>
         <Route index element={<MainPage />} />
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
