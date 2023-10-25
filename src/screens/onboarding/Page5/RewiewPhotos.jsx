import React from 'react';
import { Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


import Page from '../../../components/common/Page';
import CustomView from '../../../components/common/CustomView';
import StyledButton from '../../../components/common/StyledButton';
import StyledInput from '../../../components/common/StyledInput';


// import { customerSetupActions } from '../../../store/customer-setup-slice';

const points = [
    'Your charger (if pre-purchased)',
    'Installation location site, including surrounding area',
    'Open electrical panel, main breaker, and panel door label.',
];

const ReviewPhotos = () => {
    // const { purchasedChargerDetails, newChargerDetails } = useSelector((store) => store.customerSetup);
    const navigation = useNavigation();
    // const dispatch = useDispatch();
    // const currentScreen = useSelector((state) => state.customerSetup.setupPeripherals.currentPage);
    // const { commentsOnProject } = useSelector((store) => store.customerSetup);

    const [photos, setPhotos] = React.useState([]);
    // const [comment, setComment] = React.useState(commentsOnProject || '');

    // React.useEffect(() => {
    //     Object.values(purchasedChargerDetails).forEach(({ imageUris }) => {
    //         setPhotos((prev) => [...prev, ...imageUris]);
    //     });
    //     Object.values(newChargerDetails).forEach(({ locationUris }) => {
    //         setPhotos((prev) => [...prev, ...locationUris]);
    //     });
    // }, []);

    // const handleBackClick = React.useCallback(() => {
    //     navigation.navigate('ProjectQuote');
    // }, [navigation]);

    const handleBackClick =  React.useCallback(() => {
     
        navigation.replace('quotation');
    }, []);

    const handleContinueClick = React.useCallback(() => {
        // dispatch(customerSetupActions.updateCommentsOnProject(comment));
        // if (currentScreen == 'ReviewPhotos') {
        //     dispatch(customerSetupActions.incrementProgress());
        //     dispatch(
        //         customerSetupActions.updateSetupPeripherals({
        //             currentPage: 'Blueprint',
        //         }),
        //     );
        // }
        navigation.replace('magicScan');
    }, []);

    return (
        <Page  showTopRightImage className={'gap-y-5'}>
            <Text className={'text-xl text-primaryGreen font-semibold'}>Review your photos</Text>
            <Text className={'text-lg text-white'}>
                Your photos help your installer understand the project and arrive prepared. Please be sure your photos
                are well lit and clearly show:
            </Text>
            <CustomView className={'flex flex-col'}>
                {points.map((p, index) => (
                    <CustomView key={index} className={'flex flex-row gap-x-1'}>
                        <CustomView className={'w-[5px] h-[5px] rounded-full bg-white mt-2'} />
                        <Text className={'text-white'}>{p}</Text>
                    </CustomView>
                ))}
            </CustomView>
            <CustomView className={'flex flex-row w-full flex-wrap gap-2 my-5'}>
                {photos.map((uri, index) => (
                    <Image key={index} source={{ uri }} className={'w-[30%] h-[100px] rounded-lg'} />
                ))}
            </CustomView>
            <StyledInput placeholder={'Comments'} value={"Enter your Comments here"} onChangeText={()=>console.log("Set Comment")} className={'w-full mt-5'} />
            <StyledButton className={'w-full'} onPress={handleBackClick} title={'BACK'} />
            <StyledButton onPress={handleContinueClick} className={'w-full mt-3'} filled={true} title={'CONTINUE'} />
        </Page>
    );
};

export default ReviewPhotos;