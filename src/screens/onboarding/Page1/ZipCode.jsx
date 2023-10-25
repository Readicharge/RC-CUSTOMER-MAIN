import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


import { customerSetupActions } from '../../../store/customer-setup-slice';
import { useDispatch } from 'react-redux';


import Page from '../../../components/common/Page';
import CustomView from '../../../components/common/CustomView';
import StyledInput from '../../../components/common/StyledInput';
import StyledButton from '../../../components/common/StyledButton';

import { validZip } from '../../../helper/Validation';

const ZipCode = () => {
    const [zipCode, setZipCode] = React.useState('');
    const [activeButton , setActiveButton] = React.useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    React.useEffect(()=>{
        if(validZip(zipCode)) setActiveButton(true)
        else setActiveButton(false)
    },[zipCode])

    const handleContinueClick = React.useCallback(() => {
        if (!validZip(zipCode)) {
            return;
        }

        dispatch(customerSetupActions.updateCustomer({ zipCode }));
        // adding the api to find the installer in the particular zip code
        navigation.replace('register');
    }, [zipCode]);

    return (
        <Page showTopRightImage className={'justify-between'}>
            <CustomView className={'flex flex-col justify-center items-center w-full mt-20'}>
                <Text className={'text-xl font-semibold text-primaryGreen text-center mb-10'}>
                    Enter your ZIPCODE to find out if there are ReadiCharge installers in your area:
                </Text>
                <StyledInput
                    errorMessage={'Please enter a valid ZIPCODE'}
                    validityFunction={validZip}
                    keyboardType={'numeric'}
                    value={zipCode}
                    onChangeText={setZipCode}
                    placeholder={'ZIPCODE'}
                />
                <StyledButton onPress={handleContinueClick} className={'mt-5 w-full'} title={'NEXT'} filled={activeButton} />
            </CustomView>
            <StyledButton onPress={handleContinueClick} className={'mt-5 w-full'} title={'COMMERCIAL PROJECTS'} />
        </Page>
    );
};

export default ZipCode;