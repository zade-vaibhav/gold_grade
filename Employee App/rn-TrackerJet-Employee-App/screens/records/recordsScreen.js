import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors, Fonts, Sizes, commonStyles } from "../../constants/styles";

const recordsList = [
  {
    id: "1",
    icon: require("../../assets/images/records/clock.png"),
    title: "Hour worked",
    value: "60hr work",
  },
  {
    id: "2",
    icon: require("../../assets/images/records/attendance.png"),
    title: "Attendance",
    value: "80% this month",
  },
  {
    id: "3",
    icon: require("../../assets/images/records/distance.png"),
    title: "Distance Covered",
    value: "47kms",
  },
  {
    id: "4",
    icon: require("../../assets/images/records/route.png"),
    title: "See route",
    value: "My route",
  },
];

const RecordsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        {recordsInfo()}
      </View>
    </View>
  );

  function recordsInfo() {
    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          index == 3 ? navigation.push("Route") : null;
        }}
        style={styles.recordInfoBox}
      >
        <Image
          source={item.icon}
          style={{ width: 30.0, height: 30.0, resizeMode: "contain" }}
        />
        <Text
          numberOfLines={1}
          style={{ ...Fonts.grayColor17Medium, marginTop: Sizes.fixPadding }}
        >
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.primaryColor18SemiBold,
            lineHeight: 22.0,
            paddingTop: Sizes.fixPadding - 7.0,
          }}
        >
          {item.value}
        </Text>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={recordsList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ padding: Sizes.fixPadding }}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.blackColor22SemiBold }}>My record</Text>
      </View>
    );
  }
};

export default RecordsScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding + 5.0,
  },
  recordInfoBox: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    ...commonStyles.boxShadow,
    margin: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding * 2.5,
    paddingHorizontal: Sizes.fixPadding,
  },
});
