import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from "../../constants/styles";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TabView, TabBar } from "react-native-tab-view";

const EmploysScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "All" },
    { key: "second", title: "Present" },
    { key: "third", title: "Absent" },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        {EmployeeCard()}
      </View>
       {/* <View style={{ padding: Sizes.fixPadding }}>
          <EmployeeCard employee={employee} />
        </View> */}
    </View>
  );


  

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Image
          source={require("../../assets/images/users/user1.png")}
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
            Welcome Devon
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor15SemiBold, lineHeight: 18.0 }}
          >
            Good morning
          </Text>
        </View>
        <Feather
          name="search"
          color={Colors.blackColor}
          size={24.0}
          onPress={() => {
            navigation.push("Search");
          }}
        />
      </View>
    );
  }
   function EmployeeCard() {
  return (
    <View style={styles.employeeCard}>
      <Image style={styles.employeeImage} />
      <View style={styles.employeeInfo}>
        <Text style={styles.employeeName}>name</Text>
        <Text style={styles.employeeMobile}>1254558855</Text>
      </View>
      <TouchableOpacity style={styles.callIcon}>
        <Feather name="phone-call" size={20} color={Colors.primaryColor} />
      </TouchableOpacity>
    </View>
  );
};
};

export default EmploysScreen;

const styles = StyleSheet.create({

     employeeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    ...commonStyles.boxShadow,
  },
  employeeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  employeeInfo: {
    flex: 1,
    marginLeft: Sizes.fixPadding,
  },
  employeeName: {
    ...Fonts.blackColor16Medium,
  },
  employeeMobile: {
    ...Fonts.grayColor14Regular,
  },
  callIcon: {
    padding: Sizes.fixPadding,
  },
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    zIndex: 100,
  },

  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    zIndex: 100,
  },
 
  itemDivider: {
    backgroundColor: Colors.lightPrimaryColor,
    height: 1.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
});
