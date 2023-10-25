// Importing the Core modules 
import React from 'react';
import { Text } from 'react-native';
import moment from 'moment';


// Importing the Icons
import { MaterialIcons } from '@expo/vector-icons';

// Importing the Custom Modules
import StyledButton from '../../../../components/common/StyledButton';
import CustomView from '../../../../components/common/CustomView';


// Declaring the component 
const FeedDetails = ({ route, navigation }) => {
    const feed = route.params.feed;

    return (
        <CustomView className={'w-screen py-10 px-5'}>
            <CustomView className={'flex flex-row items-start gap-x-3'}>
                <MaterialIcons name="bolt" size={26} color="black" />
                <CustomView className={'flex flex-col flex-grow items-start'}>
                    <Text className={'text-primaryBlue text-xl font-semibold'}>{feed.title}</Text>
                    <Text className={'mt-5'}>{feed.message}</Text>
                    <Text className={'mt-2'}>Received on {moment(feed.time).format('hh:mm A, MMMM d YYYY')}</Text>
                </CustomView>
            </CustomView>
            <StyledButton
                title={'GO BACK TO FEEDS'}
                variant={'blue'}
                className={'w-[80%] mx-auto mt-10'}
                onPress={navigation.goBack}
            />
        </CustomView>
    );
};

export default FeedDetails;