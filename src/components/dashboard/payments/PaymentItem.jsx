import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import CustomView from '../../common/CustomView';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import moment from 'moment/moment';
import officialColors from '../../../style/colors';



const PaymentItem = ({ payment, onPress }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress(payment.id)}
            className={`flex items-center flex-row gap-x-2 border-2 border-t-8 px-2 py-3 mb-4 rounded-b rounded-t-lg border-primaryGreen ${
                payment.seen ? 'bg-gray-100' : 'bg-lime-100'
            }`}
        >
            <CustomView className={'self-start'}>
                <FontAwesome name="dollar" size={26} color="black" />
            </CustomView>
            <CustomView className={'flex flex-col flex-grow'}>
                <CustomView className={'flex flex-col justify-between gap-x-5 mb-2'}>
                    <Text className={'font-bold text-sm text-primaryBlue'}>
                        {payment.isIncoming ? 'INCOMING PAYMENT' : 'OUTGOING PAYMENT'}
                    </Text>
                    <Text className={'text-sm text-gray-400'}>{moment(payment.date).format('hh:mm A, MMMM d')}</Text>
                </CustomView>
                <Text className={'text-lg'}>${payment.amount}</Text>
                <Text className={''}>
                    Job #{payment.jobId} {payment.isIncoming ? 'payment received' : 'network fee paid'}
                </Text>
            </CustomView>
            <Entypo name="chevron-small-right" size={24} color={officialColors.green} />
        </TouchableOpacity>
    );
};

export default PaymentItem;