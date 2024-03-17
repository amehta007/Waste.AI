import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Layout = () => {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: Colors.black,
    }}>
    <Tabs.Screen name="index" options={{
        tabBarLabel: '',
        tabBarIcon:({color,size}) => <Feather name="home" color = "black" size= {size}/>,
    }}
    />

    <Tabs.Screen name="Profile" options={{
        tabBarLabel: '',
        tabBarIcon: ({color,size}) => <MaterialIcons name="leaderboard" size={size} color="black" />,
    }}
    />

    <Tabs.Screen name="Scanner" options={{
        tabBarLabel: '',
        tabBarIcon: ({color,size}) => <Ionicons name="person-circle-outline" size={size} color="black" />,
    }}
    />

    </Tabs>
  )
}

export default Layout