import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { ArrowLeft, Edit2, Share2, Printer, Smartphone, Calendar, User, FileText } from 'lucide-react-native';
import { useDevice } from '../context/DeviceContext';

const DeviceDetailScreen = ({ navigation, route }) => {
    const { deviceId, device: routeDevice } = route.params || {};
    const { getDeviceById } = useDevice();
    const [device, setDevice] = useState(routeDevice || null);
    const [loading, setLoading] = useState(!routeDevice);

    useEffect(() => {
        if (deviceId && !routeDevice) {
            loadDevice();
        }
    }, [deviceId]);

    const loadDevice = async () => {
        try {
            setLoading(true);
            const deviceData = await getDeviceById(deviceId);
            if (deviceData) {
                setDevice(deviceData);
            } else {
                // Fallback to mock data if device not found
                setDevice({
                    model: 'Unknown Device',
                    imei: 'N/A',
                    color: 'N/A',
                    storage: 'N/A',
                    ram: 'N/A',
                    condition: 'N/A',
                    accessories: [],
                    purchasePrice: '$0',
                    sellPrice: '$0',
                    status: 'Unknown',
                    customer: {
                        name: 'N/A',
                        contact: 'N/A',
                        email: 'N/A',
                        date: 'N/A',
                    }
                });
            }
        } catch (error) {
            console.error('Error loading device:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            </SafeAreaView>
        );
    }

    // Format device data for display
    const displayDevice = device ? {
        model: device.modelName || device.model || 'Unknown Device',
        imei: device.imei || 'N/A',
        color: device.color || 'N/A',
        storage: device.storage || 'N/A',
        ram: device.ram || 'N/A',
        condition: device.condition || 'Good',
        accessories: device.box ? ['Box'] : [].concat(device.charger ? ['Charger'] : []).concat(device.bill ? ['Bill'] : []),
        purchasePrice: device.purchasePrice ? `$${device.purchasePrice}` : '$0',
        sellPrice: device.sellPrice ? `$${device.sellPrice}` : '$0',
        status: device.deviceStatus === 'StockIn' ? 'In Stock' : device.deviceStatus === 'StockOut' ? 'Sold' : device.status || 'Unknown',
        customer: {
            name: device.customerName || 'N/A',
            contact: device.customerContact || 'N/A',
            email: device.customerEmail || 'N/A',
            date: device.createdAt ? new Date(device.createdAt).toLocaleDateString() : 'N/A',
        }
    } : null;

    if (!displayDevice) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.emptyText}>Device not found</Text>
                </View>
            </SafeAreaView>
        );
    }

    const DetailRow = ({ label, value, isPrice }) => (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={[styles.detailValue, isPrice && styles.priceText]}>{value}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color={COLORS.secondary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Device Details</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Share2 size={20} color={COLORS.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Edit2 size={20} color={COLORS.secondary} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                {/* Device Header Card */}
                <View style={styles.mainCard}>
                    <View style={styles.deviceIconContainer}>
                        <Smartphone size={40} color={COLORS.primary} />
                    </View>
                    <Text style={styles.deviceName}>{displayDevice.model}</Text>
                    <Text style={styles.deviceImei}>IMEI: {displayDevice.imei}</Text>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>{displayDevice.status}</Text>
                    </View>
                </View>

                {/* Specs Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Specifications</Text>
                    <View style={styles.card}>
                        <DetailRow label="Color" value={displayDevice.color} />
                        <DetailRow label="Storage" value={displayDevice.storage} />
                        <DetailRow label="RAM" value={displayDevice.ram} />
                        <DetailRow label="Condition" value={displayDevice.condition} />
                        <DetailRow label="Accessories" value={displayDevice.accessories.length > 0 ? displayDevice.accessories.join(', ') : 'None'} />
                    </View>
                </View>

                {/* Financials Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Financials</Text>
                    <View style={styles.card}>
                        <DetailRow label="Purchase Price" value={displayDevice.purchasePrice} isPrice />
                        <DetailRow label="Selling Price" value={displayDevice.sellPrice} isPrice />
                    </View>
                </View>

                {/* Customer Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Customer Information</Text>
                    <View style={styles.card}>
                        <View style={styles.customerHeader}>
                            <View style={styles.customerAvatar}>
                                <User size={24} color={COLORS.white} />
                            </View>
                            <View>
                                <Text style={styles.customerName}>{displayDevice.customer.name}</Text>
                                <Text style={styles.customerDate}>Added on {displayDevice.customer.date}</Text>
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <DetailRow label="Contact" value={displayDevice.customer.contact} />
                        <DetailRow label="Email" value={displayDevice.customer.email} />
                    </View>
                </View>

                {/* Documents */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Documents</Text>
                    <View style={styles.docsGrid}>
                        {[1, 2].map((i) => (
                            <View key={i} style={styles.docCard}>
                                <FileText size={32} color={COLORS.primary} />
                                <Text style={styles.docText}>Document {i}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.printButton}>
                    <Printer size={20} color={COLORS.white} />
                    <Text style={styles.printButtonText}>Print Invoice</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.medium,
        backgroundColor: COLORS.white,
        ...SHADOWS.light,
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
    },
    headerActions: {
        flexDirection: 'row',
        gap: SIZES.small,
    },
    backButton: {
        padding: SIZES.small,
    },
    actionButton: {
        padding: SIZES.small,
        backgroundColor: COLORS.background,
        borderRadius: SIZES.small,
    },
    content: {
        padding: SIZES.medium,
    },
    mainCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.large,
        padding: SIZES.large,
        alignItems: 'center',
        marginBottom: SIZES.large,
        ...SHADOWS.medium,
    },
    deviceIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary + '10',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.medium,
    },
    deviceName: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
        marginBottom: SIZES.base,
    },
    deviceImei: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        marginBottom: SIZES.medium,
    },
    statusBadge: {
        backgroundColor: COLORS.success + '20',
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.base,
        borderRadius: SIZES.medium,
    },
    statusText: {
        color: COLORS.success,
        fontFamily: FONTS.bold,
        fontSize: SIZES.font,
    },
    section: {
        marginBottom: SIZES.large,
    },
    sectionTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
        marginBottom: SIZES.small,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium,
        padding: SIZES.medium,
        ...SHADOWS.light,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SIZES.small,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray + '50',
    },
    detailLabel: {
        fontFamily: FONTS.medium,
        color: COLORS.darkGray,
        fontSize: SIZES.font,
    },
    detailValue: {
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
        fontSize: SIZES.font,
    },
    priceText: {
        color: COLORS.primary,
        fontSize: SIZES.large,
    },
    customerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.medium,
    },
    customerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.medium,
    },
    customerName: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
    },
    customerDate: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.lightGray,
        marginVertical: SIZES.small,
    },
    docsGrid: {
        flexDirection: 'row',
        gap: SIZES.medium,
    },
    docCard: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
        borderRadius: SIZES.medium,
        alignItems: 'center',
        gap: SIZES.small,
        ...SHADOWS.light,
    },
    docText: {
        fontFamily: FONTS.medium,
        color: COLORS.secondary,
        fontSize: SIZES.small,
    },
    printButton: {
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.medium,
        borderRadius: SIZES.medium,
        gap: SIZES.small,
        marginBottom: SIZES.large,
    },
    printButtonText: {
        color: COLORS.white,
        fontFamily: FONTS.bold,
        fontSize: SIZES.medium,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontFamily: FONTS.regular,
        color: COLORS.darkGray,
        fontSize: SIZES.medium,
    },
});

export default DeviceDetailScreen;
