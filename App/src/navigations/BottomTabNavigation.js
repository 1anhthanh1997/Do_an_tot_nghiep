import * as React from 'react';
import {Button, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {NavigationContainer} from '@react-navigation/native';
import MapScreen from '../scenes/MapScreen';
import ProjectScreen from '../scenes/ProjectScreen';
import LoginScreen from '../scenes/LoginScreen';
import ForgotPasswordScreen from '../scenes/ForgotPasswordScreen';
import RegisterScreen from '../scenes/RegisterScreen';
import EnterOTPScreen from '../scenes/EnterOTPScreen';
import CreateMapScreen from '../scenes/CreateMapScreen';
import FindRoadScreen from '../scenes/FindRoadScreen';
import FirstIcon from 'react-native-vector-icons/FontAwesome';
import ThirdIcon from 'react-native-vector-icons/AntDesign';
import SecondIcon from 'react-native-vector-icons/Ionicons';
import FourthIcon from 'react-native-vector-icons/Foundation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PersonalScreen from '../scenes/PersonalScreen';
import TaskScreen from '../scenes/TaskScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Project"
        component={ProjectScreen}
        options={{
          tabBarLabel: 'Project',
          tabBarIcon: () => <FirstIcon name="tasks" size={20} color="black" />,
        }}
      />
      {/*<Tab.Screen*/}
      {/*  name="CreateMap"*/}
      {/*  component={CreateMapScreen}*/}
      {/*  options={{*/}
      {/*    tabBarLabel: 'Tạo bản đồ',*/}
      {/*    tabBarIcon: () => <FourthIcon name="map" size={20} color="black" />,*/}
      {/*  }}*/}
      {/*/>*/}
      <Tab.Screen
        name="FindRoad"
        component={FindRoadScreen}
        options={{
          tabBarLabel: 'Tìm thành viên bị lạc',
          tabBarIcon: () => <ThirdIcon name="find" size={21} color="black" />,
        }}
      />

      <Tab.Screen
        name="Personal"
        component={PersonalScreen}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: () => (
            <SecondIcon name="md-person" size={23} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
