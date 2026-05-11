import React, { useEffect,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { NavigationScreen, ThreatsScreen, PaymentScreen, ProfileScreen } from './src/screens/AllScreens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const COLORS = { background: '#111827', primary: '#1F2937', border: '#4B5563', cyan: '#00D4FF', text: '#FFFFFF', textSecondary: '#9CA3AF' };

const AuthenticatedNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: true, tabBarStyle: { backgroundColor: COLORS.primary, borderTopColor: COLORS.border, height: 65, paddingBottom: 8 }, tabBarActiveTintColor: COLORS.cyan, tabBarInactiveTintColor: COLORS.textSecondary, headerStyle: { backgroundColor: COLORS.primary }, headerTintColor: COLORS.text, headerTitleStyle: { fontWeight: 'bold' } }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Inicio', title: 'VisionGuard', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="shield-eye" size={size} color={color} /> }} />
    <Tab.Screen name="Navigation" component={NavigationScreen} options={{ tabBarLabel: 'Navegar', title: 'Navegación IA', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="map-marker-radius" size={size} color={color} /> }} />
    <Tab.Screen name="Threats" component={ThreatsScreen} options={{ tabBarLabel: 'Amenazas', title: 'Amenazas', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="alert-circle" size={size} color={color} /> }} />
    <Tab.Screen name="Payment" component={PaymentScreen} options={{ tabBarLabel: 'Planes', title: 'Planes', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="credit-card" size={size} color={color} /> }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Perfil', title: 'Perfil', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-circle" size={size} color={color} /> }} />
  </Tab.Navigator>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 1200); }, []);
  if (loading) return (<View style={styles.loading}><StatusBar style="light" /><MaterialCommunityIcons name="shield-eye" size={64} color={COLORS.cyan} /><ActivityIndicator size="large" color={COLORS.cyan} style={{ marginTop: 24 }} /></View>);
  return (<SafeAreaProvider><StatusBar style="light" /><NavigationContainer>{isAuthenticated ? <AuthenticatedNavigator /> : <Stack.Navigator screenOptions={{ headerShown: false }}><Stack.Screen name="Login">{() => <LoginScreen onLogin={() => setIsAuthenticated(true)} />}</Stack.Screen></Stack.Navigator>}</NavigationContainer></SafeAreaProvider>);
}

const styles = StyleSheet.create({ loading: { flex: 1, backgroundColor:
