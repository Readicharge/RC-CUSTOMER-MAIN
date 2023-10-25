// Imporitng the Core modules
import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, Pressable, Text, View } from 'react-native';

// Importing the Lottie animations
import LottieView from 'lottie-react-native';

import CustomView from '../../../components/common/CustomView';
import JobListItemView from '../../../components/dashboard/jobs/JobListItemView';
import { makeRequest } from '../../../helper/http';
import { parseJobData } from '../../../helper/utils';

const Jobs = () => {
    const [upcomingJobs, setUpcomingJobs] = React.useState([]);
    const [completedJobs, setCompletedJobs] = React.useState([]);
    const [showUpcomingJobs, setShowUpcomingJobs] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(true);

    const customerId = "64f2a5c82ae5de75a954a578"

    const toggleShowUpcomingJobs = React.useCallback(() => setShowUpcomingJobs((prev) => !prev), []);

    const fetchJobs = React.useCallback(() => {
        setRefreshing(true);
        setCompletedJobs([]);
        setUpcomingJobs([]);
        makeRequest(`/api/booking/customer/${customerId}`, 'get')
            .then((res) => {
                console.log(res.data);
                const jobs = res.data;
                let upcomingNumber = 0,
                    pastNumber = 0;
                jobs.forEach((j) => {
                    const newJob = parseJobData(j);
                    if (newJob.status === "LIVE") {
                        newJob.jobNumber = ++pastNumber;
                        setUpcomingJobs((prev) => [...prev, newJob]);
                        console.log(upcomingJobs.length);
                    } else {
                        newJob.jobNumber = ++upcomingNumber;
                        setCompletedJobs((prev) => [...prev, newJob]);
                        console.log(completedJobs.length);
                    }
                });
            })
            .catch((err) => console.log(err))
            .finally(() => setRefreshing(false));
    }, []);

    React.useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    return (
        <FlatList
            ListHeaderComponent={
                <CustomView className={'w-full flex flex-col pt-5 gap-y-5'}>
                    <Pressable
                        className={'flex flex-row justify-between items-center px-5'}
                        onPress={toggleShowUpcomingJobs}
                    >
                        <Text className={'text-primaryBlue text-xl font-semibold'}>Job Queue</Text>
                        <CustomView className={'flex flex-row gap-x-3 items-center relative'}>
                            <Text className={'text-sm text-primaryBlue '}>
                                {showUpcomingJobs ? 'UPCOMING' : 'PAST JOBS'}
                            </Text>
                            <View
                                className={`w-[5px] h-[5px] ${showUpcomingJobs ? 'bg-primaryBlue' : 'bg-primaryBlue/50'
                                    } rounded-full`}
                            />
                            <View
                                className={`w-[5px] h-[5px] ${!showUpcomingJobs ? 'bg-primaryBlue' : 'bg-primaryBlue/50'
                                    } rounded-full`}
                            />
                            {/* Gradient Blue Shadow */}
                            <View className={`absolute inset-0 ring-[12px] ${showUpcomingJobs ? 'ring-primaryBlue-gradient' : 'ring-primaryBlue/50-gradient'
                                } rounded-full pointer-events-none filter blur-[8px]`} />
                        </CustomView>


                    </Pressable>
                    <CustomView className={'bg-primaryBlue w-full h-[130px] p-5'}>
                        {upcomingJobs.length > 0 || completedJobs.length>0? (
                            showUpcomingJobs ? (
                                <Text className={'text-white '}>You have {upcomingJobs.length} jobs coming up.</Text>
                            ) : (
                                <Text className={'text-white '}>You have {completedJobs.length} previous jobs.</Text>
                            )
                        ) : (
                            <Text className={'text-white '}>You have no job tickets yet</Text>
                        )}
                    </CustomView>
                    {(((showUpcomingJobs && upcomingJobs.length === 0) ||
                        (!showUpcomingJobs && completedJobs.length === 0)) && (
                            <CustomView
                                className={
                                    ' rounded-xl bg-white h-[300px] w-[80vw] mx-auto border border-primaryGreen -translate-y-20'
                                }
                            >
                                <LottieView
                                    autoPlay={true}
                                    loop={true}
                                    source={require('../../../assets/animations/job_details.json')}
                                />
                            </CustomView>
                        ))}
                </CustomView>
            }
            refreshing={refreshing}
            onRefresh={fetchJobs}
            className={'h-full'}
            keyExtractor={(item) => item.jobId}
            data={showUpcomingJobs ? upcomingJobs : completedJobs}
            renderItem={({ item }) => (
                <CustomView className={'px-5 -translate-y-16'}>
                    <JobListItemView jobRaw={item} />
                </CustomView>
            )}
        />
    );
};

export default Jobs;