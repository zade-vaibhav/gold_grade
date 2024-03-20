import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors, Sizes, commonStyles, Fonts } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Header from "../../components/header";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Key } from "../../constants/key";
import MapViewDirections from "react-native-maps-directions";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const fromDefaultLocation = {
  latitude: 37.7879,
  longitude: -122.4324,
};

const toDefaultLocation = {
  latitude: 37.77825,
  longitude: -122.4424,
};

const RouteScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header navigation={navigation} header={"Route"} />
        {mapView()}
        {employInfo()}
      </View>
    </View>
  );

  function employInfo() {
    return (
      <View style={styles.employInfoWrapper}>
        <Text style={{ ...Fonts.primaryColor20SemiBold, textAlign: "center" }}>
          25 jan 2023
        </Text>

        <View style={styles.employDetailWrapper}>
          <Image
            source={require("../../assets/images/users/user2.png")}
            style={{ width: 55.0, height: 55.0, borderRadius: 27.5 }}
          />
          <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor18Medium }}>
              Esther Howard
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.grayColor15SemiBold, lineHeight: 20.0 }}
            >
              25 jan 2023
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.push("Call");
            }}
            style={styles.callIconWrapper}
          >
            <Ionicons
              name="call-outline"
              color={Colors.primaryColor}
              size={18}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.dashedLine}></View>

        <View style={styles.distanceInfoWrapper}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <MaterialIcons
              name="access-time"
              color={Colors.primaryColor}
              size={24}
              style={{ marginBottom: Sizes.fixPadding }}
            />
            <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
              06 hours
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor16SemiBold,
                paddingTop: Sizes.fixPadding - 7.0,
                lineHeight: 20.0,
              }}
            >
              Time taken
            </Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.grayColor,
              width: 1.0,
              height: "90%",
            }}
          ></View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <MaterialIcons
              name="access-time"
              color={Colors.primaryColor}
              size={24}
              style={{ marginBottom: Sizes.fixPadding }}
            />
            <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
              47kms
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor16SemiBold,
                paddingTop: Sizes.fixPadding - 7.0,
                lineHeight: 20.0,
              }}
            >
              Distance
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function mapView() {
    return (
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.784,
          longitude: -122.437,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <MapViewDirections
          origin={fromDefaultLocation}
          destination={toDefaultLocation}
          apikey={Key.apiKey}
          lineCap="square"
          strokeColor={Colors.primaryColor}
          strokeWidth={3}
        />
        <Marker coordinate={fromDefaultLocation}>
          <Image
            source={require("../../assets/images/company.jpeg")}
            style={styles.imageMarkerStyle}
          />
        </Marker>
        <Marker coordinate={toDefaultLocation}>
          <Image
            source={require("../../assets/images/users/user2.png")}
            style={styles.imageMarkerStyle}
          />
        </Marker>
      </MapView>
    );
  }
};

export default RouteScreen;

const styles = StyleSheet.create({
  imageMarkerStyle: {
    width: 60,
    height: 60,
    borderRadius: 30.0,
    borderColor: Colors.whiteColor,
    borderWidth: 1.0,
  },
  callIconWrapper: {
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
  distanceInfoWrapper: {
    borderRadius: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Sizes.fixPadding - 5.0,
  },
  dashedLine: {
    height: 1.0,
    borderColor: Colors.grayColor,
    opacity: 0.4,
    borderWidth: 1.0,
    borderStyle: "dashed",
    marginVertical: Sizes.fixPadding * 2.0,
  },
  employDetailWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
  },
  employInfoWrapper: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding * 4.0,
    borderTopRightRadius: Sizes.fixPadding * 4.0,
    ...commonStyles.boxShadow,
    borderColor: Colors.bodyBackColor,
    borderWidth: 1.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    marginTop: -Sizes.fixPadding * 5.0,
  },
});
