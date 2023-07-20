import { Link } from "react-router-dom";
import styles from "./_404page.module.scss";

const Page404 = () => {
   return (
      <div className="container">
         <div className={styles.wrapper}>
            <h1 className={styles.error}>404 PAGE NOT FOUND</h1>
            <p className={styles.description}>
               Check that you typed the address correctly, go back to your previous page or{" "}
               <Link to="/">
                  <p className={styles.link}>back to main page</p>
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Page404;
