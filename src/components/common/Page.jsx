import React from 'react';
import { Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import CustomView from './CustomView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const Page = (props) => {
    return (
        <KeyboardAwareScrollView className={'h-screen bg-primaryBlue w-screen'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <CustomView
                    style={props.style}
                    className={`items-center w-full flex flex-col min-h-[80vh] h-full px-10 pb-24 pt-10 ${props.className}`}
                >
                    {props.showTopRightImage && (
                        <Image
                            source={require('../../assets/images/top_right_corner.png')}
                            className={'absolute top-0 right-0'}
                            style={{ width: 116.973, height: 111.271 }}
                        />
                    )}
                    {props.children}
                </CustomView>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

export default Page;