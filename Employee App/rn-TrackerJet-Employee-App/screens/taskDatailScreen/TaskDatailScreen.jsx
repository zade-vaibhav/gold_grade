import { View, Text, ScrollView, StyleSheet, Image, Button, TextInput, Alert } from 'react-native'
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from "../../constants/styles";
import React, { useEffect, useState } from 'react'


const TaskDatailScreen = ({ navigation }) => {

  const [mileStone, sertMileStone] = useState(null)
  const [grams, setGrams] = useState(null)
  const [value, setValue] = useState(null)
  const [change, setChange] = useState(true)

  useEffect(() => {
    async function getTask() {
      const reaponce = await fetch("https://gold-grade.onrender.com/api/v1/auth/65fe86dba27045947113d123/milestones", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const res = await reaponce.json()
      sertMileStone(res.milestones.milestones)

    }
    getTask()
  }, [change])

  async function updateTasks(ind, data) {
    if (data.data.gram) {
      if (grams == null || value == null) {
        Alert.alert('empty fields!!')
      } else {
        data.completed = true
        data.data.gram.value = grams;
        data.data.value.value = value;
        console.log(ind, data)
      }
    } else if (data.data) {
      if (value == null) {
        Alert.alert('empty fields!!')
        return;
      } else {
        data.completed = true
        data.data.value.value = value;
        console.log(ind, data)
      }
      console.log("single")
    } else if (data.data == false) {
      data.completed = true
    }

    const responce = await fetch("https://gold-grade.onrender.com/api/v1/auth/65fe86dba27045947113d123/milestones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ index: ind, milestone: data })
    })

    const res = await responce.json()

    if (res.success == true) {
      Alert.alert('update success full!!')
      setValue(null)
      setGrams(null)
      setChange(!change)
      return;
    } else {
      Alert.alert(res.message)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        {taskDetail()}
        <ScrollView style={styles.milestoneContainer} showsVerticalScrollIndicator={false}>
          {mileStone && mileStone.map((ele, ind) => {
            return taskInfo(ele, ind)
          })}
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

  function taskDetail() {

    return (
      <View style={styles.taskDetail}>
        <Text>tsak detail screen</Text>
      </View>
    )
  }

  function taskInfo(ele, ind) {
    return (
      <View
        activeOpacity={0.8}
        key={ele._id}
        onPress={() => {

        }}
        style={styles.taskInfoWrapper}
      >
        <View style={styles.taskDataContainer}>
          <Text style={styles.textContainer}>{ele.name}</Text>
          {ele.data && ele.data.gram ?
            <View style={{ flexDirection: "row" }}>
              <TextInput onChangeText={(e) => setGrams(e)} style={{ borderWidth: 1, width: 100, paddingLeft: 5, borderRadius: 4, marginRight: 5 }} placeholder={ele.data.gram.placeholder} />
              <TextInput onChangeText={(e) => setValue(e)} style={{ borderWidth: 1, width: 100, paddingLeft: 5, borderRadius: 4 }} placeholder={ele.data.value.placeholder} />
            </View>
            :
            ele.data ?
              <TextInput onChangeText={(e) => setValue(e)} style={{ borderWidth: 1, width: 100, paddingLeft: 5, borderRadius: 4 }} placeholder={ele.data.placeholder} />
              :
              <></>}
        </View>
        <View style={{ left: 300, justifyContent: "center", alignItems: "center", borderLeftWidth: 1, borderLeftColor: "gray" }}>
          {
            ele.completed == true ? <Image
              source={require("../../assets/images/correct.png")}
              style={{ width: 70.0, resizeMode: "contain", height: 70.0 }}
            /> : <Button onPress={() => updateTasks(ind, ele)} title="Submit" />
          }
        </View>
      </View>
    );
  }
}






const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    padding: Sizes.fixPadding + 5.0,
    alignItems: "center",
    justifyContent: "center",
  },
  taskDetail: {
    height: 250,
    width: "100%",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  milestoneContainer: {
    flex: 1,
    marginVertical: 20
  },
  taskInfoWrapper: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden"
  },
  taskDataContainer: {
    position: "absolute",
    height: '100%',
    width: "75%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    height: "55%",
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    overflow: 'hidden',
  }
});

export default TaskDatailScreen