import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { lazy, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { CharacterSelectedContext } from "../../context/CharacterSelectedContext";

import { TestContext } from "../../context/TestContext";

import AppHeader from "../AppHeader/AppHeader";

const MainPage = lazy(() => import("../Pages/MainPage"));
const ComicsListPage = lazy(() => import("../Pages/ComicsListsPage"));
const OnePageContent = lazy(() => import("../Pages/OnePageContent"));
const Page404 = lazy(() => import("../Pages/404page"));

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: Infinity,
         cacheTime: 5000 * 60,
         retry: 1,
         refetchOnWindowFocus: false,
      },
   },
});

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
   const [findCharacterList, setFindCharacterList] = useState(null);
   const [test, setTest] = useState("est` context");

   return (
      <div className="app">
         <CharacterSelectedContext.Provider value={{ characterSelected, setCharacterSelected, findCharacterList, setFindCharacterList }}>
            {/* <TestContext.Provider value={{ test, setTest }}> */}
            <QueryClientProvider client={queryClient}>
               <RouterProvider router={router} />
               <ReactQueryDevtools />
            </QueryClientProvider>
            {/* </TestContext.Provider> */}
         </CharacterSelectedContext.Provider>
      </div>
   );
};

export { App };
