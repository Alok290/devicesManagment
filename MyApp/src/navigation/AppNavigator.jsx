import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONTS } from '../constants/theme';
import { Home, Search, PlusCircle, Package, User } from 'lucide-react-native';
import { View } from 'react-native';

// Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import StockScreen from '../screens/StockScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddDeviceScreen from '../screens/AddDeviceScreen';
import DeviceDetailScreen from '../screens/DeviceDetailScreen';
import StockOutScreen from '../screens/StockOutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { userRole } = useAuth();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.darkGray,
                tabBarStyle: {
                    backgroundColor: COLORS.white,
                    borderTopWidth: 0,
                    elevation: 10,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                    display: userRole === 'manager' ? 'flex' : 'none', // Hide tab bar for staff
                },
                tabBarLabelStyle: {
                    fontFamily: FONTS.medium,
                    fontSize: 10,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="AddDeviceTab"
                component={View}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('AddDevice');
                    },
                })}
                options={{
                    tabBarLabel: 'Add',
                    tabBarIcon: ({ color }) => (
                        <View style={{
                            width: 50,
                            height: 50,
                            backgroundColor: COLORS.primary,
                            borderRadius: 25,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20,
                            elevation: 5,
                            shadowColor: COLORS.primary,
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                        }}>
                            <PlusCircle color={COLORS.white} size={30} />
                        </View>
                    ),
                }}
            />
            {/* Only show Stock tab for Managers */}
            {userRole === 'manager' && (
                <Tab.Screen
                    name="Stock"
                    component={StockScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <Package color={color} size={size} />,
                    }}
                />
            )}
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
                <>
                    <Stack.Screen name="MainTabs" component={TabNavigator} />
                    <Stack.Screen
                        name="AddDevice"
                        component={AddDeviceScreen}
                        options={{ presentation: 'fullScreenModal' }}
                    />
                    <Stack.Screen
                        name="DeviceDetail"
                        component={DeviceDetailScreen}
                    />
                    <Stack.Screen
                        name="StockOut"
                        component={StockOutScreen}
                        options={{ presentation: 'fullScreenModal' }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
