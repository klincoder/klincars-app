// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";
import { Chip } from "@rneui/themed";

// Import custom files
import CustomImage from "./CustomImage";

// Component
const CustomChip = ({ type, title, styleContainer, onPress, ...rest }) => {
  // Debug
  //console.log("Debug customChip: ",)

  // Return component
  return (
    <Chip
      {...rest}
      type={type || "outline"}
      title={title}
      containerStyle={styleContainer}
      onPress={onPress}
    />
  ); // close return
}; // close component

// Export
export default CustomChip;
