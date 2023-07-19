import { Link, NavLink, Outlet } from "react-router-dom";

const AppHeader = () => {
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
               <NavLink className="nav__link__characters" to="/">
                  Characters
               </NavLink>
               <span style={{ userSelect: "none" }}>/</span>
               <NavLink className="nav__link__comics" to="comics">
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
