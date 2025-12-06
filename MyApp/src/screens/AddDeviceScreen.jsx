import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { Scan, ArrowRight, Check, Upload, Camera } from 'lucide-react-native';
import { useDevice } from '../context/DeviceContext';

const STEPS = {
    IMEI: 0,
    DEVICE_DETAILS: 1,
    CUSTOMER_DETAILS: 2,
};

const AddDeviceScreen = ({ navigation }) => {
    const [currentStep, setCurrentStep] = useState(STEPS.IMEI);
    const { addDevice } = useDevice();

    // Form State
    const [formData, setFormData] = useState({
        imei: '',
        imei2: '',
        serialNumber: '',
        modelName: '',
        ram: '',
        storage: '',
        color: '',
        box: false,
        charger: false,
        bill: false,
        purchasePrice: '',
        sellPrice: '',
        deviceStatus: 'StockIn',
        customerName: '',
        customerAge: '',
        customerGST: '',
        customerContact: '',
        customerAddress: '',
        customerEmail: '',
        documentId: '',
        // Images would be URIs in a real app
        doc1: null,
        doc2: null,
        doc3: null,
        customerPic: null,
    });

    const updateForm = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleNext = async () => {
        if (currentStep === STEPS.IMEI) {
            if (!formData.imei) {
                Alert.alert('Error', 'Please enter or scan IMEI number');
                return;
            }
            setCurrentStep(STEPS.DEVICE_DETAILS);
        } else if (currentStep === STEPS.DEVICE_DETAILS) {
            // Validate required device fields
            if (!formData.modelName || !formData.purchasePrice) {
                Alert.alert('Error', 'Please fill in required device details');
                return;
            }
            setCurrentStep(STEPS.CUSTOMER_DETAILS);
        } else {
            // Submit
            try {
                const deviceData = {
                    ...formData,
                    id: formData.imei || Date.now().toString(),
                    deviceStatus: formData.deviceStatus || 'StockIn',
                    status: formData.deviceStatus === 'StockIn' ? 'In Stock' : 'Out of Stock',
                };
                
                const result = await addDevice(deviceData);
                if (result.success) {
                    Alert.alert('Success', 'Device added successfully!');
                    navigation.goBack();
                } else {
                    Alert.alert('Error', result.error || 'Failed to add device');
                }
            } catch (error) {
                Alert.alert('Error', error.message || 'Failed to add device');
            }
        }
    };

    const renderStepIndicator = () => (
        <View style={styles.stepIndicator}>
            {[0, 1, 2].map((step) => (
                <View key={step} style={styles.stepItem}>
                    <View style={[
                        styles.stepCircle,
                        currentStep >= step && styles.activeStepCircle,
                        currentStep > step && styles.completedStepCircle
                    ]}>
                        {currentStep > step ? (
                            <Check size={16} color={COLORS.white} />
                        ) : (
                            <Text style={[
                                styles.stepNumber,
                                currentStep >= step && styles.activeStepNumber
                            ]}>{step + 1}</Text>
                        )}
                    </View>
                    {step < 2 && <View style={[
                        styles.stepLine,
                        currentStep > step && styles.activeStepLine
                    ]} />}
                </View>
            ))}
        </View>
    );

    const renderIMEIStep = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Scan Device</Text>
            <Text style={styles.stepSubtitle}>Enter or scan the device IMEI number to begin</Text>

            <View style={styles.scanContainer}>
                <TouchableOpacity style={styles.scanButton}>
                    <Scan size={48} color={COLORS.primary} />
                    <Text style={styles.scanButtonText}>Tap to Scan IMEI</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.orText}>OR</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>IMEI Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter IMEI manually"
                    value={formData.imei}
                    onChangeText={(text) => updateForm('imei', text)}
                    keyboardType="numeric"
                />
            </View>
        </View>
    );

    const renderDeviceDetailsStep = () => (
        <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.stepTitle}>Device Details</Text>

            <View style={styles.inputRow}>
                <View style={styles.halfInput}>
                    <Text style={styles.label}>IMEI 1</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.imei}
                        editable={false}
                    />
                </View>
                <View style={styles.halfInput}>
                    <Text style={styles.label}>IMEI 2 (Optional)</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.imei2}
                        onChangeText={(text) => updateForm('imei2', text)}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Model Name</Text>
                <TextInput
                    style={styles.input}
                    value={formData.modelName}
                    onChangeText={(text) => updateForm('modelName', text)}
                />
            </View>

            <View style={styles.inputRow}>
                <View style={styles.halfInput}>
                    <Text style={styles.label}>RAM</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.ram}
                        onChangeText={(text) => updateForm('ram', text)}
                    />
                </View>
                <View style={styles.halfInput}>
                    <Text style={styles.label}>Storage</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.storage}
                        onChangeText={(text) => updateForm('storage', text)}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Color</Text>
                <TextInput
                    style={styles.input}
                    value={formData.color}
                    onChangeText={(text) => updateForm('color', text)}
                />
            </View>

            <Text style={styles.label}>Accessories & Condition</Text>
            <View style={styles.checkboxRow}>
                {['Box', 'Charger', 'Bill'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[
                            styles.checkbox,
                            formData[item.toLowerCase()] && styles.checkboxActive
                        ]}
                        onPress={() => updateForm(item.toLowerCase(), !formData[item.toLowerCase()])}
                    >
                        <Text style={[
                            styles.checkboxText,
                            formData[item.toLowerCase()] && styles.checkboxTextActive
                        ]}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.inputRow}>
                <View style={styles.halfInput}>
                    <Text style={styles.label}>Purchase Price</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.purchasePrice}
                        onChangeText={(text) => updateForm('purchasePrice', text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.halfInput}>
                    <Text style={styles.label}>Sell Price</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.sellPrice}
                        onChangeText={(text) => updateForm('sellPrice', text)}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            <View style={{ height: 100 }} />
        </ScrollView>
    );

    const renderCustomerDetailsStep = () => (
        <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.stepTitle}>Customer Details</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Customer Name</Text>
                <TextInput
                    style={styles.input}
                    value={formData.customerName}
                    onChangeText={(text) => updateForm('customerName', text)}
                />
            </View>

            <View style={styles.inputRow}>
                <View style={styles.halfInput}>
                    <Text style={styles.label}>Contact Number</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.customerContact}
                        onChangeText={(text) => updateForm('customerContact', text)}
                        keyboardType="phone-pad"
                    />
                </View>
                <View style={styles.halfInput}>
                    <Text style={styles.label}>Age</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.customerAge}
                        onChangeText={(text) => updateForm('customerAge', text)}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email ID</Text>
                <TextInput
                    style={styles.input}
                    value={formData.customerEmail}
                    onChangeText={(text) => updateForm('customerEmail', text)}
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={formData.customerAddress}
                    onChangeText={(text) => updateForm('customerAddress', text)}
                    multiline
                />
            </View>

            <Text style={styles.label}>Documents</Text>
            <View style={styles.uploadGrid}>
                {[1, 2, 3].map((num) => (
                    <TouchableOpacity key={num} style={styles.uploadBox}>
                        <Upload size={24} color={COLORS.primary} />
                        <Text style={styles.uploadText}>Doc {num}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.uploadBox}>
                    <Camera size={24} color={COLORS.primary} />
                    <Text style={styles.uploadText}>Photo</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 100 }} />
        </ScrollView>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Device</Text>
                <View style={{ width: 50 }} />
            </View>

            {renderStepIndicator()}

            <View style={styles.contentContainer}>
                {currentStep === STEPS.IMEI && renderIMEIStep()}
                {currentStep === STEPS.DEVICE_DETAILS && renderDeviceDetailsStep()}
                {currentStep === STEPS.CUSTOMER_DETAILS && renderCustomerDetailsStep()}
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>
                        {currentStep === STEPS.CUSTOMER_DETAILS ? 'Submit' : 'Continue'}
                    </Text>
                    <ArrowRight size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 35,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.medium,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    cancelText: {
        color: COLORS.error,
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
        fontWeight: 'bold',
    },
    stepIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.large,
        backgroundColor: COLORS.white,
        marginBottom: SIZES.medium,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stepCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    activeStepCircle: {
        backgroundColor: COLORS.primary,
    },
    completedStepCircle: {
        backgroundColor: COLORS.success,
    },
    stepNumber: {
        color: COLORS.darkGray,
        fontFamily: FONTS.bold,
        fontSize: SIZES.font,
    },
    activeStepNumber: {
        color: COLORS.white,
    },
    stepLine: {
        width: 40,
        height: 2,
        backgroundColor: COLORS.lightGray,
    },
    activeStepLine: {
        backgroundColor: COLORS.success,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: SIZES.medium,
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
        marginBottom: SIZES.small,
        fontWeight: 'bold',
    },
    stepSubtitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.darkGray,
        marginBottom: SIZES.extraLarge,
    },
    scanContainer: {
        alignItems: 'center',
        marginVertical: SIZES.extraLarge,
    },
    scanButton: {
        width: 200,
        height: 200,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
    },
    scanButtonText: {
        marginTop: SIZES.medium,
        color: COLORS.primary,
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
    },
    orText: {
        textAlign: 'center',
        color: COLORS.darkGray,
        fontFamily: FONTS.bold,
        marginVertical: SIZES.medium,
    },
    inputGroup: {
        marginBottom: SIZES.medium,
    },
    label: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.secondary,
        marginBottom: SIZES.base,
        fontWeight: '500',
    },
    input: {
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        fontSize: SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.secondary,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    inputRow: {
        flexDirection: 'row',
        gap: SIZES.medium,
        marginBottom: SIZES.medium,
    },
    halfInput: {
        flex: 1,
    },
    checkboxRow: {
        flexDirection: 'row',
        gap: SIZES.medium,
        marginBottom: SIZES.medium,
    },
    checkbox: {
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.small,
        borderRadius: SIZES.small,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        backgroundColor: COLORS.white,
    },
    checkboxActive: {
        backgroundColor: COLORS.primary + '10',
        borderColor: COLORS.primary,
    },
    checkboxText: {
        color: COLORS.darkGray,
        fontFamily: FONTS.medium,
    },
    checkboxTextActive: {
        color: COLORS.primary,
    },
    uploadGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SIZES.medium,
        marginTop: SIZES.small,
    },
    uploadBox: {
        width: '47%',
        height: 100,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.small,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadText: {
        marginTop: SIZES.small,
        color: COLORS.darkGray,
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
    },
    footer: {
        padding: SIZES.medium,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
    },
    button: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        gap: SIZES.small,
        ...SHADOWS.medium,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONTS.bold,
        fontWeight: 'bold',
    },
});

export default AddDeviceScreen;
