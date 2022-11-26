// Import resources
import React from "react";
import { Image } from "react-native";

// Import custom files
import { appImages } from "../config/data";

// Component
const CustomImage = ({ isLink, image, ...rest }) => {
  // Return component
  return (
    <>
      {/** Image */}
      {isLink ? (
        <Image source={{ uri: image || appImages?.general }} {...rest} />
      ) : (
        <Image source={image} {...rest} />
      )}
    </>
  ); // cloe return
}; // close component

// Export
export default CustomImage;
