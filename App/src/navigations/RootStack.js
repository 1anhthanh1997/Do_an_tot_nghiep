import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProjectScreen from '../scenes/ProjectScreen';
import {View, TouchableOpacity, Text} from 'react-native';
import MapScreen from '../scenes/MapScreen';
import BottomTabNavigation from './BottomTabNavigation';
import FirstIcon from 'react-native-vector-icons/FontAwesome';
import BottomTabCustomize from './BottomTabCustomize';
import UploadImageScreen from '../scenes/FindRoadScreen';
import EnterOTPScreen from '../scenes/EnterOTPScreen';
import SecondIcon from 'react-native-vector-icons/Ionicons';
import ThirdIcon from 'react-native-vector-icons/AntDesign';
import LoginScreen from '../scenes/LoginScreen';
import ForgotPasswordScreen from '../scenes/ForgotPasswordScreen';
import RegisterScreen from '../scenes/RegisterScreen';
import HomeScreen from '../scenes/HomeScreen';
import TaskScreen from '../scenes/TaskScreen';
import PersonalInformationScreen from '../scenes/PersonalInformationScreen';
import ChangePassScreen from '../scenes/ChangePassScreen';
import OrthophotoScreen from '../scenes/OrthophotoScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function RootStack() {
  return (
    <NavigationContainer>

      <Stack.Navigator>
          <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                  headerShown: false,
              }}
          />
          <Stack.Screen
              name="Map"
              component={MapScreen}
              options={{
                  headerShown: false,
              }}
          />


          <Stack.Screen
              name="BottomTab"
              component={BottomTabNavigation}
              options={{
                  headerShown: false,
              }}
          />



        <Stack.Screen
          name="Orthophoto"
          component={OrthophotoScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{
              headerShown: false,
          }}
      />
          <Stack.Screen
              name="EnterOTPScreen"
              component={EnterOTPScreen}
              options={{
                  headerShown: false,
              }}
          />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Task"
          component={TaskScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PersonalInformation"
          component={PersonalInformationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePass"
          component={ChangePassScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
