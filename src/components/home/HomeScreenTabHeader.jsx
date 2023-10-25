import React from 'react';
import CustomView from "../common/CustomView";
import {Text} from "react-native";



const HomeScreenTabHeader = (props) => {
    return (
        <CustomView className={'w-full py-5 bg-primaryBlue'}>
            <Text className={'text-white text-center'}>{props.route.name.toUpperCase()}</Text>
        </CustomView>
    );
};

export default HomeScreenTabHeader;