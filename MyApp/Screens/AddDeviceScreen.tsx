import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/globalStyles';

type DeviceData = {
    deviceId: string;
    imeiNumber1: string;
    imeiNumber2: string;
    serialNumber: string;
    modelName: string;
    ram: string;
    storage: string;
    color: string;
    box: boolean;
    charger: boolean;
    bill: boolean;
    purchasePrice: string;
    sellPrice: string;
    deviceStatus: 'stockIn' | 'stockOut';
    };

    export default function AddDeviceScreen() {
        const [deviceData, setDeviceData] = useState<DeviceData>({
        deviceId: '',
        imeiNumber1: '',
        imeiNumber2: '',
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
        deviceStatus: 'stockIn',
        });

        const handleInputChange = (field: keyof DeviceData, value: string | boolean) => {
            setDeviceData(prev => ({ ...prev, [field]: value } as DeviceData));
            };
            
            
            const handleSubmit = () => {
            if (!deviceData.deviceId || !deviceData.imeiNumber1 || !deviceData.modelName) {
            Alert.alert('Error', 'Please fill required fields');
            return;
            }

            console.log('Saving device:', deviceData);
Alert.alert('Success', 'Device added successfully!');
setDeviceData({
deviceId: '',
imeiNumber1: '',
imeiNumber2: '',
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
deviceStatus: 'stockIn',
});
};

return (
    <ScrollView style={[styles.containerScroll, { padding: 16 }]}>
    <View style={{ marginBottom: 16 }}>
    <Text style={styles.formTitle}>Add New Device</Text>
    <Text style={styles.formSubtitle}>Fill in device details to add to inventory</Text>
    </View>
    
    
    <View style={styles.formCard}>
    <Text style={styles.cardSectionTitle}>Device Information</Text>
    
    
    <View style={styles.formGroup}>
    <Text style={styles.label}>Device ID *</Text>
    <TextInput
    style={styles.input}
    value={deviceData.deviceId}
    onChangeText={(v) => handleInputChange('deviceId', v)}
    placeholder="Enter device ID"
    />
    </View>
    <View style={styles.row}>
<View style={styles.flex1}>
<Text style={styles.label}>IMEI Number 1 *</Text>
<TextInput
style={styles.input}
value={deviceData.imeiNumber1}
onChangeText={(v) => handleInputChange('imeiNumber1', v)}
placeholder="Enter IMEI number"
/>
</View>
<View style={[styles.flex1, { marginLeft: 8 }]}>
<Text style={styles.label}>IMEI Number 2</Text>
<TextInput
style={styles.input}
value={deviceData.imeiNumber2}
onChangeText={(v) => handleInputChange('imeiNumber2', v)}
placeholder="Enter IMEI number"
/>
</View>
</View>

<View style={styles.formGroup}>
<Text style={styles.label}>Serial Number</Text>
<TextInput
style={styles.input}
value={deviceData.serialNumber}
onChangeText={(v) => handleInputChange('serialNumber', v)}
placeholder="Enter serial number"
/>
</View>


<View style={styles.formGroup}>
<Text style={styles.label}>Model Name *</Text>
<TextInput
style={styles.input}
value={deviceData.modelName}
onChangeText={(v) => handleInputChange('modelName', v)}
placeholder="Enter model name"
/>
</View>
</View>

<View style={styles.formCard}>
<Text style={styles.cardSectionTitle}>Specifications</Text>


<View style={styles.row}>
<View style={styles.flex1}>
<Text style={styles.label}>RAM</Text>
<TextInput
style={styles.input}
value={deviceData.ram}
onChangeText={(v) => handleInputChange('ram', v)}
placeholder="e.g., 8GB"
/>
</View>
<View style={[styles.flex1, { marginLeft: 8 }]}>
<Text style={styles.label}>Storage</Text>
<TextInput
style={styles.input}
value={deviceData.storage}
onChangeText={(v) => handleInputChange('storage', v)}
placeholder="e.g., 128GB"
/>
</View>
</View>
<View style={styles.formGroup}>
<Text style={styles.label}>Color</Text>
<TextInput
style={styles.input}
value={deviceData.color}
onChangeText={(v) => handleInputChange('color', v)}
placeholder="Enter color"
/>
</View>
</View>

<View style={styles.formCard}>
<Text style={styles.cardSectionTitle}>Accessories</Text>


<View style={styles.rowBetween}>
<Text style={styles.label}>Box</Text>
<TouchableOpacity
style={[
styles.toggle,
deviceData.box ? styles.toggleOn : styles.toggleOff,
]}
onPress={() => handleInputChange('box', !deviceData.box)}
>
<View style={[styles.toggleDot, deviceData.box && styles.toggleDotOn]} />
</TouchableOpacity>
</View>

<View style={[styles.rowBetween, { marginTop: 12 }]}>
<Text style={styles.label}>Charger</Text>
<TouchableOpacity
style={[
styles.toggle,
deviceData.charger ? styles.toggleOn : styles.toggleOff,
]}
onPress={() => handleInputChange('charger', !deviceData.charger)}
>
<View style={[styles.toggleDot, deviceData.charger && styles.toggleDotOn]} />
</TouchableOpacity>
</View>



<View style={[styles.rowBetween, { marginTop: 12 }]}>
<Text style={styles.label}>Bill</Text>
<TouchableOpacity
style={[
styles.toggle,
deviceData.bill ? styles.toggleOn : styles.toggleOff,
]}
onPress={() => handleInputChange('bill', !deviceData.bill)}
>
<View style={[styles.toggleDot, deviceData.bill && styles.toggleDotOn]} />
</TouchableOpacity>
</View>
</View>
<View style={styles.formCard}>
<Text style={styles.cardSectionTitle}>Pricing</Text>


<View style={styles.row}>
<View style={styles.flex1}>
<Text style={styles.label}>Purchase Price ($)</Text>
<TextInput
style={styles.input}
value={deviceData.purchasePrice}
onChangeText={(v) => handleInputChange('purchasePrice', v)}
placeholder="Enter purchase price"
keyboardType="numeric"
/>
</View>
<View style={[styles.flex1, { marginLeft: 8 }]}>
<Text style={styles.label}>Sell Price ($)</Text>
<TextInput
style={styles.input}
value={deviceData.sellPrice}
onChangeText={(v) => handleInputChange('sellPrice', v)}
placeholder="Enter selling price"
keyboardType="numeric"
/>
</View>
</View>
<View style={{ marginTop: 12 }}>
<Text style={styles.label}>Device Status</Text>
<View style={styles.statusRow}>
<TouchableOpacity
style={[
styles.statusButton,
deviceData.deviceStatus === 'stockIn' ? styles.statusIn : styles.statusOff,
{ borderTopRightRadius: 0, borderBottomRightRadius: 0 },
]}
onPress={() => handleInputChange('deviceStatus', 'stockIn')}
>
<Text style={deviceData.deviceStatus === 'stockIn' ? styles.statusTextOn : styles.statusTextOff}>Stock In</Text>
</TouchableOpacity>
<TouchableOpacity
style={[
styles.statusButton,
deviceData.deviceStatus === 'stockOut' ? styles.statusOut : styles.statusOff,
{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
]}
onPress={() => handleInputChange('deviceStatus', 'stockOut')}
>
<Text style={deviceData.deviceStatus === 'stockOut' ? styles.statusTextOn : styles.statusTextOff}>Stock Out</Text>
</TouchableOpacity>
</View>
</View>
</View>
<View style={styles.formActions}>
<TouchableOpacity style={[styles.actionBtn, styles.actionCancel]} onPress={() => { /* Could navigate back */ }}>
<Text style={styles.actionCancelText}>Cancel</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.actionBtn, styles.actionSave]} onPress={handleSubmit}>
<Text style={styles.actionSaveText}>Save Device</Text>
</TouchableOpacity>
</View>
</ScrollView>
);
}