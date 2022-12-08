// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";
import { useRecoilValue } from "recoil";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAppSettings from "../hooks/useAppSettings";
import useCarState from "../hooks/useCarState";
import CustomIcon from "../components/CustomIcon";
import { useAuthContext } from "../context/AuthContext";
import { carBookingAtom } from "../recoil/atoms";
import { appColors, appFonts } from "../config/data";
import CustomChip from "../components/CustomChip";
import routes from "./routes";

// Component
const CarCompleteScreen = () => {
  // Define auth context
  const { user } = useAuthContext();

  // Define app settings
  const { todaysDate, navigation, isMounted } = useAppSettings();

  // Define state
  const bookingVal = useRecoilValue(carBookingAtom);
  const { carInfo, bookingInfo } = useCarState(bookingVal?.rowData);

  // Define variables
  const customNoteText = [tw`text-base`, { fontFamily: appFonts?.medium }];

  // Debug
  // console.log("Debug carCompleteScreen: ", {
  //   start: typeof bookingInfo?.startDateFormat,
  //   end: typeof bookingInfo?.endDateFormat,
  // });

  // Return component
  return (
    <CustomSafeView style={tw`px-4`}>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 items-center justify-center`}>
        {/** Icon */}
        <CustomIcon
          type="feather"
          icon="check-circle"
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
            You've successfully booked {carInfo?.title} for{" "}
            {bookingInfo?.daysFormat} {`(${bookingInfo?.priceFormat}).`}
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
