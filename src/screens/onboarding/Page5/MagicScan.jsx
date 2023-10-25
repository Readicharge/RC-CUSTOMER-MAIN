import React from 'react';
import Page from '../../../components/common/Page';
import { Text } from 'react-native';
import CustomView from '../../../components/common/CustomView';
import StyledButton from '../../../components/common/StyledButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// import { useDispatch, useSelector } from 'react-redux';
// import { customerSetupActions } from '../../../store/customer-setup-slice';

const points = ['Vehicle', 'EV Charger', 'Electric Panel'];

const MagicScan = () => {
    const navigation = useNavigation();
    // const dispatch = useDispatch();
    // const currentScreen = useSelector((state) => state.customerSetup.setupPeripherals.currentPage);

    const handleBackClick = React.useCallback(() => {
        navigation.navigate('reviewPhotos');
    }, [navigation]);

    const handleSkipForNow = React.useCallback(() => {
        // if (currentScreen === 'Blueprint') {
        //     dispatch(
        //         customerSetupActions.updateSetupPeripherals({
        //             currentPage: 'Steps',
        //         }),
        //     );
        //     dispatch(customerSetupActions.incrementProgress());
        //     navigation.navigate('Steps');
        // } else {
        //     navigation.navigate('ChargerCount');
        // }
        navigation.navigate('schedule');
    }, []);// currentScreen Variable to be added

    return (
        <Page showTopRightImage className={'gap-y-5'}>
            <Text className={'text-xl text-primaryGreen font-semibold text-center'}>
                Scan your room to create a “blueprint” of your installation location.* (optional)
            </Text>
            <Text className={'text-xl text-white text-center mb-5'}>Powered By magicplan</Text>
            <Text className={'text-white'}>Help take the guesswork out of your project. </Text>
            <Text className={'text-white'}>
                Simply scan your room and place each of the following icons in your desired installation location:
            </Text>
            <CustomView className={'flex flex-col w-full pl-5'}>
                {points.map((p, index) => (
                    <CustomView key={index} className={'flex flex-row gap-x-1'}>
                        <CustomView className={'w-[5px] h-[5px] rounded-full bg-white mt-2'} />
                        <Text className={'text-white'}>{p}</Text>
                    </CustomView>
                ))}
            </CustomView>
            <Text className={'text-primaryGreen'}>
                * Only applicable for locations where the charger and electric panel are in the same space, e.g. garage
                or polebarn.
            </Text>
            <StyledButton title={'GET RC Scan App'} className={'w-full'} disabled />
            <StyledButton className={'w-full'} onPress={handleBackClick} title={'BACK'} />
            <StyledButton className={'w-full'} onPress={handleSkipForNow} filled  title={'SKIP FOR NOW'} />
        </Page>
    );
};

export default MagicScan;