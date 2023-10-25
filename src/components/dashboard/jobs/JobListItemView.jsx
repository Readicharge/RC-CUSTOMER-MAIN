import React from 'react';
import CustomView from '../../common/CustomView';
import officialColors from '../../../style/colors';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';
import StyledButton from '../../common/StyledButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { getFormattedDate } from '../../../helper/utils';
import { makeRequest } from '../../../helper/http';



const JobListItemView = ({ jobRaw }) => {
    const navigation = useNavigation();
    const [job, setJob] = React.useState(jobRaw);
    const [collapsed, setCollapsed] = React.useState(false);

    const toggleCollapsed = React.useCallback(() => setCollapsed((prev) => !prev), []);

    const handleSeeJobTicketClick = React.useCallback(
        () => navigation.navigate('JobListing', { jobId: job.jobId, jobNumber: job.jobNumber }),
        [navigation, job],
    );



    return (
        <Pressable
            onPress={toggleCollapsed}
            className={`w-full flex flex-col bg-white border-2 border-primaryGreen rounded-lg mb-5 p-3 ${
                collapsed ? 'h-fit' : 'h-[100px]'
            } overflow-hidden`}
        >
            <CustomView className={'w-full items-center justify-between flex flex-row'}>
                <Text className={'text-sm text-primaryBlue mb-2'}>Job #{job.jobNumber}</Text>
                <CustomView className={`${collapsed && 'rotate-180'}`}>
                    <Entypo name="chevron-small-down" size={24} color="black" />
                </CustomView>
            </CustomView>
            <CustomView className={'flex flex-row items-start gap-x-5'}>
                <AntDesign style={{ marginTop: 10 }} name="calendar" size={24} color={officialColors.darkBlue} />
                <CustomView className={'flex flex-col gap-y-3'}>
                    <Text className={'font-semibold text-primaryBlue break-all w-[71vw] text-[16px]'}>
                        {getFormattedDate(job.date, job.timeFrom, job.timeTo)}
                    </Text>
                    <CustomView className={'flex flex-row justify-between items-center'}>
                        <Text className={'text-primaryBlue'}>{job.customerName}</Text>
                        {job.status && <AntDesign name="message1" size={24} color={officialColors.green} />}
                    </CustomView>
                    <CustomView className={'flex flex-row justify-between items-center'}>
                        <Text className={'text-primaryBlue'}>{job.customerAddress}</Text>
                        <Entypo name="location-pin" size={24} color={officialColors.green} />
                    </CustomView>
                </CustomView>
            </CustomView>
            <StyledButton
                onPress={handleSeeJobTicketClick}
                className={'w-[85%] mx-auto mt-3'}
                title={job.status ? 'SEE JOB TICKET' : 'SEE DETAILS'}
                filled
                variant={'green'}
            />
          
        </Pressable>
    );
};

export default JobListItemView;