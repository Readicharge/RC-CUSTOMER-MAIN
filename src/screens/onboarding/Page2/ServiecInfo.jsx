import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomView from '../../../components/common/CustomView';
import StyledButton from '../../../components/common/StyledButton';
import Page from '../../../components/common/Page';
import LottieView from 'lottie-react-native';
import animationData from '../../../assets/animations/bolt.json';
import officialColors from '../../../style/colors';

const ServiceInfo = () => {
    const navigation = useNavigation();

    const handleServicesClick = () => {
        // Navigate to the Services screen
        navigation.navigate('landing');
    };

    const handleInstallationsClick = () => {
        // Navigate to the Installations screen
        navigation.navigate('infoPageQuestion');
    };

    return (
        <Page showTopRightImage className={'justify-between'}>
            <CustomView className={'flex flex-col justify-center items-center w-full mt-20'}>
                <Text className={'text-xl font-semibold text-primaryGreen text-center mb-10'}>
                    ReadiCharge currently does not provide service in your area.
                </Text>


                <StyledButton onPress={handleInstallationsClick} className={'mt-5 w-full'} title={'CONTINUE WITH INSTALLATION'} filled />
                <StyledButton onPress={handleServicesClick} className={'mt-5 w-full'} title={'BACK'} />
            </CustomView>

            <CustomView className={'bg-transparent  mt-6  mb-10 rounded-lg'}>
            <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: 20, marginBottom: 10, color: officialColors.green }}>
                    Referral List
                </Text>
                <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: 16 , marginBottom: 16, color: officialColors.green }}>
                    Below is a list of recommended installers in your area
                </Text>
                <ScrollView 
                horizontal={true}
                style={{ maxHeight: 290 }}>
                    {installers.map((installer, index) => (

                        <View key={index} style={styles.installerItem} className="gap-y-2">
                             <Image
                        source={require("../../../assets/images/charger.png")}
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
        </Page>
    );
};

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

const styles = StyleSheet.create({
    installerItem: {
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginHorizontal:16,
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
        marginBottom:20
    },
});

export default ServiceInfo;
