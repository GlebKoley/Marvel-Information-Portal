import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useGetComicsById } from "../../hooks/useGetComicsById";

import { SpinnerBlock } from "../UI/SpinnerBlock/SpinnerBlock";

const SinglePageContent = () => {
   let location = useLocation();
   const { id } = useParams();

   location.pathname.search(/comics/gi);

   const { comicsByIdQuery } = useGetComicsById(id);
   console.log(comicsByIdQuery.data);

   if (comicsByIdQuery.isLoading) return <SpinnerBlock />;
   return <ViewComics item={comicsByIdQuery.data} />;
};

const ViewComics = ({ item }) => {
   return item.map((item) => {
      if (!item.description) {
         item.description = "Description not aviable";
      }
      return (
         <div className="container__single__page">
            <img className="comics__img" src={item.thumbnail} alt=""></img>
            <div className="comics__wrapper">
               <h1 className="comics__wrapper__title">{item.title}</h1>
               <p className="comics__wrapper__description">{item.description.length > 800 ? item.description.slice(0, 800) + "..." : item.description}</p>
               <p className="comics__wrapper__pages">Pages: {item.pages}</p>
               <p className="comics__wrapper__language">{`Language` + !item.language ? `Language not aviable` : `:${item.language}`}</p>
               <h2 className="comics__wrapper__price">{item.price !== 0 ? item.price + "$" : `Price not aviable`}</h2>
            </div>
            <Link className="back-to-all-button" to="/comics">
               Back to comics page
            </Link>
         </div>
      );
   });
};

// const ViewChar = ({ item }) => {
//    return (
//       <div className="container__single__page">
//          <img className="character__img" src={item.thumbnail} alt=""></img>
//          <div className="character__wrapper">
//             <h1 className="character__wrapper__title">{item.name}</h1>
//             <p className="character__wrapper__description">{item.description.length > 1 ? item.description : "Descripton is not aviable"}</p>
//          </div>
//          <Link className="back-to-all-button" to="/">
//             Back to all characters
//          </Link>
//       </div>
//    );
// };

export { SinglePageContent };
