// HomeScreen.tsx
import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";

/**
 * Icon loader (kept for compatibility; icons are not required for this screen)
 */
function loadIcons() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const lucide = require("lucide-react-native");
    return {
      Home: lucide.Home,
      Grid: lucide.Grid,
      Calendar: lucide.Calendar,
      Settings: lucide.Settings,
    };
  } catch {
    return {};
  }
}

export default function HomeScreen() {
  // <-- use useMemo correctly inside the component
  const Icons = useMemo(loadIcons, []);
  // (Icons may be empty object if lucide not installed; that is fine for this screen)

  // DeviceHub devices (these replace the "routines")
  const deviceHub = [
    {
      id: "DH-2023-001",
      title: "Devices",
      imei: "123456789012345",
      price: 899,
      status: "Stock In",
      statusColor: "#10B981", // green
      progress: 60, // percent shown in card
    },
    {
      id: "DH-2023-002",
      title: "Revenue",
      imei: "987654321098765",
      price: 799,
      status: "Sold",
      statusColor: "#FB923C", // orange
      progress: 24, // percent shown in card
    },
  ];

  // Recent Devices (stacked cards) - same data for demo
  const recentDevices = [...deviceHub];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.profileRow}>
            <Image
              source={{
                uri:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.welcomeSmall}>Welcome Back,</Text>
              <Text style={styles.welcomeName}>Abdul Momon</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <View style={styles.avatarPlaceholder} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <View style={styles.hamburger}>
                <View style={styles.hamburgerLine} />
                <View style={styles.hamburgerLine} />
                <View style={styles.hamburgerLine} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <View style={styles.searchIconPlaceholder} />
          <Text style={styles.searchText}>Search</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* DeviceHub (was Routines) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>DeviceHub</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.deviceHubRow}>
            {deviceHub.map((d) => (
              <View key={d.id} style={styles.deviceSmallCard}>
                {/* Top: icon + title + percent */}
                <View style={styles.deviceSmallTopRow}>
                  <View style={styles.deviceTitleRow}>
                    <View style={styles.deviceIconPlaceholder}>
                      {/* small emoji used as icon to match image — replace with image/Icon if needed */}
                      <Text style={styles.deviceIconEmoji}>🌤️</Text>
                    </View>
                    <View style={{ flexShrink: 1 }}>
                      <Text style={styles.deviceSmallTitle} numberOfLines={1}>
                        {d.title}
                      </Text>
                    </View>
                  </View>

                  <Text style={[styles.devicePercent, { color: "#FB923C" }]}>{d.progress}%</Text>
                </View>

                {/* Progress label */}
                <View style={styles.progressLabelRow}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <Text style={[styles.progressLabelPercent, { color: "#FB923C" }]}>
                    {d.progress}%
                  </Text>
                </View>

                {/* Progress bar */}
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${d.progress}%` }]} />
                </View>

                {/* Meta rows */}
                <Text style={styles.deviceMeta}>ID: {d.id}</Text>
                <Text style={styles.deviceMeta}>IMEI: {d.imei}</Text>

                <View style={styles.deviceSmallBottom}>
                  <Text style={styles.devicePrice}>${d.price}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Devices (was My Task) */}
        <View style={[styles.section, { marginTop: 20, marginBottom: 24 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Devices</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recentList}>
            {recentDevices.map((d) => (
              <View key={d.id} style={styles.recentCardWrapper}>
                <View style={styles.recentCard}>
                  <View style={styles.recentTopRow}>
                    <Text style={styles.recentTitle}>{d.title}</Text>
                    <Text style={[styles.recentStatus, { color: d.statusColor }]}>{d.status}</Text>
                  </View>

                  <View style={styles.recentMiddle}>
                    <Text style={styles.recentMeta}>ID: {d.id}</Text>
                    <Text style={styles.recentMeta}>IMEI: {d.imei}</Text>
                  </View>

                  <View style={styles.recentBottomRow}>
                    <View />
                    <Text style={styles.recentPrice}>${d.price}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/* Styles — updated for DeviceHub small cards */
type Styles = {
  container: ViewStyle;
  header: ViewStyle;
  headerRow: ViewStyle;
  profileRow: ViewStyle;
  avatar: ImageStyle;
  welcomeSmall: TextStyle;
  welcomeName: TextStyle;
  headerActions: ViewStyle;
  actionBtn: ViewStyle;
  avatarPlaceholder: ViewStyle;
  hamburger: ViewStyle;
  hamburgerLine: ViewStyle;
  searchBox: ViewStyle;
  searchIconPlaceholder: ViewStyle;
  searchText: TextStyle;
  content: ViewStyle;
  section: ViewStyle;
  sectionHeader: ViewStyle;
  sectionTitle: TextStyle;
  seeAll: TextStyle;
  deviceHubRow: ViewStyle;
  deviceSmallCard: ViewStyle;
  deviceSmallTopRow: ViewStyle;
  deviceTitleRow: ViewStyle;
  deviceIconPlaceholder: ViewStyle;
  deviceIconEmoji: TextStyle;
  deviceSmallTitle: TextStyle;
  deviceStatusSmall: TextStyle;
  deviceMeta: TextStyle;
  deviceSmallBottom: ViewStyle;
  devicePrice: TextStyle;
  progressLabelRow: ViewStyle;
  progressLabel: TextStyle;
  progressLabelPercent: TextStyle;
  progressBar: ViewStyle;
  progressFill: ViewStyle;
  devicePercent: TextStyle;
  recentList: ViewStyle;
  recentCardWrapper: ViewStyle;
  recentCard: ViewStyle;
  recentTopRow: ViewStyle;
  recentTitle: TextStyle;
  recentStatus: TextStyle;
  recentMiddle: ViewStyle;
  recentMeta: TextStyle;
  recentBottomRow: ViewStyle;
  recentPrice: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  container: { flex: 1, backgroundColor: "#f3f2f6", marginHorizontal: 10 },
  header: { backgroundColor: "#f3f2f6", paddingHorizontal: 20, paddingTop: 28, paddingBottom: 16 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  profileRow: { flexDirection: "row", alignItems: "center", gap: 15 },
  avatar: { width: 50, height: 50, borderRadius: 50, backgroundColor: "#E5E7EB" },
  welcomeSmall: { color: "#9CA3AF", fontSize: 13 },
  welcomeName: { color: "#111827", fontSize: 16, fontWeight: "600" },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  actionBtn: { padding: 4 },
  avatarPlaceholder: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: "#111827" },
  hamburger: { flexDirection: "column", gap: 3 },
  hamburgerLine: { width: 24, height: 2, backgroundColor: "#111827", marginVertical: 2 },
  searchBox: { backgroundColor: "#fff", borderRadius: 14, paddingHorizontal: 12, paddingVertical: 14, flexDirection: "row", alignItems: "center", marginTop: 25, marginHorizontal: 4 },
  searchIconPlaceholder: { width: 18, height: 18, borderRadius: 9, borderWidth: 1, borderColor: "#9CA3AF", marginRight: 10 },
  searchText: { color: "#9CA3AF", fontSize: 15 },

  content: { flex: 1 },
  section: { paddingHorizontal: 20, marginTop: 16 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { color: "#111827", fontSize: 20, fontWeight: "700" },
  seeAll: { color: "#FB923C", fontSize: 14, fontWeight: "600" },

  /* DeviceHub small side cards (horizontal row) */
  deviceHubRow: { flexDirection: "row", gap: 12 },
  deviceSmallCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 12,
    // subtle card shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  deviceSmallTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  deviceTitleRow: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  deviceIconPlaceholder: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#FFF3E0",
    alignItems: "center",
    justifyContent: "center",
  },
  deviceIconEmoji: { fontSize: 18 },
  deviceSmallTitle: { color: "#111827", fontSize: 14, fontWeight: "700" },
  deviceStatusSmall: { fontSize: 12, fontWeight: "700" },
  deviceMeta: { color: "#6B7280", fontSize: 12, marginBottom: 2 },
  deviceSmallBottom: { marginTop: 8, alignItems: "flex-end" },
  devicePrice: { color: "#111827", fontSize: 16, fontWeight: "700" },

  /* Progress */
  progressLabelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  progressLabel: { color: "#6B7280", fontSize: 12 },
  progressLabelPercent: { fontSize: 12, fontWeight: "700" },
  progressBar: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FB923C",
  },
  devicePercent: { fontSize: 13, fontWeight: "700" },

  /* Recent Devices stacked cards (matches reference image) */
  recentList: { marginTop: 6 },
  recentCardWrapper: { marginBottom: 12 },
  recentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recentTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  recentTitle: { color: "#111827", fontSize: 16, fontWeight: "700" },
  recentStatus: { fontSize: 13, fontWeight: "600" },
  recentMiddle: { marginBottom: 8 },
  recentMeta: { color: "#6B7280", fontSize: 13 },
  recentBottomRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  recentPrice: { color: "#111827", fontSize: 16, fontWeight: "800" },
});
