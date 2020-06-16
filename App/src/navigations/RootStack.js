import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MapScreen from '../scenes/MapScreen';
import BottomTabNavigation from './BottomTabNavigation';
import EnterOTPScreen from '../scenes/EnterOTPScreen';
import LoginScreen from '../scenes/LoginScreen';
import ForgotPasswordScreen from '../scenes/ForgotPasswordScreen';
import RegisterScreen from '../scenes/RegisterScreen';
import TaskScreen from '../scenes/TaskScreen';
import PersonalInformationScreen from '../scenes/PersonalInformationScreen';
import ChangePassScreen from '../scenes/ChangePassScreen';
import {createStackNavigator} from '@react-navigation/stack';
import TaskScheduleScreen from '../scenes/TaskScheduleScreen';
import MapScheduleScreen from '../scenes/MapScheduleScreen';

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
                    name="Task"
                    component={TaskScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="TaskSchedule"
                    component={TaskScheduleScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="MapSchedule"
                    component={MapScheduleScreen}
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
