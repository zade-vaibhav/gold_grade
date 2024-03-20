import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts, Sizes, commonStyles } from "../constants/styles";

const Header = ({ navigation, header }) => {
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
          flex: 1,
          marginLeft: Sizes.fixPadding - 5.0,
          ...Fonts.blackColor20SemiBold,
        }}
      >
        {header}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
  },
});
