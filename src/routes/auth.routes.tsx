import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Onboarding from '../pages/Onboarding'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import SelectCity from '../pages/SelectCity'
import Unavailable from '../pages/Unavailable'
import ShareApp from '../pages/ShareApp'
import ForgotPassword from '../pages/ForgotPassword'
import ValidateToken from '../pages/ValidateToken'
import RecoverPassword from '../pages/RecoverPassword'
import RecoveredPassword from '../pages/RecoveredPassword'
import colors from '../styles/colors'

const Auth = createStackNavigator()

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: colors.light }
    }}
  >
    <Auth.Screen name="Onboarding" component={Onboarding} />
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="SelectCity" component={SelectCity} />
    <Auth.Screen name="Unavailable" component={Unavailable} />
    <Auth.Screen name="ShareApp" component={ShareApp} />
    <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
    <Auth.Screen name="ValidateToken" component={ValidateToken} />
    <Auth.Screen name="RecoverPassword" component={RecoverPassword} />
    <Auth.Screen name="RecoveredPassword" component={RecoveredPassword} />
  </Auth.Navigator>
)

export default AuthRoutes
