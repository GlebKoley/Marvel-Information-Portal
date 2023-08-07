import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useGetComicsById } from "../../hooks/useGetComicsById";
import { useGetCharById } from "../../hooks/useGetCharById";

import { useNavigate } from "react-router-dom";

import { SpinnerBlock } from "../UI/SpinnerBlock/SpinnerBlock";

const SinglePageContent = () => {
   const navigate = useNavigate();
   let location = useLocation();
   const { id } = useParams();

   if (location.pathname.search(/comics/gi) === 1) {
      return <ViewComics id={id} navigate={navigate} />;
   } else {
      return <ViewChar id={id} navigate={navigate} />;
   }

   // if (comicsByIdQuery.isLoading) return <SpinnerBlock />;
};

const ViewComics = ({ id, navigate }) => {
   const { comicsByIdQuery } = useGetComicsById(id);

   if (comicsByIdQuery.isLoading) return <SpinnerBlock />;

   return comicsByIdQuery.data.map((item) => {
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
            <button className="back-to-all-button" onClick={() => navigate(-1)}>
               Back to previous page
            </button>
         </div>
      );
   });
};

const ViewChar = ({ id, navigate }) => {
   const { charByIdQuery } = useGetCharById(id, "character single page");

   if (charByIdQuery.isLoading) return <SpinnerBlock />;

   return charByIdQuery.data.map((item) => (
      <div className="container__single__page">
         <img className="character__img" src={item.thumbnail} alt=""></img>
         <div className="character__wrapper">
            <h1 className="character__wrapper__title">{item.name}</h1>
            <p className="character__wrapper__description">{item.description.length > 1 ? item.description : "Descripton is not aviable"}</p>
         </div>
         <button className="back-to-all-button" onClick={() => navigate(-1)}>
            Back to previous page
         </button>
      </div>
   ));
};

export { SinglePageContent };
