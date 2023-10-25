import React, { useState, useEffect, useCallback } from 'react';
import Page from '../../../components/common/Page';
import { Image, Text, TouchableOpacity, Alert, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomView from '../../../components/common/CustomView';
import StyledDropdown from '../../../components/common/StyledDropdown';
import yesNo from '../../../constants/yes-no';
import nemaHardwired from '../../../constants/nema-hardwired';
import nemaType from '../../../constants/nemaType';
import StyledButton from '../../../components/common/StyledButton';
import StyledInput from '../../../components/common/StyledInput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { customerSetupActions } from '../../../store/customer-setup-slice';
import LottieView from 'lottie-react-native'; // Import LottieView
import animationData from '../../../assets/animations/bolt.json';

const PrimaryDetails = () => {
    const navigation = useNavigation();

    const [currentIndex, setCurrentIndex] = useState(0);
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        purchased: { value: null },
        nemaOrHardwired: { value: null },
        isHardwiredAndOver80AMP: { value: null },
        nemaType: { value: null },
        make: '',
        imageUris: [],
    });

    const incomingAnim = new Animated.Value(0);
    const outgoingAnim = new Animated.Value(0);

    const persistedData = useSelector((state) => state.customerSetup.purchasedChargerDetails);
    // Track which questions have been answered
    const [answeredQuestions, setAnsweredQuestions] = useState({
        Purchased: false,
        nemaOrHardwired: false,
        isHardwiredAndOver80AMP: false,
        nemaType: false,
    });

    // Data for each charger is stored here
    const [chargerData, setChargerData] = useState([]);

    // Count for charger 
    const chargerQuantity = useSelector(
        (state) => +state.customerSetup.customer.chargerQuantity?.value
    )

    const [chargerCount, setChargerCount] = useState(0);

    // Dropdown data for the question
    const DropDownData = {
        Purchased: yesNo,
        nemaOrHardwired: nemaHardwired,
        isHardwiredAndOver80AMP: yesNo,
        nemaType: nemaType
    };

    const handleNextQuestion = async () => {
        Animated.parallel([
            Animated.timing(incomingAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(outgoingAnim, {
                toValue: -1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Save the data for the current charger
            setChargerData((prevData) => {
                const newData = [...prevData];
                newData[chargerCount] = form;
                return newData;
            });

            // Reset values for questions following the current one
            for (let i = currentIndex + 1; i <= 4; i++) {
                setForm((prevForm) => ({
                    ...prevForm,
                    [questions[i].name]: { value: null },
                }));
                setAnsweredQuestions((prevAnswers) => ({
                    ...prevAnswers,
                    [questions[i].name]: false,
                }));
            }

            const currentQuestion = questions[currentIndex];
            const answer = form[currentQuestion.name];
            const nextIndexForm = currentQuestion.nextIndex(answer.value);

            if (nextIndexForm === 5) {
                // Move to the next charger
                if (chargerCount + 1 < chargerQuantity) {
                    // Reset the form to the initial state by saving the charger data for the current charger 
                    setForm({
                        purchased: { value: null },
                        nemaOrHardwired: { value: null },
                        isHardwiredAndOver80AMP: { value: null },
                        nemaType: { value: null },
                        make: '',
                        imageUris: [],
                    })
                    setAnsweredQuestions({
                        Purchased: false,
                        nemaOrHardwired: false,
                        isHardwiredAndOver80AMP: false,
                        nemaType: false,
                    })
                    setCurrentIndex(0);
                    setChargerCount(chargerCount + 1);
                } else {
                    setChargerCount(chargerCount + 1);
                    // All chargers answered, move to the next screen or handle completion
                }
            } else {
                const resetForm = { ...form };
                const questionsToReset = questions.slice(currentIndex + 1);
                questionsToReset.forEach((question) => {
                    resetForm[question.name] = { value: null };
                });
                setForm(resetForm);
                setCurrentIndex(nextIndexForm);
            }

            // Reset animations
            incomingAnim.setValue(0);
            outgoingAnim.setValue(0);
        });
    };

    const handleChange = (value, field) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: value,
        }));

        // Mark the question as answered
        setAnsweredQuestions((prevAnswers) => ({
            ...prevAnswers,
            [field]: true,
        }));
    };


    const handlenextPage = async () => {
        // Display all charger data when the form is submitted
        console.log("Hello")
        console.log(chargerData);
        // setChargerCount(0)
        dispatch(customerSetupActions.updatePurchasedChargerDetails(chargerData));

        dispatch(
            customerSetupActions.updateSetupPeripherals({
                currentPage: 'primaryDetails',
            }),
        );



        navigation.navigate("advanceDetails");

    };


    const handlePreviousQuestion = () => {
        if (currentIndex > 0) {
            const prevIndex = questions[currentIndex].previousIndex(currentIndex);
            setCurrentIndex(prevIndex);
        } else if (currentIndex === 0) {
            // When going back from the first question of a charger, reset all data for that charger
            setForm({
                purchased: { value: null },
                nemaOrHardwired: { value: null },
                isHardwiredAndOver80AMP: { value: null },
                nemaType: { value: null },
                make: '',
                imageUris: [],
            });

            // When going back from the first question of a charger, reset the answered questions
            setAnsweredQuestions({
                Purchased: false,
                nemaOrHardwired: false,
                isHardwiredAndOver80AMP: false,
                nemaType: false,
            });

            // Move to the previous charger if available
            if (chargerCount > 0) {
                setChargerCount(chargerCount - 1);
                setCurrentIndex(0);
            }
        }
    };



    const currentQuestion = questions[currentIndex];

    return (
        <Page showTopRightImage className={'justify-between'}>
            <LottieView
                source={animationData}
                autoPlay={true}
                loop={true}
                style={{ width: 200, height: 200 }}
            />
            {
                chargerCount < chargerQuantity ? (
                    <Text className={'text-xl font-semibold text-primaryGreen mb-5 text-center'}>
                        Tell us about your charger(s)
                    </Text>
                ) : (
                    <Text className={'text-xl font-semibold text-primaryGreen mb-5 text-center'}>
                        Proceed next to charger location form
                    </Text>
                )
            }

            {chargerCount < chargerQuantity && (
                <CustomView className="flex w-full justify-between">
                    <CustomView>
                        <Animated.View
                            style={{
                                transform: [
                                    {
                                        translateX: outgoingAnim.interpolate({
                                            inputRange: [-1, 0, 1],
                                            outputRange: [500, 0, -500],
                                        },)
                                    },
                                ],
                            }}>
                            <Text className={'text-lg font-semibold text-primaryGreen'}>
                                Charger #{chargerCount + 1}
                            </Text>
                            <CustomView className={'flex flex-col gap-y-1'}>
                                <Text className={'text-white'}>
                                    {questions[currentIndex].text}
                                </Text>
                                {currentIndex < 4 ? (
                                    <StyledDropdown
                                        data={DropDownData[currentQuestion.name]}
                                        name={currentQuestion.name}
                                        value={form[currentQuestion.name]}
                                        onChange={(value) => handleChange(value, currentQuestion.name)}
                                    />
                                ) : (
                                    <StyledInput
                                        name={'make'}
                                        value={form[currentQuestion.name]}
                                        placeholder={'Charger Make/Model'}
                                        onChangeText={(value, name) => handleChange(value, name)}
                                    />
                                )}
                            </CustomView>
                        </Animated.View>
                    </CustomView>
                </CustomView>
            )}
            <CustomView className="flex w-full mt-4 justify-between">
                {currentIndex < 5 && chargerCount < chargerQuantity ? (
                    <CustomView>
                        <StyledButton
                            onPress={handleNextQuestion}
                            title={'NEXT'}
                            filled
                            variant={'green'}
                            className={'w-full mt-8'}
                            disabled={!answeredQuestions[currentQuestion.name]}
                        />

                        <StyledButton
                            onPress={handlePreviousQuestion}
                            disabled={currentIndex === 0 && chargerCount===0}
                            title={'PREVIOUS'}
                            className={'w-full mt-8'}
                        />
                    </CustomView>
                ) : (
                    <CustomView>
                        {chargerCount === chargerQuantity && (
                            <CustomView>
                                <StyledButton
                                    onPress={handlenextPage}
                                    title={'CONTINUE'}
                                    className={'w-full mt-8'}
                                    filled
                                />
                                <StyledButton
                                    onPress={() => {
                                        navigation.navigate("numberChargers");
                                    }}
                                    className={'mt-5 w-full'}
                                    title={'BACK'}
                                />
                            </CustomView>
                        )}
                    </CustomView>
                )}
            </CustomView>
        </Page>
    );
};

