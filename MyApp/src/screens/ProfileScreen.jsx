import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { User, Settings, LogOut, Shield, Smartphone, Trash2 } from 'lucide-react-native';

const ProfileScreen = () => {
    const { userRole, logout } = useAuth();

    const renderMenuItem = (icon, title, subtitle, onPress, isDestructive = false) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={[styles.menuIcon, isDestructive && styles.destructiveIcon]}>
                {icon}
            </View>
            <View style={styles.menuTextContainer}>
                <Text style={[styles.menuTitle, isDestructive && styles.destructiveText]}>{title}</Text>
                {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <User size={40} color={COLORS.primary} />
                </View>
                <Text style={styles.userName}>{userRole === 'manager' ? 'Manager' : 'Team Member'}</Text>
                <Text style={styles.userRole}>{userRole === 'manager' ? 'Administrator' : 'Staff'}</Text>
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.sectionTitle}>Account Settings</Text>

                {renderMenuItem(<Settings size={24} color={COLORS.secondary} />, 'General Settings', 'App preferences and notifications')}

                {userRole === 'manager' && (
                    <>
                        <Text style={styles.sectionTitle}>Management</Text>
                        {renderMenuItem(<Smartphone size={24} color={COLORS.secondary} />, 'Manage Items', 'Add, view, and edit inventory')}
                        {renderMenuItem(<Trash2 size={24} color={COLORS.error} />, 'Delete Items', 'Remove items from inventory', () => { }, true)}
                    </>
                )}

                <Text style={styles.sectionTitle}>Session</Text>
                {renderMenuItem(<LogOut size={24} color={COLORS.error} />, 'Logout', null, logout, true)}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 40,
    },
    header: {
        padding: SIZES.extraLarge,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.medium,
    },
    userName: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
        fontWeight: 'bold',
    },
    userRole: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.darkGray,
        marginTop: 4,
    },
    content: {
        flex: 1,
        padding: SIZES.medium,
    },
    sectionTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.bold,
        color: COLORS.darkGray,
        marginTop: SIZES.large,
        marginBottom: SIZES.small,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
        borderRadius: SIZES.medium,
        marginBottom: SIZES.small,
        ...SHADOWS.light,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.medium,
    },
    destructiveIcon: {
        backgroundColor: COLORS.error + '10',
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.medium,
        color: COLORS.secondary,
        fontWeight: '600',
    },
    destructiveText: {
        color: COLORS.error,
    },
    menuSubtitle: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.darkGray,
        marginTop: 2,
    },
});

export default ProfileScreen;
