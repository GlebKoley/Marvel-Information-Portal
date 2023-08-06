import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const useGetComicsById = (id) => {
   const { request, _transformComicsData } = api();
   const comicsByIdQuery = useQuery(["comics", id], () => request(`comics/${id}?`), {
      select: (data) => data?.data?.data?.results.map((item) => _transformComicsData(item)),
   });

   return { comicsByIdQuery };
};
