import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  Colors,
  Sizes,
  screenWidth,
  Fonts,
  commonStyles,
} from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Header from "../../components/header";
import Ionicons from "react-native-vector-icons/Ionicons";

const ContactUsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header navigation={navigation} header={"Contact us"} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {contactImage()}
          {contactInfo()}
          {constactDetailSort({
            title: "Location",
            value: "3517 W. Gray St. Utica, Pennsylvania 57867",
            icon: "location-outline",
          })}
          {constactDetailSort({
            title: "Phone number",
            value: "+91 1234567890",
            icon: "call-outline",
          })}
          {constactDetailSort({
            title: "Email ",
            value: "hello@mail.com",
            icon: "mail-outline",
          })}
        </ScrollView>
      </View>
    </View>
  );

  function constactDetailSort({ title, value, icon }) {
    return (
      <View style={styles.infoCard}>
        <Ionicons
          name={icon}
          size={24}
          color={Colors.primaryColor}
        />
        <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
          <Text numberOfLines={1} style={{ ...Fonts.grayColor16SemiBold }}>
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.blackColor17Medium, lineHeight: 22.0 }}
          >
            {value}
          </Text>
        </View>
      </View>
    );
  }

  function contactInfo() {
    return (
      <View
        style={{ alignItems: "center", marginBottom: Sizes.fixPadding * 3.0 }}
      >
        <Text
          numberOfLines={1}
          style={{ ...Fonts.primaryColor22SemiBold, lineHeight: 28.0 }}
        >
          Contact us
        </Text>
        <Text
          numberOfLines={1}
          style={{ ...Fonts.grayColor18SemiBold, lineHeight: 23.0 }}
        >
          Let’s create progress together
        </Text>
      </View>
    );
  }

  function contactImage() {
    return (
      <Image
        source={require("../../assets/images/contactus.png")}
        style={styles.contactImageStyle}
      />
    );
  }
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  contactImageStyle: {
    width: screenWidth / 2.3,
    height: screenWidth / 2.3,
    resizeMode: "contain",
    alignSelf: "center",
    margin: Sizes.fixPadding * 4.0,
    marginBottom: Sizes.fixPadding * 3.0,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding + 2.0,    
  },
});
