import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomView from '../../../components/common/CustomView';
import StyledButton from '../../../components/common/StyledButton';
import Page from '../../../components/common/Page';
import LottieView from 'lottie-react-native'; // Import LottieView
import animationData from '../../../assets/animations/connected.json';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import officialColors from '../../../style/colors';
import { AntDesign } from '@expo/vector-icons';
const InstallerDetails = (props) => {
    const navigation = useNavigation();
    const {
        firstName,
        lastName,
        address,
        email,
        phoneNumber,
        bio,
    } = props;

    return (
        <Page className={'pb-2 px-8 justify-center gap-y-2 h-[100vh] items-center'}>

            <CustomView className={'bg-primaryGreen w-full mt-4 rounded-xl'}>
                <Text
                    className={
                        `text-lg text-primaryBlue font-bold px-4 py-2 mx-auto bg-primaryGreen`
                    }
                >
                    Your appointment is on
                </Text>
                <CustomView>

                    <CustomView style={{ flexDirection: 'row', alignItems: 'center' , justifyContent:"center" }}>
                        <AntDesign name="calendar" size={24} color={officialColors.darkBlue} style={{ marginRight: 10 }} />
                        <Text style={{ fontSize: 20, fontWeight: "bold", padding: 5, textAlign: "center", color: "white" }}>
                            {moment(new Date()).format('MMM DD, YYYY').toUpperCase()}
                        </Text>
                    </CustomView>
                </CustomView>


            </CustomView>

            <CustomView className="bg-white rounded-2xl w-full p-4 mb-4 fixed bottom-0 left-0 right-0">
                <Text
                    className={
                        `text-lg text-primaryGreen font-bold px-4 py-2  `
                    }
                >
                    Your setup is complete, Meet your installer...
                </Text>
                <LottieView
                    source={animationData} // Replace with your animation data
                    autoPlay={true}
                    loop={true}
                    style={{ width: 200, height: 200, marginBottom: 10 }} // Adjust the width and height as needed
                />
                <CustomView className="p-4 flex flex-row">
                    <Image
                        source={require("../../../assets/images/charger.png")}
                        className={'w-[100px] h-[100px] rounded-full'}
                    />
                    <CustomView className="flex px-2">
                        <CustomView className="flex flex-row">
                            <CustomView >
                                <Text className={'text-sm font-semibold text-primaryBlue  mt-2'}>{firstName} Firstname</Text>
                            </CustomView>
                            <CustomView >
                                <Text className={'text-sm font-semibold text-primaryBlue  mt-2'}>{lastName} Lastname</Text>
                            </CustomView>
                        </CustomView>
                        <CustomView >
                            <Text className={'text-sm text-primaryBlue  mt-2'}>{address} 123, main street</Text>
                        </CustomView>
                        <CustomView >
                            <Text className={'text-sm text-primaryBlue  mt-2'}>{email} test@email.com</Text>
                        </CustomView>
                        <CustomView >
                            <Text className={'text-sm text-primaryBlue  mt-2'}>{phoneNumber}(555)-4566-7890</Text>
                        </CustomView>

                    </CustomView>
                </CustomView>

            </CustomView>

            <StyledButton
                onPress={() => navigation.navigate('Home')}
                className={'w-full'}
                filled
                variant={'green'}
                title={'GOTO HOME'}
            />

        </Page>
    );
};


export default InstallerDetails;
