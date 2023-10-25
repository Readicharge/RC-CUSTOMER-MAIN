import React, { useState } from 'react';
import CalendarDisplay from '../../../components/pages/CalenderDisplay';
import { Alert } from 'react-native';
import CustomView from '../../../components/common/CustomView';


const Schedule = ({ navigation }) => {
  const [isAlertVisible, setAlertVisible] = useState(false);

  const handleContinueClick = () => {
    // Show the alert modal
    setAlertVisible(true);
  };


  const handleBackClick = React.useCallback(() => {
    navigation.navigate('infoPageQuestion');
},[]);

  const handleAlertButtons = (buttonIndex) => {
    if (buttonIndex === 0) {
      // User clicked "Continue" in the alert modal, navigate to 'Slot'
      navigation.navigate('slot');
    } else {
      // User clicked "Cancel" or closed the alert modal, do nothing
    }
    // Hide the alert modal
    setAlertVisible(false);
  };

  return (
    <CustomView className="mt-2">
        
      <CalendarDisplay
        hideBackButton
        disableBookedDays
        continueButtonText={'SAVE'}
        onCalendarDayPress={() => handleContinueClick()}
        onBackClick={handleBackClick}
      />

      {/* Alert modal */}
      {isAlertVisible && (
        Alert.alert(
          'Confirmation',
          'Do you want to continue?',
          [
            { text: 'Cancel', onPress: () => handleAlertButtons(1) },
            { text: 'Continue', onPress: () => handleAlertButtons(0) },
          ],
          { cancelable: false }
        )
      )}
    </CustomView>
  );
};

export default Schedule;