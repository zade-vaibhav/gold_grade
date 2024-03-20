import { StyleSheet, Text, View, Animated, Image } from "react-native";
import React, { useState, useRef } from "react";
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Feather from "react-native-vector-icons/Feather";
import Header from "../../components/header";
import { SwipeListView } from "react-native-swipe-list-view";
import { Snackbar } from "react-native-paper";

const notificatiosList = [
  {
    key: "1",
    title: "Attendance",
    description:
      "Lorem ipsum dolor sit amet consectetur. Accumsan ipsum vel adipiscing enim leo ",
    time: "2min ago",
  },
  {
    key: "2",
    title: "Attendance",
    description:
      "Lorem ipsum dolor sit amet consectetur. Accumsan ipsum vel adipiscing enim leo ",
    time: "2min ago",
  },
  {
    key: "3",
    title: "Attendance",
    description:
      "Lorem ipsum dolor sit amet consectetur. Accumsan ipsum vel adipiscing enim leo ",
    time: "2min ago",
  },
];

const rowTranslateAnimatedValues = {};

const NotificationsScreen = ({ navigation }) => {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [listData, setListData] = useState(notificatiosList);

  Array(listData.length + 1)
    .fill("")
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

  const animationIsRunning = useRef(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header navigation={navigation} header={"Notification"} />
        {listData.length == 0 ? noNotificationInfo() : notificationsInfo()}
      </View>
      {snackBar()}
    </View>
  );

  function noNotificationInfo() {
    return (
      <View style={styles.noNotificationPage}>
        <Image
          source={require("../../assets/images/icons/empty_noty.png")}
          style={{ width: 45, height: 45, resizeMode: "contain" }}
        />
        <Text
          style={{
            ...Fonts.grayColor20Medium,
            marginTop: Sizes.fixPadding,
          }}
        >
          No notification
        </Text>
      </View>
    );
  }

  function snackBar() {
    return (
      <Snackbar
        style={{ backgroundColor: Colors.blackColor }}
        elevation={0}
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
      >
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Notification Dismissed!
        </Text>
      </Snackbar>
    );
  }

  function notificationsInfo() {
    const onSwipeValueChange = (swipeData) => {
      const { key, value } = swipeData;
      if (
        value > screenWidth ||
        (value < -screenWidth && !animationIsRunning.current)
      ) {
        animationIsRunning.current = true;
        Animated.timing(rowTranslateAnimatedValues[key], {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          const newData = [...listData];
          const prevIndex = listData.findIndex((item) => item.key === key);
          newData.splice(prevIndex, 1);
          setListData(newData);
          setShowSnackBar(true);
          animationIsRunning.current = false;
        });
      }
    };

    const renderItem = (data) => (
      <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
        <View style={styles.notificationWrapper}>
          <View style={styles.notificationIconWrapper}>
            <Feather name="bell" color={Colors.primaryColor} size={24} />
          </View>
          <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text numberOfLines={1} style={styles.notificationTitleTextStyle}>
                {data.item.title} 
              </Text>
              <Text style={{ ...Fonts.grayColor17SemiBold, lineHeight: 20.0 }}>
                {data.item.time}
              </Text>
            </View>
            <Text
              numberOfLines={2}
              style={{ ...Fonts.blackColor16Regular, lineHeight: 20.0 }}
            >
              {data.item.description}
            </Text>
          </View>
        </View>
      </View>
    );

    const renderHiddenItem = (data) => <View style={styles.rowBack} />;

    return (
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-screenWidth}
        leftOpenValue={screenWidth}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
      />
    );
  }
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  rowBack: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
    marginBottom: Sizes.fixPadding * 2.0,
  }, 
  noNotificationPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: Sizes.fixPadding * 2.0,
  },
  notificationIconWrapper: {
    width: 50.0,
    height: 50.0,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGrayColor,
  },
  notificationTitleTextStyle: {
    ...Fonts.primaryColor20Medium,
    flex: 1,
    lineHeight: 25.0,
    marginRight: Sizes.fixPadding - 5.0,
  },
  notificationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    padding: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});
