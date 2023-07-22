import styles from "./_test.module.scss";
import { useState } from "react";
import { useTrail, animated } from "@react-spring/web";
import { useEffect } from "react";
import { config } from "@react-spring/web";

function Test() {
   const [arr, setArr] = useState([]);
   console.log(config.slow);

   const rand = () => {
      const randomNum = Math.floor(Math.random() * 20);
      if (randomNum === 0) return rand();
      const filledArray = Array(randomNum).fill("00000000000000000000000");
      setArr(filledArray);
   };
   useEffect(() => {
      handleClick();
   }, [arr]);

   const [trails, api] = useTrail(
      arr.length,
      () => ({
         from: { transform: "translateX(-100px)" },
         //  config: { mass: 10, tension: 3000, friction: 100 },
         config: { mass: 5, tension: 3000, friction: 100 },
      }),
      []
   );

   const handleClick = () => {
      api.start({
         from: {
            transform: "translateX(-100px)",
         },
         to: {
            transform: "translateX(0px)",
         },
      });
   };

   return (
      <div className={styles.wrapper}>
         <button className={styles.button} onClick={() => rand()}>
            Клик
         </button>
         {arr.length > 0 && (
            <ul className={styles.ul}>
               {trails.map((props, index) => (
                  <animated.li style={props}>{arr[index]}</animated.li>
               ))}
            </ul>
         )}
      </div>
   );
}

export { Test };
