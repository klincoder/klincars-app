// Import resources
import React from "react";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";
import { appColors } from "../config/data";

// Component
const CustomAlertMsg = ({
  title,
  type,
  icon,
  size,
  color,
  styleTitle,
  ...rest
}) => {
  // Return component
  return (
    <>
      {/** Icon */}
      <CustomIcon
        {...rest}
        type={type}
        icon={icon}
        size={size}
        color={color || appColors?.grey}
      />

      {/** title */}
      {title && (
        <CustomText style={[tw`pt-2 text-lg`, styleTitle]}>{title}</CustomText>
      )}
    </>
  ); // close return
}; // close component

// Export
export default CustomAlertMsg;
