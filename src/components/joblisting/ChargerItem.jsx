import React from 'react';
import { Pressable, Text } from 'react-native';
import CustomView from '../common/CustomView';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';



const ChargerItem = ({ charger, index }) => {
    const [collapsed, setCollapsed] = React.useState(false);

    const toggleCollapsed = React.useCallback(() => setCollapsed((prev) => !prev), []);
    // console.log(charger.receivedBy);
    return (
        <Pressable
            onPress={toggleCollapsed}
            className={`flex flex-col border border-white rounded py-5 px-3 mx-2 mb-5 ${
                collapsed ? 'h-fit' : 'h-[65px]'
            } overflow-hidden`}
        >
            <CustomView className={'flex flex-row justify-between items-center'}>
                <Text className={'text-white'}>Charger {index}</Text>
                <CustomView className={`${collapsed && 'rotate-180'}`}>
                    <Entypo name="chevron-small-down" size={24} color="black" />
                </CustomView>
            </CustomView>
            <Text className={'text-white mt-5'}>
                <Text className={'font-semibold'}>Make/Model: </Text>
                {charger.model}
            </Text>
            <Text className={'text-white'}>
                <Text className={'font-semibold'}>Type: </Text>
                {charger.type}
            </Text>
            <Text className={'text-white'}>
                <Text className={'font-semibold'}>Charger Received By: </Text>
                {moment(new Date(charger.receivedBy)).format('MMMM DD, YYYY')}
            </Text>
            <Text className={'text-white mt-5'}>
                <Text className={'font-semibold'}>Existing Outlet: </Text>
                {charger.outlet}
            </Text>
            {charger.upgradeToNEMA && (
                <Text className={'text-white'}>
                    <Text className={'font-semibold'}>Upgraded to NEMA 14-50: </Text>Yes
                </Text>
            )}
            <Text className={'text-white mt-5'}>
                <Text className={'font-semibold'}>Charger Location: </Text>
                {charger.chargerLocation}
            </Text>
            <Text className={'text-white'}>
                <Text className={'font-semibold'}>Attached to home: </Text>
                {charger.attachedToHome ? 'Yes' : ' No'}
            </Text>
            <Text className={'text-white mt-5'}>
                <Text className={'font-semibold'}>Electrical Panel Location: </Text>
                {charger.electricalPanelLocation}
            </Text>
            <Text className={'text-white'}>
                <Text className={'font-semibold'}>Floor: </Text>
                {charger.floor}
            </Text>
            <Text className={'text-white mt-5'}>
                <Text className={'font-semibold'}>Interior wall finish: </Text>
                {charger.interiorWallFinish}
            </Text>
            <Text className={'text-white'}>
                <Text className={'font-semibold'}>Exterior wall finish: </Text>
                {charger.exteriorWallFinish}
            </Text>
            <Text className={'text-white'}>
                <Text className={'font-semibold'}>Wall Construction: </Text>
                {charger.wallConstruction}
            </Text>
            <Text className={'text-white mt-5'}>
                <Text className={'font-semibold'}>Electrical Panel Type: </Text>
                {charger.electricalPanelType}
            </Text>
            <Text className={'text-white'}>
                <Text className={'font-semibold'}>Panel Brand: </Text>
                {charger.panelBrand}
            </Text>
            <Text className={'text-white'}>
                <Text className={'font-semibold'}>Main Breaker Size: </Text>
                {charger.mainBreakerSize}
            </Text>
            <Text className={'text-white'}>
                <Text className={'font-semibold'}>&GreaterEqual; 2 Open Breakers: </Text>
                {charger.isMoreThan2BreakersOpen ? 'Yes' : 'No'}
            </Text>
            <Text className={'text-white'}>
                <Text className={'font-semibold'}>Recessed Panel: </Text>
                {charger.recessedPanel ? 'Yes' : 'No'}
            </Text>
            <Text className={'text-white mt-5'}>
                <Text className={'font-semibold'}>Distance from Panel to Charger: </Text>
                {charger.distanceFromPanel}
            </Text>
        </Pressable>
    );
};

export default ChargerItem;