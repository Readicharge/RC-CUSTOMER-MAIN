import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomView from '../../../../components/common/CustomView';
import StyledButton from '../../../../components/common/StyledButton';
import Page from '../../../../components/common/Page';
import LottieView from 'lottie-react-native'; // Import LottieView
import animationData from '../../../../assets/animations/bolt.json';
import officialColors from '../../../../style/colors';

const OffRamp1 = ({ data }) => {
    const navigation = useNavigation();

    const handleServicesClick = () => {
        // Navigate to the Services screen
        navigation.navigate('Services');
    };

    const handleInstallationsClick = () => {
        // Navigate to the Installations screen
        navigation.navigate('Installations');
    };

    return (

        <CustomView className={'flex flex-col justify-center items-center w-full mt-20'}>

            <LottieView
                source={animationData} // Replace with your animation data
                autoPlay={true}
                loop={true}
                style={{ width: 160, height: 160, marginBottom: 10 }} // Adjust the width and height as needed
            />
            
            {   
                data.currentIndex === 2 ? (
                    <Text style={{ textAlign: "center", fontWeight: 'semibold', fontSize: 18, marginBottom: 16, marginTop: 10, color: officialColors.green }}>
                        Your Charger and outlet may not be compactible. In order to move forward with a ReadiCharge installation project, you need to upgrade your outlet to a NEMA 14-50 or hardwired installation and purchase a compatible charger.
                    </Text>
                ) : (
                    data.currentIndex === 4 ? (
                        <Text style={{ textAlign: "center", fontWeight: 'semibold', fontSize: 18, marginBottom: 16, marginTop: 10, color: officialColors.green }}>
                            ReadiCharge does not currently offer 80A - 19.kw EV chargers for sale. You need to purchaase a 80A - 19.2kw EV charger outside of ReadiCharge before scheduling your installation
                        </Text>
                    )
                    :
                    (
                        <Text style={{ textAlign: "center", fontWeight: 'semibold', fontSize: 18, marginBottom: 16, marginTop: 10, color: officialColors.green }}>
                            Based on your responses, your installation is outside the standard scope of ReadiCharge installations.
                    </Text>
                    )
            )
            }
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

export default OffRamp1;
