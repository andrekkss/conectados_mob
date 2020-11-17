import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

const Stack = createStackNavigator();
import SignIn from '../pages/register/register';
import SignUp from '../pages/login/login';
import Main from '../pages/main';
  
function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={SignUp} />
        <Stack.Screen name="Cadastro" component={SignIn} />
        <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
      </Stack.Navigator>
    );
  }

export default MyStack;