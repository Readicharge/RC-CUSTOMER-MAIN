import React from 'react';
import { Alert, Image, Text } from 'react-native';

import { useDispatch } from 'react-redux';
import { isEmailValid, isNotEmpty, isPasswordValid, isPhoneNumberValid, valuesEqual } from '../../../helper/Validation';

import Page from '../../../components/common/Page';
import StyledButton from '../../../components/common/StyledButton';
import CustomView from '../../../components/common/CustomView';
import StyledInput from '../../../components/common/StyledInput';

import { customerSetupActions } from '../../../store/customer-setup-slice';
import { makeRequest } from '../../../helper/http';



const Register= ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [activeButton , setActiveButton] = React.useState(false);
    const [form, setForm] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        phoneNumber: '',
        password: '',
    });


    const formFields = React.useMemo(
        () => ({
            firstName: {
                placeHolder: 'First Name',
                errorMessage: 'Please enter a valid first name',
                validationFunction: isNotEmpty,
            },
            lastName: {
                placeHolder: 'Last Name',
                errorMessage: 'Please enter a valid last name',
                validationFunction: isNotEmpty,
            },
            email: {
                placeHolder: 'Email',
                errorMessage: 'Please enter a valid email',
                validationFunction: isEmailValid,
            },
            confirmEmail: {
                placeHolder: 'Confirm Email',
                errorMessage: 'Emails do not match',
                validationFunction: (value) => valuesEqual(String(value).toLowerCase(), String(form.email).toLowerCase()),
            },
            phoneNumber: {
                placeHolder: 'Phone Number',
                errorMessage: 'Please enter a valid phone number',
                validationFunction: isPhoneNumberValid,
            },
            password: {
                placeHolder: 'Password',
                errorMessage: 'Password must be 8-30 characters and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character (e.g., @, #, $, %, ^, &, +, =, !).',
                validationFunction: isPasswordValid,
            },
        }),
        [form.email],
    );
    const handleChange = React.useCallback((text, field) => {
        setForm((prev) => ({
            ...prev,
            [field]: text,
        }));
    }, []);

    React.useEffect(()=>{
        const firstNameValidity = isNotEmpty(form.firstName);
        const lastNameValidity = isNotEmpty(form.lastName);
        const emailValidity = isEmailValid(form.email);
        const confirmEmailValidity = valuesEqual(form.email, form.confirmEmail);
        const phoneNumberValidity = isPhoneNumberValid(form.phoneNumber);
        const passwordValidity = isPasswordValid(form.password);
        if (
                (
                    firstNameValidity &&
                    lastNameValidity &&
                    emailValidity &&
                    confirmEmailValidity &&
                    phoneNumberValidity &&
                    passwordValidity
                )
            ){
                setActiveButton(true)
            }
        else setActiveButton(false)
    },[form])

    const handleContinueClick = React.useCallback(() => {
        const firstNameValidity = isNotEmpty(form.firstName);
        const lastNameValidity = isNotEmpty(form.lastName);
        const emailValidity = isEmailValid(form.email);
        const confirmEmailValidity = valuesEqual(form.email, form.confirmEmail);
        const phoneNumberValidity = isPhoneNumberValid(form.phoneNumber);
        const passwordValidity = isPasswordValid(form.password);

        

        if (
            !(
                firstNameValidity &&
                lastNameValidity &&
                emailValidity &&
                confirmEmailValidity &&
                phoneNumberValidity &&
                passwordValidity
            )
        ){
            
            return;
        }
          



        const data = {
            firsName:form.firstName,
            lastName:form.lastName,
            email:form.email,
            phoneNumber:form.phoneNumber,
            password:form.password
        }
        makeRequest("/api/customer/",'post',data).then((res)=>{
            dispatch(
                customerSetupActions.updateCustomer({
                    _id:res.data._id,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    phoneNumber: form.phoneNumber,
                }),
            );
            dispatch(
                customerSetupActions.updateSetupPeripherals({
                    currentPage: 'Steps',
                }),
            );
            navigation.replace('address');
            console.log(res.data)

        }).catch((err)=>{
            Alert.alert("Could not Register you !! Please try again")
        })
        //     // addinf the api here for creating the customer
      
        
        
    }, [form]);

    return (
        <Page showTopRightImage className={'justify-between'}>
            <CustomView className={'flex flex-row items-center gap-x-2 mt-10 mb-2'}>
                <Image source={require('../../../assets/images/icon-bolt.png')} />
                <Text className={'text-4xl font-bold text-primaryGreen'}>Yes!</Text>
            </CustomView>
            <Text className={'text-2xl font-semibold text-center text-primaryGreen'}>
                There are ReadiCharge installers in your area.{' '}
            </Text>
            <Text className={'text-xl text-center text-white my-5'}>Get started by creating an account.</Text>
            <CustomView className={'flex flex-col gap-y-3 w-full'}>
                <StyledInput
                    value={form.firstName}
                    name={'firstName'}
                    onChangeText={handleChange}
                    errorMessage={formFields.firstName.errorMessage}
                    placeholder={formFields.firstName.placeHolder}
                    validityFunction={formFields.firstName.validationFunction}
                />
                <StyledInput
                    value={form.lastName}
                    name={'lastName'}
                    onChangeText={handleChange}
                    errorMessage={formFields.lastName.errorMessage}
                    placeholder={formFields.lastName.placeHolder}
                    validityFunction={formFields.lastName.validationFunction}
                />
                <StyledInput
                    value={form.email}
                    name={'email'}
                    type={'emailAddress'}
                    onChangeText={handleChange}
                    errorMessage={formFields.email.errorMessage}
                    placeholder={formFields.email.placeHolder}
                    validityFunction={formFields.email.validationFunction}
                />
                <StyledInput
                    value={form.confirmEmail}
                    type={'emailAddress'}
                    name={'confirmEmail'}
                    onChangeText={handleChange}
                    errorMessage={formFields.confirmEmail.errorMessage}
                    placeholder={formFields.confirmEmail.placeHolder}
                    validityFunction={formFields.email.validationFunction}
                />
                <StyledInput
                    value={form.phoneNumber}
                    name={'phoneNumber'}
                    type={'telephoneNumber'}
                    keyboardType={'phone-pad'}
                    onChangeText={handleChange}
                    errorMessage={formFields.phoneNumber.errorMessage}
                    placeholder={formFields.phoneNumber.placeHolder}
                    validityFunction={formFields.phoneNumber.validationFunction}
                />
                <StyledInput
                    value={form.password}
                    name={'password'}
                    type={'password'}
                    onChangeText={handleChange}
                    errorMessage={formFields.password.errorMessage}
                    placeholder={formFields.password.placeHolder}
                    validityFunction={formFields.password.validationFunction}
                />
            </CustomView>
            <Text className={'text-white text-center my-2'}>
                By creating an account you agree to our Terms of Service and Privacy Policy
            </Text>
            <StyledButton
                onPress={handleContinueClick}
                title={'CONTINUE'}
                variant={'green'}
                filled={activeButton}
                className={'w-full mt-5'}
            />
        </Page>
    );
};

export default Register;