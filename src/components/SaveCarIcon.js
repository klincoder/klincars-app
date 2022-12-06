// Import resources
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import tw from "twrnc";
import { useRecoilValue } from "recoil";

// Import custom files
import CustomText from "./CustomText";
import useAppSettings from "../hooks/useAppSettings";
import CustomButton from "./CustomButton";
import CustomIcon from "./CustomIcon";
import CustomAlertModal from "./CustomAlertModal";
import useCustomAlertState from "../hooks/useCustomAlertState";
import { useAuthContext } from "../context/AuthContext";
import { alertMsg, appColors } from "../config/data";
import { handleGetSavedCar } from "../config/functions";
import { allSavedAtom } from "../recoil/atoms";
import { collection, deleteDoc, doc, fireDB, setDoc } from "../config/firebase";

// Component
const SaveCarIcon = ({ rowData }) => {
  // Define auth context
  const { user } = useAuthContext();
  const userID = user?.id;

  // Define state
  const allSaved = useRecoilValue(allSavedAtom);
  const [isSaved, setIsSaved] = useState(false);

  // Define app settings
  const { isMounted, todaysDate } = useAppSettings();

  // Define alert
  const alert = useCustomAlertState();

  // Define variables
  const rowID = rowData?.id;
  const savedCar = handleGetSavedCar(allSaved, rowID);
  const savedCarID = savedCar?.data?.id;
  const savedCarStatus = savedCar?.isValid;

  // Debug
  //console.log("Debug saveCarIcon: ",)

  // FUNCTIONS
  // HANDLE SAVE CAR
  const handleSaveCar = async (selectedID) => {
    // If empty args, return
    if (!selectedID) return;
    // Debug
    setIsSaved(!isSaved);
    //console.log("Clicked save car!");
    // // Try catch
    // try {
    //   // If isSaved
    //   if (isSaved) {
    //     // Remove from saves
    //     const delSaveRef = doc(fireDB, "users", userID, "saves", savedCarID);
    //     await deleteDoc(delSaveRef);
    //   } else {
    //     // Add to saves
    //     const addSaveRef = doc(collection(fireDB, "users", userID, "saves"));
    //     await setDoc(addSaveRef, {
    //       id: addSaveRef?.id,
    //       carID: selectedID,
    //       title: rowData?.title,
    //       description: rowData?.description,
    //       location: rowData?.location,
    //       transmission: rowData?.transmission,
    //       rentPrice: rowData?.rentPrice,
    //       rentPriceType: rowData?.rentPriceType,
    //       userID: userID,
    //       dateCreated: todaysDate,
    //       dateUpdated: todaysDate,
    //     });
    //   } // close if
    // } catch (err) {
    //   alert.showAlert(alertMsg?.generalErr);
    //   //console.warn("Debug saveCarIcon: ", err.message);
    // } // close try catch
  }; // close fxn

  // SIDE EFFECTS
  // SET IS SAVED STATE
  useEffect(() => {
    setIsSaved(savedCarStatus);
  }, [savedCarStatus]);

  // Return component
  return (
    <>
      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        content={alert.message}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        cancelText="Close"
      />

      {/** Icon */}
      <CustomButton isTouchable onPress={() => handleSaveCar(rowID)}>
        <CustomIcon
          type="antDesign"
          size={24}
          icon={isSaved ? "heart" : "hearto"}
          color={isSaved ? appColors?.primary : appColors?.black}
          style={tw`mr-4`}
        />
      </CustomButton>
    </>
  ); // close return
}; // close component

// Export
export default SaveCarIcon;
