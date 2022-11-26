// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";
import CustomListItem from "./CustomListItem";
import CustomBottomSheet from "./CustomBottomSheet";
import { appColors, appFonts } from "../config/data";

// Component
const CustomSelect = ({
  label,
  title,
  leftIconName,
  onPressSelect,
  sheetRef,
  snapPoints,
  sheetContent,
  ...rest
}) => {
  // Debug
  //console.log("Debug customSelect: ",)

  // Return component
  return (
    <View style={tw`mb-3`}>
      {/** Label */}
      {label && (
        <CustomText style={[tw`mb-1 mx-3`, { fontFamily: appFonts?.medium }]}>
          {label}
        </CustomText>
      )}

      {/** Input */}
      <CustomListItem
        {...rest}
        isLink
        hideDivider
        title={title || "Select"}
        onPressLink={onPressSelect}
        containerStyle={tw`mx-3 border rounded-lg`}
        leftIconName={leftIconName || "arrowright"}
      />

      {/** Modal */}
      <CustomBottomSheet {...rest} ref={sheetRef} snapPoints={snapPoints}>
        {sheetContent}
      </CustomBottomSheet>
    </View>
  ); // close return
}; // close component

// Export
export default CustomSelect;
