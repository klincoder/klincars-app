// Import resources
import React, { useLayoutEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import tw from "twrnc";
import { useRoute } from "@react-navigation/native";
import { useRecoilValue } from "recoil";

// Import custom files
import routes from "./routes";
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAppSettings from "../hooks/useAppSettings";
import CustomIcon from "../components/CustomIcon";
import CustomButton from "../components/CustomButton";
import CustomSpinner from "../components/CustomSpinner";
import useCustomToastState from "../hooks/useCustomToastState";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useCustomSpinnerState from "../hooks/useCustomSpinnerState";
import CustomAlertModal from "../components/CustomAlertModal";
import SaveCarIcon from "../components/SaveCarIcon";
import ShareIcon from "../components/ShareIcon";
import useCarState from "../hooks/useCarState";
import CustomCarousel from "../components/CustomCarousel";
import CustomDivider from "../components/CustomDivider";
import { useAuthContext } from "../context/AuthContext";
import { appColors, appFonts, screenInfo } from "../config/data";
import { handleFormatNumber, handleTitleCase } from "../config/functions";
import {
  CarItemImageCount,
  CarItemMeta,
  CarItemPrice,
  CarItemTitle,
} from "../components/CarItem";

// Component
const CarDetailsScreen = () => {
  // Define auth context
  const { user } = useAuthContext();

  // Define row data
  const route = useRoute();
  const rowData = route.params?.rowData;

  // Define car state
  const { carInfo } = useCarState(rowData);

  // Define toast
  const toast = useCustomToastState();

  // Define alert
  const alert = useCustomAlertState();

  // Define spinner
  const spinner = useCustomSpinnerState();

  // Define app settings
  const { todaysDate, navigation, isMounted } = useAppSettings();

  // Define specs list
  const specsList = [
    {
      id: "123",
      title: "Condition",
      desc: handleTitleCase(carInfo?.condition),
      iconType: "materialIcons",
      iconName: "clean-hands",
    },
    {
      id: "456",
      title: "Transmission",
      desc: handleTitleCase(carInfo?.transmission),
      iconType: "octIcons",
      iconName: "gear",
    },
    {
      id: "789",
      title: "Mileage",
      desc: `${handleFormatNumber(carInfo?.mileage)}km`,
      iconType: "fontAwesome5",
      iconName: "tachometer-alt",
    },
  ];

  // Define meta list
  const metaList = [
    {
      id: "123",
      title: "Brand",
      desc: carInfo?.brand,
      iconType: "antDesign",
      iconName: "car",
    },
    {
      id: "456",
      title: "Model",
      desc: carInfo?.brandModel,
      iconType: "ionIcons",
      iconName: "speedometer-outline",
    },
    {
      id: "789",
      title: "Body",
      desc: carInfo?.body,
      iconType: "materialCommunityIcons",
      iconName: "car-windshield-outline",
    },
    {
      id: "1011",
      title: "Color",
      desc: carInfo?.color,
      iconType: "octIcons",
      iconName: "paintbrush",
    },
    {
      id: "1213",
      title: "Engine Size",
      desc: carInfo?.engineSize,
      iconType: "materialCommunityIcons",
      iconName: "engine-outline",
    },
    {
      id: "1415",
      title: "Fuel",
      desc: carInfo?.fuel,
      iconType: "materialCommunityIcons",
      iconName: "gas-station-outline",
    },
    {
      id: "1617",
      title: "Registered",
      desc: carInfo?.registered,
      iconType: "feather",
      iconName: "check-circle",
    },
    {
      id: "1718",
      title: "Seats",
      desc: carInfo?.seats,
      iconType: "feather",
      iconName: "users",
    },
    {
      id: "1819",
      title: "Year",
      desc: carInfo?.year,
      iconType: "feather",
      iconName: "calendar",
    },
  ];

  // Debug
  //console.log("Debug carDetailsScreen: ",);

  // SIDE EFFECTS
  // SCREEN LAYOUT
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;
    // Set screen options
    navigation.setOptions({
      headerTitleAlign: "left",
      headerRight: () => (
        <View style={tw`flex-row items-center pr-5`}>
          {/** Save car icon */}
          <SaveCarIcon rowData={rowData} />
          {/** Share icon */}
          <ShareIcon title={carInfo?.title} slug={carInfo?.slug} />
        </View>
      ), // close header right
    }); // close navigation
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [isMounted, navigation]);

  // Return component
  return (
    <CustomSafeView>
      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        content={alert.message}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        cancelText="Close"
      />

      {/** BUTTON - BOOK NOW */}
      <View
        style={[
          tw`items-center justify-center py-3 w-full absolute bottom-0 z-1`,
          { backgroundColor: "rgba(255, 255, 255, 0.7)" },
        ]}
      >
        <CustomButton
          isNormal
          title="Book Now"
          onPress={() => navigation.navigate(routes.CAR_BOOKING, { rowData })}
          styleNormalButton={tw`rounded-lg p-3 w-50 bg-[${appColors?.primary}]`}
        />
      </View>

      {/** SCROLL VIEW */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/** CAROUSEL */}
        <View>
          <CustomCarousel data={carInfo?.images} height={0.45} />
          <CarItemImageCount imageLen={carInfo?.imagesLen} />
        </View>

        {/** MAIN CONTAINER */}
        <View style={tw`p-4`}>
          {/** Title */}
          <CarItemTitle title={carInfo?.title} styleTitle={tw`text-lg`} />

          {/** Price */}
          <View style={tw`flex flex-row items-center justify-between mt-2`}>
            <CarItemPrice
              type={carInfo?.priceType}
              price={carInfo?.priceFormat}
            />
            <CarItemMeta
              title={carInfo?.location}
              iconType="octIcons"
              iconName="location"
            />
          </View>

          {/** Divider */}
          <CustomDivider style={tw`my-6`} />

          {/** SPECS CONTAINER */}
          <View style={tw`flex flex-row justify-between`}>
            {/** Loop data */}
            {specsList?.map((item) => (
              <View
                key={item?.id}
                style={tw`flex flex-col items-center justify-center`}
              >
                <CustomIcon
                  type={item?.iconType}
                  icon={item?.iconName}
                  size={24}
                  color={appColors?.lightBlack}
                />
                <CustomText style={tw`text-xs mt-2`}>{item?.desc}</CustomText>
              </View>
            ))}
          </View>

          {/** Divider */}
          <CustomDivider style={tw`my-6`} />

          {/** META CONTAINER */}
          <View style={tw`flex flex-row flex-wrap justify-around`}>
            {/** Loop data */}
            {metaList?.map((item) => (
              <View
                key={item?.id}
                style={tw`min-w-24 mb-3 p-2 border border-[#ddd] rounded-lg`}
              >
                {/** Title */}
                <CarItemMeta title={item?.title} />
                {/** Description */}
                <CustomText
                  style={[
                    tw`text-base uppercase`,
                    { fontFamily: appFonts?.medium },
                  ]}
                >
                  <CustomIcon type={item?.iconType} icon={item?.iconName} />{" "}
                  {item?.desc}
                </CustomText>
              </View>
            ))}
          </View>

          {/** Divider */}
          <CustomDivider style={tw`my-6`} />

          {/** DESCRIPTION CONTAINER */}
          <View style={tw`mb-28`}>
            {/** Title */}
            <CustomText
              style={[tw`text-lg mb-1`, { fontFamily: appFonts?.medium }]}
            >
              Description
            </CustomText>
            {/** Description */}
            <CustomText
              style={[tw`text-base`, { fontFamily: appFonts?.regular }]}
            >
              {carInfo?.desc}
            </CustomText>
          </View>
        </View>
      </ScrollView>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default CarDetailsScreen;
