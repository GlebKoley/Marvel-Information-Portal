import errorImg from "./error avenger logo.png";

const ErrorMessage = () => {
   return (
      <div className="error__message-content">
         <p className="error__message-text">
            Sorry ! An error occurred while loading the character. Please click <span>TRY IT</span> button again.
         </p>
         {/* <p className="error__message-text">{props.children}</p> */}
         <img className="error__message-image" src={errorImg} alt="" draggable="false"></img>
      </div>
   );
};

export { ErrorMessage };
