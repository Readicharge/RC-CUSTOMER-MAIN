// Importing the core modules 
import React from 'react';
import { Text } from 'react-native';

// importing the Icons 
import { FontAwesome } from '@expo/vector-icons';

// Importing the Custom modules
import moment from 'moment/moment';
import StyledButton from '../../../../components/common/StyledButton';
import CustomView from '../../../../components/common/CustomView';



const PaymentDetails = ({ route, navigation }) => {
    const payment = route.params.payment;

    return (
        <CustomView className={'w-screen py-10 px-5'}>
            <CustomView className={'flex flex-row items-start gap-x-3'}>
                <FontAwesome name="dollar" size={26} color="black" />
                <Text className={'text-lg font-semibold text-primaryBlue'}>
                    {payment.isIncoming ? 'Incoming Payment' : 'Outgoing Payment'}
                </Text>
            </CustomView>
            <Text className={'text-2xl text-primaryBlue mt-5'}>$ {payment.amount}</Text>
            <Text className={'text-primaryBlue mt-3'}>
                <Text className={'font-semibold'}>Job #:</Text> {payment.jobId}
            </Text>
            <Text className={'text-primaryBlue'}>
                <Text className={'font-semibold'}>Date:</Text> {moment(payment.date).format('hh:mm A, MMMM d YYYY')}
            </Text>
            <Text className={'text-primaryBlue'}>
                <Text className={'font-semibold'}>Account:</Text> {payment.account}
            </Text>
            <StyledButton title={'SEE JOB DETAILS'} variant={'blue'} filled className={'w-[80%] mx-auto mt-10'} />
            <StyledButton title={'PDF INVOICE'} variant={'blue'} className={'w-[80%] mx-auto mt-2'} />
            <StyledButton
                title={'GO BACK TO PAYMENTS'}
                variant={'blue'}
                className={'w-[80%] mx-auto mt-2'}
                onPress={navigation.goBack}
            />
        </CustomView>
    );
};

export default PaymentDetails;