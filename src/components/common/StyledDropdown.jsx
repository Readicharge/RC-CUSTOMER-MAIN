import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';
import officialColors from '../../style/colors';



const viewStyles = StyleSheet.create({
    dropdown: {
        borderRadius: 5,
        borderStyle: 'solid',
        color: officialColors.white,
        borderWidth: 2,
        backgroundColor: '#ffffff30',
        borderColor: 'transparent',
        paddingHorizontal: 14,
        paddingVertical: 5,
        width: '100%',
        paddingStart: 14,
        alignSelf: 'center',
    },
});

const StyledDropdown= (props) => {
    const style = props.removeTopMargin
        ? { ...viewStyles.dropdown, ...props.style }
        : {
              ...viewStyles.dropdown,
              marginTop: 13,
              ...props.style,
          };

    return (
        <Dropdown
            style={style}
            data={props.data}
            // search
            selectedTextStyle={{ color: '#ffffff', fontSize: 14 }}
            placeholderStyle={{ color: officialColors.gray, fontSize: 14 }}
            maxHeight={250}
            labelField={'label'}
            valueField={'value'}
            placeholder={props.placeholder}
            searchPlaceholder="Search..."
            value={props.value?.value}
            onChange={(value) => props.onChange(value, props.name || '')}
        />
    );
};

export default StyledDropdown;