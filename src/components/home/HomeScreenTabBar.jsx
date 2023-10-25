import React from 'react';
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import CustomView from '../common/CustomView';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import officialColors from '../../style/colors';
import HomeScreenTab from "./HomeScreenTab";

const fontSize = 30;
const blurredColor = officialColors.deepBlue;
const focussedColor = officialColors.white;

const tabs = [
    {
        name: 'Dashboard',
        iconBlurred: <MaterialCommunityIcons name="view-dashboard-outline" size={fontSize} color={blurredColor} />,
        iconFocussed: <MaterialCommunityIcons name="view-dashboard-outline" size={fontSize} color={focussedColor} />,
        screen: 'Dashboard'
    }
]

const HomeScreenTabBar = (props) => {
    return (
        <CustomView className={'w-full bg-primaryBlue flex flex-row items-center justify-between px-10 py-3'}>
            {props.state.routeNames.map((r, i) =>
                <HomeScreenTab
                    key={i}
                    tab={tabs[i]}
                    navigation={props.navigation}
                    isSelected={props.state.index === i}
                />
            )}
        </CustomView>
    );
};

export default HomeScreenTabBar;