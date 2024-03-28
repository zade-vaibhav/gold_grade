import { View, Text, ScrollView, StyleSheet, Image, Button,Alert } from 'react-native'
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from "../../constants/styles";
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';


const Task = ({ navigation, route }) => {
  const { _id } = route.params
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("ideal")
  const [isChange,setIsChange]=useState(false)

  useEffect(() => {
    async function getTask() {
      const reaponce = await fetch("https://gold-grade.onrender.com/api/v1/auth/getAllTasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const res = await reaponce.json()
      const myTasks = res && res.filter((e) => { return e.assignedTo == _id })
      setTasks(myTasks)
    }
    getTask()

  }, [isChange])

  async function startTask(id){
   
   try {
    const response = await fetch(`https://gold-grade.onrender.com/api/v1/auth//${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: "pending"
        })
    });

    const res=await response.json()

    if (res.success==true) {
      setIsChange(!isChange)
      navigation.navigate("TaskDetailScreen", { taskId:id })
    } else {
        Alert.alert("Error updating status:", res.message);
    }
} catch (error) {
    Alert.alert("Server error:", error.message);
}
  }

  let showTask = tasks.filter((ele) => { return ele.status == filter })

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        {taskCategory()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {showTask.map((ele) => {
            return attendanceInfo(ele)
          })}
        </ScrollView>
      </View>
    </View>
  )

  function attendanceInfo(ele) {
  
    return (
      <>
       {
        ele.status !== "ideal"?
        <TouchableOpacity
        activeOpacity={0.8}
        key={ele.id}
        onPress={() => {
          navigation.navigate("TaskDetailScreen", { taskId: ele._id })
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
      </TouchableOpacity>:<TouchableOpacity
        activeOpacity={0.8}
        key={ele.id}
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
           <Button onPress={()=>startTask(ele._id)} title="start" />
      </TouchableOpacity>
      }
      </>
     
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
          style={{ ...styles.buttonStyle, backgroundColor: filter == "ideal" ? "orange" : "gold" }}
        >
          <Text style={{ color: "black", margin: 4, fontSize: 13, fontWeight: "600" }}>Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setFilter("pending")
          }}
          style={{ ...styles.buttonStyle, backgroundColor: filter == "pending" ? "orange" : "gold" }}
        >
          <Text style={{ color: "black", margin: 4, fontSize: 13, fontWeight: "600" }}>Pending...</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setFilter("completed")
          }}
          style={{ ...styles.buttonStyle, backgroundColor: filter == "completed" ? "orange" : "gold" }}
        >
          <Text style={{ color: "black", margin: 4, fontSize: 13, fontWeight: '600' }}>Completed</Text>
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
    flexDirection: "row",
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
    padding: 7,
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Task