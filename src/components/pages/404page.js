import { Link } from "react-router-dom";

const Page404 = () => {
   const style = { maxWidth: "80%", alignItems: "center" };
   return (
      <div className="container">
         <div className="content">
            <img style={style} src="/images/Marvel-Template-404.png" alt="Error"></img>
            <Link to="/characters">Back to main page</Link>
         </div>
      </div>
   );
};

export { Page404 };
