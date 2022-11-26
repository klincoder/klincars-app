// Import resources
import React from "react";
import CustomText from "./CustomText";

// Component
const CustomHelperText = ({ title, visible, isError }) => {
  // If not visible or empty title
  if (!visible || !title) return null;

  // Debug
  // console.log("Debug customHelperText: ")

  // Return component
  return (
    <CustomText
      type={isError ? "error" : "info"}
      visible={visible}
      padding="none"
    >
      {title}
    </CustomText>
  ); // close return
}; // close component

// Export
export default CustomHelperText;
