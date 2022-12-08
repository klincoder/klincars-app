// Import resources
import React from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";
import { useRecoilValue, useResetRecoilState } from "recoil";

// Import custom files
import routes from "./routes";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAppSettings from "../hooks/useAppSettings";
import useCarState from "../hooks/useCarState";
import CustomImage from "../components/CustomImage";
import StickyBottomView from "../components/StickyBottomView";
import CustomButton from "../components/CustomButton";
import { useAuthContext } from "../context/AuthContext";
import { carBookingAtom } from "../recoil/atoms";
import { CarItemMeta, CarItemPrice, CarItemTitle } from "../components/CarItem";
import { appColors, appFonts } from "../config/data";

// Component
const CarCheckoutScreen = () => {
  // Define auth context
  const { user } = useAuthContext();

  // Define app settings
  const { todaysDate, navigation, isMounted } = useAppSettings();

  // Define state
  const bookingVal = useRecoilValue(carBookingAtom);
  const resetBookingVal = useResetRecoilState(carBookingAtom);
  const { carInfo, bookingInfo } = useCarState(bookingVal?.rowData);

  // Debug
  //console.log("Debug carCheckoutScreen: ",);

  // Return component
  return (
    <CustomSafeView style={tw`px-4`}>
      {/** STICKY BOTTOM VIEW */}
      <StickyBottomView styleContainer={tw`flex flex-row justify-between`}>
        {/** Go back */}
        <CustomButton
          isNormal
          type="outline"
          title="Back"
          onPress={() => navigation.navigate(routes.CAR_BOOKING)}
          styleNormalButton={tw`rounded-lg p-3 mr-3 w-33`}
          icon={{
            type: "antdesign",
            name: "arrowleft",
            color: appColors?.primary,
          }}
        />
        {/** Checkout */}
        <CustomButton
          isNormal
          title="Checkout"
          styleNormalButton={tw`rounded-lg p-3 w-50 bg-[${appColors?.primary}]`}
          onPress={() => {
            resetBookingVal();
            navigation.replace(routes.CAR_COMPLETE);
          }}
        />
      </StickyBottomView>

      {/** SCROLL VIEW */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/** CAR DETAILS CONTAINER */}
        <View style={tw`flex flex-row items-center mb-10 rounded-lg border`}>
          {/** Image */}
          <CustomImage
            isLink
            image={carInfo?.image}
            style={tw`w-25 h-25 mr-4`}
          />
          {/** Details */}
          <View style={tw`py-2`}>
            <CarItemTitle
              title={carInfo?.titleFormat}
              styleTitle={tw`text-base mb-1`}
            />
            <CarItemPrice
              price={carInfo?.priceFormat}
              type={carInfo?.priceType}
            />
            <View style={tw`flex flex-row mt-2`}>
              <CarItemMeta
                title={carInfo?.location}
                iconType="octIcons"
                iconName="location"
                styleMeta={tw`px-2 py-1 mr-2 rounded-lg bg-[#ddd]`}
              />
              <CarItemMeta
                title={carInfo?.transmission}
                iconType="octIcons"
                iconName="gear"
                styleMeta={tw`px-2 py-1 mr-3 rounded-lg bg-[#ddd]`}
              />
            </View>
          </View>
        </View>

        {/** BOOKING DETAILS CONTAINER */}
        <View style={tw`mb-6`}>
          {/** Loop data */}
          {bookingInfo?.details?.map((item, index) => (
            <View
              key={`booking${index + 1}`}
              style={tw`flex flex-row items-center justify-between mb-2`}
            >
              <CustomText
                style={[tw`text-base`, { fontFamily: appFonts?.medium }]}
              >
                {item?.key + ":"}
              </CustomText>
              <CustomText>{item?.value}</CustomText>
            </View>
          ))}
        </View>

        {/** PRICE DETAILS CONTAINER */}
        <View style={tw`p-3 border rounded-lg`}>
          {/** Loop data */}
          {bookingInfo?.pricing?.map((item, index) => (
            <View
              key={`booking${index + 1}`}
              style={tw`flex flex-row items-center justify-between mb-2`}
            >
              <CustomText
                style={[tw`text-base`, { fontFamily: appFonts?.medium }]}
              >
                {item?.key + ":"}
              </CustomText>
              <CustomText>{item?.value}</CustomText>
            </View>
          ))}
        </View>
      </ScrollView>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default CarCheckoutScreen;
