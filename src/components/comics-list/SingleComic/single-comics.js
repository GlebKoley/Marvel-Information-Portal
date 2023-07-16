import { useMarvelRequestServices } from "../../../services/marvel-service";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SpinnerBlock } from "../../UI/spinner-block/spinner-block";

const SingleComic = () => {
   const { comicsId } = useParams();
   const { getComicsById, loading } = useMarvelRequestServices();
   const [comics, setComics] = useState(null);

   useEffect(() => {
      getComicsById(comicsId).then((res) => setComics(res));
   }, [comicsId]);

   if (loading || comics == null) return <SpinnerBlock />;

   return comics.map((item) => {
      if (!item.description) {
         item.description = "Description not aviable";
      }

      return (
         <div className="single-comics-container">
            <img className="single-comics-img" src={item.thumbnail} alt=""></img>
            <div className="single-comics-descr-wrapper">
               <h1 className="single-comics-title">{item.title}</h1>
               <p className="single-comics-descr">
                  {item.description.length > 800 ? item.description.slice(0, 800) + "..." : item.description}
               </p>
               <p className="single-comics-pages">Pages: {item.pages}</p>
               <p className="single-comics-language">{`Language` + !item.language ? `Language not aviable` : `:${item.language}`}</p>
               <h2 className="single-comics-price">{item.price !== 0 ? item.price + "$" : `Price not aviable`}</h2>
            </div>
            <Link className="back-to-all-button" to="/comics">
               Back to all
            </Link>
         </div>
      );
   });
};

export { SingleComic };
