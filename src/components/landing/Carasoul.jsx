import React from 'react';
import LottieView from 'lottie-react-native';
import { AppState, AppStateStatus, Text, View, StyleSheet } from 'react-native';

import carousel from '../../constants/carousel';
import CustomView from '../common/CustomView';

const Carasoul = (props) => {
    const lottieRef = React.useRef < LottieView > (null);

    React.useEffect(() => {
        const listener = AppState.addEventListener('change', handleAppStateChange);
        return () => listener.remove();
    }, []);

    const handleAppStateChange = (nextAppState) => {
        nextAppState === 'active' && lottieRef.current?.resume();
    };

    return (
        <CustomView className={'flex justify-center w-screen'}>
            <CustomView className={'bg-white rounded-lg w-[75vw] h-[42vh] justify-between p-3'}>
                <CustomView className={'flex-1 mt-5'}>
                    <LottieView autoPlay={true} loop={true} useRef={lottieRef} source={props.card.src} />
                </CustomView>
                <CustomView className={'flex flex-col w-full gap-y-3 items-center'}>
                    <Text className={'text-xl text-center'}>{carousel.nextBlurb[props.card.id]}</Text>
                    <Text className={'text-center text-[14px]'}>{carousel.nextBlurbParagraph[props.card.id]}</Text>
                </CustomView>
            </CustomView>
        </CustomView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "flex-start",
        backgroundColor: "white"
    },
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: '50%', // Adjust width to your preference (e.g., '80%')
        minHeight: '50%',
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    animationContainer: {
        flex: 1,
        marginTop: 20,
        // Additional animation styles
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        color: 'black', // Customize text color
    },
    paragraph: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black', // Customize text color
    },
});

export default Carasoul;
