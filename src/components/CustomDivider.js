// Import resources
import React from "react";
import { Divider } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import { appColors } from "../config/data";

// Component
const CustomDivider = ({ isBold, styleBorder }) => {
  // Return component
  return (
    <Divider
      style={
        isBold
          ? tw`border-2 border-[${styleBorder || appColors?.lightGray}]`
          : ""
      }
    />
  ); // close return
}; // close component

// Export
export default CustomDivider;
