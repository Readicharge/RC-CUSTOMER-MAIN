import React from 'react';
import CustomView from '../../common/CustomView';
import { Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import officialColors from '../../../style/colors';


const FeedItem= ({ feed, onPress }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress(feed.id)}
            className={`flex items-center flex-row border-2 border-t-8 px-2 py-3 mb-4 rounded-b rounded-t-lg border-primaryGreen ${
                feed.seen ? 'bg-gray-100' : 'bg-lime-100'
            }`}
        >
            <CustomView className={'self-start'}>
                <MaterialIcons name="bolt" size={26} color="black" />
            </CustomView>
            <CustomView className={'flex flex-col flex-grow'}>
                <CustomView className={'flex flex-col justify-between gap-x-2 mb-2'}>
                    <Text className={'font-bold text-sm text-primaryBlue'}>{feed.title}</Text>
                    <Text className={'text-sm text-gray-500'}>{moment(feed.time).format('hh:mm A, MMMM d')}</Text>
                </CustomView>
                <Text>{feed.message}</Text>
            </CustomView>
            <Entypo name="chevron-small-right" size={24} color={officialColors.green} />
        </TouchableOpacity>
    );
};

export default FeedItem;