// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import routes from "./routes";
import CustomChip from "../components/CustomChip";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAppSettings from "../hooks/useAppSettings";
import useCarState from "../hooks/useCarState";
import CustomIcon from "../components/CustomIcon";
import { useAuthContext } from "../context/AuthContext";
import { appColors, appFonts } from "../config/data";

// Component
const CarCompleteScreen = () => {
  // Define auth context
  const { user } = useAuthContext();

  // Define app settings
  const { navigation } = useAppSettings();

  // Define state
  const { completeInfo } = useCarState();

  // Debug
  //console.log("Debug carCompleteScreen: ", completeInfo);

  // Return component
  return (
    <CustomSafeView style={tw`px-4`}>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 items-center justify-center`}>
        {/** Icon */}
        <CustomIcon
          type="feather"
          name="check-circle"
          size={80}
          style={tw`mb-3 text-[${appColors?.primary}]`}
        />

        {/** Heading */}
        <View style={tw`mb-2`}>
          <CustomText
            style={[
              tw`text-2xl text-[${appColors?.primary}]`,
              { fontFamily: appFonts?.medium },
            ]}
          >
            Congratulations!
          </CustomText>
        </View>

        {/** Note */}
        <View style={tw`mb-6`}>
          <CustomText
            style={[tw`text-center text-lg`, { fontFamily: appFonts?.regular }]}
          >
            You've successfully booked {completeInfo?.carName} for{" "}
            {completeInfo?.daysFormat} {`(${completeInfo?.priceFormat}).`}
          </CustomText>
        </View>

        {/** Actions */}
        <View style={tw`flex flex-row`}>
          {/** Book again */}
          <CustomChip
            title="Book Again"
            onPress={() => navigation.replace(routes.HOME_NAVIGATOR)}
            styleContainer={tw`mr-3`}
          />
          {/** View orders */}
          <CustomChip
            isSolid
            title="My Orders"
            onPress={() => navigation.replace(routes.ORDERS)}
          />
        </View>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default CarCompleteScreen;
