import React from 'react';
import { Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


import Page from '../../../components/common/Page';
import CustomView from '../../../components/common/CustomView';
import cQ from '../../../constants/charger-quantity';
import StyledDropdown from '../../../components/common/StyledDropdown';
import { useDispatch, useSelector } from 'react-redux';
import StyledButton from '../../../components/common/StyledButton';

import { customerSetupActions } from '../../../store/customer-setup-slice';

const ChargerQuantitySelection = () => {

    const persistedData = useSelector((state) => state.customerSetup.customer) 
    const navigation = useNavigation();
    const currentScreen = useSelector((state) => state.customerSetup.setupPeripherals.currentPage);
    const dispatch = useDispatch();
    const [activeButton , setActiveButton] = React.useState(false);

    const [chargerQuantity, setChargerQuantity] = React.useState(null);

    React.useEffect(() => {
        setChargerQuantity(persistedData.chargerQuantity);
    }, [persistedData]);

    React.useEffect(()=>{
        if(chargerQuantity) setActiveButton(true)
        else setActiveButton(false)
    },[chargerQuantity])

    const handleBackClick = React.useCallback(() => {
        navigation.navigate('infoPageQuestion');
    }, []);

    const handleContinueClick = React.useCallback(() => {
        if (chargerQuantity) {
            dispatch(customerSetupActions.updateCustomer({ chargerQuantity }));
            if (currentScreen === 'numberChargers') {
                dispatch(
                    customerSetupActions.updateSetupPeripherals({
                        currentPage: 'primaryDetails',
                    }),
                );
                dispatch(customerSetupActions.incrementProgress());
            }
            navigation.replace('primaryDetails');
        }
    
    }, [chargerQuantity]);

    return (
        <Page showTopRightImage className={'justify-between h-full min-h-[73vh]'}>
            <CustomView className={'flex flex-col gap-y-5 mt-6 w-full'}>
                <Text className={'text-xl font-semibold text-primaryGreen'}>Confirm your charger quantity.</Text>
                <Text className={'font-semibold text-white'}>How many chargers do you need to install?</Text>
                <StyledDropdown
                    value={chargerQuantity}
                    onChange={setChargerQuantity}
                    data={cQ}
                    name={'state'}
                    placeholder={'*Quantity'}
                />
                <StyledButton
                    onPress={() => console.log("Commercial projects")}
                    variant={'green'}
                    title={'COMMERCIAL PROJECTS'}
                />
            </CustomView>
            <CustomView className={'w-full flex flex-col gap-y-3'}>
                <StyledButton onPress={handleBackClick} className={'w-full'} variant={'green'} title={'BACK'} />
                <StyledButton
                    onPress={handleContinueClick}
                    className={'w-full'}
                    filled={activeButton}
                    variant={'green'}
                    title={'CONTINUE'}
                />
            </CustomView>
        </Page>
    );
};

export default ChargerQuantitySelection;