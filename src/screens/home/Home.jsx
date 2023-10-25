import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from './Dashnboard';

import officialColors from '../../style/colors';
import HomeScreenTabBar from '../../components/home/HomeScreenTabBar';
import HomeScreenTabHeader from '../../components/home/HomeScreenTabHeader';

const Tab = createBottomTabNavigator();

const Home = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                header: HomeScreenTabHeader,
            }}
            sceneContainerStyle={{
                backgroundColor: officialColors.white,
            }}
            initialRouteName={'Dashboard'}
            tabBar={HomeScreenTabBar}
            backBehavior={'history'}
        >
            <Tab.Screen name={'Dashboard'} component={Dashboard} />
          
        </Tab.Navigator>
    );
};

export default Home;