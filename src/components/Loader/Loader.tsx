import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <Oval
      height={20}
      width={20}
      color="#ffffff"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#ffffff"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loader;
