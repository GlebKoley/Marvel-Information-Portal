import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useGetCharByName(name) {
   const { request } = api();

   const charByNameQuery = useQuery(["characters", name], () => request(`/characters?nameStartsWith=${name}`), {
      enabled: !!name,
      select: (data) => data.data.data.results,
   });

   return { charByNameQuery };
}
