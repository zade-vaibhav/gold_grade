import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes, commonStyles } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Key } from "../../constants/key";
import MapViewDirections from "react-native-maps-directions";

let today = moment(new Date());

const fromDefaultLocation = {
  latitude: 37.7879,
  longitude: -122.4324,
};

const toDefaultLocation = {
  latitude: 37.77825,
  longitude: -122.4424,
};

const RouteScreen = ({ navigation }) => {
  const [displayDate, setdisplayDate] = useState(today);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {mapView()}
        {distanceInfo()}
      </View>
    </View>
  );

  function distanceInfo() {
    return (
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
        <View style={{ backgroundColor: Colors.grayColor, width: 1.0 }}></View>
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
    );
  }

  function mapView() {
    return (
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.77825,
          longitude: -122.439,
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
          <View style={styles.circle34}>
            <MaterialIcons
              name="location-on"
              color={Colors.primaryColor}
              size={20}
            />
          </View>
        </Marker>
        <Marker coordinate={toDefaultLocation}>
          <Image
            source={require("../../assets/images/user1.jpeg")}
            style={styles.imageMarkerStyle}
          />
        </Marker>
      </MapView>
    );
  }

  function addDate() {
    let tomorrow = new Date();
    tomorrow = moment(displayDate).add(1, "day");
    setdisplayDate(tomorrow);
  }

  function minusDate() {
    let yesterday = new Date();
    yesterday = moment(displayDate).subtract(1, "day");
    setdisplayDate(yesterday);
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back-ios"
          color={Colors.blackColor}
          size={22}
          onPress={() => navigation.pop()}
        />
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.blackColor20SemiBold,
            flex: 1,
            marginHorizontal: Sizes.fixPadding - 5.0,
          }}
        >
          My route
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="arrow-back-ios"
            color={Colors.blackColor}
            size={18}
            onPress={() => {
              minusDate();
            }}
          />
          <Text
            style={{
              ...Fonts.primaryColor17SemiBold,
              marginHorizontal: Sizes.fixPadding,
            }}
          >
            {moment(displayDate).format("DD MMM YYYY")}
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            color={Colors.blackColor}
            size={18}
            onPress={() =>
              moment(displayDate).format("DD MMM YYYY") ==
              moment(new Date()).format("DD MMM YYYY")
                ? null
                : addDate()
            }
          />
        </View>
      </View>
    );
  }
};

export default RouteScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    zIndex:100
  },
  circle34: {
    width: 34.0,
    height: 34.0,
    borderRadius: 17.0,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    ...commonStyles.boxShadow,
  },
  imageMarkerStyle: {
    width: 34.0,
    height: 34.0,
    resizeMode: "contain",
    borderRadius: 17.0,
    borderColor: Colors.whiteColor,
    borderWidth: 1.0,
  },
  distanceInfoWrapper: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 2.0,
    position: "absolute",
    bottom: 30.0,
    left: 20.0,
    right: 20.0,
    flexDirection: "row",
    borderColor: Colors.bodyBackColor,
    borderWidth: 1.0,
  },
});
