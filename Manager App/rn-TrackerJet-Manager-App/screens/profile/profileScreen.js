import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from "../../constants/styles";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const ProfileScreen = ({ navigation }) => {
  const [showLogoutDialog, setshowLogoutDialog] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {userInfo()}
          {profileOptions()}
        </ScrollView>
      </View>
      {logoutDialog()}
    </View>
  );

  function logoutDialog() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLogoutDialog}
        onRequestClose={() => {
          setshowLogoutDialog(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setshowLogoutDialog(false);;
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={{ ...styles.dialogStyle }}
            >
              <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text
                  style={{
                    ...Fonts.blackColor18SemiBold,
                    lineHeight: 25.0,
                    paddingTop: Sizes.fixPadding - 5.0,
                  }}
                >
                  Are you sure you want to logout?
                </Text>
                <View style={styles.dialogButtonWrapStyle}>
                  <Text
                    onPress={() => {
                      setshowLogoutDialog(false);
                    }}
                    style={{ ...Fonts.grayColor18SemiBold }}
                  >
                    Cancel
                  </Text>
                  <Text
                    onPress={() => {
                      setshowLogoutDialog(false);
                      navigation.push("Login");
                    }}
                    style={{
                      ...Fonts.primaryColor18SemiBold,
                      marginLeft: Sizes.fixPadding * 3.0,
                    }}
                  >
                    Logout
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function profileOptions() {
    return (
      <>
        {optionSort({
          icon: require("../../assets/images/icons/profile.png"),
          option: "Edit profile",
          onPress: () => {
            navigation.push("EditProfile");
          },
        })}
        {divider()}
        {optionSort({
          icon: require("../../assets/images/icons/manage.png"),
          option: "Manage employee",
          onPress: () => {
            navigation.push("ManageEmploy");
          },
        })}
        {divider()}
        {logoutInfo()}
      </>
    );
  }

  function logoutInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setshowLogoutDialog(true);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Image
          source={require("../../assets/images/icons/logout.png")}
          style={{ ...styles.optionIconStyle }}
        />
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.redColor18Medium,
            flex: 1,
            marginHorizontal: Sizes.fixPadding,
          }}
        >
          Logout
        </Text>
        <MaterialIcon
          name="arrow-forward-ios"
          color={Colors.blackColor}
          size={16}
        />
      </TouchableOpacity>
    );
  }

  function optionSort({ icon, option, onPress }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Image
          source={icon}
          style={{ ...styles.optionIconStyle, tintColor: Colors.primaryColor }}
        />
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.blackColor18Medium,
            flex: 1,
            marginHorizontal: Sizes.fixPadding,
          }}
        >
          {option}
        </Text>
        <MaterialIcon
          name="arrow-forward-ios"
          color={Colors.blackColor}
          size={16}
        />
      </TouchableOpacity>
    );
  }

  function divider() {
    return <View style={styles.dividerStyle}></View>;
  }

  function userInfo() {
    return (
      <View style={{ alignItems: "center", margin: Sizes.fixPadding * 3.0 }}>
        <Image
          source={require("../../assets/images/users/user1.png")}
          style={{
            width: screenWidth / 3.5,
            height: screenWidth / 3.5,
            borderRadius: screenWidth / 3.5 / 2.0,
          }}
        />
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.blackColor20Medium,
            lineHeight: 25.0,
            marginTop: 10.0,
          }}
        >
          Devon Lane
        </Text>
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.grayColor18Medium,
            lineHeight: 20.0,
            paddingTop: Sizes.fixPadding - 6.0,
          }}
        >
          kriyarussell@mail.com
        </Text>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.blackColor22SemiBold }}>Profile</Text>
      </View>
    );
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
  dialogStyle: {
    width: "85%",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    alignSelf: 'center'
  },
  dialogButtonWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: Sizes.fixPadding * 1.5,
  },
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    padding: Sizes.fixPadding + 5.0,
    alignItems: "center",
    justifyContent: "center",
  },
  dividerStyle: {
    backgroundColor: Colors.lightGrayColor2,
    height: 1.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding + 5.0,
  },
  optionIconStyle: {
    width: 20.0,
    height: 20.0,
    resizeMode: "contain",
  },
});
