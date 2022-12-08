// Import resources
import React from "react";
import tw from "twrnc";

// Import custom files
import CustomListItem from "./CustomListItem";
import { appColors } from "../config/data";

// Component
const PaymentMethodItem = ({
  rowData,
  rowIndex,
  onPress,
  isSelected,
  ...rest
}) => {
  // Define variables
  const rowTitle = rowData?.title;
  const rowDesc = rowData?.description;
  const rowImage = rowData?.image;

  // Debug
  //console.log("Debug PaymentMethodItem: ",)

  // Return component
  return (
    <CustomListItem
      {...rest}
      isLink
      title={rowTitle}
      description={rowDesc}
      leftImage={rowImage}
      onPressLink={onPress}
      hideDivider={isSelected}
      containerStyle={[
        tw`p-0 p-3`,
        isSelected && tw`rounded-lg border border-[${appColors?.primary}]`,
      ]}
    />
  ); // close return
}; // close component

// Export
export default PaymentMethodItem;
