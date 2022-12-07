// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";
import useAppSettings from "../hooks/useAppSettings";
import CustomListItem from "./CustomListItem";
import { appColors } from "../config/data";

// Component
const LocationItem = ({ rowData, rowIndex, onPress, isSelected, ...rest }) => {
  // Define app settings
  const { isMounted } = useAppSettings();

  // Define variables
  const rowTitle = rowData?.title;
  const rowDesc = rowData?.description;
  const rowImage = rowData?.image;

  // Debug
  //console.log("Debug locationItem: ",)

  // Return component
  return (
    <CustomListItem
      {...rest}
      isLink
      hideDivider
      title={rowTitle}
      description={rowDesc}
      leftImage={rowImage}
      onPressLink={onPress}
      containerStyle={[
        tw`p-0 p-3`,
        isSelected && tw`rounded-lg border border-[${appColors?.primary}]`,
      ]}
    />
  ); // close return
}; // close component

// Export
export default LocationItem;
