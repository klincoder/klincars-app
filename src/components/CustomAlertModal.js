// Import resources
import React from "react";
import { View } from "react-native";
import { Dialog } from "@rneui/themed";
import tw from "twrnc";

// Import custom files
import CustomDivider from "./CustomDivider";
import CustomIcon from "./CustomIcon";
import CustomText from "./CustomText";
import { appColors } from "../config/data";

// Component
const CustomAlertModal = ({
  title,
  visible,
  hideDialog,
  content,
  isCustomContent,
  confirmAction,
  confirmText,
  cancelAction,
  cancelText,
  ...rest
}) => {
  // Return component
  return (
    <Dialog
      {...rest}
      visible={visible}
      onBackdropPress={hideDialog}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      overlayStyle={tw`rounded-lg`}
    >
      {/** Title */}
      {title && <Dialog.Title title={title} titleStyle={tw`text-2xl`} />}

      {/** Divider */}
      {/* <CustomDivider /> */}

      {/** Content */}
      <View style={tw`pt-2 pb-4`}>
        {isCustomContent ? (
          <>{content}</>
        ) : (
          <CustomText style={tw`text-lg`}>{content}</CustomText>
        )}
      </View>

      {/** Divider */}
      <CustomDivider />

      {/** Actions */}
      <Dialog.Actions>
        {/** Cancel button */}
        {cancelAction && (
          <Dialog.Button
            title={cancelText || "Cancel"}
            onPress={cancelAction}
            titleStyle={tw`text-base text-[${appColors?.danger}]`}
          />
        )}

        {/** Confirm button */}
        {confirmAction && (
          <Dialog.Button
            title={confirmText || "Confirm"}
            onPress={confirmAction}
            titleStyle={tw`text-base text-[${appColors?.success}]`}
          />
        )}
      </Dialog.Actions>
    </Dialog>
  ); // close return
}; // close component

// Export
export default CustomAlertModal;
