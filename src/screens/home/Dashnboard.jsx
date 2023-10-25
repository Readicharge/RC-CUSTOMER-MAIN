import React from 'react';
import { useSelector } from 'react-redux';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Feeds from './dashboard/Feeds';
import Payments from './dashboard/Payments';
import officialColors from '../../style/colors';
import Jobs from './dashboard/Jobs';

const Tab = createMaterialTopTabNavigator();

const screens = [
        {
            name: 'Jobs',
            component: Jobs,
        },
        {
            name: 'Feeds',
            component: Feeds,
        },
        {
            name: 'Payments',
            component: Payments,
        }
    ];



const Dashboard = () => {
    
    const filteredScreens = screens.map((screen, index) => (
            <Tab.Screen key={index} name={screen.name} component={screen.component} />
        ));
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: officialColors.lightGray,
            }}
            backBehavior={'history'}
            initialRouteName={'Jobs'}
            screenOptions={{
                tabBarLabelStyle: {
                    fontSize: 11,
                },
                
                tabBarActiveTintColor: officialColors.darkGreen,
                tabBarItemStyle: {
                    paddingHorizontal: -10,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: officialColors.darkGreen,
                },
            }}
        >
            {filteredScreens}
        </Tab.Navigator>
    );
};

export default Dashboard;