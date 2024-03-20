import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  Platform,
} from "react-native";
import React, { useState, useCallback } from "react";
import MyStatusBar from "../../components/myStatusBar";
import {
  Colors,
  Fonts,
  Sizes,
  screenWidth,
  commonStyles,
} from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const OnboardingScreen = ({ navigation }) => {
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

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        {onboardingImage()}
        {onboardingDescription()}
        {getStartedButton()}
      </View>
      {exitInfo()}
    </View>
  );

  function getStartedButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push("Login");
        }}
        style={{
          ...commonStyles.buttonStyle,
          marginTop: Sizes.fixPadding * 2.5,
        }}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>Get started</Text>
      </TouchableOpacity>
    );
  }

  function onboardingDescription() {
    return (
      <View style={{ alignItems: "center", margin: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.primaryColor22SemiBold, textAlign: "center" }}>
          Track your record
        </Text>
        <Text style={styles.descriptionTextStyle}>
          Lorem ipsum dolor sit amet consectetur. Diam scelerisque urna ornare
          aliquet morbi. A sed tempor et amet ut nisl vivamus tempor ornare.
          Varius risus lacus id lacus.
        </Text>
      </View>
    );
  }

  function onboardingImage() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../assets/images/onboarding.png")}
          style={styles.onboardingImageStyle}
        />
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

export default OnboardingScreen;

const styles = StyleSheet.create({
  onboardingImageStyle: {
    width: "70%",
    height: screenWidth - 100,
    resizeMode: "contain",
    marginTop: 100.0,
  },
  descriptionTextStyle: {
    ...Fonts.grayColor14SemiBold,
    marginTop: Sizes.fixPadding - 5.0,
    textAlign: "center",
    lineHeight: 20.0,
  },
});
