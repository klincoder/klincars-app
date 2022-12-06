// Import resources
import React, { useLayoutEffect } from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";
import { useRoute } from "@react-navigation/native";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAppSettings from "../hooks/useAppSettings";
import useCarState from "../hooks/useCarState";
import FormCarBooking from "../components/FormCarBooking";
import CustomCarousel from "../components/CustomCarousel";
import { useAuthContext } from "../context/AuthContext";
import CustomButton from "../components/CustomButton";
import routes from "./routes";
import { appColors, appFonts } from "../config/data";

// Component
const CarBookingScreen = () => {
  // Define auth context
  const { user } = useAuthContext();

  // Define app settings
  const { todaysDate, navigation, isMounted } = useAppSettings();

  // Define row data
  const route = useRoute();
  const rowData = route.params?.rowData;

  // Define car state
  const { carInfo } = useCarState(rowData);

  // Debug
  //console.log("Debug carBookingScreen: ",);

  // SIDE EFFECTS
  // SCREEN LAYOUT
  // useLayoutEffect(() => {
  //   // On mount
  //   isMounted.current = true;
  //   // Set screen options
  //   navigation.setOptions({
  //     headerTitleAlign: "left",
  //     headerRight: () => (
  //       <View style={tw`flex-1 flex-row items-center pr-5`}>
  //         <CustomText>Right Text</CustomText>
  //       </View>
  //     ), // close header right
  //   }); // close navigation
  //   // Clean up
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, [navigation]);

  // Return component
  return (
    <CustomSafeView>
      {/** BUTTON - CONTINUE */}
      <View
        style={[
          tw`items-center justify-center py-5 w-full absolute bottom-0 z-1`,
          { backgroundColor: "rgba(255, 255, 255, 0.7)" },
        ]}
      >
        <CustomButton
          isTouchable
          onPress={() => navigation.navigate(routes.CAR_BOOKING, { rowData })}
          styleTouchable={tw`rounded-lg p-3 w-50 bg-[${appColors?.primary}]`}
        >
          {/** Text */}
          <CustomText
            style={[
              tw`text-xl text-center text-white`,
              { fontFamily: appFonts?.medium },
            ]}
          >
            Continue
          </CustomText>
        </CustomButton>
      </View>

      {/** SCROLL VIEW */}
      <ScrollView>
        {/** Car image */}
        <CustomCarousel data={carInfo?.images} height={0.35} />

        {/** Form */}
        <FormCarBooking rowData={carInfo} />
      </ScrollView>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default CarBookingScreen;
