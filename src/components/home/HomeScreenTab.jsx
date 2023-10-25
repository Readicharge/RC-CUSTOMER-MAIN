import React from 'react';
import {TouchableOpacity} from "react-native";
import {NavigationHelpers, ParamListBase} from "@react-navigation/native";
import {BottomTabNavigationEventMap} from "@react-navigation/bottom-tabs/src/types";



const HomeScreenTab = ({navigation, tab, isSelected}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(tab.screen)}>
            {isSelected ? tab.iconFocussed : tab.iconBlurred}
        </TouchableOpacity>
    );
};

export default HomeScreenTab;