import { View, Text } from 'react-native'
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import officialColors from './src/style/colors';
import Landing from './src/screens/onboarding/Page1/Landing';




import ZipCode from './src/screens/onboarding/Page1/ZipCode';
import Service from './src/screens/onboarding/Page2/Service';
import ServiceInfo from './src/screens/onboarding/Page2/ServiecInfo';
import Register from './src/screens/onboarding/Page3/Register';
import Address from './src/screens/onboarding/Page3/Address';
import NumberOfChargers from './src/screens/onboarding/Page4/NumberOfChargers';
import RewiewPhotos from './src/screens/onboarding/Page5/RewiewPhotos';
import MagicScan from './src/screens/onboarding/Page5/MagicScan';
import Quotation from './src/screens/onboarding/Page6/Quotation';
import Slot from './src/screens/onboarding/Page6/SlotTime';
import PaymentInfo from './src/screens/onboarding/Page7/PaymentInformation';
import Payment from './src/screens/onboarding/Page7/Charge';
import InstallerDetails from './src/screens/onboarding/Page8/InstallerDetails'; ``
import Login from './src/screens/onboarding/Page1/Login';
import Schedule from './src/screens/onboarding/Page6/DaySchedule';
import OffRamp1 from './src/screens/onboarding/Page4/offramp/OffRamp1';
import OffRamp2 from './src/screens/onboarding/Page4/offramp/OffRamp2';
import OffRamp3 from './src/screens/onboarding/Page4/offramp/OffRamp3';
import OffRamp4 from './src/screens/onboarding/Page4/offramp/OffRamp4';


import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/store/store';
import InfoPageQuestion from './src/screens/onboarding/Page3/infoPageQuestion';
import PrimaryDetails from './src/screens/onboarding/Page4/PrimaryDetails';
import AdvanceDetails from './src/screens/onboarding/Page4/AdvanceDetails';
import Home from './src/screens/home/Home';
import JobListing from './src/screens/home/dashboard/JobListing';



const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              contentStyle: {
                backgroundColor: officialColors.darkBlue,
              },
              headerShown: false
            }}
          >
            {/* ************************************************************** BUNDLE 0.1 ********************************************************* */}
            {/* Sequence 1 : landing page  */}
            <Stack.Screen name="landing" component={Landing} />
            {/* If on the landing page the Get Started is clicked then service page navigation will get active*/}
            <Stack.Screen name="service" component={Service} />
            <Stack.Screen name="Login" component={Login} />
            {/* ************************************************************** BUNDLE 0.1 ********************************************************* */}


            {/* ************************************************************** BUNDLE 0.2 ********************************************************* */}
            {/* Both the option takes to the zipCode page from the service page , as we want to collect the data from the customer as much as we can */}
            <Stack.Screen name="zipCode" component={ZipCode} />
            {/* After the Zipcode , register page is triggred */}
            <Stack.Screen name="register" component={Register} />
            {/* After the register, Address page is triggred */}
            <Stack.Screen name="address" component={Address} />
            {/* After the Address page if the service selected was repairing then serviceInfo */}
            <Stack.Screen name="ServiceInfo" component={ServiceInfo} />
            {/* After the Address page if the service selected was installation then infoPage */}
            <Stack.Screen name="infoPageQuestion" component={InfoPageQuestion} />
            {/* ************************************************************** BUNDLE 0.2 ********************************************************* */}


            {/* ************************************************************** BUNDLE 1 ********************************************************* */}
            {/* User can land on this page from either ServiceInfo ( if Continue with installations is seleceted ) or address page section if the service selected initially was installation  */}
            <Stack.Screen name="numberChargers" component={NumberOfChargers} />
            <Stack.Screen name="primaryDetails" component={PrimaryDetails} />
            <Stack.Screen name="advanceDetails" component={AdvanceDetails} />
            {/* Helper Screens */}
            <Stack.Screen name="offRamp1" component={OffRamp1}/>
            <Stack.Screen name="offRamp2" component={OffRamp2}/>
            <Stack.Screen name="offRamp3" component={OffRamp3}/>
            <Stack.Screen name="offRamp4" component={OffRamp4}/>
            {/* ************************************************************** BUNDLE 1 ********************************************************* */}


            {/* ************************************************************** BUNDLE 2 ********************************************************* */}
            <Stack.Screen name="quotation" component={Quotation} />
            <Stack.Screen name="reviewPhotos" component={RewiewPhotos} />
            <Stack.Screen name="magicScan" component={MagicScan} />
            {/* ************************************************************** BUNDLE 2 ********************************************************* */}


            {/* ************************************************************** BUNDLE 3 ********************************************************* */}
            <Stack.Screen name="schedule" component={Schedule} />
            <Stack.Screen name="slot" component={Slot} />
            <Stack.Screen name="paymentProceed" component={PaymentInfo} />
            <Stack.Screen name="payment" component={Payment} />
            <Stack.Screen name="installerDetails" component={InstallerDetails} />
            {/* ************************************************************** BUNDLE 3 ********************************************************* */}



            {/* ************************************************************** BUNDLE : Home ********************************************************* */}
            <Stack.Screen name="Home" component={Home}/>
            {/* This is for the Job Details  : JobListing */}
            <Stack.Screen name="JobListing" component={JobListing}/>
            {/* ************************************************************** BUNDLE : Home ********************************************************* */}

          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App