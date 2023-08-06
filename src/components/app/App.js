import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { lazy, useState } from "react";
import { CharacterSelectedContext } from "../../context/CharacterSelectedContext";

import AppHeader from "../AppHeader/AppHeader";
const MainPage = lazy(() => import("../Pages/MainPage"));
const ComicsListPage = lazy(() => import("../Pages/ComicsListsPage"));
const OnePageContent = lazy(() => import("../Pages/OnePageContent"));
const Page404 = lazy(() => import("../Pages/404page"));

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<AppHeader />}>
         <Route index element={<MainPage />} />
         <Route path="characters/:id" element={<OnePageContent />} />
         <Route path="comics" element={<ComicsListPage />} />
         <Route path="comics/:id" element={<OnePageContent />} />
         <Route path="*" element={<Page404 />}></Route>
      </Route>
   )
);

const App = () => {
   const [characterSelected, setCharacterSelected] = useState(null);

   return (
      <div className="app">
         <CharacterSelectedContext.Provider value={{ characterSelected, setCharacterSelected }}>
            <RouterProvider router={router} />
         </CharacterSelectedContext.Provider>
      </div>
   );
};

export { App };
