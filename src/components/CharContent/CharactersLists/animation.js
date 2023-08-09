import { useSpring } from "@react-spring/web";

export function useAnimiton(data) {
   const [props] = useSpring(
      () => ({
         transform: data ? "translateY(0px)" : "translateY(500px)",
         config: {
            mass: 1,
            friction: 100,
            tension: 500,
         },
      }),
      [data]
   );

   return { props };
}
