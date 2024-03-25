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
import LoginScreen from "./screens/auth/loginScreen";
import VerificationScreen from "./screens/auth/verificationScreen";
import BottomTabBarScreen from "./components/bottomTabBarScreen";
import SearchScreen from "./screens/search/searchScreen";
import RouteScreen from "./screens/route/routeScreen";
import CallScreen from "./screens/call/callScreen";
import EditProfileScreen from "./screens/editProfile/editProfileScreen";
import ManageEmployScreen from "./screens/manageEmploy/manageEmployScreen";
import AddEmployScreen from "./screens/addEmploy/addEmployScreen";
import TrackEmploy from './screens/trackEmploy/trackEmployScreen';
import TaskScreen from './screens/task/taskScreen'
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
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="BottomTabBar" component={BottomTabBarScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Route" component={RouteScreen} />
          <Stack.Screen name="Call" component={CallScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="ManageEmploy" component={ManageEmployScreen} />
          <Stack.Screen name="AddEmploy" component={AddEmployScreen} />
          <Stack.Screen name="TrackEmploy" component={TrackEmploy} />
          <Stack.Screen name="TaskScreen" component={TaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
