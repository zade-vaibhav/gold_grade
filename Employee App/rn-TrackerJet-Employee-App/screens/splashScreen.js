import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Colors, Fonts, Sizes } from "../constants/styles";
import MyStatusBar from "../components/myStatusBar";

const SplashScreen = ({ navigation }) => {
  setTimeout(() => {
    navigation.push("Onboarding");
  }, 2000);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
      <MyStatusBar />
      {appIconAndName()}
      {appTypeText()}
    </View>
  );

  function appTypeText() {
    return <Text style={styles.appTypeTextStyle}>Employee App</Text>;
  }

  function appIconAndName() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../assets/images/app_icon.png")}
          style={{ width: 60.0, height: 60.0, resizeMode: "contain" }}
        />
        <Text
          style={{ ...Fonts.whiteColor28SemiBold, marginTop: Sizes.fixPadding }}
        >
          Trackerjet
        </Text>
      </View>
    );
  }
};

export default SplashScreen;

const styles = StyleSheet.create({
  appTypeTextStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Fonts.whiteColor18SemiBold,
    opacity: 0.5,
    textAlign: "center",
    margin: Sizes.fixPadding,
  },
});
