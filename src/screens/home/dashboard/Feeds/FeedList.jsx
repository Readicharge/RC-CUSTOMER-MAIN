// Importing th Core modules 
import React from 'react';
import { FlatList, Text } from 'react-native';


// Importing the constants 
import feeds from '../../../../constants/feeds';

// Importing the Lottie Animation Module
import LottieView from 'lottie-react-native';

// Importing the Custom View Component 
import CustomView from '../../../../components/common/CustomView';
import FeedItem from '../../../../components/dashboard/feeds/FeedItem';



// Declaring the Component 
const FeedsList= ({ navigation }) => {
    // Getting the feeds state initialized to be empty in the begining 
    const [feeds, setFeeds] = React.useState([]);

    React.useEffect(() => {
        const timeout = setTimeout(() => setFeeds(feeds), 1000);
        return () => clearTimeout(timeout);
    }, []);

    const handleFeedItemClick = React.useCallback(
        (feedId) => {
            // Set selected feed as read
            setFeeds((prevFeeds) => {
                const index = prevFeeds.findIndex((feed) => feed.id === feedId);
                if (index !== -1) {
                    prevFeeds[index].seen = true;
                }
                return [...prevFeeds];
            });
            navigation.navigate('FeedDetails', { feed: feeds.filter((f) => f.id === feedId)[0] });
        },
        [feeds],
    );

    return (
        <FlatList
            ListHeaderComponent={
                <CustomView className={'w-full flex flex-col pt-5 gap-y-5'}>
                    <Text className={'text-primaryBlue text-xl font-semibold ml-5'}>Activity Feed</Text>
                    <CustomView className={'bg-primaryBlue w-full h-[130px] p-5'}>
                        {feeds.length > 0 ? (
                            <Text className={'text-white'}>You have {feeds.length} activities.</Text>
                        ) : (
                            <Text className={'text-white'}>You have no activities yet</Text>
                        )}
                    </CustomView>
                    {feeds.length === 0 && (
                        <CustomView
                            className={'bg-white h-[350px] w-[90vw] mx-auto border border-primaryGreen -translate-y-20'}
                        >
                            <LottieView
                                autoPlay={true}
                                loop={true}
                                source={require('../../../../assets/animations/job_details.json')}
                            />
                        </CustomView>
                    )}
                </CustomView>
            }
            className={'h-full'}
            data={feeds}
            renderItem={({ item }) => (
                <CustomView className={'px-5 -translate-y-20'}>
                    <FeedItem onPress={handleFeedItemClick} feed={item} />
                </CustomView>
            )}
        />
    );
};

export default FeedsList;