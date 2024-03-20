import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Sizes, commonStyles } from "../../constants/styles";
import Header from "../../components/header";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const recentSearchesList = [
  "Jane Cooper",
  "Esther Howard",
  "Jenny Wilson",
  "Robert Fox",
];

const SearchScreen = ({ navigation }) => {
  const [search, setsearch] = useState("");
  const [recentSearches, setrecentSearches] = useState(recentSearchesList);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header navigation={navigation} header={"Search"} />
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        >
          {searchField()}
          {recentSearches.length == 0 ? null : recentSearchesInfo()}
        </ScrollView>
      </View>
    </View>
  );

  function recentSearchesInfo() {
    return (
      <View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.blackColor18SemiBold,
              flex: 1,
              lineHeight: 28.0,
            }}
          >
            Recent search
          </Text>
          <Text
            onPress={() => setrecentSearches([])}
            style={{ ...Fonts.primaryColor16SemiBold, lineHeight: 28.0 }}
          >
            Clear all
          </Text>
        </View>

        {recentSearches.map((item, index) => (
          <View key={`${index}`} style={styles.recentSearchWrapper}>
            <MaterialIcons name="history" color={Colors.grayColor} size={20} />
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor18Medium,
                marginLeft: Sizes.fixPadding,
                flex: 1,
              }}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  function searchField() {
    return (
      <View style={styles.searchFieldWrapStyle}>
        <Feather
          name="search"
          color={search ? Colors.primaryColor : Colors.grayColor}
          size={18}
        />
        <TextInput
          placeholder="Search employee"
          placeholderTextColor={Colors.grayColor}
          style={styles.searchFieldStyle}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          value={search}
          onChangeText={(value) => setsearch(value)}
        />
      </View>
    );
  }
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchFieldStyle: {
    ...Fonts.blackColor18SemiBold,
    flex: 1,
    padding: 0,
    marginLeft: Sizes.fixPadding,
  },
  searchFieldWrapStyle: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding,
    margin: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 2.5,
    flexDirection: "row",
    alignItems: "center",
  },
  recentSearchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding - 5.0,
  },
});
