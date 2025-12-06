import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { Search, Package, Settings, Smartphone, ChevronRight, CheckCircle, MinusCircle, Wrench, Trash2 } from 'lucide-react-native';
import { useDevice } from '../context/DeviceContext';
import { useAuth } from '../context/AuthContext';

const FILTER_OPTIONS = [
    { id: 'all', label: 'All Devices', icon: null },
    { id: 'In Stock', label: 'In Stock', icon: CheckCircle },
    { id: 'Sold Out', label: 'Sold Out', icon: MinusCircle }, // Mapping 'StockOut' to 'Sold Out' logic later
    { id: 'Under Repair', label: 'Under Repair', icon: Wrench },
    { id: 'Disposed', label: 'Disposed', icon: Trash2 },
];

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const { searchDevices, devices } = useDevice();
    const { userRole } = useAuth();

    useEffect(() => {
        if (searchQuery.trim()) {
            handleSearch(searchQuery);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, activeFilter]);

    const handleSearch = async (query) => {
        // Use the context search function
        let results = await searchDevices(query);

        // Apply local filtering based on activeFilter
        if (activeFilter !== 'all') {
            results = results.filter(item => {
                const status = item.deviceStatus || item.status; // normalized status check
                if (activeFilter === 'In Stock') return status === 'StockIn';
                if (activeFilter === 'Sold Out') return status === 'StockOut';
                // Add other mappings if your backend supports them, otherwise simple string match
                return status === activeFilter;
            });
        }
        setSearchResults(results);
    };

    const StatusPill = ({ status }) => {
        let bg = COLORS.gray + '20';
        let color = COLORS.darkGray;
        let label = status;

        if (status === 'StockIn' || status === 'In Stock') {
            bg = COLORS.stockIn;
            color = COLORS.stockInText;
            label = 'Stock In';
        } else if (status === 'StockOut' || status === 'Sold' || status === 'Sold Out') {
            bg = COLORS.outOfStock;
            color = COLORS.outOfStockText;
            label = 'Sold';
        } else if (status === 'Repair' || status === 'Under Repair') {
            bg = COLORS.lowStock;
            color = COLORS.lowStockText;
            label = 'Repairing';
        }

        return (
            <View style={[styles.statusPill, { backgroundColor: bg }]}>
                <Text style={[styles.statusPillText, { color: color }]}>{label}</Text>
            </View>
        );
    };

    const renderDeviceItem = ({ item }) => (
        <TouchableOpacity
            style={styles.resultCard}
            onPress={() => navigation.navigate('DeviceDetail', { deviceId: item.id })}
        >
            <View style={styles.imageContainer}>
                {/* Placeholder image or actual image if available */}
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=200&h=200&fit=crop' }}
                    style={styles.deviceImage}
                />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.modelName || 'Unknown Device'}</Text>
                <Text style={styles.cardImei}>IMEI: {item.imei || 'N/A'}</Text>
                <StatusPill status={item.deviceStatus || item.status} />
            </View>
            <View style={styles.cardRight}>
                <View>
                    <Text style={styles.priceLabel}>Sell Price</Text>
                    <Text style={styles.priceValue}>₹{(item.price || item.sellPrice || 0).toLocaleString()}</Text>
                </View>
                <ChevronRight size={20} color={COLORS.gray} style={{ marginTop: SIZES.small }} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.pageTitle}>Search Devices</Text>
                <Text style={styles.pageSubtitle}>Find devices by IMEI, serial number, or model name</Text>

                {/* Search Bar Row */}
                <View style={styles.searchRow}>
                    <View style={styles.searchInputWrapper}>
                        <Search size={20} color={COLORS.darkGray} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Enter IMEI, serial number,"
                            placeholderTextColor={COLORS.gray}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {/* Optional: Add scan icon inside input if desired, images show it outside or part of input */}

                    </View>
                    <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(searchQuery)}>
                        <Text style={styles.searchButtonText}>Search</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.filterLabel}>Filter by Status</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterScroll}
                >
                    {FILTER_OPTIONS.map((filter) => {
                        const SearchIcon = filter.icon;
                        const isActive = activeFilter === filter.id;
                        return (
                            <TouchableOpacity
                                key={filter.id}
                                style={[
                                    styles.filterChip,
                                    isActive && styles.filterChipActive
                                ]}
                                onPress={() => setActiveFilter(filter.id)}
                            >
                                {SearchIcon && (
                                    <SearchIcon
                                        size={16}
                                        color={isActive ? COLORS.white : COLORS.darkGray}
                                        style={{ marginRight: 6 }}
                                    />
                                )}
                                <Text style={[
                                    styles.filterText,
                                    isActive && styles.filterTextActive
                                ]}>
                                    {filter.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <TouchableOpacity
                    style={[styles.manageButton, { opacity: userRole === 'manager' ? 1 : 0.5 }]}
                    onPress={() => {
                        if (userRole === 'manager') {
                            navigation.navigate('Stock');
                        } else {
                            Alert.alert('Access Denied', 'Only managers can manage all devices.');
                        }
                    }}
                >
                    <Settings size={20} color={COLORS.secondary} />
                    <Text style={styles.manageButtonText}>Manage All Devices</Text>
                </TouchableOpacity>
            </View>

            {/* Results or Empty State */}
            {searchQuery.trim() ? (
                <FlatList
                    data={searchResults}
                    renderItem={renderDeviceItem}
                    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                    contentContainerStyle={styles.resultsList}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No devices found matching "{searchQuery}"</Text>
                        </View>
                    }
                />
            ) : (
                <View style={styles.emptyStateContainer}>
                    <View style={styles.emptyIconCircle}>
                        <Smartphone size={40} color={COLORS.secondary} />
                    </View>
                    <Text style={styles.emptyStateTitle}>Start searching for devices</Text>
                    <Text style={styles.emptyStateDesc}>
                        Use the search bar above to find devices by IMEI, serial number, or model name. You can also filter by device status.
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    headerContainer: {
        padding: SIZES.medium,
        backgroundColor: COLORS.background, // Match background to look seamless
    },
    pageTitle: {
        fontSize: 28,
        fontFamily: FONTS.title,
        color: COLORS.secondary,
        marginBottom: SIZES.base,
    },
    pageSubtitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.darkGray,
        marginBottom: SIZES.large,
        lineHeight: 22,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.small,
        marginBottom: SIZES.large,
    },
    searchInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.small,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        height: 50,
        paddingHorizontal: SIZES.small,
    },
    searchIcon: {
        marginRight: SIZES.small,
    },
    searchInput: {
        flex: 1,
        fontFamily: FONTS.regular,
        fontSize: SIZES.medium,
        color: COLORS.secondary,
        height: '100%',
    },
    scanButton: {
        padding: 4,
    },
    searchButton: {
        backgroundColor: COLORS.primary,
        height: 50,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.small,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButtonText: {
        color: COLORS.white,
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
    },
    filterLabel: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.medium,
        color: COLORS.secondary,
        marginBottom: SIZES.small,
    },
    filterScroll: {
        flexGrow: 0,
        marginBottom: SIZES.large,
        gap: SIZES.small,
    },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.medium,
        paddingVertical: 8,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.small,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        marginRight: SIZES.small,
    },
    filterChipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    filterText: {
        fontSize: SIZES.small,
        fontFamily: FONTS.medium,
        color: COLORS.secondary,
    },
    filterTextActive: {
        color: COLORS.white,
    },
    manageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: SIZES.medium,
        borderRadius: SIZES.small,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        gap: SIZES.small,
    },
    manageButtonText: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.medium,
        color: COLORS.secondary,
    },
    // Empty State
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.large,
        marginTop: -50, // Pull up a bit to feel centered in remaining space
    },
    emptyIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.white, // Or a light gray circle
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.large,
        // ...SHADOWS.light,
    },
    emptyStateTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
        marginBottom: SIZES.small,
    },
    emptyStateDesc: {
        textAlign: 'center',
        color: COLORS.darkGray,
        fontFamily: FONTS.regular,
        fontSize: SIZES.medium,
        lineHeight: 22,
    },
    // Results
    resultsList: {
        padding: SIZES.medium,
        paddingTop: 0,
    },
    resultCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium,
        padding: SIZES.small,
        marginBottom: SIZES.medium,
        ...SHADOWS.light,
        alignItems: 'center',
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: SIZES.small,
        overflow: 'hidden',
        backgroundColor: COLORS.lightGray,
        marginRight: SIZES.medium,
    },
    deviceImage: {
        width: '100%',
        height: '100%',
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
        marginBottom: 4,
    },
    cardImei: {
        fontSize: 12, // Small for IMEI
        fontFamily: FONTS.regular, // monospace often better for numbers but regular fits UI
        color: COLORS.darkGray,
        marginBottom: 8,
    },
    statusPill: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusPillText: {
        fontSize: 10,
        fontFamily: FONTS.medium,
    },
    cardRight: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingLeft: SIZES.small,
    },
    priceLabel: {
        fontSize: 10,
        color: COLORS.darkGray,
        fontFamily: FONTS.regular,
        textAlign: 'right',
    },
    priceValue: {
        fontSize: SIZES.medium,
        color: 'blue', // Will override with primary or specific blue from image if needed, but user said "use existing font color".
        // Use primary for consistency with request "color of in app don't use blue color"
        color: COLORS.primary,
        fontFamily: FONTS.bold,
    },
    emptyContainer: {
        padding: SIZES.large,
        alignItems: 'center',
    },
    emptyText: {
        fontFamily: FONTS.medium,
        color: COLORS.darkGray,
    },
});

export default SearchScreen;
