import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useGetCharById(id, queryName = "random character") {
   const { request, _transformCharacterData } = api();

   const charByIdQuery = useQuery([queryName, id], async () => await request(`characters/${id}`), {
      enabled: !!id,
      refetchOnMount: true,
      select: (data) => data?.data?.data?.results.map((item) => _transformCharacterData(item)),
   });

   return { charByIdQuery };
}
