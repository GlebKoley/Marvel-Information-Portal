import { useState } from "react";

const ScrollUpButton = () => {
   const [buttonShow, setButtonShow] = useState(false);
   window.onscroll = () => {
      if (window.scrollY > 500) {
         setButtonShow(true);
      } else {
         setButtonShow(false);
      }
   };

   const scrollUpHanler = () => {
      window.scrollTo(0, 0);
   };

   return(
      <>
         {buttonShow ? (
            <button className="btn-scroll-to-top" onClick={scrollUpHanler}>
               <img className="btn-scroll-button" src="../images/icons8-send-letter-96.png" alt="adsasdasd"></img>
            </button>
         ) : null}
      </>
   );
};

export { ScrollUpButton };
