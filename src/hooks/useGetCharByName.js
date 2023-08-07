import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

import { useContext } from "react";
import { CharacterSelectedContext } from "../context/CharacterSelectedContext";

export function useGetCharByName(name) {
   const { setFindCharacterList } = useContext(CharacterSelectedContext);

   const { request, _transformCharacterData } = api();

   const charByNameQuery = useQuery(["characters-name", name], () => request(`/characters?nameStartsWith=${name}`), {
      enabled: !!name,
      select: (data) => data?.data?.data?.results.map((item) => _transformCharacterData(item)),
      onSuccess: () => {
         setFindCharacterList(name);
      },
   });

   return { charByNameQuery };
}
