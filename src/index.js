import "./css/main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App/App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TestPage from "./components/Pages/TestPage";

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: Infinity,
         cacheTime: 1000 * 60,
         retry: 1,
         refetchOnWindowFocus: false,
      },
   },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <QueryClientProvider client={queryClient}>
      <App />
      {/* <TestPage /> */}
      <ReactQueryDevtools />
   </QueryClientProvider>
);
