import React from 'react';
import { View } from 'react-native';



const CustomView = ({ style, className, children }) => {
    return (
        <View style={style} className={className}>
            {children}
        </View>
    );
};

export default CustomView;