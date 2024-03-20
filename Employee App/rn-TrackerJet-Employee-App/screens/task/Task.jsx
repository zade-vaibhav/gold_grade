import { View, Text } from 'react-native'
import React from 'react'

const Task = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {userInfo()}
          {profileOptions()}
        </ScrollView>
      </View>
      {logoutDialog()}
    </View>
  )
}

export default Task