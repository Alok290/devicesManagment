import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { Bell, TrendingUp, Package, AlertTriangle, XCircle, ArrowUpRight, PlusCircle, MinusCircle, ShoppingBag, PenTool, ArrowRight, LogOut, Search } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { useDevice } from '../context/DeviceContext';

const HomeScreen = ({ navigation }) => {
    const { userRole, logout } = useAuth();
    const { statistics, devices, refreshData } = useDevice();

    useEffect(() => {
        refreshData();
    }, []);

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                        style={styles.avatar}
                    />
                </View>
                <View>
                    <Text style={styles.greeting}>GOOD MORNING! ^-^</Text>
                    <Text style={styles.username}>Mark 👋</Text>
                </View>
            </View>
            <View style={styles.headerRight}>

                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
                    <Search size={20} color={COLORS.secondary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Bell size={20} color={COLORS.secondary} />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>2</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    // Staff Header
    const renderStaffHeader = () => (
        <View style={styles.header}>
            <View>
                <Text style={styles.greeting}>Welcome Back</Text>
                <Text style={styles.username}>Staff Member</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: SIZES.small }}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
                    <Search size={20} color={COLORS.secondary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={logout}>
                    <LogOut size={20} color={COLORS.error} />
                </TouchableOpacity>
            </View>
        </View>
    );

    // Manager Dashboard Components
    const renderManagerDashboard = () => (
        <>
            <View style={styles.cardsGrid}>
                {/* Total Stock Value Card */}
                <LinearGradient
                    colors={[COLORS.primary, '#2E7D32']} // Updated to Primary Green
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    style={[styles.card, styles.purpleCard]}
                >
                    <View style={styles.cardHeader}>
                        <View style={styles.iconCircleWhite}>
                            <TrendingUp size={20} color={COLORS.primary} />
                        </View>
                        <View style={styles.pillWhite}>
                            <Text style={styles.pillTextPurple}>Weekly ▼</Text>
                        </View>
                    </View>
                    <Text style={styles.cardValueWhite}>${statistics.totalValue.toLocaleString()}</Text>
                    <View style={styles.cardFooter}>
                        <Text style={styles.cardLabelWhite}>Total Value</Text>
                        <ArrowUpRight size={20} color={COLORS.white} />
                    </View>
                </LinearGradient>

                {/* Total Stock Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.iconCircle, { backgroundColor: '#E8F5E9' }]}>
                            <Package size={20} color={COLORS.success} />
                        </View>
                        <View style={styles.pill}>
                            <Text style={styles.pillText}>Total ▼</Text>
                        </View>
                    </View>
                    <Text style={styles.cardValue}>{statistics.totalDevices}</Text>
                    <View style={styles.cardFooter}>
                        <Text style={styles.cardLabel}>Total Devices</Text>
                        <ArrowUpRight size={20} color={COLORS.secondary} />
                    </View>
                </View>

                {/* Out of Stock Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.iconCircle, { backgroundColor: '#FFEBEE' }]}>
                            <XCircle size={20} color={COLORS.error} />
                        </View>
                        <View style={styles.pill}>
                            <Text style={styles.pillText}>Total ▼</Text>
                        </View>
                    </View>
                    <Text style={styles.cardValue}>{statistics.outOfStock}</Text>
                    <View style={styles.cardFooter}>
                        <Text style={styles.cardLabel}>Out of Stock</Text>
                        <ArrowUpRight size={20} color={COLORS.secondary} />
                    </View>
                </View>

                {/* Low Stock Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.iconCircle, { backgroundColor: '#FFF8E1' }]}>
                            <AlertTriangle size={20} color={COLORS.accent} />
                        </View>
                        <View style={styles.pill}>
                            <Text style={styles.pillText}>Total ▼</Text>
                        </View>
                    </View>
                    <Text style={styles.cardValue}>{statistics.lowStock}</Text>
                    <View style={styles.cardFooter}>
                        <Text style={styles.cardLabel}>Low Stock</Text>
                        <ArrowUpRight size={20} color={COLORS.secondary} />
                    </View>
                </View>
            </View>

            <View style={styles.recentSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Devices</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                {devices.slice(0, 3).map((item) => (
                    <View key={item.id} style={styles.recentItem}>
                        <View style={styles.recentIcon}>
                            <Package size={24} color={COLORS.primary} />
                        </View>
                        <View style={styles.recentInfo}>
                            <Text style={styles.recentName}>{item.modelName || 'Unknown Device'}</Text>
                            <Text style={styles.recentTime}>
                                {item.createdAt ? `Added ${new Date(item.createdAt).toLocaleDateString()}` : 'Recently added'}
                            </Text>
                        </View>
                        <View style={styles.recentActions}>
                            <TouchableOpacity
                                style={styles.actionBtn}
                                onPress={() => navigation.navigate('DeviceDetail', { deviceId: item.id })}
                            >
                                <Text style={styles.actionBtnText}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                {devices.length === 0 && (
                    <View style={styles.recentItem}>
                        <Text style={styles.emptyText}>No devices added yet</Text>
                    </View>
                )}
            </View>

            <View style={styles.chartCard}>
                <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>Stock Flow</Text>
                    <View style={styles.pill}>
                        <Text style={styles.pillText}>Last 7 days ▼</Text>
                    </View>
                </View>
                <Text style={styles.chartSubtitle}>
                    <Text style={{ color: COLORS.success }}>+18%</Text> Rise in Total Inventory Units
                </Text>

                {/* Mock Chart Visualization */}
                <View style={styles.mockChart}>
                    {[45, 20, 50, 35, 100].map((height, index) => (
                        <View key={index} style={styles.chartColumn}>
                            <Text style={styles.chartLabel}>{height}%</Text>
                            <View style={[styles.chartBar, { height: height * 1.5, backgroundColor: index === 4 ? COLORS.primary : COLORS.lightGray + '80' }]} />
                        </View>
                    ))}
                </View>
            </View>
        </>
    );

    // Staff / Team Member Dashboard Components
    const renderStaffDashboard = () => (
        <View style={styles.staffContainer}>
            <Text style={styles.staffTitle}>Welcome to Devixo</Text>
            <Text style={styles.staffSubtitle}>Choose your path: acquire items or create something new</Text>

            {/* Get Item Card (Stock Out) */}
            <View style={styles.actionCard}>
                <View style={styles.actionCardHeader}>
                    <View style={[styles.actionIconBox, { backgroundColor: COLORS.primary }]}>
                        <ShoppingBag size={24} color={COLORS.white} />
                    </View>
                    <Text style={[styles.actionCardTitle, { color: COLORS.primary }]}>Get Item</Text>
                </View>
                <Text style={styles.actionCardDesc}>
                    Explore and acquire available, curated items instantly.
                </Text>
                <TouchableOpacity
                    style={[styles.actionCardBtn, { backgroundColor: COLORS.primary }]}
                    onPress={() => navigation.navigate('Search')}
                >
                    <Text style={styles.actionCardBtnText}>Explore Get Item</Text>
                    <ArrowRight size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            {/* Make Item Card (Stock In / Add Device) */}
            <View style={styles.actionCard}>
                <View style={styles.actionCardHeader}>
                    <View style={[styles.actionIconBox, { backgroundColor: COLORS.primary }]}>
                        <PenTool size={24} color={COLORS.white} />
                    </View>
                    <Text style={styles.actionCardTitle}>Make Item</Text>
                </View>
                <Text style={styles.actionCardDesc}>
                    Utilize tools and steps to create your own unique item.
                </Text>
                <TouchableOpacity
                    style={[styles.actionCardBtn, { backgroundColor: COLORS.primary }]}
                    onPress={() => navigation.navigate('AddDevice')}
                >
                    <Text style={styles.actionCardBtnText}>Explore Make Item</Text>
                    <ArrowRight size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            <Text style={styles.staffFooterText}>Explore both options to get started</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {userRole === 'manager' ? renderHeader() : renderStaffHeader()}
                {userRole === 'manager' ? renderManagerDashboard() : renderStaffDashboard()}
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
    scrollContent: {
        padding: SIZES.medium,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.large,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.small,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    greeting: {
        fontSize: SIZES.small,
        fontFamily: FONTS.medium,
        color: COLORS.darkGray,
        textTransform: 'uppercase',
    },
    username: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
    },
    headerRight: {
        flexDirection: 'row',
        gap: SIZES.small,
    },
    iconButton: {
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.small,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light,
    },
    chatText: {
        fontFamily: FONTS.medium,
        color: COLORS.secondary,
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: COLORS.error,
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.white,
    },
    badgeText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
    // Manager Styles
    cardsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SIZES.medium,
        marginBottom: SIZES.large,
    },
    card: {
        width: '47%',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.large,
        padding: SIZES.medium,
        ...SHADOWS.light,
    },
    purpleCard: {
        // Background handled by LinearGradient
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SIZES.medium,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCircleWhite: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pill: {
        backgroundColor: COLORS.background,
        paddingHorizontal: SIZES.small,
        paddingVertical: 4,
        borderRadius: 10,
    },
    pillWhite: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: SIZES.small,
        paddingVertical: 4,
        borderRadius: 10,
    },
    pillText: {
        fontSize: 10,
        color: COLORS.darkGray,
        fontFamily: FONTS.medium,
    },
    pillTextPurple: {
        fontSize: 10,
        color: COLORS.white,
        fontFamily: FONTS.medium,
    },
    cardValue: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
        marginBottom: SIZES.small,
    },
    cardValueWhite: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.white,
        marginBottom: SIZES.small,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardLabel: {
        fontSize: SIZES.font,
        color: COLORS.darkGray,
        fontFamily: FONTS.medium,
    },
    cardLabelWhite: {
        fontSize: SIZES.font,
        color: 'rgba(255,255,255,0.8)',
        fontFamily: FONTS.medium,
    },
    chartCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.large,
        padding: SIZES.large,
        ...SHADOWS.light,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.small,
    },
    chartTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
    },
    chartSubtitle: {
        fontSize: SIZES.font,
        color: COLORS.darkGray,
        fontFamily: FONTS.regular,
        marginBottom: SIZES.large,
    },
    mockChart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 150,
        paddingTop: SIZES.medium,
    },
    chartColumn: {
        alignItems: 'center',
        gap: SIZES.small,
    },
    chartLabel: {
        fontSize: SIZES.small,
        color: COLORS.darkGray,
        fontFamily: FONTS.medium,
    },
    chartBar: {
        width: 40,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    recentSection: {
        marginBottom: SIZES.large,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.medium,
    },
    sectionTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
    },
    seeAllText: {
        color: COLORS.primary,
        fontFamily: FONTS.medium,
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
        borderRadius: SIZES.medium,
        marginBottom: SIZES.small,
        ...SHADOWS.light,
    },
    recentIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.medium,
    },
    recentInfo: {
        flex: 1,
    },
    recentName: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
    },
    recentTime: {
        fontSize: SIZES.small,
        color: COLORS.darkGray,
        fontFamily: FONTS.regular,
    },
    recentActions: {
        flexDirection: 'row',
    },
    actionBtn: {
        backgroundColor: COLORS.primary + '10',
        paddingHorizontal: SIZES.medium,
        paddingVertical: 6,
        borderRadius: SIZES.small,
    },
    actionBtnText: {
        color: COLORS.primary,
        fontFamily: FONTS.medium,
        fontSize: SIZES.small,
    },
    // Staff Styles
    staffContainer: {
        paddingTop: SIZES.medium,
    },
    staffTitle: {
        fontSize: 28,
        fontFamily: FONTS.title,
        color: COLORS.black,
        marginTop: SIZES.large,
        textAlign: 'center',
        marginBottom: SIZES.small,
    },
    staffSubtitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.darkGray,
        marginBottom: 60,
        textAlign: 'center',
        paddingHorizontal: SIZES.large,
    },
    actionCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.large,
        padding: SIZES.large,
        marginBottom: SIZES.large,
        ...SHADOWS.medium,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    actionCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.medium,
    },
    actionIconBox: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.medium,
    },
    actionCardTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.black,
    },
    actionCardDesc: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.darkGray,
        marginBottom: SIZES.large,
        lineHeight: 22,
    },
    actionCardBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.medium,
        borderRadius: 25,
        gap: SIZES.small,
    },
    actionCardBtnText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONTS.bold,
    },
    staffFooterText: {
        textAlign: 'center',
        color: COLORS.gray,
        fontFamily: FONTS.medium,
        marginTop: SIZES.large,
    },
    emptyText: {
        textAlign: 'center',
        color: COLORS.darkGray,
        fontFamily: FONTS.regular,
        fontSize: SIZES.medium,
        padding: SIZES.medium,
    },
});

export default HomeScreen;
