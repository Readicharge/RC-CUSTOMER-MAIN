// Necessary Imports
import React from 'react';
import { Alert, Keyboard, Pressable, RefreshControl, ScrollView, Text, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { useNavigation } from '@react-navigation/native';


import CustomView from '../../../components/common/CustomView';
import officialColors from '../../../style/colors';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { getFormattedDate, parseJobData } from '../../../helper/utils';
import StyledButton from '../../../components/common/StyledButton';
import ChargerItem from '../../../components/joblisting/ChargerItem';
import CommentItem from '../../../components/joblisting/CommentItem';
import moment from 'moment';
import { makeRequest } from '../../../helper/http';



// Decleration for the Job PROP 

const JobListing = ({ navigation, route }) => {


    // Initial Decleration
    const [job, setJob] = React.useState(null);
    const [materialNames, setMaterialNames] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [service, setService] = React.useState('');
    const chatNavigation = useNavigation();


    const fetchJob = React.useCallback(() => {
        setRefreshing(true);
        makeRequest(`/api/booking/${route.params.jobId}`, 'get')
            .then((res) => {
                console.log(res.data);
                const job = parseJobData(res.data);
                job.jobNumber = route.params.jobNumber;
                setJob(job);
                console.log(job.status)
            })
            .catch((err) => {
                Alert.alert('Error', 'Something went wrong while fetching job data');
                console.log(err);
                navigation.goBack();
            })
            .finally(() => setRefreshing(false));
    }, [route.params.jobId, route.params.jobNumber, navigation]);


    React.useEffect(fetchJob, [fetchJob]);

    // Get Service Details By it's Id 
    React.useEffect(() => {
        makeRequest(`/api/services/${job?.serviceName}`, 'get').then((res) => {
            setService(res.data.name);
        })
    }, []);

    React.useEffect(() => {
        // Clear the existing materialNames array
        setMaterialNames([]);

        job !== null &&
            job.materials.forEach((m) => {
                makeRequest(`/api/materials/${m}`, 'get')
                    .then((res) => setMaterialNames((prev) => [...prev, res.data.material_name]))
                    .catch((err) => console.log(err));
            });
    }, [job]);


    const handleChatClick = React.useCallback(() => chatNavigation.navigate('Chat', { chatId: '1' }), []);


    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchJob} />}>
            {job === null ? (
                <>
                    <Text className={'text-center text-2xl font-bold text-gray-500 mt-20'}>Loading...</Text>
                </>
            ) : (
                <KeyboardAwareScrollView className={'flex flex-col m-4 mt-10 pb-10'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <>

                            {job.status === 'PENDING' && (
                                <CustomView className={'bg-primaryGreen rounded-lg '}>

                                    <Text className={'text-xl font-semibold p-5 text-center text-white'}>
                                        JOB COMPLETED {moment(new Date(job.date)).format('MMM DD, YYYY').toUpperCase()}
                                    </Text>
                                </CustomView>
                            )}

                            <CustomView className={'flex flex-col px-5'}>
                                <CustomView className={'flex flex-row  gap-x-2 mx-auto mt-5'}>
                                    <AntDesign name="calendar" size={24} color={officialColors.darkBlue} />
                                    <Text
                                        className={
                                            'font-semibold  text-white break-all w-[80%] text-[20px]'
                                        }
                                    >
                                        {getFormattedDate(job.date, job.timeFrom, job.timeTo)}
                                    </Text>
                                </CustomView>
                                <CustomView className={'flex flex-row justify-between items-center mt-5'}>
                                    <Text className={'text-white'}>{job.customerName}</Text>
                                    {job.status === 'LIVE' && (
                                        <Pressable onPress={handleChatClick}>
                                            <AntDesign name="message1" size={24} color={officialColors.green} />
                                        </Pressable>
                                    )}
                                </CustomView>
                                <Text className={'text-white'}>{job.customerAddress}</Text>
                                <Text className={'text-xl mt-10 font-semibold text-white'}>Summary</Text>
                                <Text className={'text-white mt-3'}>
                                    <Text className={'font-semibold'}>Service: </Text>
                                    {service}
                                </Text>
                                <Text className={'text-white'}>
                                    <Text className={'font-semibold'}>Total Payment: </Text>${job.paymentAmount}
                                </Text>

                                <Text className={'text-white mt-2'}>
                                    <Text className={'font-semibold'}>Materials Utilized</Text>:
                                </Text>
                                <CustomView className={`${job.materials.length === 0 && 'hidden'} flex flex-col`}>
                                    {materialNames.map((material, index) => (
                                        <CustomView key={index} className={'flex flex-row items-center pl-5 gap-x-1'}>
                                            <CustomView className={'w-[5px] h-[5px] rounded-full bg-primaryBlue'} />
                                            <Text className={'text-white'}>{material}</Text>
                                        </CustomView>
                                    ))}
                                </CustomView>
                                <Text className={'text-xl mt-10 font-semibold text-white'}>Details</Text>
                                <Text className={'text-white mt-3'}>
                                    <Text className={'font-semibold'}>House Built: </Text>
                                    {job.houseBuildYear}
                                </Text>
                                <Text className={'text-white'}>
                                    <Text className={'font-semibold'}>Pre-1990 panel upgraded: </Text>
                                    {job.prePanelUpgraded ? 'Yes' : 'No'}
                                </Text>
                                <Text className={'text-white mb-5'}>
                                    <Text className={'font-semibold'}>Own/Rent: </Text>
                                    {job.isOwner ? 'Own' : 'Rent'}
                                </Text>
                            </CustomView>
                            {job.chargers.map((charger, index) => (
                                <ChargerItem index={index + 1} charger={charger} key={index} />
                            ))}
                            <CustomView className={'flex flex-col px-5'}>
                                <Text className={'text-xl mt-10 font-semibold text-white'}>Uploads</Text>
                                <Text className={'text-sm text-gray-500'}>No uploads so far</Text>
                                <Text className={'text-xl mt-10 font-semibold text-white'}>Comments</Text>
                                {job.comments.length === 0 && (
                                    <Text className={'text-sm text-gray-500'}>No comments so far</Text>
                                )}
                                {job.comments.map((comment, index) => (
                                    <CommentItem comment={comment} key={index} />
                                ))}
                                <Text className={'text-xl mt-10 font-semibold text-white'}>Actions</Text>


                            </CustomView>

                            {job.status === 'LIVE' && (
                                <>
                                    {
                                        (!job.jobModified) && (
                                            <StyledButton
                                                className={'w-[85%] mx-auto mt-3'}
                                                title={'MODIFY JOB SCOPE'}
                                                filled
                                                variant={'green'}
                                                // onPress={toggleAcceptModifiedJob}
                                                disabled={!(job.stage1Done && job.stage2Done)}
                                            />
                                        )
                                    }
                                    <StyledButton
                                        className={'w-[85%] mx-auto mt-3'}
                                        title={'MARK AS COMPLETE'}
                                        filled
                                        variant={'green'}
                                        // onPress={toggleProjectCompletionModel}
                                        disabled={!(job.stage1Done && job.stage2Done)}
                                    />
                                    <StyledButton
                                        onPress={() => console.log("ada")}
                                        className={'w-[85%] mx-auto mt-3'}
                                        variant={'green'}
                                    >
                                        <CustomView
                                            className={'flex flex-row items-center justify-between gap-x-5'}
                                        >
                                            <AntDesign name="delete" size={24} color={officialColors.green} />
                                            <Text className={'text-sm text-white'}>CANCEL JOB</Text>
                                        </CustomView>
                                    </StyledButton>

                                </>
                            )}

                            <StyledButton className={'w-[85%] mx-auto mt-3'} variant={'green'}>
                                <CustomView className={'flex flex-row items-center justify-between gap-x-5'}>
                                    <AntDesign name="printer" size={24} color={officialColors.green} />
                                    <Text className={'text-sm text-white'}>PRINT PDF</Text>
                                </CustomView>
                            </StyledButton>
                        </>
                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
            )}
        </ScrollView>
    )



};

export default JobListing;