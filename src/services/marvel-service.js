import { useHttp } from "../hooks/http.hook";

const useMarvelRequestServices = () => {
   const { loading, request, error, clearError } = useHttp();

   const _apiBase = "https://gateway.marvel.com:443/v1/public/";
   const _apiKey = "apikey=b1c53ccce5cc1276d9a92a1157c8cb14";
   let _baseCharOffset = 1241;
   let _baseCharLimit = 9;
   let _baseComicsListLimit = 8;
   let _baseComicsListOffset = 30000;

   const getLocalStorage = () => {
      if (!localStorage.getItem("userOffset")) {
         localStorage.setItem("userOffset", _baseCharOffset);
      }
      if (!localStorage.getItem("userLimit")) {
         localStorage.setItem("userLimit", _baseCharLimit);
      }
      if (!localStorage.getItem("currentOffset")) {
         localStorage.setItem("currentOffset", _baseCharOffset);
      }
      if (!localStorage.getItem("currentOffsetComics")) {
         localStorage.setItem("currentOffsetComics", _baseComicsListOffset);
      }
   };

   const getAllCharacters = async () => {
      getLocalStorage();

      _baseCharOffset = +localStorage.getItem("userOffset");
      _baseCharLimit = +localStorage.getItem("userLimit");

      const res = await request(`${_apiBase}characters?limit=${_baseCharLimit}&offset=${_baseCharOffset}&${_apiKey}`);
      return res.data.results.map(_transformCharacter);
   };

   const getSingleCharacter = async (id) => {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return _transformCharacter(res.data.results[0]);
   };

   const getSingleCharacterByName = async (name) => {
      const res = await request(`${_apiBase}characters?nameStartsWith=${name}&${_apiKey}`);
      return res;
   };

   const loadNewCharacters = async () => {
      const offset = localStorage.getItem("currentOffset");

      const res = await request(`${_apiBase}characters?limit=${_baseCharLimit}&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformCharacter);
   };

   const getComicsList = async () => {
      getLocalStorage();

      const offsetComics = +localStorage.getItem("currentOffsetComics");

      const res = await request(`${_apiBase}comics?limit=${_baseComicsListLimit}&offset=${offsetComics}&${_apiKey}`);
      return res.data.results.map(_transformComicsList);
   };

   const getComicsById = async (id) => {
      const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

      return res.data.results.map(_transformComicsList);
   };

   const _transformCharacter = (char) => {
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

   const _transformComicsList = (comicsList) => {
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

   return {
      loading,
      error,
      getAllCharacters,
      getSingleCharacter,
      getSingleCharacterByName,
      loadNewCharacters,
      getComicsList,
      getComicsById,
      clearError,
   };
};

export { useMarvelRequestServices };
