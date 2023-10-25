// Importing the core modules
import React from 'react';
import { FlatList, Text } from 'react-native';


// Importng the Lottie animation 
import LottieView from 'lottie-react-native';


// Importing the Custom View
import CustomView from '../../../../components/common/CustomView';
import PaymentItem from '../../../../components/dashboard/payments/PaymentItem';
import payments from '../../../../constants/payment';


const PaymentsList = ({ navigation }) => {

    const [payments, setPayments] = React.useState([]);
    const [totalEarned, setTotalEarned] = React.useState(0);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setPayments(payments);
            setTotalEarned(payments.map((payment) => +payment.amount).reduce((a, b) => a + b, 0));
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    const handlePaymentItemClick = React.useCallback(
        (paymentId) => {
            // Set selected payment as read
            setPayments((prevPayments) => {
                const index = prevPayments.findIndex((payment) => payment.id === paymentId);
                if (index !== -1) {
                    prevPayments[index].seen = true;
                }
                return [...prevPayments];
            });
            navigation.navigate('PaymentDetails', { payment: payments.filter((p) => p.id === paymentId)[0] });
        },
        [payments],
    );

    return (
        <FlatList
            ListHeaderComponent={
                <CustomView className={'w-full flex flex-col pt-5 gap-y-5'}>
                    <Text className={'text-primaryBlue text-xl font-semibold ml-5'}>Payments</Text>
                    <CustomView className={'bg-primaryBlue w-full h-[130px] p-5'}>
                        {payments.length > 0 ? (
                            <Text className={'text-white'}>
                                You ${totalEarned >= 0 ? 'earned' : 'lost'} ${Math.abs(totalEarned)} this week.
                            </Text>
                        ) : (
                            <Text className={'text-white'}>You have no payment notifications yet.</Text>
                        )}
                    </CustomView>
                    {payments.length === 0 && (
                        <CustomView
                            className={'bg-white h-[350px] w-[90vw] mx-auto border border-primaryGreen -translate-y-20'}
                        >
                            <LottieView
                                autoPlay={true}
                                loop={true}
                                source={require('../../../../assets/animations/pay.json')}
                            />
                        </CustomView>
                    )}
                </CustomView>
            }
            className={'h-full'}
            data={payments}
            renderItem={({ item }) => (
                <CustomView className={'px-5 -translate-y-20'}>
                    <PaymentItem onPress={handlePaymentItemClick} payment={item} />
                </CustomView>
            )}
        />
    );
};

export default PaymentsList;