export default PrimaryDetails;

const questions = [
    // Question CD1-1
    {
        index: 0,
        text: "Did you already purchase this charger?",
        name: "Purchased",
        nextIndex: (value) => {
            return value === "true" ? 1 : 5;
        },
    },
    // Question CD1-2
    {
        index: 1,
        text: "If yes, did you purchase a NEMA or hardwired charger?",
        name: "nemaOrHardwired",
        conditionField: 'Purchased', // Condition based on the previous answer
        condition: (value) => value === "true",
        nextIndex: (value) => {
            return value === "NEMA" ? 3 : 2;
        },
        previousIndex: (value) => {
            return 0;
        },
    },
    // Question CD1-3
    {
        index: 2,
        text: "If it is hardwired, is your charger 80 Amp?",
        name: "isHardwiredAndOver80AMP",
        conditionField: 'nemaOrHardwired', // Condition based on the previous answer
        condition: (value) => value === 'Hardwired',
        nextIndex: (value) => {
            return 4;
        },
        previousIndex: (value) => {
            return 1;
        },
    },
    // Question CD1-4
    {
        index: 3,
        text: "If NEMA, what type?",
        name: "nemaType",
        conditionField: 'nemaOrHardwired', // Condition based on the previous answer
        condition: (value) => value === 'NEMA',
        nextIndex: (value) => {
            return 4;
        },
        previousIndex: (value) => {
            return 1;
        },
    },
    // Question CD1-5
    {
        index: 4,
        text: "What is the make and model of the charger you have purchased?",
        name: "make",
        nextIndex: (value) => {
            return 5; // This value is for coming out of the individual charger details section
        },
        previousIndex: (value) => {
            return 1;
        },
    },
    // NEXT tab or other charger form decider
    {
        index: 5,
        text: "Answer the Questions for the next charger",
        name: "nextCharger",
        nextIndex: (value) => {
            return 99; // This value is for coming out of the individual charger details section
        },
        previousIndex: (value) => {
            return 4;
        },
    },
];


