import React from 'react';

// Core Import
import { Image, Text } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';

// Import the Redux state
import { useSelector } from 'react-redux';

// Import the animations
import jsonBolt from "../../../assets/animations/bolt.json"
import jsonConnected from "../../../assets/animations/connect.json"
import jsonGetCertified from "../../../assets/animations/get_certified.json"
import jsonInstallerSchedule from "../../../assets/animations/schedule-customer.json"
import jsonJobDetails from "../../../assets/animations/buy.json"
import jsonCoin from "../../../assets/animations/schedule-install.json"



// Import from the common folder
import CustomView from '../../../components/common/CustomView';
import StyledButton from '../../../components/common/StyledButton';
import Page from '../../../components/common/Page';

// Import from the Landing folder
import LandingPageCarouselPagination from '../../../components/landing/LandingViewPagination';
import Carasoul from '../../../components/landing/Carasoul';



const cardModel = [
    { id: 0, src: jsonBolt },
    { id: 1, src: jsonConnected },
    { id: 2, src: jsonGetCertified },
    { id: 3, src: jsonInstallerSchedule },
    { id: 4, src: jsonJobDetails },
    { id: 5, src: jsonCoin },
];








const Landing = () => {

    // Pulling the data for the current page from the redux state
    const currentPage = useSelector(
        (state) => state.customerSetup.setupPeripherals.currentPage,
    )
    
    // Using the navigation 
    const navigation = useNavigation()

    React.useEffect(() => {
        // Checking : if the current page is homepage or not
        console.log(cardModel)
    }, []);




    // Check if the user has already made some progress or not, then redirect to the
    // last screen the user worked on
    const handleGetStarted = React.useCallback(
        () => (currentPage ? navigation.navigate(currentPage) : navigation.navigate('service')),
        
        [currentPage],
    );

    return (
        <Page showTopRightImage className={'items-center flex justify-center h-full'}>
            <CustomView className={'flex flex-col gap-y-2 h-fit items-center mt-10  w-[75vw]'}>
                <Image source={require('../../../assets/images/logo-installation.jpeg')} />
                <CustomView className={' flex items-center justify-center h-[440px]'}>
                    <SwiperFlatList
                        autoplay
                        autoplayDelay={3}
                        autoplayLoop
                        index={2}
                        autoplayLoopKeepAnimation={false}
                        disableGesture={true}
                        showPagination
                        PaginationComponent={LandingPageCarouselPagination}
                        data={cardModel}
                        renderItem={({ item }) => <Carasoul card={item} />}
                        className={''}
                    />
                </CustomView>
                <StyledButton
                    variant={'green'}
                    className={'w-full'}
                    title={'GET STARTED'}
                    filled
                    onPress={handleGetStarted}
                />
                <Link to={{ screen: 'SignIn' }}>
                    <Text className={'text-primaryGreen'}>I ALREADY HAVE AN ACCOUNT</Text>
                </Link>
            </CustomView>
        </Page>
    );
};

export default Landing;