import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, createRef, useEffect } from "react";
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const width = screenWidth;
const cardWidth = width / 1.15;
const SPACING_FOR_CARD_INSET = width * 0.1 - 30;

const employsList = [
  {
    coordinate: {
      latitude: 22.622137,
      longitude: 88.427499,
    },
    id: "1",
    image: require("../../assets/images/users/user2.png"),
    name: "Esther Howard",
    distance: "47 km",
    mobileNo: "+91 1234567890",
  },
  {
    coordinate: {
      latitude: 22.6345648,
      longitude: 88.4377279,
    },
    id: "2",
    image: require("../../assets/images/users/user12.png"),
    name: "Annette Black",
    distance: "30 km",
    mobileNo: "+91 1234567890",
  },
  {
    coordinate: {
      latitude: 22.616357,
      longitude: 88.442317,
    },
    id: "3",
    image: require("../../assets/images/users/user6.png"),
    name: "Guy Hawkins",
    distance: "30 km",
    mobileNo: "+91 1234567890",
  },
  {
    coordinate: {
      latitude: 22.6341137,
      longitude: 88.4497463,
    },
    id: "4",
    image: require("../../assets/images/users/user3.png"),
    name: "Leslie Alexander",
    distance: "45 km",
    mobileNo: "+91 1234567890",
  },
  {
    coordinate: {
      latitude: 22.6341137,
      longitude: 88.4597463,
    },
    id: "5",
    image: require("../../assets/images/users/user8.png"),
    name: "Arlene McCoy",
    distance: "47 km",
    mobileNo: "+91 1234567890",
  },
  {
    coordinate: {
      latitude: 22.6311137,
      longitude: 88.4297463,
    },
    id: "6",
    image: require("../../assets/images/users/user4.png"),
    name: "Kargol Mario",
    distance: "47 km",
    mobileNo: "+91 1234567890",
  },
  {
    coordinate: {
      latitude: 22.624137,
      longitude: 88.4397463,
    },
    id: "7",
    image: require("../../assets/images/users/user7.png"),
    name: "Alexa Tony",
    distance: "47 km",
    mobileNo: "+91 1234567890",
  },
  {
    coordinate: {
      latitude: 22.624137,
      longitude: 88.4497463,
    },
    id: "8",
    image: require("../../assets/images/users/user10.png"),
    name: "Karon Stan",
    distance: "47 km",
    mobileNo: "+91 1234567890",
  },
  {
    coordinate: {
      latitude: 22.644137,
      longitude: 88.445499,
    },
    id: "9",
    image: require("../../assets/images/users/user11.png"),
    name: "Marbel Roy",
    distance: "47 km",
    mobileNo: "+91 1234567890",
  },
];

const TrackScreen = ({ navigation }) => {
  const [markerList] = useState(employsList);
  const [region] = useState({
    latitude: 22.622137,
    longitude: 88.437499,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  let mapAnimation = new Animated.Value(0);
  let mapIndex = 0;

  const _map = createRef();

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / cardWidth + 0.3);
      if (index >= markerList.length) {
        index = markerList.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = markerList[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolation = markerList.map((marker, index) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * cardWidth + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _scrollView = useRef(null);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        {markersInfo()}
        {employs()}
      </View>
    </View>
  );

  function employs() {
    return (
      <View
        style={{ position: "absolute", bottom: 0.0, left: 0.0, right: 0.0 }}
      >
        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + 25}
          decelerationRate="fast"
          snapToAlignment="center"
          style={{ paddingVertical: Sizes.fixPadding }}
          contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        >
          {markerList.map((item, index) => (
            <View activeOpacity={0.8} key={index} style={styles.employInfoCard}>
              <Image
                source={item.image}
                style={{
                  width: 90.0,
                  height: 90.0,
                  borderRadius: Sizes.fixPadding - 5.0,
                }}
              />
              <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor18Medium }}>
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ ...Fonts.grayColor15SemiBold }}
                >
                  Distance : {item.distance}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.grayColor15SemiBold,
                    marginTop: Sizes.fixPadding - 8.0,
                  }}
                >
                  {item.mobileNo}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.push("Call");
                  }}
                  style={styles.callAndTrackIconWrapper}
                >
                  <Ionicons
                    name="call-outline"
                    color={Colors.primaryColor}
                    size={18}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.push("Route");
                  }}
                  style={{
                    ...styles.callAndTrackIconWrapper,
                    marginLeft: Sizes.fixPadding + 5.0,
                  }}
                >
                  <Ionicons
                    name="paper-plane-outline"
                    color={Colors.primaryColor}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }

  function markersInfo() {
    return (
      <MapView
        ref={_map}
        style={{ flex: 1 }}
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
      >
        {markerList.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolation[index].scale,
              },
            ],
          };
          return (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={styles.markerStyle}>
                <Animated.Image
                  source={marker.image}
                  resizeMode="contain"
                  style={[{ ...styles.animatedMarkerStyle }, scaleStyle]}
                ></Animated.Image>
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.blackColor22SemiBold }}>Track</Text>
      </View>
    );
  }
};

export default TrackScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    padding: Sizes.fixPadding + 5.0,
    zIndex: 100,
  },
  callAndTrackIconWrapper: {
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
  markerStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  animatedMarkerStyle: {
    width: 35.0,
    height: 35.0,
    borderRadius: 17.5,
    borderColor: Colors.whiteColor,
    borderWidth: 1.0,
    backgroundColor: Colors.whiteColor,
  },
  employInfoCard: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    width: cardWidth,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding * 2.5,
  },
});
