import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    IBank,
    IBond,
    ICompany,
    IInstaller,
    IInstallerSetupPeripherals,
    IInstallerSetupSliceInitialState,
    IInsurance,
    ILicense,
    IUser,
} from '../type';

const installerSetupSliceInitialState: IInstallerSetupSliceInitialState = {
    installer: {
        user: {
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            password: '',
            state: null,
            profilePictureFile: null,
            experience: null,
            profileDescription: '',
        },
        company: {
            name: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: null,
            zip: '',
        },
        license: {
            licenseNumber: '',
            expirationDate: '',
            licenseFile: null,
        },
        insurance: {
            state: null,
            companyName: '',
            insuranceNumber: '',
            agencyName: '',
            agentMobile: '',
            policyNumber: '',
            startDate: '',
            endDate: '',
            insuranceCertificateFile: null,
        },
        bonding: {
            companyName: '',
            agencyName: '',
            agentMobile: '',
            policyNumber: '',
            bondAmount: '',
            startDate: '',
            endDate: '',
            bondCertificateFile: null,
        },
        bank: {
            firstName: '',
            lastName: '',
            accountNumber: '',
            routingNumber: '',
            ssn: '',
            dob: '',
            confirmRoutingNumber: '',
        },
        installations: [0],
        serviceArea: null,
        installationServices: [1],
        selectedAddons: [],
        recurringSchedule: [],
        exceptionalDays: [],
    },
    setupPeripherals: {
        currentPage: null,
        progress: 1,
        stepNumber: 1,
    },
};

