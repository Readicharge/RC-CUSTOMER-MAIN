import React, { useState, useEffect } from "react";
import Page from "../../../components/common/Page";
import { Text } from "react-native";
import CustomView from "../../../components/common/CustomView";
import StyledInput from "../../../components/common/StyledInput";
import StyledButton from "../../../components/common/StyledButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native'; // Import LottieView
import animationData from '../../../assets/animations/pay.json'
import { useDispatch, useSelector } from 'react-redux';
// import { customerSetupActions } from '../../../store/customer-setup-slice';




const errorMessages = {
    cardNumber: "Enter the valid card number",
    expiryDate: "Enter the valid expiry date",
    cvv: "enter the valid cvv number"
}


const Payment = () => {
    const navigation = useNavigation();
    const currentScreen = useSelector((state) => state.customerSetup.setupPeripherals.currentPage);
    const dispatch = useDispatch();

    const [form, setForm] = React.useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const formatExpiryDate = (cardNumber) => {
        const numericText = cardNumber.replace(/\D/g, ''); // Remove non-numeric characters

        if (numericText.length <= 2) {
            return numericText;
        } else {
            return numericText.slice(0, 2) + '/' + numericText.slice(2, 4);
        }
    };

    const handleChange = React.useCallback((value, field) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    const handleBackClick = () => {
        navigation.navigate('schedule');
    };

    const handleContinueClick = () => {
        if (currentScreen === 'installerDetails') {
            dispatch(
                customerSetupActions.updateSetupPeripherals({
                    currentPage: 'installerDetails',
                }),
            );
            dispatch(customerSetupActions.incrementProgress());
        }
        navigation.replace('installerDetails');
    };

    // Timer state and effect
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft === 0) {
                clearInterval(timer);
                handleBackClick(); // Navigate back when time is up
            } else {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);

        // Cleanup the timer on component unmount
        return () => clearInterval(timer);
    }, [timeLeft]);


    return (
        <Page className={'gap-y-5'}>
            <LottieView
                source={animationData} // Replace with your animation data
                autoPlay={true}
                loop={true}
                style={{ width: 200, height: 200, marginBottom: 40 }} // Adjust the width and height as needed
            />
            <CustomView className="mt-5 flex-row justify-between">
                <Text className="text-xl  font-semibold  text-primaryGreen">Total Amount : </Text>
                <Text className="text-xl  font-semibold  text-primaryGreen">$1000</Text>
            </CustomView>

            <CustomView
                className={`rounded border-2 rounded-lg border-primaryGreen px-5 w-full flex flex-col gap-y-3 pb-5 h-fit overflow-hidden`}
            >


                <Text className={'text-sm text-primaryBlue'}>CARD INFORMATION</Text>
                <StyledInput
                    placeholder={'Card Number'}
                    value={form.cardNumber}
                    name={'cardNumber'}
                    onChangeText={handleChange}
                    errorMessage={errorMessages.cardNumber}
                    validityFunction={(text) => text.length === 16}
                    keyboardType={'number-pad'}
                />
                <CustomView className={'w-full flex flex-row justify-between mb-5'}>
                    <StyledInput
                        className={'w-[49%]'}
                        placeholder={'MM/YY'}
                        value={formatExpiryDate(form.expiryDate)}
                        name={'expiryDate'}
                        onChangeText={handleChange}
                        errorMessage={errorMessages.expiryDate}
                        validityFunction={(text) => text.length === 5}
                    />


                    <StyledInput
                        placeholder={'CVV'}
                        className={'w-[49%]'}
                        value={form.cvv}
                        name={'cvv'}
                        onChangeText={handleChange}
                        type={'password'}
                        errorMessage={errorMessages.cvv}
                        validityFunction={(text) => text.length === 3}
                        keyboardType={'number-pad'}
                    />
                </CustomView>

            </CustomView>




            <StyledButton title={'BACK'} className={'w-full'} onPress={handleBackClick} />
            <StyledButton title={'PAY'}
                onPress={handleContinueClick}
                filled={true}
                className={'w-full'} />
            <Text className={'text-red-500'}>{timeLeft === 0 ? "Time exceeded, please try again from the schedule." : `Time left: ${timeLeft} seconds`}</Text>
        </Page>
    )
}


export default Payment;