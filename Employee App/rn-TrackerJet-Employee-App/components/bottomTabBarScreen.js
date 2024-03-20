import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
} from "../constants/styles";
import {
  View,
  StyleSheet,
  Text,
  BackHandler,
  Platform,
  Image,
} from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ProfileScreen from "../screens/profile/profileScreen";
import RecordsScreen from "../screens/records/recordsScreen";
import HomeScreen from "../screens/home/homeScreen";
import MyStatusBar from "./myStatusBar";

const Tab = createBottomTabNavigator();

const BottomTabBarScreen = ({ navigation }) => {
  const backAction = () => {
    if (Platform.OS === "ios") {
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
      return true;
    }
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      navigation.addListener("gestureEnd", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
        navigation.removeListener("gestureEnd", backAction);
      };
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: { height: 75.0 }
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              tabSort({
                focused,
                icon: require("../assets/images/icons/home.png"),
                tab: "Home",
              }),
          }}
        />
        <Tab.Screen
          name="Records"
          component={RecordsScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              tabSort({
                focused,
                icon: require("../assets/images/icons/record.png"),
                tab: "My record",
              }),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              tabSort({
                focused,
                icon: require("../assets/images/icons/profile.png"),
                tab: "Profile",
              }),
          }}
        />
      </Tab.Navigator>
      {exitInfo()}
    </View>
  );

  function tabSort({ focused, icon, tab }) {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={icon}
          style={{ ...styles.iconStyle, opacity: focused ? 1 : 0.4 }}
        />
        <Text style={{ ...styles.tabTextStyle, opacity: focused ? 1 : 0.4 }}>
          {tab}
        </Text>
      </View>
    );
  }

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={commonStyles.exitInfoWrapStyle}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Press Back Once Again To Exit!
        </Text>
      </View>
    ) : null;
  }
};

export default BottomTabBarScreen;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Colors.primaryColor,
    borderTopColor: Colors.bodyBackColor,
    borderTopWidth: 1.0,
    height: 75.0,
    ...commonStyles.boxShadow,
  },
  iconStyle: {
    width: 24.0,
    height: 24.0,
    resizeMode: "contain",
    marginTop: Sizes.fixPadding - 5.0,
  },
  tabTextStyle: {
    lineHeight: 25.0,
    marginTop: Sizes.fixPadding - 6.0,
    ...Fonts.whiteColor18SemiBold,
  },
});
