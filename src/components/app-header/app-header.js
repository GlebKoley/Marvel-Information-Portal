import { Link, NavLink, Outlet } from "react-router-dom";

const AppHeader = () => {
   return (
      <>
         <header className="app__header">
            <h1 className="app__title">
               <Link to="characters">
                  <span>Marvel</span>
                  information portal
               </Link>
            </h1>
            <nav className="app__menu">
               <NavLink className="characters link" to="characters">
                  Characters
               </NavLink>
               <span style={{ userSelect: "none" }}>/</span>
               <NavLink className="comics link" to="comics">
                  Comics
               </NavLink>
            </nav>
         </header>
         <>
            <Outlet />
         </>
      </>
   );
};

export { AppHeader };
