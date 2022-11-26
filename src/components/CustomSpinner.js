// Import resources
import React from "react";
import tw from "twrnc";

// Import custom files
import { appColors, appImages } from "../config/data";
import CustomImage from "./CustomImage";
import CustomOverlay from "./CustomOverlay";

// Component
const CustomSpinner = ({ isLoading, ...rest }) => {
  // Return component
  return (
    <CustomOverlay {...rest} visible={isLoading}>
      <CustomImage
        image={appImages?.logo}
        style={tw`w-10 h-10 rounded-full`}
        resizeMode="cover"
      />
    </CustomOverlay>
  ); // close return
}; // close component

// Export
export default CustomSpinner;
