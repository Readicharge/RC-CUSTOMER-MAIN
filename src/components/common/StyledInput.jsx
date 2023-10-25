import React from 'react';
import { Image, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';

import CustomView from './CustomView';
import officialColors from '../../style/colors';


const StyledInput = (props) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [isValid, setIsValid] = React.useState(true);
    const [initialRender, setInitialRender] = React.useState(true);

    React.useEffect(() => {
        if (!initialRender && props.validityFunction) {
            setIsValid(props.validityFunction(props.value));
        } else {
            setInitialRender(false);
        }
    }, [props.value]);

    const togglePasswordVisible = React.useCallback(() => setPasswordVisible((prev) => !prev), []);

    return (
        <CustomView style={props.style} className={`${props.className} w-full flex flex-col gap-y-1`}>
            {props.errorMessage && !isValid && (
                <Text className={`font-[16px] text-rose-500 pl-[1.5px] flex-wrap w-full`}>{props.errorMessage}</Text>
            )}
            <CustomView
                className={`flex flex-row ${props.filled ? 'bg-white' : 'bg-white/20'} ${
                    !props.hideBorders && 'border-2'
                } rounded-[5px] border-transparent ${isFocused && 'border-primaryGreen'} ${
                    props.errorMessage && !isValid && 'border-rose-500'
                } items-center px-4 py-2 ${props.disabled && 'bg-gray-600/60'}`}
            >
                <TextInput
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={props.value}
                    onChangeText={(text) => props.onChangeText && props.onChangeText(text, props.name)}
                    textContentType={props.type ? props.type : 'none'}
                    returnKeyType="next"
                    keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                    placeholderTextColor={officialColors.gray}
                    style={{
                        textAlignVertical: 'top',
                    }}
                    placeholder={props.placeholder}
                    secureTextEntry={props.type === 'password' && !passwordVisible}
                    className={`border-0 outline-none flex-grow ${props.isMultiline && 'min-h-[200px]'} ${
                        props.disabled ? 'text-gray-400' : 'text-gray-200'
                    }`}
                    editable={!props.disabled}
                    multiline={props.isMultiline}
                />
                {props.type === 'password' && (
                    <TouchableOpacity onPress={togglePasswordVisible}>
                        {passwordVisible ? (
                            <Image
                                source={require('../../assets/images/icon-visible-off.png')}
                                style={{ width: 26, height: 20 }}
                            />
                        ) : (
                            <Image
                                source={require('../../assets/images/icon-visible-on.png')}
                                style={{ width: 26, height: 20 }}
                            />
                        )}
                    </TouchableOpacity>
                )}
            </CustomView>
        </CustomView>
    );
};

export default StyledInput;