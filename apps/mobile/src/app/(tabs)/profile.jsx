import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Switch } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  User,
  Settings,
  DollarSign,
  Globe,
  Moon,
  Database,
  Bell,
  HelpCircle,
  ChevronRight,
  LogOut,
} from "lucide-react-native";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [currency, setCurrency] = useState("USD");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const portfolioStats = {
    totalValue: 49100,
    totalWatches: 3,
    totalGainLoss: 8300,
    bestPerformer: "Rolex Submariner Date",
  };

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    rightElement,
    noBorder,
  }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? "#F8F9FA" : "transparent",
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: noBorder ? 0 : 1,
        borderBottomColor: "#F0F0F0",
      })}
    >
      <View
        style={{
          backgroundColor: "#F8F9FA",
          borderRadius: 10,
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 16,
        }}
      >
        <Icon size={20} color="#8E8E93" strokeWidth={2} />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Inter_600SemiBold",
            color: "#000000",
            marginBottom: subtitle ? 4 : 0,
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter_400Regular",
              color: "#8E8E93",
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {rightElement || (
        <ChevronRight size={20} color="#C7C7CC" strokeWidth={2} />
      )}
    </Pressable>
  );

  const StatCard = ({ title, value, subtitle, color = "#000000" }) => (
    <View
      style={{
        backgroundColor: "#F8F9FA",
        borderRadius: 12,
        padding: 20,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Inter_500Medium",
          color: "#8E8E93",
          marginBottom: 8,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 24,
          fontFamily: "Inter_700Bold",
          color: color,
          marginBottom: subtitle ? 4 : 0,
        }}
      >
        {value}
      </Text>
      {subtitle && (
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Inter_400Regular",
            color: "#8E8E93",
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 24,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text
          style={{
            fontSize: 34,
            fontFamily: "Inter_700Bold",
            color: "#000000",
            marginBottom: 24,
          }}
        >
          Profile
        </Text>

        {/* User Info Card */}
        <View
          style={{
            backgroundColor: "#F8F9FA",
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 25,
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <User size={24} color="#8E8E93" strokeWidth={2} />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Inter_600SemiBold",
                  color: "#000000",
                  marginBottom: 4,
                }}
              >
                Watch Collector
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Inter_400Regular",
                  color: "#8E8E93",
                }}
              >
                collector@chronovault.com
              </Text>
            </View>
          </View>

          {/* Portfolio Summary Stats */}
          <View
            style={{
              flexDirection: "row",
              gap: 12,
            }}
          >
            <StatCard
              title="Total Value"
              value={`$${portfolioStats.totalValue.toLocaleString()}`}
              subtitle={`+$${portfolioStats.totalGainLoss.toLocaleString()}`}
              color="#34C759"
            />
            <StatCard
              title="Collection"
              value={portfolioStats.totalWatches.toString()}
              subtitle="Watches owned"
            />
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Settings Sections */}
        <View style={{ paddingHorizontal: 20 }}>
          {/* App Preferences */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "#F0F0F0",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 16,
                backgroundColor: "#FAFBFC",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Inter_600SemiBold",
                  color: "#000000",
                }}
              >
                Preferences
              </Text>
            </View>

            <SettingItem
              icon={DollarSign}
              title="Currency"
              subtitle={`Currently set to ${currency}`}
              onPress={() => console.log("Change currency")}
            />

            <SettingItem
              icon={Moon}
              title="Dark Mode"
              subtitle="Toggle dark mode appearance"
              rightElement={
                <Switch
                  value={isDarkMode}
                  onValueChange={setIsDarkMode}
                  trackColor={{ false: "#E5E7EB", true: "#34C759" }}
                  thumbColor={isDarkMode ? "#FFFFFF" : "#FFFFFF"}
                />
              }
            />

            <SettingItem
              icon={Bell}
              title="Notifications"
              subtitle="Price alerts and market updates"
              rightElement={
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: "#E5E7EB", true: "#34C759" }}
                  thumbColor={notifications ? "#FFFFFF" : "#FFFFFF"}
                />
              }
              noBorder
            />
          </View>

          {/* Data & Sync */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "#F0F0F0",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 16,
                backgroundColor: "#FAFBFC",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Inter_600SemiBold",
                  color: "#000000",
                }}
              >
                Data & Sync
              </Text>
            </View>

            <SettingItem
              icon={Database}
              title="Data Sources"
              subtitle="Chrono24, WatchCharts, eBay"
              onPress={() => console.log("Manage data sources")}
            />

            <SettingItem
              icon={Globe}
              title="Market Data Sync"
              subtitle="Last updated 2 hours ago"
              onPress={() => console.log("Sync market data")}
              noBorder
            />
          </View>

          {/* Account */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              marginBottom: 40,
              borderWidth: 1,
              borderColor: "#F0F0F0",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 16,
                backgroundColor: "#FAFBFC",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Inter_600SemiBold",
                  color: "#000000",
                }}
              >
                Account
              </Text>
            </View>

            <SettingItem
              icon={Settings}
              title="Account Settings"
              subtitle="Manage your account details"
              onPress={() => console.log("Account settings")}
            />

            <SettingItem
              icon={HelpCircle}
              title="Help & Support"
              subtitle="Get help or contact support"
              onPress={() => console.log("Help & support")}
            />

            <SettingItem
              icon={LogOut}
              title="Sign Out"
              onPress={() => console.log("Sign out")}
              rightElement={null}
              noBorder
            />
          </View>

          {/* App Info */}
          <View
            style={{
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter_600SemiBold",
                color: "#000000",
                marginBottom: 4,
              }}
            >
              ChronoVault
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter_400Regular",
                color: "#8E8E93",
              }}
            >
              Version 1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
