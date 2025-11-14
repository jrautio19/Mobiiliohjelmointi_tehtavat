import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types/navigation'
import { PaperProvider } from 'react-native-paper'
import AppBar from './components/AppBar'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import SecondScreen from './screens/SecondScreen'
import React from 'react'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: (props) => <AppBar {...props} />
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'MD Nav Demo' }}
          />

          <Stack.Screen
            name="Second"
            component={SecondScreen}
            options={{ title: 'MD Nav Demo' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}