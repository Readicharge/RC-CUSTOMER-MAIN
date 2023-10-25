import {Platform, StyleSheet} from 'react-native'
import officialColors from './colors'

export default StyleSheet.create({
    header: {
        fontFamily: 'Montserrat-SemiBold',
        textTransform: 'uppercase',
        color: officialColors.white,
    },

    splashH1: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 24,
        color: officialColors.darkBlue,
    },

    splashSubheading: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: officialColors.darkBlue,
    },

    standardText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: officialColors.darkBlue,
        textAlign: 'center',
        lineHeight: 30,
        marginLeft: 10,
    },

    standardServiceText: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: officialColors.darkBlue,
        lineHeight: 20,
        marginLeft: 25,
    },

    ratingModalFAQ: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: officialColors.darkBlue,
        lineHeight: 20,
        textTransform: 'capitalize',
        textAlign: 'left',
    },

    ratingModalText: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: officialColors.darkBlue,
        lineHeight: 20,
        textTransform: 'uppercase',
        textAlign: 'left',
    },

    priceText: {
        fontFamily: 'Lato-Regular',
        fontSize: 30,
        color: officialColors.darkBlue,
        textAlign: 'center',
        lineHeight: 30,
    },

    headingOne: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 40,
        color: officialColors.darkBlue,
    },

    headingOneGreen: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 40,
        color: officialColors.green,
    },

    headingOneWhite: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 40,
        color: officialColors.white,
    },

    subheading: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: officialColors.darkBlue,
    },

    smallBody: {
        fontFamily: 'Lato-Regular',
        textAlign: 'center',
        fontSize: 16,
    },

    smallBodyLeft: {
        fontFamily: 'Lato-Regular',
        textAlign: 'left',
        fontSize: 14,
    },

    mediumBodyLeft: {
        fontFamily: 'Lato-Regular',
        textAlign: 'left',
        fontSize: 17,
    },

    smallBodyServices: {
        fontFamily: 'Lato-Regular',
        color: officialColors.darkBlue,
        textAlign: 'left',
        fontSize: 16,
    },

    smallBodyBold: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: officialColors.darkBlue,
        textAlign: 'left',
    },

    largeBody: {
        fontSize: Platform.OS === 'ios' ? 17 : 18,
        fontFamily: 'Lato-Regular',
        textAlign: 'left',
        color: officialColors.darkBlue,
    },

    largeBodyUppercase: {
        fontSize: Platform.OS === 'ios' ? 17 : 18,
        fontFamily: 'Lato-Regular',
        textAlign: 'left',
        color: officialColors.darkBlue,
        textTransform: 'uppercase',
    },

    largeLink: {
        textAlign: 'center',
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: officialColors.darkBlue,
        textTransform: 'uppercase',
    },

    largeBlueButton: {
        textAlign: 'center',
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: officialColors.white,
        textTransform: 'uppercase',
    },

    largeWhiteButton: {
        textAlign: 'center',
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: officialColors.darkBlue,
        textTransform: 'uppercase',
    },

    checkboxLabel: {
        // fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: officialColors.darkBlue,
    },

    rateValue: {
        textAlign: 'center',
        fontFamily: 'Lato-Regular',
        fontSize: 60,
        color: officialColors.green,
        textTransform: 'uppercase',
    },

    label: {
        fontFamily: 'Lato-Bold',
        fontSize: 15,
        color: officialColors.darkBlue,
    },

    labelGray: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: officialColors.gray,
    },

    checkboxHeaderLabel: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: officialColors.darkBlue,
    },

    characterCounter: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: officialColors.darkBlue,
    },

    service_policy_link: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: officialColors.darkBlue,
        lineHeight: 20,
    },

    dateInputText: {
        color: officialColors.darkBlue,
        textAlign: 'center',
        fontSize: 18,
    },
})