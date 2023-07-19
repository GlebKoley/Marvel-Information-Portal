import { useState } from "react";
import ReaсtDOM from "react-dom";

const portal = document.querySelector("#modal__window-portal");

const ModaWindow = ({ setShowModal, resetAllCharacters }) => {
   const [modalOpenValue, setModalOpenValue] = useState(true);

   const closeModal = () => {
      setModalOpenValue(false);
      setShowModal(false);
      document.body.style.overflow = "visible";
   };

   if (modalOpenValue) {
      return ReaсtDOM.createPortal(
         <div className="modal__wrapper" onClick={() => closeModal()}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
               <p className="modal__header">Do you want to reset characters ?</p>
               <p className="modal__body">
                  The entire grid of characters that is currently available on the site will be reset. After the reset, <span>9</span> new
                  characters will be loaded from the server.
               </p>

               <div className="modal__buttons">
                  <button
                     className="button-main"
                     onClick={() => {
                        resetAllCharacters();
                        closeModal();
                     }}>
                     RESET
                  </button>
               </div>
               {/* <div style={{ fontSize: "15px" }}> */}
               {/* <p>don`t show me this window</p> */}
               {/* <input type="checkbox"></input> */}
               {/* </div> */}
               <button>
                  <img className="modal__close-button" src="../images/close-icon.svg" alt="" onClick={() => closeModal()}></img>
               </button>
               <img
                  className="modal__logo-img"
                  src={process.env.PUBLIC_URL + "/images/marvel modal logo.png"}
                  alt=""
                  draggable="false"></img>
            </div>
         </div>,
         portal
      );
   }
};

export { ModaWindow };
