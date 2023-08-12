import { Link } from "react-router-dom";

import { SpinnerBlock } from "../UI/SpinnerBlock/SpinnerBlock";
import { useInfinityQueryContent } from "../../hooks/useInfinityQueryContent";


const ComicsList = () => {
   const { data, fetchNextPage, isFetchingNextPage, isLoading } = useInfinityQueryContent({ queryName: "comics", offset: null });

   if (isLoading) return <SpinnerBlock />;

   return (
      <div className="comics__list">
         <ul className="comics__grid">
            {data.map((item) => {
               let priceNotZero = "";
               item.price === 0 ? (priceNotZero = "NOT AVAILABLE") : (priceNotZero = `${+item.price}$`);

               return (
                  <li key={item.id} className="comics__item">
                     <Link to={`${item.id}`}>
                        <img src={item.thumbnail} alt="" className="comics__item-img" />
                        <h1 className="comics__item-name">{item.title}</h1>
                        <p className="comics__item-price">{priceNotZero}</p>
                     </Link>
                  </li>
               );
            })}
         </ul>
         {isFetchingNextPage ? (
            <SpinnerBlock />
         ) : (
            <button className="button-main" onClick={() => fetchNextPage()}>
               LOAD MORE
            </button>
         )}
      </div>
   );
};

export { ComicsList };
