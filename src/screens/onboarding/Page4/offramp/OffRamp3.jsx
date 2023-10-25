import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomView from '../../../../components/common/CustomView';
import StyledButton from '../../../../components/common/StyledButton';
import Page from '../../../../components/common/Page';
import LottieView from 'lottie-react-native'; // Import LottieView
import animationData from '../../../../assets/animations/bolt.json';
import officialColors from '../../../../style/colors';

const OffRamp3 = ({data}) => {
    const navigation = useNavigation();



    return (

        <CustomView className={'flex flex-col justify-center items-center w-full mt-20'}>
            <Text className={'text-xl font-semibold text-primaryGreen text-center mb-10'}>
                You are all set ! Get Charging !!
            </Text>
            <LottieView
                source={animationData} // Replace with your animation data
                autoPlay={true}
                loop={true}
                style={{ width: 200, height: 200 , marginBottom:10}} // Adjust the width and height as needed
            />
            <CustomView className={'bg-white my-4 p-4 rounded-lg'}>
                <Text style={{ fontSize: 16, marginBottom: 16, color: officialColors.darkBlue }}>
                    Question: {data.question}
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 16, color: officialColors.darkBlue }}>
                    Answer: {data.answer}
                </Text>
            </CustomView>

        </CustomView>

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

export default OffRamp3;
