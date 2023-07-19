import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonLoader = (props) => {
   const style = { fontSize: "20px", textAlign: "center", fontWeight: "bold", marginBottom: "30px" };
   return (
      <>
         <h1 style={style}>Please select a character to see information</h1>
         <ContentLoader
            speed={4}
            width={380}
            height={250}
            viewBox="0 0 425 294"
            backgroundColor="#f3f3f3"
            foregroundColor="#e7e4e4"
            {...props}>
            <rect x="98" y="29" rx="0" ry="0" width="312" height="25" />
            <rect x="9" y="100" rx="0" ry="0" width="400" height="30" />
            <circle cx="47" cy="42" r="40" />
            <rect x="9" y="160" rx="0" ry="0" width="400" height="30" />
            <rect x="9" y="220" rx="0" ry="0" width="400" height="30" />
         </ContentLoader>
      </>
   );
};

export { SkeletonLoader };
