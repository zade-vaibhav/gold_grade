import {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import MyStatusBar from "../../components/myStatusBar";
import {
  Colors,
  Fonts,
  Sizes,
  screenWidth,
  commonStyles,
} from "../../constants/styles";
import Header from "../../components/header";
import Ionicons from "react-native-vector-icons/Ionicons";

const EditProfileScreen = ({ navigation }) => {
  const [userName, setuserName] = useState("Kriya russell");
  const [email, setemail] = useState("kriyarussell@mail.com");
  const [mobileNumber, setmobileNumber] = useState("+91 123456789");
  const [openChangePicSheet, setopenChangePicSheet] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header navigation={navigation} header={"Edit profile"} />
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        >
          {userPicWithChangeOption()}
          {userNameInfo()}
          {emailInfo()}
          {mobileNumberInfo()}
        </ScrollView>
      </View>
      {updateButton()}
      {changePicSheet()}
    </View>
  );

  function changePicSheet() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openChangePicSheet}
        onRequestClose={() => {
          setopenChangePicSheet(false)
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setopenChangePicSheet(false);
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
            >
              <View>
                <View style={styles.sheetOptionsWrapper}>
                  <Text style={{ ...Fonts.grayColor17SemiBold, textAlign: "center" }}>
                    Select Image
                  </Text>
                  <View style={styles.sheetDivider}></View>
                  <Text
                    onPress={() => {
                      setopenChangePicSheet(false);
                    }}
                    style={{
                      marginHorizontal: Sizes.fixPadding * 2.0,
                      ...Fonts.blackColor17SemiBold,
                      textAlign: "center",
                    }}
                  >
                    Take photo
                  </Text>
                  <View style={styles.sheetDivider}></View>
                  <Text
                    onPress={() => {
                      setopenChangePicSheet(false);
                    }}
                    style={{
                      marginHorizontal: Sizes.fixPadding * 2.0,
                      ...Fonts.blackColor17SemiBold,
                      textAlign: "center",
                    }}
                  >
                    Choose from gallery
                  </Text>
                  <View style={styles.sheetDivider}></View>
                  <Text
                    onPress={() => {
                      setopenChangePicSheet(false);
                    }}
                    style={{
                      marginHorizontal: Sizes.fixPadding * 2.0,
                      ...Fonts.blackColor17SemiBold,
                      textAlign: "center",
                    }}
                  >
                    Remove photo
                  </Text>
                </View>
                <View style={styles.sheetCancelButton}>
                  <Text
                    onPress={() => {
                      setopenChangePicSheet(false);
                    }}
                    style={{ ...Fonts.primaryColor17SemiBold, textAlign: "center" }}
                  >
                    Cancel
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function updateButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.pop();
        }}
        style={{ ...commonStyles.buttonStyle }}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>Update</Text>
      </TouchableOpacity>
    );
  }

  function mobileNumberInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.blackColor18SemiBold }}>Mobile number</Text>
        <View style={styles.textFieldWrapper}>
          <TextInput
            placeholder="Enter Email Address"
            placeholderTextColor={Colors.grayColor}
            style={{ ...Fonts.blackColor17Medium, padding: 0.0 }}
            value={mobileNumber}
            onChangeText={(value) => setmobileNumber(value)}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            keyboardType="numeric"
          />
        </View>
      </View>
    );
  }

  function emailInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding * 2.5,
        }}
      >
        <Text style={{ ...Fonts.blackColor18SemiBold }}>Email address</Text>
        <View style={styles.textFieldWrapper}>
          <TextInput
            placeholder="Enter Email Address"
            placeholderTextColor={Colors.grayColor}
            style={{ ...Fonts.blackColor17Medium, padding: 0.0 }}
            value={email}
            onChangeText={(value) => setemail(value)}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            keyboardType="email-address"
          />
        </View>
      </View>
    );
  }

  function userNameInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.blackColor18SemiBold }}>User name</Text>
        <View style={styles.textFieldWrapper}>
          <TextInput
            placeholder="Enter User Name"
            placeholderTextColor={Colors.grayColor}
            style={{ ...Fonts.blackColor17Medium, padding: 0.0 }}
            value={userName}
            onChangeText={(value) => setuserName(value)}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function userPicWithChangeOption() {
    return (
      <View style={{ alignItems: "center", margin: Sizes.fixPadding * 4.0 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../../assets/images/user1.jpeg")}
            style={{
              width: screenWidth / 2.5,
              height: screenWidth / 2.5,
              borderRadius: screenWidth / 2.5 / 2,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setopenChangePicSheet(true);
            }}
            style={styles.changePicCircle}
          >
            <Ionicons
              name="camera-outline"
              color={Colors.primaryColor}
              size={28}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  changePicCircle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    backgroundColor: Colors.bodyBackColor,
    position: "absolute",
    right: -25.0,
    alignItems: "center",
    justifyContent: "center",
  },
  textFieldWrapper: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding * 3.0,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginTop: Sizes.fixPadding - 7.0,
  },
  sheetDivider: {
    backgroundColor: Colors.lightGrayColor2,
    height: 2.0,
    marginVertical: Sizes.fixPadding * 1.2,
  },
  sheetCancelButton: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
    padding: Sizes.fixPadding,
  },
  sheetOptionsWrapper: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding * 1.5,
    marginHorizontal: Sizes.fixPadding,
  },
});
