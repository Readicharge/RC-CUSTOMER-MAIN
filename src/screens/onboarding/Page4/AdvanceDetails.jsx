import React, { useState } from 'react';
import Page from '../../../components/common/Page';
import { Image, Text, TouchableOpacity, Alert, Button, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import installationLocations from '../../../constants/installation-locations';
import yesNo from '../../../constants/yes-no';
import highVoltageOutletType from '../../../constants/high-voltage-outlet-type'; // what type of outlet is installed
import { useDispatch, useSelector } from 'react-redux';
import CustomView from '../../../components/common/CustomView';
import StyledDropdown from '../../../components/common/StyledDropdown';
import StyledButton from '../../../components/common/StyledButton';
// import CameraModal from '../../../components/modal/CameraModal';
import { customerSetupActions } from '../../../store/customer-setup-slice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


import installationTypePreference from '../../../constants/installationTypePreference';
import hardWiredChargerType from '../../../constants/hardWireChargerType';
import locationElectricPanel from '../../../constants/locationElectricPanel';
import interiorWallFinishOptions from '../../../constants/interiorWallFinish';
import exteriorWallFinishOptions from '../../../constants/exteriorWallFinish';
import wallConstructionInsideMaterialOptions from '../../../constants/wallConstructionInsideMaterial';
import electricPanelTypeOptions from '../../../constants/electricPanelType';
import breakerBrandOptions from '../../../constants/breakerBrand';
import breakerSizeOptions from '../../../constants/brealerSize';
import distancePanelAndChargerOptions from '../../../constants/distancePanelAndCharger';
import locationElectricPanel01 from '../../../constants/loation-electric-panel';
import OffRamp1 from './offramp/OffRamp1';
import OffRamp2 from './offramp/OffRamp2';
import OffRamp3 from './offramp/OffRamp3';
import OffRamp4 from './offramp/OffRamp4';




const AdvanceDetails = () => {

  // This is used to keep track for the last question , so that we can simply show this in the Offramp page
  const [lastQuestionAnswered, setLastQuestionAnswered] = React.useState({});

  // Declaring the Navigation Route caller
  const navigation = useNavigation();

  // Setting the current Index of the Question to be 0 as default
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Existing Data for the Charger Type and Number of Installs
  const residentialDetails = useSelector((state) => state.customerSetup.customer);
  const chargerDetails = useSelector((state) => state.customerSetup.purchasedChargerDetails);
  const chargerQuantity = useSelector(
    (state) => state.customerSetup.customer.chargerQuantity.value
  );

  // The Countr which will count that how many chargers are valid to get nominated for the quotation process
  const [chargerCountValidForQuote, setChargerCountValidForQuote] = React.useState(0);

  // Setting The Charger Counter for the Page 
  const [chargerCount, setChargerCount] = React.useState(0);
  const persistedData = useSelector((state) => state.customerSetup.newChargerDetails);
  const [chargerCountNotOfframp, setChargerCountNotOfframp] = React.useState(0);

  // Declaring an emply array which will determine that which charger is going to be nominated for the quotation 
  var [valid_chargers, setValid_Chargers] = React.useState(Array(chargerQuantity).fill(true));


  useFocusEffect(
    React.useCallback(() => {
      setLastQuestionAnswered({});
      setCurrentIndex(0);
      setChargerCountValidForQuote(0);
      setChargerCount(0);
      setChargerCountNotOfframp(0);
      setValid_Chargers(Array(chargerQuantity).fill(true))
    }, [])
  );

  // Setting the Initial state of chargerCount related declerations 
  React.useEffect(() => {
    setChargerCountNotOfframp(chargerQuantity)
    setChargerCountValidForQuote(chargerQuantity)

  }, [chargerQuantity]);


  // This is the function which will set the current charger to be blocked for the quotation process
  const handleRemoveChargerFromQuotation = (index) => {
    setValid_Chargers(prevArray => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index];
      return newArray;
    });
  }

  const [form, setForm] = React.useState({
    highVoltageOutlet: { value: null },
    highVoltageOutletType: { value: null },
    upgradeToHighVoltageOutlet: { value: null },
    installationTypePreference: { value: null },
    hardWireChargerType: { value: null },
    locationChargerInstall: { value: null },
    garageOrCarpotOrPoleBurnOrOutBuildingAttachedToHome: { value: null },
    electricPanelDetached: { value: null },
    electricPanelLocation: { value: null },
    electricPanelSameFloor: { value: null },
    electricPanelAbove: { value: null },
    ChargerInstallExteriorToHome: { value: null },
    InteriorWallFinish: { value: null },
    exteriorWallFinish: { value: null },
    wallConstructionInsideMaterial: { value: null },
    electricPanelLocationAttached: { value: null },
    electricPanelSameFloorAttached: { value: null },
    electricPanelAboveAttached: { value: null },
    ElectricPanelRecessedToWall: { value: null },
    ElectricPanelType: { value: null },
    openSpaceBreakersHavingTwoSpace: { value: null },
    BreakerPanelBrand: { value: null },
    MainElectricBreakerSize: { value: null },
    circuitsInElectricPanel: { value: null },
    electricPanelRunningAnythingElse: { value: null },
    chargerInstallationLocationAndPanel: { value: null },
    offRamp1: { value: null },
    offRamp2: { value: null },
    offRamp3: { value: null }
  });


  React.useEffect(() => {
    if (persistedData) {
      console.log(persistedData)
    }
  }, [chargerCount])


  const [chargerLocationData, setChargerLocationData] = React.useState([]);




  React.useEffect(() => {
    console.log(currentIndex)
    setCurrentIndex(0)
  }, [])

  const incomingAnim = new Animated.Value(0);
  const outgoingAnim = new Animated.Value(0);


  const questions = [
    // Question 1 = index 0
    {
      index: 0,
      text: 'Do you have an existing high voltage (240v) outlet you would like to use?',
      name: 'highVoltageOutlet',
      nextIndex: (value) => {
        console.log(value);
        return value === 'true' ? 1 : 3; // Go to Q2 if Yes, else go to Q3
      },
    },

    // Question 2 = index 1
    {
      index: 1,
      text: 'What type of high voltage outlet is installed?',
      name: 'highVoltageOutletType',
      previousIndex: (value) => {
        return 0;
      },
      nextIndex: (value) => {
        console.log(value);
        if (value === 'NEMA 14-50') {
          // Check if they already have a charger
          console.log("*******************")
          console.log(chargerDetails[chargerCount].Purchased.value === "false")
          if (chargerDetails[chargerCount].Purchased.value === "false") {
            // Off-ramp condition: You're all set, get charging
            return 29;
          } else {
            // No more questions, proceed to checkout to purchase the charger
            return 28;
          }
        } else if (value !== undefined) {
          return 2; // Go to Q2a for other outlet types
        }

      },
    },

    // Question 2a = index 2
    {
      index: 2,
      text: 'Because you have less than a NEMA 14-50 outlet, would you like to upgrade your high voltage outlet?',
      name: 'upgradeToHighVoltageOutlet',
      previousIndex: (value) => {
        return 1;
      },
      nextIndex: (value) => {
        if (value === 'true') {
          return 5;
        }
        else {
          console.log("&$#*!@*@!*")
          console.log(chargerDetails[chargerCount].Purchased.value)
          // Case 1 : They Dont want to upgrade to 14-50 charger and they do not have a charger , but they do havw a high voltage outlet which is less than 14-50
          if (chargerDetails[chargerCount].Purchased.value === "false") return 27;
          // Case 2 : They have a charger less than 14-50 NEMA , and they do have a high voltage outlet , but not want to upgrade that to 14-50 
          // Caes 3 : They have a charger which 
          else {
            return 26;
          }
        }
      },
    },

    // Question 3 (Installation type preference) = index 3
    {
      index: 3,
      text: 'What is your installation type preference?',
      name: 'installationTypePreference',
      previousIndex: (value) => {
        return 0;
      },
      nextIndex: (value) => {
        if (value === 'Hardwired') {
          if (chargerDetails[chargerCount].isHardwiredAndOver80AMP.value === "true") {
            return 5; //Skip if already selected 80A Hardwire Charger Type
          }
          else {
            return 4;  // Go to Q3a for hardwired installation
          }

        } else if (value === 'NEMA') {
          return 5; // Go back to Q4 for NEMA 14-50 outlet
        } else {
          return 26; // Off-ramp condition for other preferences
        }
      },
    },

    // Question 3a (Type of hardwired charger) = index 4
    {
      index: 4,
      text: 'What type of hardwired charger do you want installed?',
      name: 'hardWireChargerType',
      previousIndex: (value) => {
        return 3;
      },
      nextIndex: (value) => {
        if (value === '80A - 19.2kw') {
          // Off-ramp condition for 80A charger
          return 26;
        } else {
          return 5; // Goto Question Number 4
        }
      },
    },

    // Question 4 = index 5
    {
      index: 5,
      text: 'Where do you want your charger installed?',
      name: 'locationChargerInstall',
      previousIndex: (value) => {
        return 0;
      },
      nextIndex: (value) => {
        if (value === 'Outside wall of home') {
          return 13; // Go to Q6a for exterior wall finish
        } else if (value === 'Other') {
          // Handle other installation location options if needed
          return 27; // Off-ramp condition or go to next question
        } else {
          console.log("kjksdjsdkljskj")
          return 6; // goto Question 5
        }
      },
    },

    // Question 5 = index 6
    {
      index: 6,
      text: 'Is your garage, carport, pole barn, or out-building attached to your home?',
      name: 'garageOrCarpotOrPoleBurnOrOutBuildingAttachedToHome',
      previousIndex: (value) => {
        return 5;
      },
      nextIndex: (value) => {
        if (value === 'true') {
          return form[questions[5].name].value.includes('Inside') ? 12 : 13; // Go to Q6 or Q6a depending on answer to Q4 "inside or outside"
        } else {
          return 7; // Go to Q5a if detached
        }
      },
    },

    // Question 5a = index 7
    {
      index: 7,
      text: 'Do you have an electrical panel in your detached garage, carport, pole barn, out-building?',
      name: 'electricPanelDetached',
      previousIndex: (value) => {
        return 6;
      },
      nextIndex: (value) => {
        return value === 'true' ? 8 : 11; // Go to Q5b if Yes, else go to Q5e
      },
    },

    // Question 5b = index 8
    {
      index: 8,
      text: 'Where is your electrical panel located?',
      name: 'electricPanelLocation',
      previousIndex: (value) => {
        return 7;
      },
      nextIndex: (value) => {
        // Handle options for the location of the electrical panel in relation to installation
        // You can add logic here to determine the next question
        return value === "Inside my detached garage, carpot , pole barn or out-building" ? 9 : 12;
      },
    },

    // Question 5c = index 9
    {
      index: 9,
      text: 'Is the electrical panel on the same floor as your detached garage, carport, pole barn, out-building?',
      name: 'electricPanelSameFloor',
      previousIndex: (value) => {
        return 8;
      },
      nextIndex: (value) => {
        if (value === 'true') {
          return form[questions[5].name].value.includes('Inside') ? 12 : 13; // Go to Q6 or Q6a depending on answer to Q4 "inside or outside"
        } else {
          return 10;
        }
      },
    },

    // Question 5d = index 10
    {
      index: 10,
      text: 'Is the electrical panel two or more floors above your detached garage, carport, pole barn, out-building?',
      name: 'electricPanelAbove',
      previousIndex: (value) => {
        return 9;
      },
      nextIndex: (value) => {
        if (value === 'false') {
          return form[questions[5].name].value.includes('Inside') ? 12 : 13; // Go to Q6 or Q6a depending on answer to Q4 "inside or outside"
        } else {
          return 27;
        }
      },
    },

    // Question 5e = index 11
    {
      index: 11,
      text: 'Because there is no electrical panel at your installation location, are you ok with having your charger installed on the exterior of your home?',
      name: 'ChargerInstallExteriorToHome',
      previousIndex: (value) => {
        return 7;
      },
      nextIndex: (value) => {
        return value === 'true' ? 13 : 27; // Go to Q6a if Yes, else off-ramp to -10
      },
    },

    // Question 6 = index 12
    {
      index: 12,
      text: 'What is the finish of your interior wall at the installation location?',
      name: 'InteriorWallFinish',
      previousIndex: (value) => {
        return 0;
      },
      nextIndex: (value) => {
        return 14;
      },
    },

    // Question 6a = index 13
    {
      index: 13,
      text: 'What is the finish of your exterior wall at the installation location?',
      name: 'exteriorWallFinish',
      previousIndex: (value) => {
        return 0;
      },
      nextIndex: (value) => {
        // Handle options for exterior wall finish
        // You can add logic here to determine the next question
        return 14;
      },
    },

    // Question 7 = index 14
    {
      index: 14,
      text: 'What is the construction of the material inside the wall at the installation location?',
      name: 'wallConstructionInsideMaterial',
      previousIndex: (value) => {
        return 0;
      },
      nextIndex: (value) => {
        // Handle options for wall construction material
        // You can add logic here to determine the next question
        return 15;
      },
    },

    // Question 8 = index 15
    {
      index: 15,
      text: 'Where is your electrical panel located?',
      name: 'electricPanelLocationAttached',
      previousIndex: (value) => {
        return 14;
      },
      nextIndex: (value) => {
        // Handle options for the location of the electrical panel
        // You can add logic here to determine the next question
        return value === "Inside my home" ? 16 : 18;
      },
    },

    // Question 8a = index 16
    {
      index: 16,
      text: 'Is the electrical panel on the same floor as your attached garage, carport, pole barn, out-building?',
      name: 'electricPanelSameFloorAttached',
      previousIndex: (value) => {
        return 15;
      },
      nextIndex: (value) => {
        // Handle options for the location of the electrical panel
        // You can add logic here to determine the next question
        return value === "true" ? 18 : 17;
      },
    },

    // Question 8b = index 17
    {
      index: 17,
      text: 'Is the electrical panel two or more floors above your attached garage, carport, pole barn, out-building?',
      name: 'electricPanelAboveAttached',
      previousIndex: (value) => {
        return 16;
      },
      nextIndex: (value) => {
        // Handle options for the location of the electrical panel
        // You can add logic here to determine the next question
        return value === "true" ? 27 : 18;
      },
    },

    // Question 9 = index 18
    {
      index: 18,
      text: 'Is your electrical panel recessed into the wall?',
      name: 'ElectricPanelRecessedToWall',
      previousIndex: (value) => {
        return 15;
      },
      nextIndex: (value) => {
        // Handle options for the electrical panel recessed condition
        // You can add logic here to determine the next question
        return 19;
      },
    },

    // Question 10 = index 19
    {
      index: 19,
      text: 'What type of electrical panel do you have?',
      name: 'ElectricPanelType',
      previousIndex: (value) => {
        return 18;
      },
      nextIndex: (value) => {
        // Handle options for the type of electrical panel
        // You can add logic here to determine the next question
        return value === "Fuse box" ? 27 : 20;
      },
    },

    // Question 11 = index 20
    {
      index: 20,
      text: 'Are there at least two open spaces for breakers?',
      name: 'openSpaceBreakersHavingTwoSpace',
      previousIndex: (value) => {
        return 19;
      },
      nextIndex: (value) => {
        // Handle options for open spaces for breakers
        // You can add logic here to determine the next question
        return 21;
      },
    },

    // Question 12 = index 21
    {
      index: 21,
      text: 'What brand of breaker panel do you have?',
      name: 'BreakerPanelBrand',
      previousIndex: (value) => {
        return 20;
      },
      nextIndex: (value) => {
        // Handle options for the brand of breaker panel
        // You can add logic here to determine the next question
        return (
          value === "Federal Pacific" ||
          value === "Sylvania" ||
          value === 'Wadsworth' ||
          value === "Zinsco"
        ) ? 27 : 22;
      },
    },

    // Question 13 = index 22
    {
      index: 22,
      text: 'What is the size of the main electrical breaker?',
      name: 'MainElectricBreakerSize',
      previousIndex: (value) => {
        return 21;
      },
      nextIndex: (value) => {
        // Handle options for the size of the main electrical breaker
        // You can add logic here to determine the next question
        return value === "60A" ? 23 : (value === "100A" ? 24 : 25);
      },
    },

    // Question 13a = index 23
    {
      index: 23,
      text: 'Does this electrical panel have any circuits using it for power?',
      name: 'circuitsInElectricPanel',
      previousIndex: (value) => {
        return 22;
      },
      nextIndex: (value) => {
        return value === "false" ? 25 : 26;
      },
    },

    // Question 13b = index 24
    {
      index: 24,
      text: 'Do you have central air, electric stove, or electric hot water heater running off this electrical panel?',
      name: 'electricPanelRunningAnythingElse',
      previousIndex: (value) => {
        return 22;
      },
      nextIndex: (value) => {
        console.log(value === "false")
        return value === "false" ? 25 : 26;
      },
    },

    // Question 14 = index 25
    {
      index: 25,
      text: 'What is the approximate distance between the charger installation location and your electrical panel?',
      name: 'chargerInstallationLocationAndPanel',
      previousIndex: (value) => {
        return 22;
      },
      nextIndex: (value) => {
        return value === "More than 100 feet" ? 26 : 0;
      },
    },

    // Off-ramp conditions
    {
      index: 26,
      text: "Recharge does not support installations of this type",
      name: "offRamp1",
      previousIndex: (value) => {
        return 0;
      },
    },
    {
      index: 27,
      text: "You are all set. Get Charging!",
      name: "offRamp2",
      previousIndex: (value) => {
        return 0;
      },
    },
    {
      index: 28,
      text: "Purchase the compatible charger for smooth installation process",
      name: "offRamp3",
      previousIndex: (value) => {
        return 0;
      },
    },
    {
      index: 29,
      text: "Purchase the compatible charger for smooth installation process",
      name: "offRamp4",
      previousIndex: (value) => {
        return 0;
      },
    }
  ];


  const [answeredQuestions, setAnsweredQuestions] = React.useState({
    highVoltageOutlet: false,
    highVoltageOutletType: false,
    upgradeToHighVoltageOutlet: false,
    installationTypePreference: false,
    hardWireChargerType: false,
    locationChargerInstall: false,
    garageOrCarpotOrPoleBurnOrOutBuildingAttachedToHome: false,
    electricPanelDetached: false,
    electricPanelLocation: false,
    electricPanelSameFloor: false,
    electricPanelAbove: false,
    ChargerInstallExteriorToHome: false,
    InteriorWallFinish: false,
    exteriorWallFinish: false,
    wallConstructionInsideMaterial: false,
    electricPanelLocationAttached: false,
    electricPanelSameFloorAttached: false,
    electricPanelAboveAttached: false,
    ElectricPanelRecessedToWall: false,
    ElectricPanelType: false,
    openSpaceBreakersHavingTwoSpace: false,
    BreakerPanelBrand: false,
    MainElectricBreakerSize: false,
    circuitsInElectricPanel: false,
    electricPanelRunningAnythingElse: false,
    chargerInstallationLocationAndPanel: false
  })


  //  Dropdown Data mapped with each question
  const DropdownData = {
    highVoltageOutlet: yesNo,
    highVoltageOutletType: highVoltageOutletType,
    upgradeToHighVoltageOutlet: yesNo,
    installationTypePreference: installationTypePreference,
    hardWireChargerType: hardWiredChargerType,
    locationChargerInstall: installationLocations,
    garageOrCarpotOrPoleBurnOrOutBuildingAttachedToHome: yesNo,
    electricPanelDetached: yesNo,
    electricPanelLocation: locationElectricPanel,
    electricPanelSameFloor: yesNo,
    electricPanelAbove: yesNo,
    ChargerInstallExteriorToHome: yesNo,
    InteriorWallFinish: interiorWallFinishOptions,
    exteriorWallFinish: exteriorWallFinishOptions,
    wallConstructionInsideMaterial: wallConstructionInsideMaterialOptions,
    electricPanelLocationAttached: locationElectricPanel01,
    electricPanelSameFloorAttached: yesNo,
    electricPanelAboveAttached: yesNo,
    ElectricPanelRecessedToWall: yesNo,
    ElectricPanelType: electricPanelTypeOptions,
    openSpaceBreakersHavingTwoSpace: yesNo,
    BreakerPanelBrand: breakerBrandOptions,
    MainElectricBreakerSize: breakerSizeOptions,
    circuitsInElectricPanel: yesNo,
    electricPanelRunningAnythingElse: yesNo,
    chargerInstallationLocationAndPanel: distancePanelAndChargerOptions


  }




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
    ]).start(async () => {

      const currentQuestion = questions[currentIndex];
      const answer = form[currentQuestion.name];
      const nextIndexForm = currentQuestion.nextIndex(answer.value);
      // 
      if (currentIndex === 25 && nextIndexForm !== 26) {
        console.log("YAY")
        console.log(form)
        setChargerLocationData((prevData) => {
          const newData = [...prevData];
          newData[chargerCount] = form;
          return newData;
        });
        setForm({
          highVoltageOutlet: { value: null },
          highVoltageOutletType: { value: null },
          upgradeToHighVoltageOutlet: { value: null },
          installationTypePreference: { value: null },
          hardWireChargerType: { value: null },
          locationChargerInstall: { value: null },
          garageOrCarpotOrPoleBurnOrOutBuildingAttachedToHome: { value: null },
          electricPanelDetached: { value: null },
          electricPanelLocation: { value: null },
          electricPanelSameFloor: { value: null },
          electricPanelAbove: { value: null },
          ChargerInstallExteriorToHome: { value: null },
          InteriorWallFinish: { value: null },
          exteriorWallFinish: { value: null },
          wallConstructionInsideMaterial: { value: null },
          electricPanelLocationAttached: { value: null },
          electricPanelSameFloorAttached: { value: null },
          electricPanelAboveAttached: { value: null },
          ElectricPanelRecessedToWall: { value: null },
          ElectricPanelType: { value: null },
          openSpaceBreakersHavingTwoSpace: { value: null },
          BreakerPanelBrand: { value: null },
          MainElectricBreakerSize: { value: null },
          circuitsInElectricPanel: { value: null },
          electricPanelRunningAnythingElse: { value: null },
          chargerInstallationLocationAndPanel: { value: null },
          offRamp1: { value: null },
          offRamp2: { value: null },
          offRamp3: { value: null }
        });
        setAnsweredQuestions({
          highVoltageOutlet: false,
          highVoltageOutletType: false,
          upgradeToHighVoltageOutlet: false,
          installationTypePreference: false,
          hardWireChargerType: false,
          locationChargerInstall: false,
          garageOrCarpotOrPoleBurnOrOutBuildingAttachedToHome: false,
          electricPanelDetached: false,
          electricPanelLocation: false,
          electricPanelSameFloor: false,
          electricPanelAbove: false,
          ChargerInstallExteriorToHome: false,
          InteriorWallFinish: false,
          exteriorWallFinish: false,
          wallConstructionInsideMaterial: false,
          electricPanelLocationAttached: false,
          electricPanelSameFloorAttached: false,
          electricPanelAboveAttached: false,
          ElectricPanelRecessedToWall: false,
          ElectricPanelType: false,
          openSpaceBreakersHavingTwoSpace: false,
          BreakerPanelBrand: false,
          MainElectricBreakerSize: false,
          circuitsInElectricPanel: false,
          electricPanelRunningAnythingElse: false,
          chargerInstallationLocationAndPanel: false
        })
        setCurrentIndex(0);
        setChargerCount(chargerCount + 1);
      }
      else {
        const resetForm = { ...form };
        console.log("Fplkjdlk")
        console.log(questions[currentIndex])
        console.log(form[questions[currentIndex].name])
        setLastQuestionAnswered({
          "currentIndex": currentIndex,
          "question": questions[currentIndex].text,
          "answer": form[questions[currentIndex].name].label
        })
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


  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      const prevIndex = questions[currentIndex].previousIndex(currentIndex);
      setCurrentIndex(prevIndex);
    }
    if (chargerCount > 0) {
      setChargerCount(chargerCount - 1);
      setCurrentIndex(0)
    }


  }


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



  const handleNextClick = React.useCallback(() => {
    console.log(chargerLocationData)
    console.log(chargerDetails);
    console.log(residentialDetails);
    console.log(valid_chargers)
    setChargerCount(0);
    setCurrentIndex(0)
    const data_final = []
    for (let i = 0; i < chargerQuantity; i++) {
      if (valid_chargers[i]) {
        console.log(chargerLocationData[i])
        const data = {
          // cd2_1: chargerLocationData[i].highVoltageOutlet,
          // cd2_2: chargerLocationData[i].highVoltageOutletType,
          // cd2_2a: chargerLocationData[i].upgradeToHighVoltageOutlet,
          // cd2_3: chargerLocationData[i].installationTypePreference,
          // cd2_3a: chargerLocationData[i].hardWireChargerType,
          // cd2_4: chargerLocationData[i].locationChargerInstall,
          // cd2_5: chargerLocationData[i].garageOrCarpotOrPoleBurnOrOutBuildingAttachedToHome,
          // cd2_5a: chargerLocationData[i].electricPanelDetached,
          // cd2_5b: chargerLocationData[i].electricPanelLocationm,
          // cd2_5c: chargerLocationData[i].electricPanelSameFloor,
          // cd2_5d: chargerLocationData[i].electricPanelAbove,
          // cd2_5e: chargerLocationData[i].ChargerInstallExteriorHome,
          // cd2_6: chargerLocationData[i].InteriorWallFinish,
          // cd2_6a: chargerLocationData[i].exteriorWallFinish,
          // cd2_7: chargerLocationData[i].wallConstructionInsideMaterial,
          // cd2_8: chargerLocationData[i].electricPanelLocationAttached,
          // cd2_8a: chargerLocationData[i].electricPanelSameFloorAttached,
          // cd2_8b: chargerLocationData[i].electricPanelAboveAttached,
          // cd2_9: chargerLocationData[i].ElectricPanelRecessedToWall,
          // cd2_10: chargerLocationData[i].ElectricPanelType,
          // cd2_11: chargerLocationData[i].openSpaceBreakersHavingTwoSpace,
          // cd2_12: chargerLocationData[i].BreakerPanelBrand,
          // cd2_13: chargerLocationData[i].MainElectricBreakerSize,
          // cd2_13a: chargerLocationData[i].circuitsInElectricPanel,
          // cd2_13b: chargerLocationData[i].electricPanelRunningAnythingElse,
          // cd2_14: chargerLocationData[i].chargerInstallationLocationAndPanel
        }
        data_final.push(data);
      }

    }
    const data_to_be_sent_for_getting_quote = {
      number_of_installs: chargerCountValidForQuote,
      charger_list: data_final

    }

    console.log(data_to_be_sent_for_getting_quote)
    navigation.navigate('quotation');
  }, [])

  const currentQuestion = questions[currentIndex];




  return (
    <Page>
      {currentQuestion.index < 26 && (
        <Text className={'text-xl font-semibold text-primaryGreen mb-5 text-center'}>
          Tell us about your charger(s) location
        </Text>

      )}

      <Text className={'t{ext-lg font-semibold text-primaryGreen'}>
        {chargerCount} {currentIndex} {chargerCountNotOfframp}
      </Text>
      <CustomView>
        {chargerCount < chargerQuantity && (
          <Animated.View
            style={{
              transform: [
                {
                  translateX: outgoingAnim.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [500, 0, -500],
                  }),
                },
              ],
            }}
          >
            {currentQuestion.index < 26 && (
              <CustomView>
                <Text className={'text-lg font-semibold text-primaryGreen'}>
                  Charger #{chargerCount + 1}
                </Text>
                <CustomView className={'flex flex-col gap-y-1 w-full'}>
                  <Text className={'text-white'}>{currentQuestion.text}</Text>

                  <StyledDropdown
                    data={DropdownData[currentQuestion.name]}
                    name={currentQuestion.name}
                    value={form[currentQuestion.name]}
                    onChange={(value) => handleChange(value, currentQuestion.name)}
                  />
                </CustomView>
                <CustomView className="flex w-full mt-4 justify-between">
                  <StyledButton
                    filled
                    onPress={handleNextQuestion}
                    title={'NEXT'}
                    className={'w-full mt-8'}
                    disabled={!answeredQuestions[currentQuestion.name]}
                  />

                  <StyledButton
                    onPress={handlePreviousQuestion}
                    disabled={currentIndex === 0 && chargerCount === 0}
                    title={'PREVIOUS'}
                    className={'w-full mt-8'}
                  />

                </CustomView>

              </CustomView>
            )}
            {
              currentIndex === 26 && (
                <OffRamp1 data={lastQuestionAnswered} />

              )
            }
            {
              currentIndex === 27 && (
                <OffRamp2 data={lastQuestionAnswered} />
              )
            }
            {
              currentIndex === 28 && (
                <OffRamp3 data={lastQuestionAnswered} />
              )
            }
            {
              currentIndex === 29 && (
                <OffRamp4 data={lastQuestionAnswered} />
              )
            }
          </Animated.View>
        )}
      </CustomView>




      {/* Add "Next" and "Previous" buttons */}
      {
        chargerCount < chargerQuantity ?
          (
            (currentIndex > 25 && (
              <CustomView className="flex w-full mt-4 gap-y-4 justify-between">
                <CustomView>
                  <StyledButton
                    onPress={() => {
                      setChargerCountNotOfframp(chargerQuantity)
                      handlePreviousQuestion()
                    }}
                    disabled={currentIndex === 0 && chargerCount < 1}
                    title={'EDIT RESPONSE'}
                  />
                </CustomView>
                {

                  <CustomView>
                    {chargerCountNotOfframp > 1 && (
                      <StyledButton
                        filled
                        onPress={() => {
                          console.log("HeekoS")
                          console.log(chargerCount)
                          handleRemoveChargerFromQuotation(chargerCount)
                          console.log(chargerCountNotOfframp)
                          setChargerCountValidForQuote(chargerCountValidForQuote - 1);
                          setChargerCountNotOfframp(chargerCountNotOfframp - 1)
                          setCurrentIndex(0);
                          setChargerCount(chargerCount + 1)
                        }}

                        title={'GO TO NEXT CHARGER'}
                      />
                    )}

                  </CustomView>

                }
              </CustomView>
            )
            )
          )
          :
          (
            <CustomView className="flex w-full mt-4  gap-y-4 justify-between">
              <CustomView>
                <StyledButton
                  filled
                  onPress={handleNextClick}
                  title={'CONTINUE'}
                  disabled={chargerCountNotOfframp < 1}
                />
              </CustomView>
              <CustomView>
                <StyledButton
                  onPress={() => {
                    setChargerCountNotOfframp(chargerQuantity)
                    setChargerLocationData([])
                    handlePreviousQuestion();
                  }}
                  disabled={currentIndex === 0 && chargerCount < 1}
                  title={'EDIT RESPONSE'}
                />
              </CustomView>

            </CustomView>
          )
      }

    </Page >
  );








}
export default AdvanceDetails;