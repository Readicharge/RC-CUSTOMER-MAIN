import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import Page from "../../../components/common/Page";
import { Pressable, View, Text, StyleSheet } from "react-native";
import StyledButton from "../../../components/common/StyledButton";
import officialColors from "../../../style/colors";
import LottieView from 'lottie-react-native'; // Import LottieView
import animationData from '../../../assets/animations/bolt.json'; 

// Sample time slot list (you can replace this with your actual data)
const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM"
];


const Slot = ({ navigation }) => {
  const slotsPerRow = 2;
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState(null);

  const handleTimeSlotPress = (slot) => {
    // Toggle selection for the clicked time slot
    if (selectedTimeSlot === slot) {
      setSelectedTimeSlot(null); // Deselect if already selected
    } else {
      setSelectedTimeSlot(slot); // Select the clicked time slot
    }
  };

  // Group the time slots into pairs for each row
  const rows = [];
  for (let i = 0; i < timeSlots.length; i += slotsPerRow) {
    rows.push(timeSlots.slice(i, i + slotsPerRow));
  }

  return (
    <Page style={styles.container}>
         <LottieView
                    source={animationData} // Replace with your animation data
                    autoPlay={true}
                    loop={true}
                    style={{ width: 200, height: 200 }} // Adjust the width and height as needed
                />
      <Text style={styles.header}>
        Select the time slot for your charger installation
      </Text>

      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((slot, slotIndex) => (
            <Pressable
              key={slotIndex}
              onPress={() => handleTimeSlotPress(slot)}
              style={[
                styles.slot,
                {
                  backgroundColor: selectedTimeSlot === slot ? officialColors.green : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  styles.slotText,
                  {
                    color: selectedTimeSlot === slot ? "white" : officialColors.green,
                  },
                ]}
              >
                {slot}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}


      <StyledButton style={styles.button} title={"BACK"} 
      className={'w-full mt-8'}
      onPress={() => navigation.navigate("schedule")} />
      {selectedTimeSlot && (
        <StyledButton style={styles.button}
        filled
        className={'w-full mt-8'}
         onPress={() => navigation.navigate("paymentProceed")} title={"CONTINUE"} />
      )}
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: officialColors.green,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  slot: {
    flex: 1,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: officialColors.green,
  },
  slotText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },
});

export default Slot;