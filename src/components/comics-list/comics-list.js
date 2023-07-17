import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useMarvelRequestServices } from "../../services/marvel-service";
import { SpinnerBlock } from "../UI/spinner-block/spinner-block";

const ComicsList = () => {
   const { getComicsList, loading } = useMarvelRequestServices();
   const [comiscList, setComiscList] = useState([]);

   useEffect(() => {
      getComicsList().then((res) => setComiscList(res));
   }, []);

   const newComicsLoadHandler = () => {
      localStorage.setItem("currentOffsetComics", +localStorage.getItem("currentOffsetComics") + 9);
      console.log("dawdawdawd");
      getComicsList().then((res) => setComiscList([...comiscList, ...res]));
   };

   if (comiscList.length < 1) return <SpinnerBlock />;

   return (
      <div className="comics__list">
         <ul className="comics__grid">
            {comiscList.map((item) => {
               let priceNotZero = "";
               item.price === 0 ? (priceNotZero = "NOT AVAILABLE") : (priceNotZero = `${+item.price}$`);

               return (
                  <li key={item.id} className="comics__item">
                     <Link to={`${item.id}`}>
                        <img src={item.thumbnail} alt="" className="comics__item-img" />
                     </Link>
                     <h1 className="comics__item-name">{item.title}</h1>
                     <p className="comics__item-price">{priceNotZero}</p>
                  </li>
               );
            })}
         </ul>
         {loading ? (
            <SpinnerBlock />
         ) : (
            <button className="button-main" onClick={newComicsLoadHandler}>
               LOAD MORE
            </button>
         )}
      </div>
   );
};

export { ComicsList };
