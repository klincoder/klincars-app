// Import resources
import React, { useRef } from "react";
import moment from "moment";
import { useRecoilValue } from "recoil";
import { useNavigation } from "@react-navigation/native";

// Import custom files
import { handleFormatDate } from "../config/functions";
import { appSettingsAtom, networkDataAtom } from "../recoil/atoms";

// Component
const useAppSettings = () => {
  // Define state
  const appSettings = useRecoilValue(appSettingsAtom);
  const networkState = useRecoilValue(networkDataAtom);

  // Define todays date
  const todaysDate = moment.utc().format();
  const todaysDate1 = handleFormatDate(todaysDate, 1);
  const todaysDate2 = handleFormatDate(todaysDate, 2);

  // Define navigaion
  const navigation = useNavigation();

  // Define isMounted
  const isMounted = useRef();

  // Define site info
  const siteInfo = {
    logo: appSettings?.appLogo,
    name: appSettings?.appName,
    email: appSettings?.supportEmail,
    phone: appSettings?.supportPhone,
    noReply: appSettings?.supportEmailNoReply,
    copyrightName: appSettings?.copyrightName,
    adminName: appSettings?.adminName,
    adminEmail: appSettings?.adminEmail,
    bank: appSettings?.bankInfo,
    workingHours: appSettings?.workingHours,
    location: appSettings?.location,
  };

  // Define network info
  const networkInfo = {
    bssID: networkState?.details?.bssid,
    frequency: networkState?.details?.frequency,
    ipAddress: networkState?.details?.ipAddress,
    isConnExpensive: networkState?.details?.isConnectionExpensive,
    strength: networkState?.details?.strength,
    subnet: networkState?.details?.subnet,
    isConnected: networkState?.isConnected,
    isReachable: networkState?.isInternetReachable,
    isWifiEnabled: networkState?.isWifiEnabled,
    type: networkState?.type,
  };

  // Debug
  //console.log("Debug appSettings: ",);

  // Return component
  return {
    siteInfo,
    todaysDate,
    todaysDate1,
    todaysDate2,
    networkInfo,
    isMounted,
    navigation,
  }; // close return
}; // close component

// Export
export default useAppSettings;
