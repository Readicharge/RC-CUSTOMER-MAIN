// Importing the core moduels
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing the Custom modules
import FeedDetails from './Feeds/FeedDetails';
import FeedsList from './Feeds/FeedList';

const Feeds = () => {
    const FeedStack = createNativeStackNavigator();
    return (
        <FeedStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <FeedStack.Screen name={'FeedsList'} component={FeedsList} />
            <FeedStack.Screen name={'FeedDetails'} component={FeedDetails} />
        </FeedStack.Navigator>
    );
};

export default Feeds;