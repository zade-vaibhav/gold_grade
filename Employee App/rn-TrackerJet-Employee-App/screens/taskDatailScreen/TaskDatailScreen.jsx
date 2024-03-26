import { View, Text, ScrollView, StyleSheet, Image, Button, TextInput, Alert, TouchableOpacity } from 'react-native'
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from "../../constants/styles";
import React, { useEffect, useState } from 'react'


const TaskDatailScreen = ({ navigation,route }) => {
  const {taskId}=route.params
  const [mileStone, setMileStone] = useState(null)
  const [grams, setGrams] = useState(null)
  const [value, setValue] = useState(null)
  const [change, setChange] = useState(true)
  const [isloading, setIsloading] = useState(false)

  useEffect(() => {
    console.log(taskId)
    async function getTask() {
      const reaponce = await fetch(`https://gold-grade.onrender.com/api/v1/auth/${taskId}/milestones`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const res = await reaponce.json() 
      console.log(res.milestones)
      setMileStone(res.milestones)

    }
    getTask()
  }, [change])

  async function updateTasks(ind, data) {
    if (data.data.gram) {
      if (grams == null || value == null || value == "") {
        Alert.alert('empty fields!!')
        return
      } else {
        data.completed = true
        data.data.gram.value = grams;
        data.data.value.value = value;
      }
    } else if (data.data) {
      if (value == null || value=="") {
        Alert.alert('empty fields!!')
        return;
      } else {
        data.completed = true
        data.data.value = value;

      }

    } else if (data.data == false) {
      data.completed = true
    }
    
    
    const responce = await fetch(`https://gold-grade.onrender.com/api/v1/auth/${taskId}/milestones`, {
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
          {mileStone && mileStone.milestones.map((ele, ind) => {
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
      <View key={ind} style={styles.taskInfoWrapper}>
      <View style={styles.taskDataContainer}>
        <Text style={styles.textContainer}>{ele.name}</Text>

        {ele.data && ele.data.gram ?
        ele.data.gram.value == "" && ele.data.value.value == ""?
            <View style={{ flexDirection: "row" }}>
              <TextInput onChangeText={(e) => setGrams(e)} style={{ borderWidth: 1, width: 100, paddingLeft: 5, borderRadius: 4, marginRight: 5 }} placeholder={ele.data.gram.placeholder} />
              <TextInput onChangeText={(e) => setValue(e)} style={{ borderWidth: 1, width: 100, paddingLeft: 5, borderRadius: 4 }} placeholder={ele.data.value.placeholder} />
            </View>:
             <View style={styles.valueDisplayContainer}>
             <View style={{ flexDirection: "row" }}>
               <Text>Total gram : </Text>
               <Text style={styles.valueTextStyle}>{ele.data.gram.value} g</Text>
             </View>
             <View style={{ flexDirection: "row" }}>
               <Text>Total value : </Text>
               <Text style={styles.valueTextStyle}>{ele.data.value.value} rs</Text>
             </View>
           </View>
            :
            ele.data ?
            ele.data.value==""?
              <TextInput onChangeText={(e) => setValue(e)} style={{ borderWidth: 1, width: 100, paddingLeft: 5, borderRadius: 4 }} placeholder={ele.data.placeholder} />
              :
              <View style={styles.valueDisplayContainer}>
             <View style={{ flexDirection: "row" }}>
               <Text>{ele.data.name.split(" ")[0]} : </Text>
               <Text style={styles.valueTextStyle}>{ele.data.value} {ele.data.name.split(" ")[1]}</Text>
             </View>
           </View>
              :
              <></>}
      
      </View>
      <View style={styles.actionContainer}>
        {ele.completed ? (
          <Image
            source={require("../../assets/images/correct.png")}
            style={styles.imageStyle}
          />
        ) : (
          <TouchableOpacity onPress={() => updateTasks(ind,ele)} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
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
    marginVertical: 10
  },
  taskInfoWrapper: {
    flexDirection: "row",
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal:15,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  taskDataContainer: {
    flex: 1,
  },
  textContainer: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width:150,
    padding: 8,
    marginRight: 5,
    flex: 1,
  },
  valueDisplayContainer: {
    flexDirection: "column",
  },
  valueTextStyle: {
    fontWeight: 'bold',
  },
  actionContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageStyle: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  }

});

export default TaskDatailScreen