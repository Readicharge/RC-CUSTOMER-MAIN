import React from 'react';
import CustomView from '../../../components/common/CustomView';
import { Image, Text } from 'react-native';
// import { isNotEmpty } from '../../helper/validation';
import StyledInput from '../../../components/common/StyledInput';
import StyledButton from '../../../components/common/StyledButton';

const errorMessages = {
    email: 'Please enter a valid email address',
    password: "Password can't be empty!",
};

const SignIn = () => {
    const [form, setForm] = React.useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = React.useState(false);

    const handleTextChange = React.useCallback((text, field) => {
        setForm((prev) => ({
            ...prev,
            [field]: text,
        }));
    }, []);

    const handleSignInClick = React.useCallback(() => {
        // const emailValidity = isNotEmpty(form.email);
        // const passwordValidity = isNotEmpty(form.password);

        // if (!emailValidity || !passwordValidity) return;

        setLoading(true);

        // TODO: Send request to backend to sign in user
    }, [form]);

    return (
        <CustomView className={'flex flex-col items-center bg-primaryBlue h-full px-10 pt-10 justify-center'}>
            <Image source={require('../../../assets/images/icon-bolt.png')} />
            <Text className={'text-4xl font-semibold text-primaryGreen text-center my-5'}>Welcome Back!</Text>
            <Text className={'text-lg font-semibold text-white text-center my-5'}>Log in to your account</Text>
            <CustomView className={'flex flex-col gap-y-3 w-full mb-4'}>
                <StyledInput
                    value={form.email}
                    onChangeText={handleTextChange}
                    placeholder={'Email'}
                    name={'email'}
                    errorMessage={errorMessages.email}
                    disabled={loading}
                    type={'emailAddress'}
                    // validityFunction={isNotEmpty}
                />
                <StyledInput
                    className={'mb-5'}
                    value={form.password}
                    type={'password'}
                    onChangeText={handleTextChange}
                    placeholder={'Password'}
                    name={'password'}
                    errorMessage={errorMessages.password}
                    disabled={loading}
                    // validityFunction={isNotEmpty}
                />
                <StyledButton
                    title={'CONTINUE'}
                    filled
                    className={'w-[90%] mx-auto mb-5'}
                    disabled={loading}
                    onPress={handleSignInClick}
                />
            </CustomView>
            {/*<Link to={{ screen: 'ForgotPassword' }}>*/}
            <Text className={'underline text-primaryGreen font-semibold'}>FORGOT YOUR PASSWORD?</Text>
            {/*</Link>*/}
        </CustomView>
    );
};

export default SignIn;