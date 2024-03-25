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
import { ScrollView } from "react-native-gesture-handler";

const milestonesData = [
  { id: 1, description: 'Reached Bus stand/railway station' },
  // Add all your milestones here following the format
  { id: 23, description: 'Handedover Security cheque to him' },
  // Step 3: Return journey milestones
  { id: 24, description: 'Boarded bus at ________' },
  { id: 25, description: 'Tentatively reaching Pune by ___________' },
];

const Milestone = ({ milestone, onComplete }) => (
  <View style={styles.milestoneContainer}>
    <Text style={styles.milestoneText}>{milestone.description}</Text>
    <TouchableOpacity style={styles.completeButton} onPress={() => onComplete(milestone.id)}>
      <Text style={styles.buttonText}>Complete Task</Text>
    </TouchableOpacity>
  </View>
);

const EmploysScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [employee, setEmployee] = useState("");
  const [completedMilestones, setCompletedMilestones] = useState([]);

  const handleComplete = (id) => {
    setCompletedMilestones([...completedMilestones, id]);
  };

  useEffect(() => {
    async function fetchEmployees() {
        try {
            const response = await fetch('https://cariger-user-provider.onrender.com/api/v1/auth/:taskId/milestones');
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
         {EmployeeCard()}
        {totalAndAbsentInfo()}
        {CurrentInfo()}
        <ScrollView style={styles.screen}>
      {milestonesData.map((milestone) => (
        <Milestone
          key={milestone.id}
          milestone={milestone}
          onComplete={handleComplete}
          isCompleted={completedMilestones.includes(milestone.id)}
        />
      ))}
    </ScrollView>
      </View>
       {/* <View style={{ padding: Sizes.fixPadding }}>
          <EmployeeCard employee={employee} />
        </View> */}
    </View>
  );


   function CurrentInfo() {
    return (
      <View style={styles.totalAndAbsentInfoWrapStyle}>
        <View style={styles.totalAndAbsentInfoBox}>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor20Medium, lineHeight: 28.0 }}
          >
           Current Task
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.primaryColor18SemiBold, lineHeight: 25.0 }}
          >
            2
          </Text>
        </View>
      </View>
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
            Task Pending
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.primaryColor18SemiBold, lineHeight: 25.0 }}
          >
            6
          </Text>
        </View>
        <View style={styles.totalAndAbsentInfoBox}>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor20Medium, lineHeight: 28.0 }}
          >
            Task completed
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.primaryColor18SemiBold, lineHeight: 25.0 }}
          >
            10
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
            Welcome Employee Name
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor15SemiBold, lineHeight: 18.0 }}
          >
            Good morning
          </Text>
        </View>
      </View>
    );
  }
   function EmployeeCard() {
  return (
    <View style={styles.employeeCard}>
      <Image style={styles.employeeImage} />
      <View style={styles.employeeInfo}>
        <Text style={styles.employeeName}>Current Task: In Progress</Text>
        <Text style={styles.employeeName}>Name: Mankhush</Text>
        <Text style={styles.employeeMobile}>Phone: 254558855</Text>
        <Text style={styles.employeeName}>Address: India</Text>
      </View>
      <TouchableOpacity style={styles.callIcon}>
        <Feather name="phone-call" size={20} color={Colors.primaryColor} />
      </TouchableOpacity>
    </View>
  );
};
};

export default EmploysScreen;

const styles = StyleSheet.create({
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
   screen: {
    flex: 1,
    backgroundColor: Colors.bodyBackColor,
  },
  milestoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Sizes.fixPadding,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  milestoneText: {
    ...Fonts.grayColor14Regular,
    flex: 1,
  },
  completeButton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    marginLeft: Sizes.fixPadding,
  },
  buttonText: {
    color: '#fff',
    ...Fonts.blackColor14Medium,
  },
   milestoneCard: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    marginTop: Sizes.fixPadding,
    ...commonStyles.boxShadow,
  },
  milestoneTitle: {
    ...Fonts.blackColor16Medium,
    marginBottom: Sizes.fixPadding,
  },
  milestoneDescription: {
    ...Fonts.grayColor14Regular,
    marginBottom: Sizes.fixPadding,
  },
  milestoneStatus: {
    ...Fonts.primaryColor14Medium,
  },

     employeeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    ...commonStyles.boxShadow,
  },
  employeeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  employeeInfo: {
    flex: 1,
    marginLeft: Sizes.fixPadding,
  },
  employeeName: {
    ...Fonts.blackColor16Medium,
  },
  employeeMobile: {
    ...Fonts.grayColor14Regular,
  },
  callIcon: {
    padding: Sizes.fixPadding,
  },
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    zIndex: 100,
  },

  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    zIndex: 100,
  },
 
  itemDivider: {
    backgroundColor: Colors.lightPrimaryColor,
    height: 1.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
});
