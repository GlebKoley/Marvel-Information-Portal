import { useLocation } from "react-router-dom";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";

import { SpinnerBlock } from "../UI/SpinnerBlock/SpinnerBlock";

const AppHeader = () => {
   let classes = "";
   const location = useLocation();
   if (location.pathname.search(/characters/gi) === 1) {
      classes += " active";
   }
   return (
      <>
         <header className="header">
            <h1 className="title">
               <Link to="/">
                  <span>Marvel</span>
                  information portal
               </Link>
            </h1>
            <nav className="nav">
               <NavLink className={"nav__link__characters" + classes} to="/">
                  Characters
               </NavLink>
               <span style={{ userSelect: "none" }}>/</span>
               <NavLink className="nav__link__comics" to="comics">
                  Comics
               </NavLink>
            </nav>
         </header>
         <Suspense fallback={<SpinnerBlock />}>
            <Outlet />
         </Suspense>
      </>
   );
};

export default AppHeader;
