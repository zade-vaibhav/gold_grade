import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from "../../constants/styles";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import  AsyncStorage  from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [isCheckIn, setisCheckIn] = useState(true);
  const [selectedAttendanceIndex, setselectedAttendanceIndex] = useState(0);
  const [openAttendanceSheet, setopenAttendanceSheet] = useState(false);
  const [user,setUser]=useState("")

  useEffect(()=>{
    async function getdata(){
      const value =await AsyncStorage.getItem("user")
      setUser(JSON.parse(value))
    }
    getdata()
  },[])
 
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        {attendanceInfo()}
        {taskInfo()}
      {checkInOutInfo()}
      </View>
      {attendanceSheet()}
    </View>
  );

  function attendanceSheet() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openAttendanceSheet}
        onRequestClose={() => {
          setopenAttendanceSheet(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setopenAttendanceSheet(false);;
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
            >
              <View
                style={{
                  backgroundColor: Colors.whiteColor,
                  borderTopLeftRadius: Sizes.fixPadding * 4.0,
                  borderTopRightRadius: Sizes.fixPadding * 4.0,
                }}
              >
                <Text style={styles.sheetHeaderTextStyle}>
                  Set attendance 25 April 2023
                </Text>

                <View
                  style={{ flexDirection: "row", marginHorizontal: Sizes.fixPadding }}
                >
                  {attendanceSort({
                    icon: require("../../assets/images/present.png"),
                    type: "Present",
                    index: 0,
                  })}
                  {attendanceSort({
                    icon: require("../../assets/images/absent.png"),
                    type: "Absent",
                    index: 1,
                  })}
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setopenAttendanceSheet(false);
                  }}
                  style={{
                    ...commonStyles.buttonStyle,
                    marginVertical: Sizes.fixPadding * 3.0,
                  }}
                >
                  <Text style={{ ...Fonts.whiteColor20SemiBold }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function attendanceSort({ icon, type, index }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setselectedAttendanceIndex(index);
        }}
        style={{
          backgroundColor:
            selectedAttendanceIndex === index
              ? Colors.lightPrimaryColor
              : Colors.whiteColor,
          borderColor:
            selectedAttendanceIndex === index
              ? Colors.primaryColor
              : Colors.bodyBackColor,
          ...styles.attendanceSelectionBox,
        }}
      >
        <Image
          source={icon}
          style={{ width: 60.0, height: 60.0, resizeMode: "contain" }}
        />
        <Text
          numberOfLines={1}
          style={{
            ...(selectedAttendanceIndex === index
              ? { ...Fonts.primaryColor22Medium }
              : { ...Fonts.blackColor22Medium }),
            marginTop: Sizes.fixPadding,
            textAlign: "center",
          }}
        >
          {type}
        </Text>
      </TouchableOpacity>
    );
  }

  function checkInOutInfo() {
    return (
      <View style={styles.checkInOutInfoWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingVertical: Sizes.fixPadding * 3.0,
              paddingHorizontal: Sizes.fixPadding * 2.0,
            }}
          >
            <Text
              style={{
                ...Fonts.primaryColor28SemiBold,
                lineHeight: 35.0,
                textAlign: "center",
              }}
            >
              {isCheckIn ? "Check in" : "Check out"}
            </Text>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setisCheckIn(!isCheckIn);
                }}
                style={{
                  alignSelf: "center",
                  borderRadius: 100.0,
                  marginVertical: Sizes.fixPadding * 2.0,
                }}
              >
                <ImageBackground
                  source={
                    isCheckIn
                      ? require("../../assets/images/circle_green.png")
                      : require("../../assets/images/circle_red.png")
                  }
                  style={styles.checkInOutImageStyle}
                  resizeMode="contain"
                >
                  <Image
                    source={require("../../assets/images/icons/hand_raise.png")}
                    style={{ width: 60.0, height: 60.0, resizeMode: "contain" }}
                  />
                  <Text style={{ ...Fonts.whiteColor22SemiBold }}>
                    {isCheckIn ? "Check in" : "Check out"}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center" }}>
              <Text
                numberOfLines={1}
                style={{ ...Fonts.grayColor18SemiBold, lineHeight: 25.0 }}
              >
                Monday,25 April 2023
              </Text>
              <Text
                numberOfLines={1}
                style={{ ...Fonts.primaryColor22SemiBold, lineHeight: 30.0 }}
              >
                {isCheckIn ? "9 : 00" : "18 : 00"}
              </Text>
            </View>

            <View style={styles.timingInfoWrapper}>
              {infoSort({
                color: Colors.greenColor,
                time: "09:00",
                description: "Check in",
              })}
              {infoSort({
                color: Colors.redColor,
                time: "18 :00",
                description: "Check out",
              })}
              {infoSort({
                color: Colors.blueColor,
                time: "09hr",
                description: "Total hr",
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  function infoSort({ color, time, description }) {
    return (
      <View style={{ alignItems: "center", maxWidth: screenWidth / 3.5 }}>
        <MaterialIcons
          name="access-time"
          color={color}
          size={24.0}
          style={{ marginBottom: Sizes.fixPadding }}
        />
        <Text style={{ ...Fonts.blackColor18Medium, lineHeight: 22.0 }}>
          {time}
        </Text>
        <Text
          numberOfLines={1}
          style={{ ...Fonts.grayColor15Bold, lineHeight: 18.0 }}
        >
          {description}
        </Text>
      </View>
    );
  }

  function attendanceInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setopenAttendanceSheet(true);
        }}
        style={styles.attendanceInfoWrapper}
      >
        <View
          style={{
            flex: 1,
            marginRight: Sizes.fixPadding,
            paddingTop: Sizes.fixPadding - 6.0,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.primaryColor22SemiBold, lineHeight: 28.0 }}
          >
            Attendance
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor15SemiBold, lineHeight: 20.0 }}
          >
            Set attendance for 25 April 2023
          </Text>
        </View>
        <Image
          source={require("../../assets/images/attendance.png")}
          style={{ width: 90.0, resizeMode: "contain", height: 80.0 }}
        />
      </TouchableOpacity>
    );
  }

  function taskInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Task",user)
        }}
        style={styles.taskInfoWrapper}
      >
        <View
          style={{
            flex: 1,
            marginRight: Sizes.fixPadding,
            paddingTop: Sizes.fixPadding - 6.0,
            paddingBottom:5
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.primaryColor22SemiBold, lineHeight: 28.0 }}
          >
            All-Tasks
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor15SemiBold, lineHeight: 20.0 }}
          >
            Today's Task : 2
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor15SemiBold, lineHeight: 20.0 }}
          >
             In Process : 1
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor15SemiBold, lineHeight: 20.0 }}
          >
            completed : 0
          </Text>
        </View>
        <Image
          source={require("../../assets/images/task.png")}
          style={{ width: 90.0, resizeMode: "contain", height: 80.0 }}
        />
      </TouchableOpacity>
    );
  }


  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Image
          source={require("../../assets/images/user1.jpeg")}
          style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
        />
        <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.blackColor20Medium,
              lineHeight: 25.0,
              paddingTop: 5.0,
            }}
          >
            Welcome {user.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor15SemiBold, lineHeight: 18.0 }}
          >
            Start your work
          </Text>
        </View>
        <Feather
          name="bell"
          color={Colors.blackColor}
          size={24.0}
          onPress={() => {
            navigation.push("Notifications");
          }}
        />
      </View>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
  },
  attendanceInfoWrapper: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
  },
  taskInfoWrapper: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
  },
  checkInOutImageStyle: {
    width: 200.0,
    height: 200.0,
    alignItems: "center",
    justifyContent: "center",
  },
  timingInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Sizes.fixPadding * 3.0,
  },
  checkInOutInfoWrapper: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderTopLeftRadius: Sizes.fixPadding * 4.0,
    borderTopRightRadius: Sizes.fixPadding * 4.0,
  },
  attendanceSelectionBox: {
    borderWidth: 1.2,
    flex: 1,
    borderRadius: Sizes.fixPadding,
    ...commonStyles.boxShadow,
    marginHorizontal: Sizes.fixPadding,
    alignItems: "center",
    padding: Sizes.fixPadding * 2.0,
  },
  sheetHeaderTextStyle: {
    ...Fonts.blackColor18Medium,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding * 3.0,
    textAlign: "center",
    lineHeight: 22.0,
  },
});
