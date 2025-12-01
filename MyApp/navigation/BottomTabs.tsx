import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import HomeScreen from '../Screens/HomeScreen';
import SearchScreen from '../Screens/SearchScreen';
import AddDeviceScreen from '../Screens/AddDeviceScreen';
import StockScreen from '../Screens/StockScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import styles from '../styles/globalStyles';

const Tab = createBottomTabNavigator();

function AddButton({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: (e?: any) => void;
}) {
  return (
    <TouchableOpacity
      style={{ alignItems: 'center', justifyContent: 'center', top: -24 }}
      onPress={onPress}
    >
      <View style={styles.addButton}>{children}</View>
    </TouchableOpacity>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 64, paddingVertical: 8 },
        tabBarIcon: () => {
          // handled below in custom tab bar button when needed
          return null;
        },
      })}
    >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.footerItem}>
                <Icon
                  name="home"
                  size={24}
                  color={focused ? '#8BC34A' : '#9CA3AF'}
                />
                <Text
                  style={[styles.footerText, focused && { color: '#8BC34A' }]}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.footerItem}>
                <Icon
                  name="search"
                  size={24}
                  color={focused ? '#8BC34A' : '#9CA3AF'}
                />
                <Text
                  style={[styles.footerText, focused && { color: '#8BC34A' }]}
                >
                  Search
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Add"
          component={AddDeviceScreen}
          options={{
            tabBarButton: props => (
              <AddButton {...props}>
                <Icon name="plus" size={24} color="white" />
              </AddButton>
            ),
          }}
        />

        <Tab.Screen
          name="Stock"
          component={StockScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.footerItem}>
                <Icon
                  name="archive"
                  size={24}
                  color={focused ? '#8BC34A' : '#9CA3AF'}
                />
                <Text
                  style={[styles.footerText, focused && { color: '#8BC34A' }]}
                >
                  Stock
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.footerItem}>
                <Icon
                  name="user"
                  size={24}
                  color={focused ? '#8BC34A' : '#9CA3AF'}
                />
                <Text
                  style={[styles.footerText, focused && { color: '#8BC34A' }]}
                >
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
  );
}
