// Import resources
import React, { useLayoutEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";

// Import custom files
import routes from "./routes";
import CustomSafeView from "../components/CustomSafeView";
import CustomListItem from "../components/CustomListItem";
import Logout from "../components/Logout";
import CustomSpinner from "../components/CustomSpinner";
import useAppSettings from "../hooks/useAppSettings";
import useCustomToastState from "../hooks/useCustomToastState";
import useCustomSpinnerState from "../hooks/useCustomSpinnerState";
import CustomImage from "../components/CustomImage";
import { useAuthContext } from "../context/AuthContext";
import { accountList, alertMsg, appColors, appImages } from "../config/data";
import { fireDB, doc, setDoc } from "../config/firebase";
import { handleSliceString } from "../config/functions";

// Component
const ProfileScreen = () => {
  // Define auth context
  const { user } = useAuthContext();
  const userID = user?.id;
  const username = user?.username;
  const userAvatar = user?.avatar || appImages?.avatar;
  const userPushStatus = user?.pushStatus;

  // Define state
  const [toggleSwitch, setToggleSwitch] = useState(userPushStatus);

  // Define app settings
  const { todaysDate, navigation, isMounted } = useAppSettings();

  // Define toast
  const toast = useCustomToastState();

  // Define spinner
  const spinner = useCustomSpinnerState();

  // Debug
  //console.log("Debug profileScreen: ", user?.username);

  // FUNCTIONS
  // HANDLE SET PUSH NOTIFICATIONS
  const handleUserPushStatus = async (val) => {
    // If !userID or !val, return
    if (!userID) return;
    // Set loading
    spinner.showLoading();
    // Set toggleSwitch
    setToggleSwitch(val);
    // Edit user push
    const pushRef = doc(fireDB, "users", `${userID}`);
    await setDoc(
      pushRef,
      {
        pushStatus: val,
        dateUpdated: todaysDate,
      },
      { merge: true }
    );
    // Alert succ
    toast.success(alertMsg?.generalSucc);
    spinner.hideLoading();
  }; // close fxn

  // SIDE EFFECTS
  // SCREEN LAYOUT
  // useLayoutEffect(() => {
  //   // On mount
  //   isMounted.current = true;
  //   // Set screen options
  //   navigation.setOptions({
  //     headerTitle: "Account", //handleSliceString(username, 0, 12),
  //     headerTitleAlign: "left",
  //     headerRight: () => (
  //       <View style={tw`flex-1 flex-row items-center pr-5`}>
  //         {/** Logout */}
  //         <Logout isNormal style={tw`text-[${appColors?.black}]`} />
  //       </View>
  //     ), // close header right
  //   }); // close navigation
  //   // Clean up
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, [navigation, username]);

  // Return component
  return (
    <CustomSafeView>
      {/** Spinner */}
      <CustomSpinner isLoading={spinner.loading} />

      {/** MAIN CONTAINER */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          {/** Avatar color background */}
          <View style={tw`p-15 bg-[${appColors?.primary}]`}></View>

          {/** AVATAR CONTAINER */}
          <View style={tw`items-center mt-[-60]`}>
            {/** Avatar */}
            <CustomImage
              isLink
              image={userAvatar}
              style={tw`w-25 h-25 rounded-full bg-white`}
            />
          </View>

          {/** ACCOUNT LIST CONTAINER */}
          <View style={tw`p-4`}>
            {/** Loop data */}
            {accountList?.map((item) => {
              // If item isLink
              if (item?.isLink) {
                return (
                  <CustomListItem
                    isLink
                    key={item?.id}
                    title={item?.title}
                    leftIconType={item?.leftIconType}
                    leftIconName={item?.leftIconName}
                    onPressLink={() => navigation.navigate(item?.link)}
                  />
                ); // close return
              } else {
                return (
                  <CustomListItem
                    isNormal
                    key={item?.id}
                    title={item?.title}
                    leftIconType={item?.leftIconType}
                    leftIconName={item?.leftIconName}
                  />
                ); // close return
              } // close if
            })}
          </View>
        </>
      </ScrollView>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default ProfileScreen;
