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

const task=[
    { id: 1, status: 'ideal', name: 'Ideal Task 1' },
  { id: 2, status: 'pending', name: 'Pending Task 1' },
  { id: 3, status: 'completed', name: 'Completed Task 1' },
  { id: 4, status: 'ideal', name: 'Ideal Task 2' },
  { id: 5, status: 'pending', name: 'Pending Task 2' }, 
  { id: 6, status: 'ideal', name: 'Ideal Task 3' },
  { id: 7, status: 'pending', name: 'Pending Task 2' },
  { id: 8, status: 'completed', name: 'Completed Task 2' },
  { id: 9, status: 'ideal', name: 'Ideal Task 4' },
  { id: 10, status: 'pending', name: 'Pending Task 3' },
]

const Task = ({navigation}) => {

    const [tasks,setTasks]=useState(task)
    const [filter,setFilter]=useState("ideal")

    useEffect(()=>{
      async function getTask() {
        const reaponce = await fetch("https://gold-grade.onrender.com/api/v1/auth/getAllTasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
  
        const res = await reaponce.json() 
       console.log()
      }
      getTask()
     
    },[])

    let showTask=tasks.filter((ele)=>{return ele.status==filter})
    
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        {taskCategory()}
        <ScrollView showsVerticalScrollIndicator={false}>
         {showTask.map((ele)=>{
            return attendanceInfo(ele)
         })}
        </ScrollView>
      </View>
    </View>
  )

  function attendanceInfo(ele) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={ele.id}
        onPress={() => {
          navigation.navigate("TaskDetailScreen")
        }}
        style={styles.taskInfoWrapper}
      >
        <View
          style={{
            flex: 1,
            marginRight: Sizes.fixPadding,
            paddingTop: Sizes.fixPadding - 6.0,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.primaryColor22SemiBold, lineHeight: 28.0 }}
          >
            Task
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor15SemiBold, lineHeight: 20.0 }}
          >
            {ele.name}
          </Text>
        </View>
        <Image
          source={require("../../assets/images/attendance.png")}
          style={{ width: 90.0, resizeMode: "contain", height: 80.0 }}
        />
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.blackColor22SemiBold }}>Your Tasks</Text>
      </View>
    );
  }

  function taskCategory() {
    return (
      <View style={styles.taskCategoryStyle}>
       <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
         setFilter("ideal")
        }}
        style={{...styles.buttonStyle,backgroundColor:filter=="ideal"?"orange":"gold"}}
      >
        <Text style={{color:"black",margin:4,fontSize:13,fontWeight:"600"}}>Task</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setFilter("pending")
        }}
        style={{...styles.buttonStyle,backgroundColor:filter=="pending"?"orange":"gold"}}
      >
        <Text style={{color:"black",margin:4,fontSize:13,fontWeight:"600"}}>Pending...</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
        setFilter("completed")
        }}
        style={{...styles.buttonStyle,backgroundColor:filter=="completed"?"orange":"gold"}}
      >
        <Text style={{color:"black",margin:4,fontSize:13,fontWeight:'600'}}>Completed</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    dialogStyle: {
      width: "85%",
      backgroundColor: Colors.whiteColor,
      borderRadius: Sizes.fixPadding,
      alignSelf: 'center'
    },
    headerWrapStyle: {
      backgroundColor: Colors.whiteColor,
      ...commonStyles.boxShadow,
      padding: Sizes.fixPadding + 5.0,
      alignItems: "center",
      justifyContent: "center",
    },
     taskCategoryStyle: {
        backgroundColor: Colors.whiteColor,
        ...commonStyles.boxShadow,
        padding: Sizes.fixPadding + 5.0,
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "space-evenly",
      },
      taskInfoWrapper: {
        backgroundColor: Colors.whiteColor,
        ...commonStyles.boxShadow,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        flexDirection: "row",
        alignItems: "center",
      },
    dividerStyle: {
      backgroundColor: Colors.lightGrayColor2,
      height: 1.0,
      marginHorizontal: Sizes.fixPadding * 2.0,
      marginVertical: Sizes.fixPadding + 5.0,
    },
    optionIconStyle: {
      width: 20.0,
      height: 20.0,
      resizeMode: "contain",
      tintColor: Colors.primaryColor,
    },
    dialogButtonWrapStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: Sizes.fixPadding * 1.5,
    },
    buttonStyle: {
        padding:7,
        borderWidth:1,
        borderRadius:5,
        width:100,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }
  });

export default Task