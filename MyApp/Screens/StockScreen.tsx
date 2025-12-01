import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/globalStyles';

export default function StockScreen() {
    return (
    <ScrollView style={styles.containerScroll}>
    <View style={{ padding: 16 }}>
    <Text style={styles.formTitle}>Stock Overview</Text>
    <Text style={styles.formSubtitle}>Current inventory status</Text>
    </View>
    
    
    <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
    <View style={styles.row}>
    <View style={[styles.smallCard, { marginRight: 8 }]}>
    <Text style={styles.smallCardLabel}>Total Devices</Text>
    <Text style={styles.smallCardNumber}>24</Text>
    </View>
    <View style={[styles.smallCard, { marginHorizontal: 4 }]}>
    <Text style={styles.smallCardLabel}>In Stock</Text>
    <Text style={[styles.smallCardNumber, { color: '#8BC34A' }]}>12</Text>
    </View>
    <View style={[styles.smallCard, { marginLeft: 8 }]}>
    <Text style={styles.smallCardLabel}>Sold</Text>
    <Text style={[styles.smallCardNumber, { color: '#FF9800' }]}>9</Text>
    </View>
    </View>
    </View>

    <View style={[styles.formCard, { marginHorizontal: 16 }]}>
<View style={styles.sectionHeader}>
<Text style={styles.cardSectionTitle}>Stock Status</Text>
<TouchableOpacity>
<Text style={styles.linkText}>View Report</Text>
</TouchableOpacity>
</View>


<View style={styles.progressRow}>
<View style={styles.progressItem}>
<View style={styles.progressRowTop}>
<Text style={styles.progressLabel}>iPhone 14 Pro</Text>
<Text style={styles.progressCount}>8 in stock</Text>
</View>
<View style={styles.progressBar}>
<View style={[styles.progressFill, { width: '80%', backgroundColor: '#8BC34A' }]} />
</View>
</View>


<View style={styles.progressItem}>
<View style={styles.progressRowTop}>
<Text style={styles.progressLabel}>Samsung Galaxy S23</Text>
<Text style={styles.progressCount}>5 in stock</Text>
</View>
<View style={styles.progressBar}>
<View style={[styles.progressFill, { width: '40%', backgroundColor: '#FF9800' }]} />
</View>
</View>


<View style={styles.progressItem}>
<View style={styles.progressRowTop}>
<Text style={styles.progressLabel}>Google Pixel 7</Text>
<Text style={styles.progressCount}>3 in stock</Text>
</View>
<View style={styles.progressBar}>
<View style={[styles.progressFill, { width: '20%', backgroundColor: '#03A9F4' }]} />
</View>
</View>
</View>
</View>
</ScrollView>
);
}