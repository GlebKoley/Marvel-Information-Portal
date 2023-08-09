import { Link } from "react-router-dom";

const Page404 = () => {
   return (
      <div className="container">
         <div className="error__wrapper">
            <h1 className="error__text">404 PAGE NOT FOUND</h1>
            <p className="error__description">
               Check that you typed the address correctly, go back to your previous page or{" "}
               <Link to="/">
                  <p className="error__link">back to main page</p>
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Page404;
