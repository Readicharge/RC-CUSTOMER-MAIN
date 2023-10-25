import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomView from '../../../../components/common/CustomView';
import StyledButton from '../../../../components/common/StyledButton';
import Page from '../../../../components/common/Page';
import LottieView from 'lottie-react-native'; // Import LottieView
import animationData from '../../../../assets/animations/bolt.json';
import officialColors from '../../../../style/colors';

const OffRamp2 = ({ data }) => {
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

        <CustomView className={'bg-transparent  mt-10  mb-10 rounded-lg'}>
            {data.currentIndex === 2 ? (
                <Text style={{ textAlign: "center", fontWeight: 'semibold', fontSize: 18, marginBottom: 16, color: officialColors.green }}>
                    Readicharge does offer NEMA 6-20 / 6-30 / 6-50 / 10-30 chargers at this time. If you still want to contact an installer, below are the list of referrals
                </Text>
            ) : (
                <Text style={{ textAlign: "center", fontWeight: 'semibold', fontSize: 18, marginBottom: 16, marginTop: 10, color: officialColors.green }}>
                    Based on your responses, your installation is outside the standard scope of ReadiCharge installations.
                </Text>
            )}
            <CustomView className={'bg-white my-4 p-4 rounded-lg'}>
                <Text style={{ fontSize: 16, marginBottom: 16, color: officialColors.darkBlue }}>
                    Question: {data.question}
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 16, color: officialColors.darkBlue }}>
                    Answer: {data.answer}
                </Text>
            </CustomView>
            <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: 30, marginBottom: 10, color: officialColors.green }}>
                Referral List
            </Text>
            <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: 16, marginBottom: 16, color: officialColors.green }}>
                Below is a list of recommended installers in your area
            </Text>
            <ScrollView
                horizontal={true}
                style={{ maxHeight: 290 }}>
                {installers.map((installer, index) => (

                    <View key={index} style={styles.installerItem} className="gap-y-2">
                        <Image
                            source={require("../../../../assets/images/charger.png")}
                            className={'w-[100px] h-[100px] rounded-full'}
                        />
                        <Text className="font-semibold text-primaryBlue text-xl">
                            {installer.firstName} {installer.lastName}
                        </Text>
                        <Text style={styles.installerItemText}>{installer.address}</Text>
                        <Text style={styles.installerItemText}>{installer.email}</Text>
                        <Text style={styles.installerItemText}>{installer.phoneNumber}</Text>
                    </View>
                ))}
            </ScrollView>
            <Text style={styles.disclaimerText}>
                Disclaimer: The list of available installers may not be exhaustive.
            </Text>

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

    installerItem: {
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginHorizontal: 16,
        padding: 26,
        borderRadius: 13
    },
    installerItemText: {
        fontSize: 16,
    },
    disclaimerText: {
        fontSize: 12,
        fontStyle: 'italic',
        color: 'gray',
        marginTop: 10,
    },
});



const installers = [
    {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St, Anytown, USA',
        email: 'john@example.com',
        phoneNumber: '123-456-7890',
    },
    {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St, Anytown, USA',
        email: 'john@example.com',
        phoneNumber: '123-456-7890',
    },
    {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St, Anytown, USA',
        email: 'john@example.com',
        phoneNumber: '123-456-7890',
    },
    {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St, Anytown, USA',
        email: 'john@example.com',
        phoneNumber: '123-456-7890',
    },
    {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St, Anytown, USA',
        email: 'john@example.com',
        phoneNumber: '123-456-7890',
    },
    // Add more installer objects as needed
];



export default OffRamp2;
