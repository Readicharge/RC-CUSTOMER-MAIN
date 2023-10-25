import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const customerSetupSliceInitialState = {
    customer: {

        // Customer Id
        _id:'',

        // General Details 
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        zipCode: '',
        city: '',
        state: null,
        addressLine1: '',
        addressLine2: '',

        // Charger Quantity 
        chargerQuantity: null,


        // Residence Section (R)
        residenceBuilt : '',
        prebuildConditionPanelUpgraded : null,
        residenceOwn : null,
        proceedWithNEMA14_50 : null,

        // // Charger Details : Type (CD1)
        // chargerTypeDetails : [{
        //     purchased : null,
        //     nemaOrHardwired : null,
        //     isHardwiredAndOver80AMP : null,
        //     make : '',
        //     imageUris : []
        // }],
        userPreference:''
    },
    setupPeripherals: {
        currentPage: null,
        stepNumber: 2,
        progress: 1,
    },
    purchasedChargerDetails: {},
    newChargerDetails: {},
    commentsOnProject: '',
    chargerUsage: [],
    cart: {},
    deliveryDetails: {
        billingInfo: null,
        shippingInfo: null,
        priorityDelivery: false,
        shippingSameAsBilling: false,
    },

    
};

const customerSetupSlice = createSlice({
    name: 'customer-setup',
    initialState: customerSetupSliceInitialState,
    reducers: {
     
        updateSetupPeripherals(
            state,
            action
        ) {
            state.setupPeripherals.currentPage = action.payload.currentPage || state.setupPeripherals.currentPage;
        },
        updateCustomer(state, action) {
            state.customer.userPreference = action.payload.userPreference || state.customer.userPreference
            state.customer._id = action.payload._id || state.customer._id;
            state.customer.firstName = action.payload.firstName || state.customer.firstName;
            state.customer.lastName = action.payload.lastName || state.customer.lastName;
            state.customer.email = action.payload.email || state.customer.email;
            state.customer.phoneNumber = action.payload.phoneNumber || state.customer.phoneNumber;
            state.customer.zipCode = action.payload.zipCode || state.customer.zipCode;
            state.customer.city = action.payload.city || state.customer.city;
            state.customer.state = action.payload.state || state.customer.state;
            state.customer.addressLine1 = action.payload.addressLine1 || state.customer.addressLine1;
            state.customer.addressLine2 = action.payload.addressLine2 || state.customer.addressLine2;
            state.customer.chargerQuantity = action.payload.chargerQuantity || state.customer.chargerQuantity;
            // // Residence Section
            state.customer.residenceBuilt = action.payload.residenceBuilt || state.customer.residenceBuilt;
            state.customer.prebuildConditionPanelUpgraded = action.payload.prebuildConditionPanelUpgraded || state.customer.prebuildConditionPanelUpgraded;
            state.customer.residenceOwn = action.payload.residenceOwn || state.customer.residenceOwn;
            state.customer.proceedWithNEMA14_50 = action.payload.proceedWithNEMA14_50 || state.customer.proceedWithNEMA14_50;
            // // Charger etails Type section 
            // state.customer.chargerTypeDetails = action.payload.chargerTypeDetails || state.customer.chargerTypeDetails;
        },
        incrementStepNumber(state) {
            state.setupPeripherals.stepNumber++;
        },
        incrementProgress(state) {
            state.setupPeripherals.progress++;
        },
        updatePurchasedChargerDetails(
            state,
            action
        ) {
            state.purchasedChargerDetails = action.payload;
        },
        updateNewChargerDetails(
            state,
            action
        ) {
            state.newChargerDetails = action.payload;
        },
        updateCommentsOnProject(state, action) {
            state.commentsOnProject = action.payload;
        },
        updateChargerUsage(state, action) {
            state.chargerUsage = action.payload;
        },
        updateCart(
            state,
            action
        ) {
            // state.cart = {};
            state.cart[action.payload.chargerIndex] = action.payload.chargerId;
        },
        updateDeliveryDetails(
            state,
            action
        ) {
            state.deliveryDetails.billingInfo = action.payload.billingInfo || state.deliveryDetails.billingInfo;
            state.deliveryDetails.shippingInfo = action.payload.shippingInfo || state.deliveryDetails.shippingInfo;
            state.deliveryDetails.priorityDelivery =
                action.payload.priorityDelivery || state.deliveryDetails.priorityDelivery;
            state.deliveryDetails.shippingSameAsBilling =
                action.payload.shippingSameAsBilling || state.deliveryDetails.shippingSameAsBilling;
        },
    },
});

export const customerSetupActions = customerSetupSlice.actions;
export const customerSetupReducer = customerSetupSlice.reducer;