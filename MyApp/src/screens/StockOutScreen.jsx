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
import { Scan, ArrowRight, Check, Upload, Camera, DollarSign, User } from 'lucide-react-native';
import { useDevice } from '../context/DeviceContext';

const STEPS = {
    IMEI: 0,
    VERIFY_DEVICE: 1,
    SALE_DETAILS: 2,
};

const StockOutScreen = ({ navigation }) => {
    const [currentStep, setCurrentStep] = useState(STEPS.IMEI);
    const { devices, searchDevices, updateDevice } = useDevice();
    const [foundDevice, setFoundDevice] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        imei: '',
        // Device details (populated after IMEI scan)
        modelName: '',
        ram: '',
        storage: '',
        color: '',
        purchasePrice: '',
        deviceId: null,

        // Sale details
        sellPrice: '',
        discount: '',
        finalPrice: '',
        paymentMode: 'Cash',

        // Customer details
        customerName: '',
        customerContact: '',
        customerEmail: '',
        invoiceDate: new Date().toLocaleDateString(),
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
            // Search for device by IMEI
            const results = await searchDevices(formData.imei);
            const device = results.find(d => d.imei === formData.imei);
            
            if (device && device.deviceStatus === 'StockIn') {
                setFoundDevice(device);
                setFormData(prev => ({
                    ...prev,
                    modelName: device.modelName || '',
                    ram: device.ram || '',
                    storage: device.storage || '',
                    color: device.color || '',
                    purchasePrice: device.purchasePrice || '',
                    deviceId: device.id,
                }));
                setCurrentStep(STEPS.VERIFY_DEVICE);
            } else if (device && device.deviceStatus === 'StockOut') {
                Alert.alert('Error', 'This device has already been sold');
            } else {
                Alert.alert('Error', 'Device not found in inventory');
            }
        } else if (currentStep === STEPS.VERIFY_DEVICE) {
            setCurrentStep(STEPS.SALE_DETAILS);
        } else {
            // Submit sale
            if (!formData.sellPrice || !formData.customerName) {
                Alert.alert('Error', 'Please fill in required sale details');
                return;
            }
            
            try {
                // Calculate final price
                const sellPrice = parseFloat(formData.sellPrice) || 0;
                const discount = parseFloat(formData.discount) || 0;
                const finalPrice = sellPrice - discount;

                // Update device status to StockOut
                if (formData.deviceId) {
                    const result = await updateDevice(formData.deviceId, {
                        deviceStatus: 'StockOut',
                        status: 'Out of Stock',
                        sellPrice: finalPrice.toString(),
                        customerName: formData.customerName,
                        customerContact: formData.customerContact,
                        customerEmail: formData.customerEmail,
                        saleDate: new Date().toISOString(),
                        paymentMode: formData.paymentMode,
                    });

                    if (result.success) {
                        Alert.alert('Success', 'Stock Out processed successfully!');
                        navigation.goBack();
                    } else {
                        Alert.alert('Error', result.error || 'Failed to process stock out');
                    }
                } else {
                    Alert.alert('Error', 'Device ID not found');
                }
            } catch (error) {
                Alert.alert('Error', error.message || 'Failed to process stock out');
            }
        }
    };

    const renderStepIndicator = () => (
        <View style={styles.stepIndicator}>
            {['Scan', 'Verify', 'Sale'].map((label, step) => (
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
                    <Text style={[
                        styles.stepLabel,
                        currentStep >= step && styles.activeStepLabel
                    ]}>{label}</Text>
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
            <Text style={styles.stepTitle}>Find Device</Text>
            <Text style={styles.stepSubtitle}>Scan the device IMEI to process stock out</Text>

            <View style={styles.scanContainer}>
                <TouchableOpacity style={styles.scanButton}>
                    <Scan size={48} color={COLORS.error} />
                    <Text style={[styles.scanButtonText, { color: COLORS.error }]}>Tap to Scan IMEI</Text>
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

    const renderVerifyDeviceStep = () => (
        <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.stepTitle}>Verify Device</Text>
            <Text style={styles.stepSubtitle}>Confirm this is the correct device</Text>

            <View style={styles.deviceCard}>
                <View style={styles.deviceHeader}>
                    <Text style={styles.deviceName}>{formData.modelName}</Text>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>In Stock</Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>IMEI:</Text>
                    <Text style={styles.detailValue}>{formData.imei}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Color:</Text>
                    <Text style={styles.detailValue}>{formData.color}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Specs:</Text>
                    <Text style={styles.detailValue}>{formData.ram} / {formData.storage}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Purchase Price:</Text>
                    <Text style={styles.detailValue}>${formData.purchasePrice}</Text>
                </View>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                    Please ensure the device physical condition matches the system records before proceeding.
                </Text>
            </View>
        </ScrollView>
    );

    const renderSaleDetailsStep = () => (
        <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.stepTitle}>Sale Details</Text>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Pricing</Text>
                <View style={styles.inputRow}>
                    <View style={styles.halfInput}>
                        <Text style={styles.label}>Selling Price</Text>
                        <View style={styles.iconInput}>
                            <DollarSign size={20} color={COLORS.gray} />
                            <TextInput
                                style={styles.inputFlex}
                                value={formData.sellPrice}
                                onChangeText={(text) => updateForm('sellPrice', text)}
                                keyboardType="numeric"
                                placeholder="0.00"
                            />
                        </View>
                    </View>
                    <View style={styles.halfInput}>
                        <Text style={styles.label}>Discount</Text>
                        <View style={styles.iconInput}>
                            <DollarSign size={20} color={COLORS.gray} />
                            <TextInput
                                style={styles.inputFlex}
                                value={formData.discount}
                                onChangeText={(text) => updateForm('discount', text)}
                                keyboardType="numeric"
                                placeholder="0.00"
                            />
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Customer Info</Text>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Customer Name</Text>
                    <View style={styles.iconInput}>
                        <User size={20} color={COLORS.gray} />
                        <TextInput
                            style={styles.inputFlex}
                            value={formData.customerName}
                            onChangeText={(text) => updateForm('customerName', text)}
                            placeholder="Enter name"
                        />
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contact Number</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.customerContact}
                        onChangeText={(text) => updateForm('customerContact', text)}
                        keyboardType="phone-pad"
                        placeholder="Enter phone number"
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Payment Mode</Text>
                <View style={styles.paymentOptions}>
                    {['Cash', 'Card', 'UPI', 'Due'].map((mode) => (
                        <TouchableOpacity
                            key={mode}
                            style={[
                                styles.paymentOption,
                                formData.paymentMode === mode && styles.paymentOptionActive
                            ]}
                            onPress={() => updateForm('paymentMode', mode)}
                        >
                            <Text style={[
                                styles.paymentText,
                                formData.paymentMode === mode && styles.paymentTextActive
                            ]}>{mode}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
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
                <Text style={styles.headerTitle}>Stock Out</Text>
                <View style={{ width: 50 }} />
            </View>

            {renderStepIndicator()}

            <View style={styles.contentContainer}>
                {currentStep === STEPS.IMEI && renderIMEIStep()}
                {currentStep === STEPS.VERIFY_DEVICE && renderVerifyDeviceStep()}
                {currentStep === STEPS.SALE_DETAILS && renderSaleDetailsStep()}
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: COLORS.error }]}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>
                        {currentStep === STEPS.SALE_DETAILS ? 'Confirm Sale' : 'Continue'}
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
        paddingTop: 30,
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
        color: COLORS.darkGray,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.extraLarge,
        paddingVertical: SIZES.large,
        backgroundColor: COLORS.white,
        marginBottom: SIZES.medium,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    stepCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    activeStepCircle: {
        backgroundColor: COLORS.error,
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
    stepLabel: {
        marginLeft: SIZES.small,
        fontSize: SIZES.small,
        fontFamily: FONTS.medium,
        color: COLORS.darkGray,
        display: 'none', // Hide label for cleaner look if needed, or remove this line
    },
    activeStepLabel: {
        color: COLORS.error,
    },
    stepLine: {
        width: 60,
        height: 2,
        backgroundColor: COLORS.lightGray,
        position: 'absolute',
        left: 32,
        zIndex: 1,
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
        backgroundColor: '#FFEBEE',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.error,
        borderStyle: 'dashed',
    },
    scanButtonText: {
        marginTop: SIZES.medium,
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
    deviceCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium,
        padding: SIZES.medium,
        ...SHADOWS.light,
        marginBottom: SIZES.medium,
    },
    deviceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.medium,
        paddingBottom: SIZES.medium,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    deviceName: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
    },
    statusBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: SIZES.small,
        paddingVertical: 4,
        borderRadius: SIZES.small,
    },
    statusText: {
        color: COLORS.success,
        fontSize: SIZES.small,
        fontFamily: FONTS.medium,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZES.small,
    },
    detailLabel: {
        color: COLORS.darkGray,
        fontFamily: FONTS.medium,
    },
    detailValue: {
        color: COLORS.secondary,
        fontFamily: FONTS.bold,
    },
    infoBox: {
        backgroundColor: '#E3F2FD',
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        marginBottom: SIZES.medium,
    },
    infoText: {
        color: '#1976D2',
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        lineHeight: 20,
    },
    section: {
        marginBottom: SIZES.large,
    },
    sectionHeader: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
        marginBottom: SIZES.medium,
    },
    inputRow: {
        flexDirection: 'row',
        gap: SIZES.medium,
    },
    halfInput: {
        flex: 1,
    },
    iconInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: SIZES.small,
        paddingHorizontal: SIZES.medium,
    },
    inputFlex: {
        flex: 1,
        paddingVertical: SIZES.medium,
        marginLeft: SIZES.small,
        fontSize: SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.secondary,
    },
    paymentOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SIZES.small,
    },
    paymentOption: {
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.small,
        borderRadius: SIZES.large,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        backgroundColor: COLORS.white,
    },
    paymentOptionActive: {
        backgroundColor: COLORS.error,
        borderColor: COLORS.error,
    },
    paymentText: {
        color: COLORS.darkGray,
        fontFamily: FONTS.medium,
    },
    paymentTextActive: {
        color: COLORS.white,
    },
    footer: {
        padding: SIZES.medium,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
    },
    button: {
        backgroundColor: COLORS.error,
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

export default StockOutScreen;
