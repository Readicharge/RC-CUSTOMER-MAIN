import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';

import Page from '../../../components/common/Page';
import StyledButton from '../../../components/common/StyledButton';
import CustomView from '../../../components/common/CustomView';

import officialColors from '../../../style/colors';

import LottieView from 'lottie-react-native'; // Import LottieView
import animationData from '../../../assets/animations/bolt.json'; 



// import { customerSetupActions } from '../../../store/customer-setup-slice';
// import { useDispatch, useSelector } from 'react-redux';

const Quotation = () => {
    const navigation = useNavigation();
    // const currentScreen = useSelector((state) => state.customerSetup.setupPeripherals.currentPage);
    // const dispatch = useDispatch();

    const handleBackClick = React.useCallback(() => {
        navigation.navigate('infoPageQuestion');
    }, [navigation]);

    const handleContinueClick = React.useCallback(() => {
    //     if (currentScreen === 'Payment') {
    //         dispatch(
    //             customerSetupActions.updateSetupPeripherals({
    //                 currentPage: 'Payment',
    //             }),
    //         );
    //         dispatch(customerSetupActions.incrementProgress());
    //     }
        navigation.replace('reviewPhotos');
    }, []);

    return (
        <Page className={'gap-y-5'}>
          <LottieView
                    source={animationData} // Replace with your animation data
                    autoPlay={true}
                    loop={true}
                    style={{ width: 200, height: 200 , marginBottom:40 }} // Adjust the width and height as needed
                />
            <Text className={'text-2xl  text-center font-semibold text-primaryGreen'}>
               You Quote
            </Text>
            <Text className={'text-md text-center font-semibold text-white'}>
             Based on the project scope the cost of your EVSE installation will be:
            </Text>
            <Text className={'text-2xl text-center font-semibold text-primaryGreen'}>
              $1200
            </Text>
            <Text className={'text-md text-center font-semibold text-white'}>
             Does not include cost of Permit (if applicable)
            </Text>
            <Text className={'text-md text-center font-semibold text-white'}>
           Payment will be processed after installation is complete. If you choose to purchase a charger, this will be processed separately
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

export default Quotation;