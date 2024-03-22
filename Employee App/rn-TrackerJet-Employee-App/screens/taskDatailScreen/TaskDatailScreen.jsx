import { View, Text,ScrollView,StyleSheet,Image} from 'react-native'
import {
    Colors,
    Fonts,
    Sizes,
    commonStyles,
    screenWidth,
  } from "../../constants/styles";
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';


const TaskDatailScreen = ({navigation,route}) => {
   
    const {ele}=route.params;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        {taskDetail(ele)}
        <ScrollView showsVerticalScrollIndicator={false}>
         
        </ScrollView>
      </View>
    </View>
  )


  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.blackColor22SemiBold }}>Task-Detail</Text>
      </View>
    );
  }
}

  function taskDetail(ele){
    console.log(ele)
    return (
        <View style={styles.taskDetail}> 
       <Text>{ele.name}</Text>
        </View>
    )
  }


const styles = StyleSheet.create({
    headerWrapStyle: {
      backgroundColor: Colors.whiteColor,
      ...commonStyles.boxShadow,
      padding: Sizes.fixPadding + 5.0,
      alignItems: "center",
      justifyContent: "center",
    },
    taskDetail:{
        height:300,
        width:"100%",
        borderWidth:1,
        alignItems:"center",
        justifyContent:"center"
    },
  });

export default TaskDatailScreen