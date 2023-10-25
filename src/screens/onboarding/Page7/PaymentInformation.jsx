import React from 'react';
import Page from '../../../components/common/Page';
import { Feather } from '@expo/vector-icons';
import officialColors from '../../../style/colors';
import { Text } from 'react-native';
import StyledButton from '../../../components/common/StyledButton';
import CustomView from '../../../components/common/CustomView';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { customerSetupActions } from '../../../store/customer-setup-slice';
// import { useDispatch, useSelector } from 'react-redux';

const PaymentInfo = () => {
    const navigation = useNavigation();
    // const currentScreen = useSelector((state) => state.customerSetup.setupPeripherals.currentPage);
    // const dispatch = useDispatch();

    // const handleBackClick = React.useCallback(() => {
    //     navigation.navigate('Slot');
    // }, [navigation]);

    const handleContinueClick = React.useCallback(() => {
    //     if (currentScreen === 'Payment') {
    //         dispatch(
    //             customerSetupActions.updateSetupPeripherals({
    //                 currentPage: 'Payment',
    //             }),
    //         );
    //         dispatch(customerSetupActions.incrementProgress());
    //     }
        navigation.replace('payment');
    }, [navigation]);

    const handleBackClick = React.useCallback(() => {
        navigation.navigate('address');
    },[]);
    return (
        <Page className={'gap-y-5'}>
            <Feather name="clock" size={100} color={officialColors.green} />
            <Text className={'text-lg text-center font-semibold text-white'}>
               You are about to book Installation
            </Text>
            <Text className={'text-lg text-center font-semibold text-white'}>
                We recommend Complete your booking payment process within the available time slot , Otherwise your nearest Installer 
                might get booked !
            </Text>
            <Text className={'text-lg text-center font-semibold text-white'}>
                Payment Window will be opened for the next 15 minutes
            </Text>
            <CustomView className={'w-full flex flex-col gap-y-3'}>
                <StyledButton onPress={handleBackClick} className={'w-full'} variant={'green'} title={'BACK'} />
                <StyledButton
                    onPress={handleContinueClick}
                    className={'w-full'}
                    filled
                    variant={'green'}
                    title={'CONTINUE'}
                />
            </CustomView>
        </Page>
    );
};

export default PaymentInfo;