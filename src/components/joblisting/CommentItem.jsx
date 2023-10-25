import React from 'react';
import CustomView from "../common/CustomView";
import {Text} from "react-native";
import moment from "moment";



const CommentItem= ({comment}) => {
    return (
        <CustomView className={'flex flex-col mb-5'}>
            <CustomView className={'flex flex-row justify-between items-center'}>
                <Text className={'text-neutral-400 text-sm'}>{comment.name}</Text>
                <Text
                    className={'text-neutral-400 text-sm'}>
                    {moment(new Date(comment.timestamp)).format('hh:mm A, DD.MM.YY')}
                </Text>
            </CustomView>
            <Text>{comment.comment}</Text>
        </CustomView>
    );
};

export default CommentItem;