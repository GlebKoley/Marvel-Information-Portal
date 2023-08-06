import axios from "axios";

export const api = () => {
   const _apiBase = "https://gateway.marvel.com:443/v1/public/";
   // const _apiKey = "b1c53ccce5cc1276d9a92a1157c8cb14";
   const _apiKey = "2fb484e4136c902e0831199b22125e1c";
   const _baseCharOffset = 307;
   const _baseCharLimit = 9;
   const _baseComicsListLimit = 8;
   const _baseComicsListOffset = 3000;

   const request = axios.create({
      method: "GET",
      baseURL: _apiBase,
      headers: {
         "Content-Type": "application/json",
      },
      params: { apikey: _apiKey },
   });

   const _transformCharacterData = (char) => {
      return {
         name: char.name,
         description: char.description,
         thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
         homepage: char.urls[0].url,
         wiki: char.urls[1].url,
         id: char.id,
         comics: char.comics.items,
      };
   };

   const _transformComicsData = (comicsList) => {
      return {
         title: comicsList.title,
         thumbnail: comicsList.thumbnail.path + "." + comicsList.thumbnail.extension,
         price: comicsList.prices[0].price,
         id: comicsList.id,
         url: comicsList.urls[0].url,
         description: comicsList.description,
         language: comicsList.textObjects[0]?.language,
         pages: comicsList.pageCount,
      };
   };

   return { request, _apiKey, _baseComicsListOffset, _baseCharOffset, _baseCharLimit, _baseComicsListLimit, _transformCharacterData, _transformComicsData };
};
