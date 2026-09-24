import React from "react";
import { Oval } from "react-loader-spinner";

interface LoaderProps {
  /** Inherits the surrounding text colour by default so it works on any surface. */
  color?: string;
}

const Loader = ({ color = "currentColor" }: LoaderProps) => {
  return (
    <Oval
      height={20}
      width={20}
      color={color}
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor={color}
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loader;

