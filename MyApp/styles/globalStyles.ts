import { StyleSheet, Platform } from 'react-native';


const styles = StyleSheet.create({
page: { flex: 1, backgroundColor: '#FFFFFF' },
containerScroll: { flex: 1, backgroundColor: '#F9FAFB' },
header: { backgroundColor: '#8BC34A', padding: 24, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, paddingBottom: 28 },
headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
headerTitle: { color: '#fff', fontSize: 22, fontWeight: '700' },
headerSubtitle: { color: 'rgba(255,255,255,0.9)', marginTop: 6 },
headerAvatar: { backgroundColor: 'rgba(255,255,255,0.18)', padding: 10, borderRadius: 999 },


statsRow: { flexDirection: 'row', marginTop: 16 },
statCard: { padding: 14, borderRadius: 16, flex: 1 },
statCardLeft: { marginRight: 8, backgroundColor: 'rgba(255,255,255,0.12)' },
statCardCenter: { marginHorizontal: 4, backgroundColor: 'rgba(255,255,255,0.12)' },
statCardRight: { marginLeft: 8, backgroundColor: 'rgba(255,255,255,0.12)' },
statNumber: { color: '#fff', fontSize: 18, fontWeight: '700' },
statLabel: { color: 'rgba(255,255,255,0.9)', marginTop: 4 },


section: { padding: 16 },
sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
linkText: { color: '#03A9F4', fontWeight: '600' },


deviceCard: { backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 12, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 },
cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
cardTitle: { fontWeight: '700', color: '#111827' },
inStockLabel: { color: '#8BC34A', fontWeight: '600' },
soldLabel: { color: '#FF9800', fontWeight: '600' },
cardSmall: { color: '#6B7280', marginTop: 6 },
cardPrice: { fontWeight: '700' },


formCard: { backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 12, elevation: 1, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4 },
cardSectionTitle: { fontWeight: '700', color: '#111827', marginBottom: 8 },
formTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
formSubtitle: { color: '#6B7280', marginTop: 6 },


formGroup: { marginBottom: 8 },
label: { color: '#374151', marginBottom: 6 },
input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: Platform.OS === 'ios' ? 12 : 10, backgroundColor: '#fff' },


row: { flexDirection: 'row', alignItems: 'center' },
rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
flex1: { flex: 1 },


toggle: { width: 48, height: 28, borderRadius: 999, justifyContent: 'center', padding: 3 },
toggleOn: { backgroundColor: '#8BC34A', alignItems: 'flex-end' },
toggleOff: { backgroundColor: '#D1D5DB', alignItems: 'flex-start' },
toggleDot: { width: 20, height: 20, borderRadius: 999, backgroundColor: '#fff' },
toggleDotOn: { marginRight: 6 },


statusRow: { flexDirection: 'row', marginTop: 8, borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#E5E7EB' },
statusButton: { flex: 1, paddingVertical: 10, alignItems: 'center', justifyContent: 'center' },
statusIn: { backgroundColor: '#8BC34A', borderColor: '#8BC34A' },
statusOut: { backgroundColor: '#FF9800', borderColor: '#FF9800' },
statusOff: { backgroundColor: '#fff', borderColor: '#E5E7EB' },
statusTextOn: { color: '#fff', fontWeight: '700' },
statusTextOff: { color: '#374151', fontWeight: '700' },


formActions: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 32 },
actionBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
actionCancel: { backgroundColor: '#E5E7EB', marginRight: 8 },
actionCancelText: { color: '#374151', fontWeight: '700' },
actionSave: { backgroundColor: '#8BC34A', marginLeft: 8 },
actionSaveText: { color: '#fff', fontWeight: '700' },


fakeSelect: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, padding: 8 },
fakeSelectText: { color: '#6B7280' },


smallCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, flex: 1, alignItems: 'flex-start', justifyContent: 'center' },
smallCardLabel: { color: '#6B7280' },
smallCardNumber: { fontSize: 20, fontWeight: '700', color: '#111827', marginTop: 4 },

// Progress styles
progressRow: { marginTop: 12 },
progressItem: { marginBottom: 16 },
progressRowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
progressLabel: { fontWeight: '600', color: '#111827' },
progressCount: { color: '#6B7280', fontSize: 12 },
progressBar: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' },
progressFill: { height: '100%', borderRadius: 4 },

// Footer styles
addButton: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#8BC34A', alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
footerItem: { alignItems: 'center', justifyContent: 'center' },
footerText: { fontSize: 10, color: '#9CA3AF', marginTop: 4, fontWeight: '600' },

// Profile styles
profileHeader: { backgroundColor: '#8BC34A', padding: 32, alignItems: 'center', borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
profileAvatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
profileName: { color: '#fff', fontSize: 22, fontWeight: '700', marginTop: 8 },
profileRole: { color: 'rgba(255,255,255,0.9)', marginTop: 4 },

// Info styles
infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
infoLabel: { color: '#6B7280', fontSize: 14 },
infoValue: { color: '#111827', fontSize: 14, fontWeight: '600' },
});

export default styles;