import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
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

const employessList = [
  {
    id: "1",
    image: require("../../assets/images/users/user2.png"),
    name: "Jane cooper",
    mobileNumber: "+91 1234567890",
  },
  // {
  //   id: "2",
  //   image: require("../../assets/images/users/user3.png"),
  //   name: "Guy Hawkins",
  //   mobileNumber: "+91 1234567890",
  // },
  // {
  //   id: "3",
  //   image: require("../../assets/images/users/user4.png"),
  //   name: "Dianne Russell",
  //   mobileNumber: "+91 1234567890",
  //   isAbsent: true,
  // },
  // {
  //   id: "4",
  //   image: require("../../assets/images/users/user5.png"),
  //   name: "Robert Fox",
  //   mobileNumber: "+91 1234567890",
  //   isAbsent: true,
  // },
  // {
  //   id: "5",
  //   image: require("../../assets/images/users/user6.png"),
  //   name: "Esther Howard",
  //   mobileNumber: "+91 1234567890",
  // },
  // {
  //   id: "6",
  //   image: require("../../assets/images/users/user7.png"),
  //   name: "Jerome Bell",
  //   mobileNumber: "+91 1234567890",
  // },
  // {
  //   id: "7",
  //   image: require("../../assets/images/users/user8.png"),
  //   name: "Arlene McCoy",
  //   mobileNumber: "+91 1234567890",
  // },
  // {
  //   id: "8",
  //   image: require("../../assets/images/users/user9.png"),
  //   name: "Jacob Jones",
  //   mobileNumber: "+91 1234567890",
  // },
  // {
  //   id: "9",
  //   image: require("../../assets/images/users/user10.png"),
  //   name: "Albert Flores",
  //   mobileNumber: "+91 1234567890",
  // },
  // {
  //   id: "10",
  //   image: require("../../assets/images/users/user11.png"),
  //   name: "Albert Flores",
  //   mobileNumber: "+91 1234567890",
  //   isAbsent: true,
  // },
];

const EmploysScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [employee, setEmployee] = useState("");
  const [routes] = useState([
    { key: "first", title: "All" },
    { key: "second", title: "Present" },
    { key: "third", title: "Absent" },
  ]);

  useEffect(() => {
    async function fetchEmployees() {
        try {
            const response = await fetch('https://gold-grade.onrender.com/api/v1/auth/user');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // Convert the response body to JSON
            setEmployee(data); // Assuming the labor data is directly available as an array
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    }

    fetchEmployees();
}, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        {totalAndAbsentInfo()}
        {allAbsentAndPresentInfo()}
      </View>
    </View>
  );

  function allAbsentAndPresentInfo() {
    const renderItem = ({ item, data, index }) => (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={item.image}
            style={{ width: 45.0, height: 45.0, borderRadius: 22.5 }}
          />
          <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.blackColor18Medium,
                lineHeight: 28.0,
              }}
            >
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor15SemiBold,
                lineHeight: 20.0,
              }}
            >
              {item.mobileNumber}
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
                navigation.push("TrackEmploy");
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
        {index === data.length - 1 ? null : (
          <View style={styles.itemDivider}></View>
        )}
      </View>
    );

    const Employs = ({ data }) => (
      <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <FlatList
          data={data}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => renderItem({ item, data, index })}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
        />
      </View>
    );

    const renderScene = ({ route }) => {
      switch (route.key) {
        case "first":
          return <Employs data={employessList} />;
        case "second":
          return (
            <Employs data={employessList.filter((item) => !item.isAbsent)} />
          );
        case "third":
          return (
            <Employs data={employessList.filter((item) => item.isAbsent)} />
          );
      }
    };

    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ height: 0 }}
            style={{
              backgroundColor: Colors.bodyBackColor,
              elevation: 0,
            }}
            pressColor={Colors.bodyBackColor}
            renderLabel={({ route, focused }) => (
              <Text
                style={{
                  ...(focused
                    ? { ...Fonts.primaryColor18SemiBold }
                    : { ...Fonts.grayColor18SemiBold }),
                  textAlign:
                    route.key == "first"
                      ? "left"
                      : route.key == "third"
                      ? "right"
                      : "center",
                  width: screenWidth / 4.5,
                  marginLeft: route.key == "second" ? -30.0 : 0,
                }}
              >
                {route.title}
              </Text>
            )}
          />
        )}
      />
    );
  }

  function totalAndAbsentInfo() {
    return (
      <View style={styles.totalAndAbsentInfoWrapStyle}>
        <View style={styles.totalAndAbsentInfoBox}>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor20Medium, lineHeight: 28.0 }}
          >
            Total
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.primaryColor18SemiBold, lineHeight: 25.0 }}
          >
            68 employee
          </Text>
        </View>
        <View style={styles.totalAndAbsentInfoBox}>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor20Medium, lineHeight: 28.0 }}
          >
            Absent today
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.primaryColor18SemiBold, lineHeight: 25.0 }}
          >
            10 employee
          </Text>
        </View>
      </View>
    );
  }

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
};

export default EmploysScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    zIndex: 100,
  },
  totalAndAbsentInfoBox: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    margin: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding + 5.0,
    alignItems: "center",
    borderColor: Colors.bodyBackColor,
    borderWidth: 1.0,
  },
  totalAndAbsentInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
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
  itemDivider: {
    backgroundColor: Colors.lightPrimaryColor,
    height: 1.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
});
