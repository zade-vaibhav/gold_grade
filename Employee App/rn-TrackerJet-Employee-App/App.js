import "react-native-gesture-handler";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import { useFonts } from "expo-font";
import * as ExpoSplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import SplashScreen from "./screens/splashScreen";
import OnboardingScreen from "./screens/onboarding/onboardingScreen";
import LoginScreen from "./screens/auth/loginScreen";
import VerificationScreen from "./screens/auth/verificationScreen";
import BottomTabBarScreen from "./components/bottomTabBarScreen";
import NotificationsScreen from "./screens/notifications/notificationsScreen";
import RouteScreen from "./screens/route/routeScreen";
import EditProfileScreen from "./screens/editProfile/editProfileScreen";
import AttendanceReportScreen from "./screens/attendanceReport/attendanceReportScreen";
import ContactUsScreen from "./screens/contactUs/contactUsScreen";
import Task from "./screens/task/Task";
import TaskDatailScreen from "./screens/taskDatailScreen/TaskDatailScreen";

ExpoSplashScreen.preventAutoHideAsync();

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Mukta_Regular: require("./assets/fonts/Mukta-Regular.ttf"),
    Mukta_Medium: require("./assets/fonts/Mukta-Medium.ttf"),
    Mukta_SemiBold: require("./assets/fonts/Mukta-SemiBold.ttf"),
    Mukta_Bold: require("./assets/fonts/Mukta-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="BottomTabBar" component={BottomTabBarScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Route" component={RouteScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="AttendanceReport" component={AttendanceReportScreen} />
          <Stack.Screen name="ContactUs" component={ContactUsScreen} />
          <Stack.Screen name="Task" component={Task} />
          <Stack.Screen name="TaskDetailScreen" component={TaskDatailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
