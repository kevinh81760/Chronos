import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Plus, TrendingUp, TrendingDown } from "lucide-react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// Mock data for portfolio
const portfolioData = [
  {
    id: 1,
    brand: "Rolex",
    model: "Submariner Date",
    reference: "126610LN",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400",
    acquisitionPrice: 8500,
    currentValue: 12800,
    valueChange: 4300,
    changePercent: 50.59,
    isPositive: true,
  },
  {
    id: 2,
    brand: "Omega",
    model: "Speedmaster Professional",
    reference: "310.30.42.50.01.001",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400",
    acquisitionPrice: 5200,
    currentValue: 4800,
    valueChange: -400,
    changePercent: -7.69,
    isPositive: false,
  },
  {
    id: 3,
    brand: "Patek Philippe",
    model: "Calatrava",
    reference: "5196P-001",
    image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400",
    acquisitionPrice: 28000,
    currentValue: 32500,
    valueChange: 4500,
    changePercent: 16.07,
    isPositive: true,
  },
  {
    id: 4,
    brand: "Tudor",
    model: "Black Bay 58",
    reference: "M79030N-0001",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400",
    acquisitionPrice: 2800,
    currentValue: 3200,
    valueChange: 400,
    changePercent: 14.29,
    isPositive: true,
  },
];

const totalValue = portfolioData.reduce(
  (sum, watch) => sum + watch.currentValue,
  0,
);
const totalGainLoss = portfolioData.reduce(
  (sum, watch) => sum + watch.valueChange,
  0,
);
const totalGainLossPercent =
  (totalGainLoss / (totalValue - totalGainLoss)) * 100;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const navigateToWatchDetail = (watchId) => {
    router.push(`/(tabs)/watch-detail/${watchId}`);
  };

  const openAddWatchModal = () => {
    console.log("Open add watch modal");
  };

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
            marginBottom: 4,
          }}
        >
          Portfolio
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "Inter_400Regular",
            color: "#8E8E93",
            marginBottom: 24,
          }}
        >
          Welcome back, Collector
        </Text>

        {/* Total Collection Value Card */}
        <View
          style={{
            backgroundColor: "#F8F9FA",
            borderRadius: 12,
            padding: 20,
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Inter_500Medium",
              color: "#8E8E93",
              marginBottom: 8,
            }}
          >
            Total Collection Value
          </Text>
          <Text
            style={{
              fontSize: 34,
              fontFamily: "Inter_700Bold",
              color: "#000000",
              marginBottom: 8,
            }}
          >
            ${totalValue.toLocaleString()}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {totalGainLoss >= 0 ? (
              <TrendingUp size={16} color="#34C759" strokeWidth={2} />
            ) : (
              <TrendingDown size={16} color="#FF3B30" strokeWidth={2} />
            )}
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Inter_600SemiBold",
                color: totalGainLoss >= 0 ? "#34C759" : "#FF3B30",
                marginLeft: 6,
              }}
            >
              +${totalGainLoss.toLocaleString()} (
              {totalGainLossPercent.toFixed(2)}%)
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontFamily: "Inter_700Bold",
              color: "#000000",
            }}
          >
            My Watches
          </Text>
          <Pressable
            onPress={openAddWatchModal}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#F0F0F0" : "transparent",
              borderRadius: 20,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderColor: "#E5E7EB",
            })}
          >
            <Plus size={20} color="#8E8E93" strokeWidth={2} />
          </Pressable>
        </View>

        {/* Watch Grid */}
        <View style={{ paddingHorizontal: 20 }}>
          {portfolioData.map((watch, index) => (
            <Pressable
              key={watch.id}
              onPress={() => navigateToWatchDetail(watch.id)}
              style={({ pressed }) => ({
                backgroundColor: pressed ? "#F8F9FA" : "#FFFFFF",
                borderRadius: 16,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: "#F0F0F0",
                overflow: "hidden",
              })}
            >
              {/* Watch Image */}
              <View
                style={{
                  backgroundColor: "#FAFBFC",
                  padding: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 200,
                }}
              >
                <Image
                  source={{ uri: watch.image }}
                  style={{
                    width: "80%",
                    height: "100%",
                    borderRadius: 8,
                  }}
                  contentFit="contain"
                  transition={200}
                />
              </View>

              {/* Watch Info */}
              <View style={{ padding: 20 }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Inter_500Medium",
                    color: "#8E8E93",
                    marginBottom: 4,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {watch.brand}
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Inter_600SemiBold",
                    color: "#000000",
                    marginBottom: 8,
                    lineHeight: 24,
                  }}
                >
                  {watch.model}
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_400Regular",
                    color: "#8E8E93",
                    marginBottom: 16,
                  }}
                >
                  Ref. {watch.reference}
                </Text>

                {/* Price and Performance */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 24,
                        fontFamily: "Inter_700Bold",
                        color: "#000000",
                        marginBottom: 4,
                      }}
                    >
                      ${watch.currentValue.toLocaleString()}
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: watch.isPositive ? "#E8F5E8" : "#FFEBEB",
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 16,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {watch.isPositive ? (
                      <TrendingUp size={14} color="#34C759" strokeWidth={2} />
                    ) : (
                      <TrendingDown size={14} color="#FF3B30" strokeWidth={2} />
                    )}
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_600SemiBold",
                        color: watch.isPositive ? "#34C759" : "#FF3B30",
                        marginLeft: 4,
                      }}
                    >
                      {watch.isPositive ? "+" : ""}
                      {watch.changePercent.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
