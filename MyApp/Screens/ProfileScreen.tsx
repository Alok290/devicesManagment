import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../styles/globalStyles';



export default function ProfileScreen() {
    return (
    <ScrollView style={styles.containerScroll}>
    <View style={styles.profileHeader}>
    <View style={styles.profileAvatar}>
    <Icon name="user" size={48} color="white" />
    </View>
    <Text style={styles.profileName}>John Doe</Text>
    <Text style={styles.profileRole}>Administrator</Text>
    </View>
    
    
    <View style={[styles.formCard, { marginHorizontal: 16 }]}>
    <Text style={styles.cardSectionTitle}>Account Information</Text>
    
    
    <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>User ID</Text>
    <Text style={styles.infoValue}>USR-2023-001</Text>
    </View>
    
    
    <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>Email</Text>
    <Text style={styles.infoValue}>john.doe@example.com</Text>
    </View>
    
    
    <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>Phone</Text>
    <Text style={styles.infoValue}>+1 (555) 123-4567</Text>
    </View>
    
    
    <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>Role</Text>
    <Text style={styles.infoValue}>Administrator</Text>
    </View>
    </View>
    <View style={[styles.formCard, { margin: 16 }]}>
<Text style={styles.cardSectionTitle}>Preferences</Text>


<View style={[styles.infoRow, { marginBottom: 12 }]}>
<Text style={styles.infoLabel}>Notifications</Text>
<TouchableOpacity style={[styles.toggle, styles.toggleOn]}>
<View style={[styles.toggleDot, styles.toggleDotOn]} />
</TouchableOpacity>
</View>


<View style={[styles.infoRow, { marginBottom: 12 }]}>
<Text style={styles.infoLabel}>Dark Mode</Text>
<TouchableOpacity style={[styles.toggle, styles.toggleOff]}>
<View style={styles.toggleDot} />
</TouchableOpacity>
</View>


<View style={styles.infoRow}>
<Text style={styles.infoLabel}>Language</Text>
<Text style={styles.infoValue}>English</Text>
</View>
</View>
</ScrollView>
);
}