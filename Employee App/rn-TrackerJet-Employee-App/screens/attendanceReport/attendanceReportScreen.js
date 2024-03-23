import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Header from "../../components/header";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";

let today = moment(new Date());

const statusList = ["Present", "Absent", "Holiday"];

const attendanceList = [
  {
    id: "1",
    date: "Monday 1 April 2023",
    status: statusList[0],
    checkInTime: "09:00",
    checkOutTime: "18 :00",
    totalHr: "09hr",
  },
  {
    id: "2",
    date: "Tuesday 2 April 2023",
    status: statusList[0],
    checkInTime: "09:00",
    checkOutTime: "16 :00",
    totalHr: "07hr",
  },
  {
    id: "3",
    date: "Tuesday  3 April 2023",
    status: statusList[0],
    checkInTime: "10:00",
    checkOutTime: "18 :00",
    totalHr: "08hr",
  },
  {
    id: "4",
    date: "Wednesday 4 April 2023",
    status: statusList[1],
    checkInTime: "00:00",
    checkOutTime: "00:00",
    totalHr: "00hr",
  },
  {
    id: "5",
    date: "Thursday 5 April 2023",
    status: statusList[1],
    checkInTime: "00:00",
    checkOutTime: "00:00",
    totalHr: "00hr",
  },
  {
    id: "6",
    date: "Friday 6 April 2023",
    status: statusList[0],
    checkInTime: "09:00",
    checkOutTime: "18 :00",
    totalHr: "09hr",
  },
  {
    id: "7",
    date: "Saturday 7April 2023",
    status: statusList[0],
    checkInTime: "09:00",
    checkOutTime: "18 :00",
    totalHr: "09hr",
  },
  {
    id: "8",
    date: "Sunday 8 April 2023",
    status: statusList[2],
    checkInTime: "09:00",
    checkOutTime: "18 :00",
    totalHr: "09hr",
  },
  {
    id: "9",
    date: "Monday 9 April 2023",
    status: statusList[0],
    checkInTime: "09:00",
    checkOutTime: "18 :00",
    totalHr: "09hr",
  },
];

const AttendanceReportScreen = ({ navigation }) => {
  const [displayDate, setdisplayDate] = useState(today);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header navigation={navigation} header={"Attendance report"} />
        {monthInfo()}
        {attendanceInfo()}
      </View>
    </View>
  );

  function attendanceInfo() {
    const renderItem = ({ item }) => (
      <View style={styles.attendanceCard}>
        <View style={styles.attendanceCardHeader}>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor17Medium, flex: 1 }}
          >
            {item.date}
          </Text>
          <Text
            style={{
              ...(item.status === statusList[0]
                ? { ...Fonts.greenColor17Medium }
                : item.status === statusList[1]
                ? { ...Fonts.redColor17Medium }
                : { ...Fonts.purpleColor17Medium }),
            }}
          >
            {item.status}
          </Text>
        </View>
        <View style={styles.dashedLine}></View>
        <View style={styles.checkInOutTotalWrapStyle}>
          <View style={{ alignItems: "center", maxWidth: screenWidth / 3.5 }}>
            <Text numberOfLines={1} style={{ ...Fonts.grayColor15Bold }}>
              Check in
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.blackColor18Medium, lineHeight: 22.0 }}
            >
              {item.checkInTime}
            </Text>
          </View>

          <View
            style={{
              width: 1.0,
              backgroundColor: Colors.grayColor,
              height: "70%",
            }}
          />

          <View style={{ alignItems: "center", maxWidth: screenWidth / 3.5 }}>
            <Text numberOfLines={1} style={{ ...Fonts.grayColor15Bold }}>
              Check out
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.blackColor18Medium, lineHeight: 22.0 }}
            >
              {item.checkOutTime}
            </Text>
          </View>
 
           <View
            style={{
              width: 1.0,
              backgroundColor: Colors.grayColor,
              height: "70%",
            }}
          /> 

          <View style={{ alignItems: "center", maxWidth: screenWidth / 3.5 }}>
            <Text numberOfLines={1} style={{ ...Fonts.grayColor15Bold }}>
              Total hr
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.blackColor18Medium, lineHeight: 22.0 }}
            >
              {item.totalHr}
            </Text>
          </View>
        </View>
      </View>
    );
    return (
      <FlatList
        data={attendanceList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: Sizes.fixPadding - 8.0 }}
      />
    );
  }

  function addMonth() {
    let next = new Date();
    next = moment(displayDate).add(1, "month");
    setdisplayDate(next);
  }

  function minusMonth() {
    let last = new Date();
    last = moment(displayDate).subtract(1, "month");
    setdisplayDate(last);
  }

  function monthInfo() {
    return (
      <View style={styles.monthInfoWrapper}>
        <MaterialIcons
          name="arrow-back-ios"
          color={Colors.blackColor}
          size={18}
          onPress={() => minusMonth()}
        />
        <Text
          style={{
            ...Fonts.primaryColor20SemiBold,
            marginHorizontal: Sizes.fixPadding * 3.0,
          }}
        >
          {moment(displayDate).format("MMMM YYYY")}
        </Text>
        <MaterialIcons
          name="arrow-forward-ios"
          color={Colors.blackColor}
          size={18}
          onPress={() =>
            moment(displayDate).format("MMMM YYYY") ==
            moment(new Date()).format("MMMM YYYY")
              ? null
              : addMonth()
          }
        />
      </View>
    );
  }
};

export default AttendanceReportScreen;

const styles = StyleSheet.create({
  monthInfoWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    margin: Sizes.fixPadding * 2.0,
  },
  checkInOutTotalWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginBottom: Sizes.fixPadding,
  },
  dashedLine: {
    height: 1.0,
    borderColor: Colors.grayColor,
    opacity: 0.4,
    borderWidth: 1.0,
    borderStyle: "dashed",
    marginVertical: Sizes.fixPadding,
  },
  attendanceCard: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    ...commonStyles.boxShadow,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  attendanceCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginTop: Sizes.fixPadding,
  },
});
