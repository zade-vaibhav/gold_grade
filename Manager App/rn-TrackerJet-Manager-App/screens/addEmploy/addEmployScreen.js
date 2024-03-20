import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal
} from "react-native";
import React, { useState } from "react";
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenHeight,
} from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Header from "../../components/header";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const rolesList = ["Sales man", "Service man", "Marketing", "Finance"];

const AddEmployScreen = ({ navigation }) => {
  const [employName, setemployName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [role, setrole] = useState("");
  const [openRoleSheet, setopenRoleSheet] = useState(false);
  const [openChangePicSheet, setopenChangePicSheet] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header navigation={navigation} header={"Add employee"} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {addImageInfo()}
          {employNameInfo()}
          {mobileNumberInfo()}
          {roleInfo()}
        </ScrollView>
      </View>
      {addButton()}
      {roleSheet()}
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

  function addButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.pop();
        }}
        style={{ ...commonStyles.buttonStyle }}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>Add</Text>
      </TouchableOpacity>
    );
  }

  function roleSheet() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openRoleSheet}
        onRequestClose={() => {
          setopenRoleSheet(false)
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setopenRoleSheet(false);
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
            >
              <View style={styles.sheetWrapper}>
                <ScrollView>
                  {rolesList.map((item, index) => (
                    <View key={`${index}`}>
                      <Text
                        onPress={() => {
                          setrole(item);
                          setopenRoleSheet(false);
                        }}
                        style={{ ...Fonts.blackColor17Medium, textAlign: "center" }}
                      >
                        {item}
                      </Text>
                      {index == rolesList.length - 1 ? null : (
                        <View
                          style={{
                            backgroundColor: Colors.lightGrayColor2,
                            height: 1.0,
                            marginVertical: Sizes.fixPadding + 5.0,
                          }}
                        ></View>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function roleInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.blackColor18SemiBold }}>Select role</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setopenRoleSheet(true);
          }}
          style={{
            ...styles.textFieldWrapper,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              ...(role
                ? { ...Fonts.blackColor17Medium }
                : { ...Fonts.grayColor17Medium }),
              flex: 1,
            }}
          >
            {role ? role : "Select your role"}
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            color={Colors.blackColor}
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function mobileNumberInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding * 2.5,
        }}
      >
        <Text style={{ ...Fonts.blackColor18SemiBold }}>Mobile number</Text>
        <View style={styles.textFieldWrapper}>
          <TextInput
            placeholder="Enter mobile number"
            placeholderTextColor={Colors.grayColor}
            style={{ ...Fonts.blackColor17Medium, padding: 0.0 }}
            value={mobileNumber}
            onChangeText={(value) => setMobileNumber(value)}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            keyboardType="numeric"
          />
        </View>
      </View>
    );
  }

  function employNameInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.blackColor18SemiBold }}>Employee name</Text>
        <View style={styles.textFieldWrapper}>
          <TextInput
            placeholder="Enter employee name"
            placeholderTextColor={Colors.grayColor}
            style={{ ...Fonts.blackColor17Medium, padding: 0.0 }}
            value={employName}
            onChangeText={(value) => setemployName(value)}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function addImageInfo() {
    return (
      <View
        style={{
          alignItems: "center",
          marginVertical: Sizes.fixPadding * 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setopenChangePicSheet(true);
          }}
          style={styles.addImageCircleStyle}
        >
          <Ionicons
            name="camera-outline"
            color={Colors.primaryColor}
            size={28}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...Fonts.blackColor22Medium,
            marginTop: Sizes.fixPadding - 5.0,
          }}
        >
          Add image
        </Text>
      </View>
    );
  }
};

export default AddEmployScreen;

const styles = StyleSheet.create({
  addImageCircleStyle: {
    width: 90.0,
    height: 90.0,
    borderRadius: 45.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E9E4E4",
  },
  textFieldWrapper: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding * 3.0,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginTop: Sizes.fixPadding - 7.0,
  },
  sheetWrapper: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding * 4.0,
    borderTopRightRadius: Sizes.fixPadding * 4.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    maxHeight: screenHeight / 1.5,
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
  sheetDivider: {
    backgroundColor: Colors.lightGrayColor2,
    height: 2.0,
    marginVertical: Sizes.fixPadding * 1.2,
  },
});
