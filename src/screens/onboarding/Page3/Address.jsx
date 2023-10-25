import React from 'react';
import { Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


// Importing the common components

import Page from '../../../components/common/Page';
import CustomView from '../../../components/common/CustomView';
import StyledInput from '../../../components/common/StyledInput';
import StyledButton from '../../../components/common/StyledButton';
import StyledDropdown from '../../../components/common/StyledDropdown';


// Constats
import yesNo from '../../../constants/yes-no';
import states from '../../../constants/states';


//  To be done
import { isNotEmpty } from '../../../helper/Validation';
import { customerSetupActions } from '../../../store/customer-setup-slice';
import { makeRequest } from '../../../helper/http';

const errorMessages = {
    addressLine1: 'Please enter a valid address',
    city: 'Please enter a valid city',
    state: 'Please enter a valid state',
};



const yearsRange = Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, index) => ({
    id: index,
    label: (new Date().getFullYear() - index).toString(),
    value: (new Date().getFullYear() - index).toString(),
}));

yearsRange.push({
    id: 'pre-1900',
    label: 'pre-1900',
    value: '1890',
});


const CustomerAddress = () => {

    const dispatch = useDispatch();
    const [activeButton , setActiveButton] = React.useState(false);
    const persistedData = useSelector((state) => state.customerSetup.customer);
    const currentScreen = useSelector((state) => state.customerSetup.setupPeripherals.currentPage);
    const navigation = useNavigation();

    const [form, setForm] = React.useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: null,
        zipCode: '',
        residenceBuilt: '',
        prebuildConditionPanelUpgraded: yesNo[0],
        residenceOwn: yesNo[0],
        proceedWithNEMA14_50: yesNo[0]
    });

    React.useEffect(
        () =>
            setForm({
                addressLine1: persistedData.addressLine1,
                addressLine2: persistedData.addressLine2,
                city: persistedData.city,
                state: persistedData.state,
                zipCode: persistedData.zipCode,
                residenceBuilt: persistedData.residenceBuilt,
                prebuildConditionPanelUpgraded: persistedData.prebuildConditionPanelUpgraded,
                residenceOwn: persistedData.residenceOwn,
                proceedWithNEMA14_50: persistedData.proceedWithNEMA14_50
            }),
        [persistedData],
    );

    const handleChange = React.useCallback((value, field) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);


    React.useEffect(()=>{
        const addressLine1Valid = isNotEmpty(form.addressLine1);
        const cityValid = isNotEmpty(form.city);
        const stateValid = form.state !== null;
        if (addressLine1Valid && cityValid && stateValid) setActiveButton(true)
        else setActiveButton(false)
    },[form])

    const handleContinueClick = React.useCallback(() => {
        const addressLine1Valid = isNotEmpty(form.addressLine1);
        const cityValid = isNotEmpty(form.city);
        const stateValid = form.state !== null;

        const data = {
            addressLine1:form.addressLine1,
            addressLine2:form.addressLine2,
            city:form.city,
            state:form.state?.value,
            zip:form.zipCode
        }


        if (addressLine1Valid && cityValid && stateValid) {
            console.log(form.state);

            makeRequest(`/api/customer/${persistedData._id}`,'put',data).then((res)=>{
                dispatch(
                    customerSetupActions.updateCustomer({
                        addressLine1: form.addressLine1,
                        addressLine2: form.addressLine2,
                        city: form.city,
                        state: form.state,
                        zipCode: form.zipCode,
                        residenceBuilt : form.residenceBuilt,
                        prebuildConditionPanelUpgraded : form.prebuildConditionPanelUpgraded,
                        residenceOwn : form.residenceOwn,
                        proceedWithNEMA14_50 : form.proceedWithNEMA14_50
                    }),
                );
             
            }).catch((error)=>{
                console.log(error)
                Alert.alert("Someting unexpected happended !! Please try again ")
            })

        }
if(persistedData.userPreference==='service')
       {
        dispatch(
            customerSetupActions.updateSetupPeripherals({
                currentPage: 'ServiceInfo',
            }),
        );
        navigation.navigate('ServiceInfo');
       }
       else{
       dispatch(
        customerSetupActions.updateSetupPeripherals({
            currentPage: 'infoPageQuestion',
        }),
    );
    navigation.navigate('infoPageQuestion');
}
    }, [form]);

    return (
        <Page className={'justify-between items-start mt-6 min-h-[85vh]'}>
            <CustomView className={'w-full flex flex-col gap-y-3 mb-10'}>
                <Text className={'text-2xl text-center text-primaryGreen mb-5'}>Tell us about your residence.</Text>
                <Text className={'text-lg text-left text-white mb-1'}>Address for installation:</Text>
                <StyledInput
                    value={form.addressLine1}
                    name={'addressLine1'}
                    type={'streetAddressLine1'}
                    placeholder={'*Address Line 1'}
                    errorMessage={errorMessages.addressLine1}
                    // validityFunction={isNotEmpty}
                    onChangeText={handleChange}
                />
                <StyledInput
                    value={form.addressLine2}
                    name={'addressLine2'}
                    type={'streetAddressLine2'}
                    placeholder={'Address Line 2'}
                    onChangeText={handleChange}
                />
                <StyledInput
                    value={form.city}
                    name={'city'}
                    type={'addressCity'}
                    placeholder={'*City'}
                    errorMessage={errorMessages.city}
                    // validityFunction={isNotEmpty}
                    onChangeText={handleChange}
                />
                <StyledDropdown
                    value={form.state}
                    onChange={handleChange}
                    data={states}
                    name={'state'}
                    placeholder={'*State'}
                />
                <StyledInput
                    value={form.zipCode}
                    name={'zip'}
                    type={'postalCode'}
                    disabled
                    onChangeText={handleChange}
                />
            </CustomView>
            <CustomView className={'w-full flex flex-col gap-y-3 mb-10'}>
                <Text className={'text-lg text-left text-white mb-1'}>Residential Questions:</Text>
                <>
                    <Text className={'text-sm text-white mt-2 mt-2'}>
                    When was your residence built?
                    </Text>
                    <StyledDropdown
                        data={yearsRange}
                        value={form.residenceBuilt} // This should match the selected year's object
                        onChange={(value) => handleChange(value, 'residenceBuilt')}
                        name={'residenceBuilt'}
                        placeholder={''}
                    />
                </>
                {parseInt(form.residenceBuilt?.value) < 1990 && (
                    <>
                        <Text className={'text-sm text-white mt-2 mt-2'}>
                            Since your home is built prior to 1990 , has the electric panel upgraded in the last 10 years ?
                        </Text>
                        <StyledDropdown
                            data={yesNo}
                            placeholder={''}
                            name={'prebuildConditionPanelUpgraded'}
                            value={form.prebuildConditionPanelUpgraded}
                            onChange={(value, field) => handleChange(value, field)}
                        />
                    </>
                )}
                <>
                    <Text className={'text-sm text-white mt-2 mt-2'}>
                        Do you own this residence ?
                    </Text>
                    <StyledDropdown
                        data={yesNo}
                        name={'residenceOwn'}
                        placeholder={''}
                        value={form.residenceOwn}
                        onChange={(value, field) => handleChange(value, field)}
                    />
                </>
                {form.residenceOwn?.value === 'false' && persistedData.userPreference!=='service' && (
                    <>
                        <Text className={'text-sm text-white mt-2  mt-2'}>
                            Do you want to proceed with NEMA 14-50 for portability ?
                        </Text>
                        <StyledDropdown
                            data={yesNo}
                            placeholder={''}
                            name={'proceedWithNEMA14_50'}
                            value={form.proceedWithNEMA14_50}
                            onChange={(value, field) => handleChange(value, field)}
                        />
                    </>
                )}
            </CustomView>
            <StyledButton
                onPress={handleContinueClick}
                className={'w-full'}
                filled={activeButton}
                // disabled={nextDisabled}
                title={'CONTINUE'}
            />
        </Page>
    );
};

export default CustomerAddress;