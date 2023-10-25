import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomView from '../../../components/common/CustomView';
import StyledButton from '../../../components/common/StyledButton';
import Page from '../../../components/common/Page';
import LottieView from 'lottie-react-native'; // Import LottieView
import animationData from '../../../assets/animations/bolt.json';
import { useDispatch } from 'react-redux';
import { customerSetupActions } from '../../../store/customer-setup-slice';

const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleServicesClick = () => {
        // Storing the Selection 
        dispatch(
                    customerSetupActions.updateCustomer({
                       userPreference:'service'
                    }),
                );
        // Navigate to the Services screen
        navigation.navigate('zipCode');
    };

    const handleInstallationsClick = () => {
           // Storing the Selection 
           dispatch(
            customerSetupActions.updateCustomer({
               userPreference:'installations'
            }),
        );
        // Navigate to the Installations screen
        navigation.navigate('zipCode');
    };

    return (
        <Page showTopRightImage className={'justify-between'}>
            <CustomView className={'flex flex-col justify-center items-center w-full mt-20'}>
                <Text className={'text-xl font-semibold text-primaryGreen text-center mb-10'}>
                   What do you want to do ?
                </Text>
                <LottieView
                    source={animationData} // Replace with your animation data
                    autoPlay={true}
                    loop={true}
                    style={{ width: 200, height: 200 }} // Adjust the width and height as needed
                />
                <StyledButton onPress={handleInstallationsClick} className={'mt-5 w-full'} title={'INSTALLATION'} filled />
                <StyledButton onPress={handleServicesClick} className={'mt-5 w-full'} title={'REPAIRING'} />
            </CustomView>
        </Page>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonsContainer: {
        // flexDirection: 'row',
    },
});

export default HomeScreen;
