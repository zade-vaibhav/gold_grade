import {
  BackHandler,
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import { Colors, Fonts, Sizes, commonStyles } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import { useFocusEffect } from "@react-navigation/native";
import IntlPhoneInput from "react-native-intl-phone-input";
"ldcndcn"

const LoginScreen = ({ navigation }) => {
  const backAction = () => {
    if (Platform.OS === "ios") {
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
      return true;
    }
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      navigation.addListener("gestureEnd", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
        navigation.removeListener("gestureEnd", backAction);
      };
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        >
          {loginInfo()}
          {mobileNumberInfo()}
          {loginButton()}
        </ScrollView>
      </View>
      {exitInfo()}
    </View>
  );

  function loginButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push("Verification");
        }}
        style={{ ...commonStyles.buttonStyle }}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>Login</Text>
      </TouchableOpacity>
    );
  }

  function mobileNumberInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.blackColor18SemiBold }}>Mobile number</Text>
        <IntlPhoneInput
          onChangeText={({ phoneNumber }) => setMobileNumber(phoneNumber)}
          defaultCountry="IN"
          containerStyle={styles.mobileNumberWrapStyle}
          placeholder={"Enter your mobile number"}
          phoneInputStyle={{
            flex: 1,
            ...Fonts.blackColor17Medium,
          }}
          placeholderTextColor={Colors.grayColor}
          dialCodeTextStyle={{
            ...Fonts.blackColor16SemiBold,
            marginHorizontal: Sizes.fixPadding - 2.0,
          }}
          filterInputStyle={{ ...Fonts.blackColor17Medium }}
          modalCountryItemCountryNameStyle={{ ...Fonts.blackColor17Medium }}
          flagStyle={{ width: 0, height: 0 }}
        />
      </View>
    );
  }

  function loginInfo() {
    return (
      <View style={{ alignItems: "center", margin: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.blackColor22SemiBold }}>Login</Text>
        <Text
          style={{
            ...Fonts.grayColor17Medium,
            textAlign: "center",
            lineHeight: 22.0,
          }}
        >
          Welcome please login your account
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
      </View>
    );
  }

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={commonStyles.exitInfoWrapStyle}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Press Back Once Again To Exit!
        </Text>
      </View>
    ) : null;
  }
};

export default LoginScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding * 4.5,
  },
  mobileNumberWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding * 5.0,
    paddingVertical: Sizes.fixPadding,
    ...commonStyles.boxShadow,
    marginTop: Sizes.fixPadding - 5.0,
  },
});
