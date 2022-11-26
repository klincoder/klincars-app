// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomAlertMsg from "../components/CustomAlertMsg";
import { appColors } from "../config/data";

// Component
const NoInternetScreen = () => {
  // Return component
  return (
    <CustomSafeView style={tw`bg-[${appColors?.lightGrey}]`}>
      {/** SECTION - ALERT MSG */}
      <View style={tw`flex-1 items-center justify-center`}>
        {/** Alert msg */}
        <CustomAlertMsg
          type="materialIcons"
          icon="wifi-off"
          size={60}
          title="No Internet Connection"
          styleTitle={tw`max-w-xs text-center`}
        />
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default NoInternetScreen;
