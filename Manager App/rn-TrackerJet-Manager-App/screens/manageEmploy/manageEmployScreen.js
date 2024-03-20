import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes, commonStyles } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const employessList = [
  {
    id: "1",
    image: require("../../assets/images/users/user2.png"),
    name: "Jane cooper",
    mobileNumber: "+91 1234567890",
  },
  {
    id: "2",
    image: require("../../assets/images/users/user3.png"),
    name: "Guy Hawkins",
    mobileNumber: "+91 1234567890",
  },
  {
    id: "3",
    image: require("../../assets/images/users/user4.png"),
    name: "Dianne Russell",
    mobileNumber: "+91 1234567890",
    isAbsent: true,
  },
  {
    id: "4",
    image: require("../../assets/images/users/user5.png"),
    name: "Robert Fox",
    mobileNumber: "+91 1234567890",
    isAbsent: true,
  },
  {
    id: "5",
    image: require("../../assets/images/users/user6.png"),
    name: "Esther Howard",
    mobileNumber: "+91 1234567890",
  },
  {
    id: "6",
    image: require("../../assets/images/users/user7.png"),
    name: "Jerome Bell",
    mobileNumber: "+91 1234567890",
  },
  {
    id: "7",
    image: require("../../assets/images/users/user8.png"),
    name: "Arlene McCoy",
    mobileNumber: "+91 1234567890",
  },
  {
    id: "8",
    image: require("../../assets/images/users/user9.png"),
    name: "Jacob Jones",
    mobileNumber: "+91 1234567890",
  },
  {
    id: "9",
    image: require("../../assets/images/users/user10.png"),
    name: "Albert Flores",
    mobileNumber: "+91 1234567890",
  },
  {
    id: "10",
    image: require("../../assets/images/users/user11.png"),
    name: "Albert Flores",
    mobileNumber: "+91 1234567890",
    isAbsent: true,
  },
];

const ManageEmployScreen = ({ navigation }) => {
  const [employs, setemploys] = useState(employessList);
  const [showRemoveEmployDialog, setshowRemoveEmployDialog] = useState(false);
  const [selectedEmployId, setselectedEmployId] = useState();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {employs.length == 0 ? emptyInfo() : employInfo()}
      </View>
      {removeEmployDialog()}
    </View>
  );

  function emptyInfo() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={require("../../assets/images/icons/employs.png")}
            style={styles.emptyIconStyle}
          />
          <Text
            style={{
              ...Fonts.grayColor20SemiBold,
              marginTop: Sizes.fixPadding,
            }}
          >
            Your employee list is empty
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.push("AddEmploy");
          }}
          style={{ ...commonStyles.buttonStyle }}
        >
          <Text style={{ ...Fonts.whiteColor20SemiBold }}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function removeEmployDialog() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showRemoveEmployDialog}
        onRequestClose={() => {
          setshowRemoveEmployDialog(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setshowRemoveEmployDialog(false);;
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
                  Are you sure you want to remove this employee?
                </Text>
                <View style={styles.dialogButtonWrapStyle}>
                  <Text
                    onPress={() => {
                      setshowRemoveEmployDialog(false);
                    }}
                    style={{ ...Fonts.grayColor18SemiBold }}
                  >
                    Cancel
                  </Text>
                  <Text
                    onPress={() => {
                      setemploys(
                        employs.filter((item) => item.id !== selectedEmployId)
                      );
                      setshowRemoveEmployDialog(false);
                    }}
                    style={{
                      ...Fonts.primaryColor18SemiBold,
                      marginLeft: Sizes.fixPadding * 3.0,
                    }}
                  >
                    Remove
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function employInfo() {
    const renderItem = ({ item, index }) => (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={item.image}
            style={{ width: 45.0, height: 45.0, borderRadius: 22.5 }}
          />
          <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.blackColor18Medium,
                lineHeight: 28.0,
              }}
            >
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor15SemiBold,
                lineHeight: 20.0,
              }}
            >
              {item.mobileNumber}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.push("Call");
              }}
              style={styles.callAndDeleteIconWrapper}
            >
              <Ionicons
                name="call-outline"
                color={Colors.primaryColor}
                size={18}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setselectedEmployId(item.id);
                setshowRemoveEmployDialog(true);
              }}
              style={{
                ...styles.callAndDeleteIconWrapper,
                marginLeft: Sizes.fixPadding + 5.0,
              }}
            >
              <MaterialIcons
                name="delete-outline"
                color={Colors.redColor}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
        {index === employs.length - 1 ? null : (
          <View style={styles.itemDivider}></View>
        )}
      </View>
    );
    return (
      <FlatList
        data={employs}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back-ios"
          color={Colors.blackColor}
          size={22}
          onPress={() => navigation.pop()}
        />
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor20SemiBold,
          }}
        >
          Manage employee
        </Text>
        {employs.length == 0 ? null : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.push("AddEmploy");
            }}
            style={styles.addNewButton}
          >
            <Text style={{ ...Fonts.primaryColor16SemiBold }}>Add new</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
};

export default ManageEmployScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
  },
  addNewButton: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding - 7.0,
    ...commonStyles.boxShadow,
  },
  callAndDeleteIconWrapper: {
    width: 30.0,
    height: 30.0,
    borderRadius: 5.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderColor: Colors.bodyBackColor,
    borderWidth: 1.0,
  },
  itemDivider: {
    backgroundColor: Colors.lightPrimaryColor,
    height: 1.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
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
  emptyIconStyle: {
    width: 40.0,
    height: 40.0,
    resizeMode: "contain",
    tintColor: Colors.grayColor,
  },
});
