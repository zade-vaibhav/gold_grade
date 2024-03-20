import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes, commonStyles, screenWidth } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { OtpInput } from 'react-native-otp-entry';

const VerificationScreen = ({ navigation }) => {
  const [otpInput, setotpInput] = useState("");
  const [isLoading, setisLoading] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        >
          {verifyInfo()}
          {otpFields()}
          {verifyButton()}
          {resendInfo()}
        </ScrollView>
      </View>
      {loadingDialog()}
    </View>
  );

  function loadingDialog() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isLoading}        
      >
        <TouchableOpacity
          activeOpacity={1}          
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={{ ...styles.dialogStyle }}
            >
              <View style={{ margin: Sizes.fixPadding * 3.0 }}>
                <ActivityIndicator
                  size={40}
                  color={Colors.primaryColor}
                  style={{ transform: [{ scale: Platform.OS == "ios" ? 1.5 : 1 }] }}
                />
                <Text
                  style={{
                    marginTop: Sizes.fixPadding,
                    ...Fonts.blackColor22SemiBold,
                  }}
                >
                  Please wait
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function resendInfo() {
    return (
      <Text
        style={{
          marginBottom: Sizes.fixPadding,
          textAlign: "center",
          ...Fonts.blackColor16SemiBold,
        }}
      >
        Didn’t receive code?
        <Text style={{ ...Fonts.primaryColor16SemiBold }}> Resend </Text>
      </Text>
    );
  }

  function verifyButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setisLoading(true);
          setTimeout(() => {
            setisLoading(false);
            navigation.push("BottomTabBar");
          }, 2000);
        }}
        style={{ ...commonStyles.buttonStyle, marginBottom: Sizes.fixPadding }}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>Verify</Text>
      </TouchableOpacity>
    );
  }

  function otpFields() {
    return (
      <OtpInput
        numberOfDigits={4}
        focusColor={Colors.primaryColor}
        onTextChange={text => {
          if (text.length == 4) {
            setotpInput(text);
            setisLoading(true);
            setTimeout(() => {
              setisLoading(false);
              navigation.push("BottomTabBar");
            }, 2000);
          }
        }}
        theme={{
          containerStyle: { marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding * 3.0, },
          inputsContainerStyle: { justifyContent: 'center' },
          pinCodeContainerStyle: { ...styles.textFieldStyle },
          pinCodeTextStyle: { ...Fonts.primaryColor22SemiBold },
          focusedPinCodeContainerStyle: { borderWidth: 1.5 }
        }}
      />      
    );
  }

  function verifyInfo() {
    return (
      <View style={{ alignItems: "center", margin: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.blackColor22SemiBold }}>OTP verification</Text>
        <Text
          style={{
            ...Fonts.grayColor17Medium,
            textAlign: "center",
            lineHeight: 22.0,
          }}
        >
          Please enter code we sent to you
        </Text>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Image
          source={require("../../assets/images/app_icon.png")}
          style={{ width: 50.0, height: 50.0, resizeMode: "contain" }}
        />
        <Text
          style={{
            ...Fonts.whiteColor22Bold,
            marginTop: Sizes.fixPadding - 5.0,
          }}
        >
          Trackerjet
        </Text>
        <MaterialIcons
          name="arrow-back-ios"
          color={Colors.whiteColor}
          size={22}
          style={{ position: "absolute", top: 15.0, left: 20.0 }}
          onPress={() => {
            navigation.pop();
          }}
        />
      </View>
    );
  }
};

export default VerificationScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding * 4.5,
  },
  textFieldStyle: {
    borderRadius: screenWidth / 8.5 / 2,
    width: screenWidth / 8.5,
    height: screenWidth / 8.5,
    backgroundColor: Colors.whiteColor,
    borderWidth: 0.0,
    ...commonStyles.boxShadow,
    marginHorizontal: Sizes.fixPadding - 3.0,
  },
  dialogStyle: {
    width: "85%",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    alignSelf:'center'
  },
});
