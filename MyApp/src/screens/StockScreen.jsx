import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { Search, Filter, Smartphone, Watch, Laptop, Keyboard } from 'lucide-react-native';
import { useDevice } from '../context/DeviceContext';

const StockScreen = ({ navigation }) => {
    const { devices, inventory, refreshData } = useDevice();
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        refreshData();
    }, []);

    // Combine devices and inventory for display
    const getDisplayItems = () => {
        const allItems = [...devices.map(d => ({
            id: d.id,
            name: d.modelName || 'Unknown Device',
            sku: d.sku || `DEV-${d.id}`,
            stock: d.deviceStatus === 'StockIn' ? 1 : 0,
            status: d.deviceStatus === 'StockIn' ? 'In Stock' : d.deviceStatus === 'StockOut' ? 'Out of Stock' : 'Low Stock',
            change: '+0%',
            icon: Smartphone,
            color: '#E8EAF6',
            device: d,
        })), ...inventory];

        if (filter === 'all') return allItems;
        if (filter === 'out') return allItems.filter(item => item.status === 'Out of Stock');
        if (filter === 'low') return allItems.filter(item => item.status === 'Low Stock');
        return allItems;
    };

    const displayItems = getDisplayItems();
    const renderItem = ({ item }) => {
        const Icon = item.icon || Smartphone;
        const isHighlight = item.highlight;

        return (
            <TouchableOpacity
                style={[styles.card, isHighlight && styles.highlightCard]}
                onPress={() => navigation.navigate('DeviceDetail', { deviceId: item.id, device: item.device || item })}
            >
                <View style={styles.cardContent}>
                    <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                        <Icon size={24} color={COLORS.secondary} />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={[styles.itemName, isHighlight && styles.highlightText]}>{item.name}</Text>
                        <Text style={[styles.itemSku, isHighlight && styles.highlightSubText]}>SKU: {item.sku}</Text>
                        <View style={styles.stockInfo}>
                            <Text style={[styles.stockCount, isHighlight && styles.highlightSubText]}>{item.stock} in Stock</Text>
                            <Text style={[
                                styles.stockChange,
                                { color: item.change.startsWith('+') ? COLORS.success : COLORS.error },
                                isHighlight && { color: COLORS.white }
                            ]}> {item.change}</Text>
                        </View>
                    </View>
                    <View style={[
                        styles.statusBadge,
                        {
                            backgroundColor:
                                item.status === 'In Stock' ? (isHighlight ? 'rgba(255,255,255,0.2)' : COLORS.success + '20') :
                                    item.status === 'Low Stock' ? COLORS.accent + '20' :
                                        COLORS.error + '20'
                        }
                    ]}>
                        <Text style={[
                            styles.statusText,
                            {
                                color:
                                    item.status === 'In Stock' ? (isHighlight ? COLORS.white : COLORS.success) :
                                        item.status === 'Low Stock' ? COLORS.lowStockText :
                                            COLORS.error
                            }
                        ]}>{item.status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Inventory</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add Product</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.filterSection}>
                <View style={styles.searchButton}>
                    <Search size={20} color={COLORS.darkGray} />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    <TouchableOpacity 
                        style={[styles.filterPill, filter === 'all' && styles.activeFilter]}
                        onPress={() => setFilter('all')}
                    >
                        <Text style={filter === 'all' ? styles.activeFilterText : styles.filterText}>Total Stock</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.filterPill, filter === 'out' && styles.activeFilter]}
                        onPress={() => setFilter('out')}
                    >
                        <Text style={filter === 'out' ? styles.activeFilterText : styles.filterText}>Out of Stock</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.filterPill, filter === 'low' && styles.activeFilter]}
                        onPress={() => setFilter('low')}
                    >
                        <Text style={filter === 'low' ? styles.activeFilterText : styles.filterText}>Low Stock</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <FlatList
                data={displayItems}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No items found</Text>
                    </View>
                }
            />
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
        padding: SIZES.large,
        backgroundColor: COLORS.background,
    },
    headerTitle: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
    },
    addButton: {
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.small,
        borderRadius: SIZES.medium,
        ...SHADOWS.light,
    },
    addButtonText: {
        fontFamily: FONTS.medium,
        color: COLORS.secondary,
        fontSize: SIZES.font,
    },
    filterSection: {
        flexDirection: 'row',
        paddingHorizontal: SIZES.large,
        marginBottom: SIZES.medium,
        alignItems: 'center',
    },
    searchButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.small,
        ...SHADOWS.light,
    },
    filterScroll: {
        gap: SIZES.small,
    },
    filterPill: {
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.small,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    activeFilter: {
        backgroundColor: COLORS.dashboardPurple + '20',
        borderColor: COLORS.dashboardPurple,
    },
    filterText: {
        fontFamily: FONTS.medium,
        color: COLORS.darkGray,
    },
    activeFilterText: {
        fontFamily: FONTS.medium,
        color: COLORS.dashboardPurple,
    },
    listContent: {
        padding: SIZES.large,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.large,
        padding: SIZES.medium,
        marginBottom: SIZES.medium,
        ...SHADOWS.light,
    },
    highlightCard: {
        backgroundColor: '#9D94FF', // Light purple matching image
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.medium,
    },
    detailsContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.bold,
        color: COLORS.secondary,
        marginBottom: 2,
    },
    highlightText: {
        color: COLORS.white,
    },
    itemSku: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.gray,
        marginBottom: 4,
    },
    highlightSubText: {
        color: 'rgba(255,255,255,0.8)',
    },
    stockInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stockCount: {
        fontSize: SIZES.small,
        fontFamily: FONTS.medium,
        color: COLORS.darkGray,
    },
    stockChange: {
        fontSize: SIZES.small,
        fontFamily: FONTS.bold,
        marginLeft: SIZES.base,
    },
    statusBadge: {
        paddingHorizontal: SIZES.small,
        paddingVertical: 4,
        borderRadius: SIZES.base,
        alignSelf: 'flex-end',
        marginLeft: SIZES.small,
    },
    statusText: {
        fontSize: 10,
        fontFamily: FONTS.bold,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: SIZES.extraLarge * 2,
    },
    emptyText: {
        fontFamily: FONTS.regular,
        color: COLORS.darkGray,
        fontSize: SIZES.medium,
    },
});

export default StockScreen;
