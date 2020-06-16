import * as React from 'react';


import ProjectScreen from '../scenes/ProjectScreen';
import ScheduleScreen from '../scenes/ScheduleScreen';
import FindRoadScreen from '../scenes/FindRoadScreen';
import FirstIcon from 'react-native-vector-icons/FontAwesome';
import ThirdIcon from 'react-native-vector-icons/AntDesign';
import SecondIcon from 'react-native-vector-icons/Ionicons';
import FourthIcon from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PersonalScreen from '../scenes/PersonalScreen';


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
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarLabel: 'Lịch trình',
          tabBarIcon: () => <FourthIcon name="schedule" size={23} color="black" />,
        }}
      />
      <Tab.Screen
        name="FindRoad"
        component={FindRoadScreen}
        options={{
          tabBarLabel: 'Tìm thành viên',
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
