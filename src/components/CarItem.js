// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import routes from "../screens/routes";
import CustomText from "./CustomText";
import useAppSettings from "../hooks/useAppSettings";
import CustomButton from "./CustomButton";
import CustomImage from "./CustomImage";
import CustomIcon from "./CustomIcon";
import useCarState from "../hooks/useCarState";
import { appColors, appFonts, currSymbol } from "../config/data";

// Component
const CarItem = ({ rowData }) => {
  // Define app settings
  const { navigation } = useAppSettings();

  // Define state
  const { carInfo } = useCarState(rowData);

  // Debug
  //console.log("Debug carItem: ",)

  // Return component
  return (
    <CustomButton
      isTouchable
      onPress={() => navigation.navigate(routes.CAR_DETAILS, { rowData })}
      styleTouchable={tw`relative flex-0.5 m-2 h-56 border border-[#ddd] rounded-lg`}
    >
      {/** IMAGE CONTAINER */}
      <View style={tw`w-full`}>
        {/** Image */}
        <CustomImage
          isLink
          image={carInfo?.image}
          resizeMode="cover"
          style={tw`w-full h-30`}
        />
        {/** Images count */}
        <CarItemImageCount imageLen={carInfo?.imagesLen} />
      </View>

      {/** DETAILS CONTAINER */}
      <View style={tw`p-2`}>
        {/** Title */}
        <CarItemTitle title={carInfo?.title} styleTitle={tw`mb-1`} />

        {/** Location */}
        <CarItemMeta
          title={carInfo?.location}
          iconType="octIcons"
          iconName="location"
        />

        {/** Transmission */}
        <CarItemMeta
          title={carInfo?.transmission}
          iconType="octIcons"
          iconName="gear"
        />

        {/** Price */}
        <CarItemPrice
          price={carInfo?.priceFormat}
          type={carInfo?.priceType}
          stylePrice={tw`mt-3`}
        />
      </View>
    </CustomButton>
  ); // close return
}; // close component

// Export
export default CarItem;

/********************
  CHILD COMPONENTS
*********************/
// CAR ITEM TITLE
export const CarItemTitle = ({ title, styleTitle }) => {
  // Return component
  return (
    <CustomText
      numberOfLines={1}
      style={[styleTitle, { fontFamily: appFonts?.medium }]}
    >
      {title}
    </CustomText>
  ); // close return
}; // close component

// CAR ITEM IMAGE COUNT
export const CarItemImageCount = ({ imageLen }) => {
  // Return component
  return (
    <View style={tw`absolute bottom-0 p-1 rounded-t-md bg-black`}>
      <CustomText style={tw`text-white`}>
        <CustomIcon type="feather" name="camera" /> {imageLen || 0}
      </CustomText>
    </View>
  ); // close return
}; // close component

// CAR ITEM PRICE
export const CarItemPrice = ({ price, type, stylePrice }) => {
  // Return component
  return (
    <CustomText
      numberOfLines={1}
      style={[
        tw`text-lg text-[${appColors?.primary}]`,
        { fontFamily: appFonts?.medium },
        stylePrice,
      ]}
    >
      {price} <CustomText style={tw`text-sm`}>{type}</CustomText>
    </CustomText>
  ); // close return
}; // close component

// CAR ITEM META
export const CarItemMeta = ({ title, iconType, iconName, styleMeta }) => {
  // Return component
  return (
    <CustomText
      style={[tw`text-xs`, { fontFamily: appFonts?.regular }, styleMeta]}
    >
      <CustomIcon type={iconType} name={iconName} /> {title}
    </CustomText>
  ); // close return
}; // close component
