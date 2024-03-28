import {
  BackHandler,
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import React, { useState, useCallback } from "react";
import { Colors, Fonts, Sizes, commonStyles } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import { useFocusEffect } from "@react-navigation/native";
// import IntlPhoneInput from "react-native-intl-phone-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
"ldcndcn"

const LoginScreen = ({ navigation }) => {
  const backAction = () => {
    if (Platform.OS === "ios") {
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
      return true;
    }
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      navigation.addListener("gestureEnd", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
        navigation.removeListener("gestureEnd", backAction);
      };
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("")
  const [isloading,setIsloading]=useState(false)


  async function handellogin(){
    if(email=="" || password == ""){
      Alert.alert("empty fields!!")
      return 
    }
    try{
      setIsloading(true)

    const reaponce = await fetch("https://gold-grade.onrender.com/api/v1/auth/employee/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({email,password})
      })

      const res = await reaponce.json()
      if(res.success === true){
        setEmail("")
        setPassword("")
        setIsloading(false)
        AsyncStorage.setItem("user",JSON.stringify(res.data))
        navigation.push("BottomTabBar");
      }else{
        setIsloading(false)
        Alert.alert(res.message)
      }
    }catch(err){
      setIsloading(false)
      Alert.alert("server error!!")
    }
      
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor}}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        >
          {loginInfo()}
          {loginDetail()}
          {loginButton()}
        </ScrollView>
      </View>
      {exitInfo()}
    </View>
  );

  function loginButton() {
    return (
      
        isloading==true?<TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
        }}
        style={{ ...commonStyles.buttonStyle,width:300,left:"11%"}}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>Loading...</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          handellogin()
        }}
        style={{ ...commonStyles.buttonStyle,width:300,left:"11%"}}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>Login</Text>
      </TouchableOpacity>
      
    )
  }

  function loginDetail() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0,alignItems:"center"}}>
        <Text style={{ ...Fonts.blackColor18SemiBold}}>Email</Text>
        <TextInput value={email} onChangeText={(e)=>setEmail(e)} on style={{borderWidth:1,width:300,height:50,paddingHorizontal:10,borderRadius:10}} placeholder="Enter email.."/>
        <Text style={{ ...Fonts.blackColor18SemiBold,marginTop:10}}>Password</Text>
        <TextInput value={password} onChangeText={(e)=>setPassword(e)} secureTextEntry={true} style={{borderWidth:1,width:300,height:50,paddingHorizontal:10,borderRadius:10}} placeholder="Enter password.."/>
        {/* <IntlPhoneInput
          onChangeText={({ phoneNumber }) => setMobileNumber(phoneNumber)}
          defaultCountry="IN"
          containerStyle={styles.mobileNumberWrapStyle}
          placeholder={"Enter your mobile number"}
          phoneInputStyle={{
            flex: 1,
            ...Fonts.blackColor17Medium,
          }}
          placeholderTextColor={Colors.grayColor}
          dialCodeTextStyle={{
            ...Fonts.blackColor16SemiBold,
            marginHorizontal: Sizes.fixPadding - 2.0,
          }}
          filterInputStyle={{ ...Fonts.blackColor17Medium }}
          modalCountryItemCountryNameStyle={{ ...Fonts.blackColor17Medium }}
          flagStyle={{ width: 0, height: 0 }}
        /> */}

      </View>
    );
  }

  function loginInfo() {
    return (
      <View style={{ alignItems: "center", margin: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.blackColor22SemiBold }}>Login</Text>
        <Text
          style={{
            ...Fonts.grayColor17Medium,
            textAlign: "center",
            lineHeight: 22.0,
          }}
        >
          Welcome please login your account
        </Text>
      </View>
    );
  }

  function header() {
    return (
      <View style={{backgroundColor:"white",alignItems:"center"}}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={{ width: 250.0, height: 250.0, resizeMode: "contain" }}
        />
        
      </View>
    );
  }

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={commonStyles.exitInfoWrapStyle}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Press Back Once Again To Exit!
        </Text>
      </View>
    ) : null;
  }
};

export default LoginScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding * 4.5,
  },
  mobileNumberWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding * 5.0,
    paddingVertical: Sizes.fixPadding,
    ...commonStyles.boxShadow,
    marginTop: Sizes.fixPadding - 5.0,
  },
});
