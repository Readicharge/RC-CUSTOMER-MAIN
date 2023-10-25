import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaymentsList from './Payments./PaymentList';
import PaymentDetails from './Payments./PaymentDetails';

const Payments = () => {
    const PaymentsStack = createNativeStackNavigator();

    return (
        <PaymentsStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <PaymentsStack.Screen name={'PaymentsList'} component={PaymentsList} />
            <PaymentsStack.Screen name={'PaymentDetails'} component={PaymentDetails} />
        </PaymentsStack.Navigator>
    );
};

export default Payments;