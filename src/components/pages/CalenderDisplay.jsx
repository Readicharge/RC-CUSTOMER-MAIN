// Core Modules 
import React from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';

// Importing the Styles and assets 
import { AntDesign } from '@expo/vector-icons';
import officialColors from '../../style/colors';


// Importing the Custom Modules 
import CustomView from '../common/CustomView';
import StyledButton from '../common/StyledButton';
import { useSelector } from 'react-redux';


// Import the Helper Modules
import { makeRequest } from '../../helper/http';




const disabledDayProps = {}
const bookedDaysProps = {
    selected: true,
    selectedTextColor: officialColors.darkBlue,
    selectedColor:officialColors.green,
    marked:true
    // selectedDayBackgroundColor:officialColors.white,
    // disabled: true,
}
const allDayProps = {
    selected: true,
    selectedTextColor: officialColors.white,
    disabled: true,
}

const CalendarDisplay= (props) => {

    // Setting up the Default State for the time per day and booked dates 
    const [timeSpan, setTimeSpan] = React.useState({});
    const [bookedDates, setBookedDates] = React.useState(new Set());


    // Taking some example test data 

    React.useEffect(() => {
        const sampleBookedDates = new Set([
            dayjs().add(12, 'day').format('YYYY-MM-DD'),
            dayjs().add(11, 'day').format('YYYY-MM-DD'),
            dayjs().add(10, 'day').format('YYYY-MM-DD'),
        ]);
        setBookedDates(sampleBookedDates);
    }, []);


    React.useEffect(() => {
        let daysList = {};

        for (const currentDay = new Date();
             currentDay <= new Date(dayjs().add(3, 'month').toString());
             currentDay.setDate(currentDay.getDate() + 1)
        ) {
            const dateString = dayjs(currentDay).format('YYYY-MM-DD');

            const isDisabled = dayjs(currentDay) < dayjs().add(10, 'day');

            let p = allDayProps;

            if (bookedDates.has(dateString)) {
                p = bookedDaysProps;
            } else if (isDisabled) {
                p = disabledDayProps;
            }

            daysList[dateString] = p;
        }
        setTimeSpan(daysList);
    }, [bookedDates]);



    // Setting up the month to 3 
    const [currentMonth, setCurrentMonth] = React.useState(dayjs().add(1, 'month').month());
    return (
        <ScrollView>
            <CustomView className={'flex flex-col pt-10 px-10 gap-y-5'}>
                {props.title ? (
                    <Text className={'text-xl text-center text-primaryBlue'}>{props.title}</Text>
                ) : (
                    <CustomView className={'flex flex-row gap-x-5 items-center justify-center w-[90%] mx-auto'}>
                        <Text className={'text-xl text-center text-lime-500'}>
                            Tap on a day to adjust your hours of availability
                        </Text>
                        <Pressable>
                            <AntDesign name="questioncircle" size={24} color={officialColors.green} />
                        </Pressable>
                    </CustomView>
                )}
                <Calendar
                    current={new Date().toString()}
                    markedDates={timeSpan}
                    maxDate={dayjs().add(3, 'month').toString()}
                    onDayPress={(day) => {
                        props.onCalendarDayPress(day.dateString);
                    }}
                    monthFormat={'MMMM yy'}
                    disableMonthChange={true}
                    firstDay={1}
                    onMonthChange={(month) => {
                        setCurrentMonth(month.month);
                    }}
                    minDate={dayjs().add(2,'day').toString()}
                    disableArrowLeft={currentMonth === dayjs().add(1, 'month').month()}
                    disableArrowRight={currentMonth === dayjs().add(3, 'month').month()}
                    disableAllTouchEventsForDisabledDays={true}
                    hideExtraDays={true}
                    style={{
                        backgroundColor: officialColors.darkBlue
                    }}


                    theme={{
                        textDayStyle: {
                            color: officialColors.white
                        },
                        
                        textMonthFontSize: 20,
                        textMonthFontWeight: '400',
                        calendarBackground: 'transparent',
                        monthTextColor: officialColors.green,
                        // backgroundColor: officialColors.darkBlue,
                        selectedDayBackgroundColor: officialColors.darkBlue,
                        arrowColor: officialColors.green,
                        todayTextColor: officialColors.yellow,
                    }}
                />

                {props.hideBackButton && (
                    <StyledButton
                        onPress={props.onBackClick}
                        className={'w-full'}
                        variant={'green'}
                        title={'BACK'}
                    />
                )}
               
            </CustomView>
        </ScrollView>
    );

};

export default CalendarDisplay;

