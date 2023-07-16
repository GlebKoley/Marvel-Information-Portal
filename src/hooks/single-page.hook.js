import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useMarvelRequestServices } from "../services/marvel-service";
import { SpinnerBlock } from "../components/UI/spinner-block/spinner-block";

const SinglePageHook = () => {
   const { pageId } = useParams();
   const { getComicsById, loading } = useMarvelRequestServices();
   const [comics, setComics] = useState(null);
};

export { SinglePageHook };
