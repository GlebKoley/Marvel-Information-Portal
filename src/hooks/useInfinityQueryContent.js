import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useInfinityQueryContent({ queryName = "characters", offset }) {
   const { request, _transformCharacterData, _transformComicsData, _baseCharOffset, _baseComicsListOffset, _baseCharLimit, _baseComicsListLimit } = api();

   let offsetName = null,
      transformFunc = null,
      currentOffsetLimit = 0;

   if (queryName === "characters") {
      offsetName = _baseCharOffset;
      currentOffsetLimit = _baseCharLimit;
      transformFunc = _transformCharacterData;
   } else {
      offsetName = _baseComicsListOffset;
      transformFunc = _transformComicsData;
      currentOffsetLimit = _baseComicsListLimit;
   }

   const { data, fetchNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery({
      queryKey: [queryName, offset],
      queryFn: async ({ pageParam = offset === null ? offsetName : offset }) =>
         await request(queryName, {
            params: {
               limit: currentOffsetLimit,
               offset: pageParam,
            },
         }),
      getNextPageParam: (offset) => offset.config.params.offset + currentOffsetLimit,
      select: (data) =>
         data?.pages
            .reduce((prev, current) => [...prev, ...current?.data.data.results], [])

            .map((item) => transformFunc(item)),
   });

   return { data, fetchNextPage, isFetchingNextPage, isLoading, isError };
}
