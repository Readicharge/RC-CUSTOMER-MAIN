import React from 'react';
import Page from '../../../components/common/Page';
import { Feather } from '@expo/vector-icons';
import officialColors from '../../../style/colors';
import { Text } from 'react-native';
import StyledButton from '../../../components/common/StyledButton';
import CustomView from '../../../components/common/CustomView';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { customerSetupActions } from '../../../store/customer-setup-slice';
import { useDispatch, useSelector } from 'react-redux';

const InfoPageQuestion = () => {
    const navigation = useNavigation();
    const currentScreen = useSelector((state) => state.customerSetup.setupPeripherals.currentPage);
    const dispatch = useDispatch();

    const handleBackClick = React.useCallback(() => {
        navigation.navigate('address');
    }, [navigation]);

    const handleContinueClick = React.useCallback(() => {
        if (currentScreen === 'infoPageQuestion') {
            dispatch(
                customerSetupActions.updateSetupPeripherals({
                    currentPage: 'numberChargers',
                }),
            );
            dispatch(customerSetupActions.incrementProgress());
        }
        navigation.replace('numberChargers');
    }, [navigation, currentScreen]);

    return (
        <Page className={'gap-y-5'}>
            <Feather name="clock" size={100} color={officialColors.green} />
            <Text className={'text-lg text-center font-semibold text-white'}>
                ReadiCharge saves you time by eliminating unnecessary consultation appointments. Our goal is to get you
                charging in a single visit!{' '}
            </Text>
            <Text className={'text-lg text-center font-semibold text-white'}>
                We recommend completing these next questions while at the installation location, as you will need to
                provide site-specific details to receive an accurate quote.
            </Text>
            <Text className={'text-lg text-center font-semibold text-white'}>
                Estimated time to complete: 
            </Text>
            <Text className={'text-lg text-center font-semibold text-white'}>
            10-15 minutes
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

export default InfoPageQuestion;