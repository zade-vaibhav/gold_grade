import { Dimensions } from "react-native";

export const Colors = {
  primaryColor: "#4D5D53",
  whiteColor: "#FFFFFF",
  grayColor: "#949494",
  blackColor: "#333333",
  bodyBackColor: "#F5F5F5",
  redColor: "#D62020",
  lightGrayColor: "#EEEEEE",
  lightGrayColor2: "#D4D4D4",
  lightPrimaryColor: "#CBDBD1",
};

export const Fonts = {
  whiteColor14Medium: {
    color: Colors.whiteColor,
    fontSize: 14.0,
    fontFamily: "Mukta_Medium",
  },

  whiteColor16Medium: {
    color: Colors.whiteColor,
    fontSize: 16.0,
    fontFamily: "Mukta_Medium",
  },

  whiteColor22Medium: {
    color: Colors.whiteColor,
    fontSize: 22.0,
    fontFamily: "Mukta_Medium",
  },

  whiteColor18SemiBold: {
    color: Colors.whiteColor,
    fontSize: 18.0,
    fontFamily: "Mukta_SemiBold",
  },

  whiteColor20SemiBold: {
    color: Colors.whiteColor,
    fontSize: 20.0,
    fontFamily: "Mukta_SemiBold",
  },

  whiteColor28SemiBold: {
    color: Colors.whiteColor,
    fontSize: 28.0,
    fontFamily: "Mukta_SemiBold",
  },

  whiteColor22Bold: {
    color: Colors.whiteColor,
    fontSize: 22.0,
    fontFamily: "Mukta_Bold",
  },

  blackColor17Medium: {
    color: Colors.blackColor,
    fontSize: 17.0,
    fontFamily: "Mukta_Medium",
  },

  blackColor18Medium: {
    color: Colors.blackColor,
    fontSize: 18.0,
    fontFamily: "Mukta_Medium",
  },

  blackColor20Medium: {
    color: Colors.blackColor,
    fontSize: 20.0,
    fontFamily: "Mukta_Medium",
  },

  blackColor22Medium: {
    color: Colors.blackColor,
    fontSize: 22.0,
    fontFamily: "Mukta_Medium",
  },

  blackColor16SemiBold: {
    color: Colors.blackColor,
    fontSize: 16.0,
    fontFamily: "Mukta_SemiBold",
  },

  blackColor17SemiBold: {
    color: Colors.blackColor,
    fontSize: 17.0,
    fontFamily: "Mukta_SemiBold",
  },

  blackColor18SemiBold: {
    color: Colors.blackColor,
    fontSize: 18.0,
    fontFamily: "Mukta_SemiBold",
  },

  blackColor20SemiBold: {
    color: Colors.blackColor,
    fontSize: 20.0,
    fontFamily: "Mukta_SemiBold",
  },

  blackColor22SemiBold: {
    color: Colors.blackColor,
    fontSize: 22.0,
    fontFamily: "Mukta_SemiBold",
  },

  grayColor17Medium: {
    color: Colors.grayColor,
    fontSize: 17.0,
    fontFamily: "Mukta_Medium",
  },

  grayColor18Medium: {
    color: Colors.grayColor,
    fontSize: 18.0,
    fontFamily: "Mukta_Medium",
  },

  grayColor20Medium: {
    color: Colors.grayColor,
    fontSize: 20.0,
    fontFamily: "Mukta_Medium",
  },

  grayColor15SemiBold: {
    color: Colors.grayColor,
    fontSize: 15.0,
    fontFamily: "Mukta_SemiBold",
  },

  grayColor16SemiBold: {
    color: Colors.grayColor,
    fontSize: 16.0,
    fontFamily: "Mukta_SemiBold",
  },

  grayColor17SemiBold: {
    color: Colors.grayColor,
    fontSize: 17.0,
    fontFamily: "Mukta_SemiBold",
  },

  grayColor18SemiBold: {
    color: Colors.grayColor,
    fontSize: 18.0,
    fontFamily: "Mukta_SemiBold",
  },

  grayColor20SemiBold: {
    color: Colors.grayColor,
    fontSize: 20.0,
    fontFamily: "Mukta_SemiBold",
  },

  primaryColor16SemiBold: {
    color: Colors.primaryColor,
    fontSize: 16.0,
    fontFamily: "Mukta_SemiBold",
  },

  primaryColor17SemiBold: {
    color: Colors.primaryColor,
    fontSize: 17.0,
    fontFamily: "Mukta_SemiBold",
  },

  primaryColor18SemiBold: {
    color: Colors.primaryColor,
    fontSize: 18.0,
    fontFamily: "Mukta_SemiBold",
  },

  primaryColor20SemiBold: {
    color: Colors.primaryColor,
    fontSize: 20.0,
    fontFamily: "Mukta_SemiBold",
  },

  primaryColor22SemiBold: {
    color: Colors.primaryColor,
    fontSize: 22.0,
    fontFamily: "Mukta_SemiBold",
  },

  redColor18Medium: {
    color: Colors.redColor,
    fontSize: 18.0,
    fontFamily: "Mukta_Medium",
  },
};

export const Sizes = {
  fixPadding: 10.0,
};

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const commonStyles = {
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding * 5.0,
    alignItems: "center",
    justifyContent: "center",
    margin: Sizes.fixPadding * 2.0,
    padding: Sizes.fixPadding - 2.0,
  },
  exitInfoWrapStyle: {
    backgroundColor: Colors.blackColor,
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 4.0,
    paddingHorizontal: Sizes.fixPadding + 10.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
  boxShadow: {
    shadowColor: Colors.blackColor,
    shadowOpacity: 0.2,
    shadowOffset: { x: 1, y: 1 },
    elevation: 4.0,
  },
};
