import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import * as Animatable from "react-native-animatable";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CallScreen = ({ navigation }) => {

  const [micOn, setmicOn] = useState(true);
  const [speakerOn, setspeakerOn] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <ImageBackground
        source={require("../../assets/images/users/user11.png")}
        style={{ flex: 1 }}
        blurRadius={5}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={styles.callerInfoWrapper}>
            <Image
              source={require("../../assets/images/users/user11.png")}
              style={styles.callerImageStyle}
            />
            <Animatable.View
              animation="zoomIn"
              iterationCount="infinite"
              direction="alternate"
              style={styles.blinkingViewWrapStyle}
            ></Animatable.View>
          </View>
          <Text
            style={{
              ...Fonts.whiteColor16Medium,
              marginTop: Sizes.fixPadding + 30.0,
            }}
          >
            Calling..
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.whiteColor22Medium }}>
            Jenny wilsom
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setmicOn(!micOn);
              }}
              style={styles.circle50}
            >
              <Ionicons
                name={micOn ? "mic-outline" : "mic-off-outline"}
                color={Colors.primaryColor}
                size={28}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setspeakerOn(!speakerOn);
              }}
              style={styles.circle50}
            >
              <Ionicons
                name={speakerOn ? "volume-high-outline" : "volume-mute-outline"}
                color={Colors.primaryColor}
                size={28}
              />
            </TouchableOpacity>
            <View style={styles.circle50}>
              <Ionicons
                name="chatbox-ellipses-outline"
                color={Colors.primaryColor}
                size={26}
              />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.pop();
            }}
            style={{ ...styles.circle50, ...styles.callEndButtonStyle }}
          >
            <MaterialIcons
              name="call-end"
              color={Colors.whiteColor}
              size={28}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  callerImageStyle: {
    width: 140.0,
    height: 140.0,
    borderRadius: 70.0,
    zIndex: 100,
  },
  blinkingViewWrapStyle: {
    position: "absolute",
    width: 190.0,
    height: 190.0,
    borderRadius: 95.0,
    borderColor: Colors.grayColor,
    borderWidth: 1.5,
  },
  circle50: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    backgroundColor: "rgba(253, 253, 253, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  callEndButtonStyle: {
    backgroundColor: Colors.redColor,
    alignSelf: "center",
    margin: Sizes.fixPadding * 5.0,
    zIndex: 100,
  },
  callerInfoWrapper: {
    marginTop: Sizes.fixPadding * 13.0,
    alignItems: "center",
    justifyContent: "center",
  },
});