const installerSetupSlice = createSlice({
    name: 'installer-setup',
    initialState: installerSetupSliceInitialState,
    reducers: {
        incrementProgress(state: IInstallerSetupSliceInitialState) {
            state.setupPeripherals.progress++;
        },
        updateSetupPeripherals(
            state: IInstallerSetupSliceInitialState,
            action: PayloadAction<Partial<IInstallerSetupPeripherals>>,
        ) {
            state.setupPeripherals.currentPage = action.payload.currentPage
                ? action.payload.currentPage
                : state.setupPeripherals.currentPage;
            state.setupPeripherals.stepNumber = action.payload.stepNumber
                ? action.payload.stepNumber
                : state.setupPeripherals.stepNumber;
        },
        updateInstallerUser(state: IInstallerSetupSliceInitialState, action: PayloadAction<Partial<IUser>>) {
            state.installer.user._id = action.payload._id ? action.payload._id : state.installer.user._id;
            state.installer.user.firstName = action.payload.firstName
                ? action.payload.firstName
                : state.installer.user.firstName;
            state.installer.user.lastName = action.payload.lastName
                ? action.payload.lastName
                : state.installer.user.lastName;
            state.installer.user.email = action.payload.email ? action.payload.email : state.installer.user.email;
            state.installer.user.mobile = action.payload.mobile ? action.payload.mobile : state.installer.user.mobile;
            state.installer.user.password = action.payload.password
                ? action.payload.password
                : state.installer.user.password;
            state.installer.user.state = action.payload.state ? action.payload.state : state.installer.user.state;
            state.installer.user.profilePictureFile = action.payload.profilePictureFile
                ? action.payload.profilePictureFile
                : state.installer.user.profilePictureFile;
            state.installer.user.experience = action.payload.experience
                ? action.payload.experience
                : state.installer.user.experience;
            state.installer.user.profileDescription = action.payload.profileDescription
                ? action.payload.profileDescription
                : state.installer.user.profileDescription;
        },
        updateInstallerCompany(state: IInstallerSetupSliceInitialState, action: PayloadAction<Partial<ICompany>>) {
            state.installer.company.name = action.payload.name ? action.payload.name : state.installer.company.name;
            state.installer.company.addressLine1 = action.payload.addressLine1
                ? action.payload.addressLine1
                : state.installer.company.addressLine1;
            state.installer.company.addressLine2 = action.payload.addressLine2
                ? action.payload.addressLine2
                : state.installer.company.addressLine2;
            state.installer.company.taxId = action.payload.taxId ? action.payload.taxId : state.installer.company.taxId;
            state.installer.company.city = action.payload.city ? action.payload.city : state.installer.company.city;
            state.installer.company.state = action.payload.state ? action.payload.state : state.installer.company.state;
            state.installer.company.zip = action.payload.zip ? action.payload.zip : state.installer.company.zip;
        },
        updateInstallerLicense(state: IInstallerSetupSliceInitialState, action: PayloadAction<Partial<ILicense>>) {
            state.installer.license.licenseNumber = action.payload.licenseNumber
                ? action.payload.licenseNumber
                : state.installer.license.licenseNumber;
            state.installer.license.expirationDate = action.payload.expirationDate
                ? action.payload.expirationDate
                : state.installer.license.expirationDate;
            state.installer.license.licenseFile = action.payload.licenseFile
                ? action.payload.licenseFile
                : state.installer.license.licenseFile;
        },
        updateInstallerInsurance(state: IInstallerSetupSliceInitialState, action: PayloadAction<Partial<IInsurance>>) {
            state.installer.insurance.insuranceNumber = action.payload.insuranceNumber
                ? action.payload.insuranceNumber
                : state.installer.insurance.insuranceNumber;
            state.installer.insurance.state = action.payload.state
                ? action.payload.state
                : state.installer.insurance.state;
            state.installer.insurance.companyName = action.payload.companyName
                ? action.payload.companyName
                : state.installer.insurance.companyName;
            state.installer.insurance.agencyName = action.payload.agencyName
                ? action.payload.agencyName
                : state.installer.insurance.agencyName;
            state.installer.insurance.agentMobile = action.payload.agentMobile
                ? action.payload.agentMobile
                : state.installer.insurance.agentMobile;
            state.installer.insurance.policyNumber = action.payload.policyNumber
                ? action.payload.policyNumber
                : state.installer.insurance.policyNumber;
            state.installer.insurance.startDate = action.payload.startDate
                ? action.payload.startDate
                : state.installer.insurance.startDate;
            state.installer.insurance.endDate = action.payload.endDate
                ? action.payload.endDate
                : state.installer.insurance.endDate;
            state.installer.insurance.insuranceCertificateFile = action.payload.insuranceCertificateFile
                ? action.payload.insuranceCertificateFile
                : state.installer.insurance.insuranceCertificateFile;
        },
        updateInstallerBond(state: IInstallerSetupSliceInitialState, action: PayloadAction<Partial<IBond>>) {
            state.installer.bonding.companyName = action.payload.companyName
                ? action.payload.companyName
                : state.installer.bonding.companyName;
            state.installer.bonding.agencyName = action.payload.agencyName
                ? action.payload.agencyName
                : state.installer.bonding.agencyName;
            state.installer.bonding.agentMobile = action.payload.agentMobile
                ? action.payload.agentMobile
                : state.installer.bonding.agentMobile;
            state.installer.bonding.policyNumber = action.payload.policyNumber
                ? action.payload.policyNumber
                : state.installer.bonding.policyNumber;
            state.installer.bonding.bondAmount = action.payload.bondAmount
                ? action.payload.bondAmount
                : state.installer.bonding.bondAmount;
            state.installer.bonding.startDate = action.payload.startDate
                ? action.payload.startDate
                : state.installer.bonding.startDate;
            state.installer.bonding.endDate = action.payload.endDate
                ? action.payload.endDate
                : state.installer.bonding.endDate;
            state.installer.bonding.bondCertificateFile = action.payload.bondCertificateFile
                ? action.payload.bondCertificateFile
                : state.installer.bonding.bondCertificateFile;
        },
        updateInstallerBank(state: IInstallerSetupSliceInitialState, action: PayloadAction<Partial<IBank>>) {
            state.installer.bank.accountNumber = action.payload.accountNumber
                ? action.payload.accountNumber
                : state.installer.bank.accountNumber;
            state.installer.bank.routingNumber = action.payload.routingNumber
                ? action.payload.routingNumber
                : state.installer.bank.routingNumber;
            state.installer.bank.firstName = action.payload.firstName
                ? action.payload.firstName
                : state.installer.bank.firstName;
            state.installer.bank.lastName = action.payload.lastName
                ? action.payload.lastName
                : state.installer.bank.lastName;
        },
        updateInstaller(state: IInstallerSetupSliceInitialState, action: PayloadAction<Partial<IInstaller>>) {
            state.installer.installations = action.payload.installations
                ? action.payload.installations
                : state.installer.installations;
            state.installer.serviceArea = action.payload.serviceArea
                ? action.payload.serviceArea
                : state.installer.serviceArea;
            state.installer.installationServices = action.payload.installationServices
                ? action.payload.installationServices
                : state.installer.installationServices;
            state.installer.selectedAddons = action.payload.selectedAddons
                ? action.payload.selectedAddons
                : state.installer.selectedAddons;
            state.installer.recurringSchedule = action.payload.recurringSchedule
                ? action.payload.recurringSchedule
                : state.installer.recurringSchedule;
            state.installer.exceptionalDays = action.payload.exceptionalDays
                ? action.payload.exceptionalDays
                : state.installer.exceptionalDays;
        },
    },
});

export const installerSetupActions = installerSetupSlice.actions;
export const installerSetupReducer = installerSetupSlice.reducer;
