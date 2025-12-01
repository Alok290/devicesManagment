import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/globalStyles';

export default function SearchScreen() {
    return (
    <View style={styles.containerScroll}>
    <View style={styles.section}>
    <View style={{ marginBottom: 12 }}>
    <Text style={styles.formTitle}>Search Inventory</Text>
    <Text style={styles.formSubtitle}>Find devices by ID, model, or status</Text>
    </View>
    
    
    <View style={[styles.formCard, { marginBottom: 12 }]}>
    <TextInput style={styles.input} placeholder="Search by device ID, model, etc." />
    </View>
    
    
    <View style={styles.formCard}>
    <Text style={styles.cardSectionTitle}>Filter Options</Text>
    <View style={styles.row}>
    <View style={styles.flex1}>
    <Text style={styles.label}>Status</Text>
    <View style={styles.fakeSelect}>
    <Text style={styles.fakeSelectText}>All Statuses</Text>
    </View>
    </View>
    <View style={[styles.flex1, { marginLeft: 8 }]}>
    <Text style={styles.label}>Model</Text>
    <View style={styles.fakeSelect}>
    <Text style={styles.fakeSelectText}>All Models</Text>
    </View>
    </View>
    </View>
    
    
    <TouchableOpacity style={[styles.actionBtn, { marginTop: 12, backgroundColor: '#03A9F4' }]}>
    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700' }}>Apply Filters</Text>
    </TouchableOpacity>
    </View>
    </View>
    </View>
    );
    }