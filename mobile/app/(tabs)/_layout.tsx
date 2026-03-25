import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { HapticTab } from '@/components/haptic-tab';

function TabIcon({
  focused,
  iconName,
  label,
  badge,
}: {
  focused: boolean;
  iconName: string;
  label: string;
  badge?: boolean;
}) {
  return (
    <View style={styles.tabWrapper}>
      <View
        style={[
          styles.iconContainer,
          focused && styles.iconContainerFocused,
        ]}
      >
        <Ionicons
          name={iconName as any}
          size={22}
          color={focused ? '#ffffff' : '#888888'}
        />

        {badge && <View style={styles.badge} />}
      </View>

      <Text style={[styles.label, focused && styles.labelFocused]}>
        {label}
      </Text>

      <View style={[styles.dot, focused && styles.dotVisible]} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarButton: HapticTab,
      }}
    >
      {/* 🏠 Dashboard */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName={focused ? "home" : "home-outline"}
              label="Dashboard"
            />
          ),
        }}
      />

      {/* 👥 Visitors */}
      <Tabs.Screen
        name="visitors"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName={focused ? "people" : "people-outline"}
              label="Visitors"
            />
          ),
        }}
      />

      {/* 📱 Scan */}
      <Tabs.Screen
        name="scan"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName={focused ? "scan" : "scan-outline"}
              label="Scan"
            />
          ),
        }}
      />

      {/* 🔔 Alerts */}
      <Tabs.Screen
        name="approvals"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName={focused ? "notifications" : "notifications-outline"}
              label="Alerts"
              badge
            />
          ),
        }}
      />

      {/* 👤 Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName={focused ? "person" : "person-outline"}
              label="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 16,
    left: 14,
    right: 14,
    height: 68,
    overflow: 'hidden',
    backgroundColor: 'rgba(18, 18, 18, 0.97)',
    borderRadius: 22,
    borderTopWidth: 0,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.07)',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  iconContainer: {
    padding: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    position: 'relative',
  },
  iconContainerFocused: {
    backgroundColor: 'rgba(255,255,255,0.09)',
    transform: [{ translateY: 0 }],
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: '#888888',
    letterSpacing: 0.3,
  },
  labelFocused: {
    color: '#ffffff',
    fontWeight: '600',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffffff',
    marginTop: 1,
    opacity: 0,
  },
  dotVisible: {
    opacity: 1,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FF4545',
    borderWidth: 1.5,
    borderColor: '#121212',
  },
});