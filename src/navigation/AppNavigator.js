import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserListScreen from '../screens/Users/UserListScreen';
import AddUserScreen from '../screens/Users/AddUserScreen';
import UpdateUserScreen from '../screens/Users/UpdateUserScreen';
import TaskListScreen from '../screens/Tasks/TaskListScreen';
import AddTaskScreen from '../screens/Tasks/AddTaskScreen';
import UpdateTaskScreen from '../screens/Tasks/UpdateTaskScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Options from '../screens/Assignment/Options';
import AssignUserToTaskScreen from '../screens/Assignment/AssignUserToTaskScreen';
import AssignTaskToUserScreen from '../screens/Assignment/AssignTaskToUserScreen';
import AssignedTasksScreen from '../screens/Assignment/AssignedTasksScreen';
import AssignedUsersScreen from '../screens/Assignment/AssignedUsersScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UserStack = () => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Users" component={UserListScreen} />
    <Stack.Screen name="AddUser" component={AddUserScreen} />
    <Stack.Screen name="UpdateUser" component={UpdateUserScreen} />
    <Stack.Screen name="AssignedTasksScreen" component={AssignedTasksScreen} />

  </Stack.Navigator>
);

const TaskStack = () => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Tasks" component={TaskListScreen} />
    <Stack.Screen name="AddTask" component={AddTaskScreen} />
    <Stack.Screen name="UpdateTask" component={UpdateTaskScreen} />
    <Stack.Screen name="AssignedUserScreen" component={AssignedUsersScreen} />

  </Stack.Navigator>
);
const MoreStack = () => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Options" component={Options} />
    <Stack.Screen name="AssignUserToTaskScreen" component={AssignUserToTaskScreen} />
    <Stack.Screen name="AssignTaskToUserScreen" component={AssignTaskToUserScreen} />
    <Stack.Screen name="AssignedTasksScreen" component={AssignedTasksScreen} />

  </Stack.Navigator>
  
);

const AppNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName='Users'>
    <Tab.Screen 
      name="Users" 
      component={UserStack} 
      options={{ tabBarIcon: ({ color }) => <Icon name="people" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Tasks" 
      component={TaskStack} 
      options={{ tabBarIcon: ({ color }) => <Icon name="list" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="More" 
      component={MoreStack} 
      options={{ tabBarIcon: ({ color }) => <Icon name="gear" size={24} color={color} /> }} 
    />
  </Tab.Navigator>
);

export default AppNavigator;
