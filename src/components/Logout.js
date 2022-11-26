// Import resources
import React from "react";
import tw from "twrnc";

// Import custom files
import CustomButton from "./CustomButton";
import CustomAlertModal from "./CustomAlertModal";
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";
import useCustomAlertState from "../hooks/useCustomAlertState";
import { useAuthContext } from "../context/AuthContext";
import { alertMsg, appColors } from "../config/data";

// Component
function Logout({ isNormal, isButton, ...rest }) {
  // Define auth context
  const { handleLogout } = useAuthContext();

  // Define alert
  const alert = useCustomAlertState();

  // FUNCTIONS
  // HANDLE CONFIRM LOGOUT
  const handleConfirmLogout = () => {
    alert.showAlert(alertMsg?.logoutConfirm);
  }; // close fxn

  // Return component
  return (
    <>
      {/** Alert modal */}
      <CustomAlertModal
        visible={alert.visible}
        content={alert.message}
        hideDialog={alert.hideAlert}
        cancelAction={alert.hideAlert}
        confirmAction={async () => {
          // Hide alert
          alert.hideAlert();
          await handleLogout();
        }}
      />

      {/** isNormal */}
      {isNormal && (
        <CustomButton
          isTouchable
          onPress={handleConfirmLogout}
          styleTouchable={tw`flex-row items-center`}
        >
          <CustomIcon
            type="materialIcons"
            icon="logout"
            size={20}
            style={tw`mr-2`}
          />
          {/** Label */}
          <CustomText style={tw`text-lg font-medium`}>Logout</CustomText>
        </CustomButton>
      )}

      {/** isButton */}
      {isButton && (
        <CustomButton isTouchable onPress={handleConfirmLogout}>
          <CustomText style={tw`text-base`}>
            <CustomIcon type="materialIcons" icon="logout" /> Logout
          </CustomText>
        </CustomButton>
      )}
    </>
  ); // close return
} // close component

// Export
export default Logout;
