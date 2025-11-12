import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Plus,
  Eye,
} from "lucide-react-native";
import { useRouter } from "expo-router";

// Mock market data
const trendingWatches = [
  {
    id: "rolex-sub",
    brand: "Rolex",
    model: "Submariner Date 41mm",
    reference: "126610LN",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400",
    currentValue: 12800,
    sevenDayChange: 3.2,
    isPositive: true,
    sentiment: "strong_buy",
  },
  {
    id: "omega-speed",
    brand: "Omega",
    model: "Speedmaster Professional",
    reference: "310.30.42.50.01.001",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400",
    currentValue: 4800,
    sevenDayChange: -2.1,
    isPositive: false,
    sentiment: "hold",
  },
  {
    id: "patek-aquanaut",
    brand: "Patek Philippe",
    model: "Aquanaut Travel Time",
    reference: "5164A-001",
    image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400",
    currentValue: 75000,
    sevenDayChange: 5.7,
    isPositive: true,
    sentiment: "strong_buy",
  },
  {
    id: "ap-royal-oak",
    brand: "Audemars Piguet",
    model: "Royal Oak Offshore",
    reference: "26470ST.OO.A027CA.01",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400",
    currentValue: 32500,
    sevenDayChange: 1.8,
    isPositive: true,
    sentiment: "buy",
  },
  {
    id: "tudor-bb",
    brand: "Tudor",
    model: "Black Bay 58",
    reference: "M79030N-0001",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400",
    currentValue: 3200,
    sevenDayChange: -0.8,
    isPositive: false,
    sentiment: "hold",
  },
  {
    id: "cartier-santos",
    brand: "Cartier",
    model: "Santos de Cartier Large",
    reference: "WSSA0029",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400",
    currentValue: 6800,
    sevenDayChange: 2.4,
    isPositive: true,
    sentiment: "buy",
  },
];

const getSentimentColor = (sentiment) => {
  switch (sentiment) {
    case "strong_buy":
      return "#34C759";
    case "buy":
      return "#30D158";
    case "hold":
      return "#FF9500";
    case "sell":
      return "#FF3B30";
    default:
      return "#8E8E93";
  }
};

const getSentimentIcon = (sentiment, isPositive) => {
  if (isPositive) {
    return (
      <TrendingUp
        size={16}
        color={getSentimentColor(sentiment)}
        strokeWidth={2}
      />
    );
  }
  return (
    <TrendingDown
      size={16}
      color={getSentimentColor(sentiment)}
      strokeWidth={2}
    />
  );
};

export default function MarketScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const navigateToWatchDetail = (watchId) => {
    router.push(`/(tabs)/watch-detail/${watchId}`);
  };

  const addToPortfolio = (watchId) => {
    console.log("Add to portfolio:", watchId);
  };

  const addToWatchlist = (watchId) => {
    console.log("Add to watchlist:", watchId);
  };

  const filteredWatches = trendingWatches.filter(
    (watch) =>
      watch.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      watch.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      watch.reference.toLowerCase().includes(searchQuery.toLowerCase()),
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
          Market
        </Text>

        {/* Search Bar */}
        <View
          style={{
            backgroundColor: "#F8F9FA",
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderWidth: 1,
            borderColor: "#F0F0F0",
          }}
        >
          <Search size={20} color="#8E8E93" strokeWidth={2} />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              fontFamily: "Inter_400Regular",
              color: "#000000",
              marginLeft: 12,
            }}
            placeholder="Search brands, models, references..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Header */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 28,
              fontFamily: "Inter_700Bold",
              color: "#000000",
            }}
          >
            Trending Now
          </Text>
        </View>

        {/* Watch Cards */}
        <View style={{ paddingHorizontal: 20 }}>
          {filteredWatches.map((watch) => (
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

                {/* Price and Performance Row */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
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

                    <View
                      style={{
                        backgroundColor: watch.isPositive
                          ? "#E8F5E8"
                          : "#FFEBEB",
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 16,
                        flexDirection: "row",
                        alignItems: "center",
                        alignSelf: "flex-start",
                      }}
                    >
                      {watch.isPositive ? (
                        <TrendingUp size={14} color="#34C759" strokeWidth={2} />
                      ) : (
                        <TrendingDown
                          size={14}
                          color="#FF3B30"
                          strokeWidth={2}
                        />
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
                        {watch.sevenDayChange}% (7d)
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Pressable
                    onPress={() => addToWatchlist(watch.id)}
                    style={({ pressed }) => ({
                      flex: 1,
                      backgroundColor: pressed ? "#F0F0F0" : "#F8F9FA",
                      borderRadius: 12,
                      paddingVertical: 14,
                      paddingHorizontal: 16,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#E5E7EB",
                    })}
                  >
                    <Eye size={18} color="#8E8E93" strokeWidth={2} />
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Inter_600SemiBold",
                        color: "#8E8E93",
                        marginLeft: 8,
                      }}
                    >
                      Watch
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => addToPortfolio(watch.id)}
                    style={({ pressed }) => ({
                      flex: 1,
                      backgroundColor: pressed ? "#2FB34A" : "#34C759",
                      borderRadius: 12,
                      paddingVertical: 14,
                      paddingHorizontal: 16,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    })}
                  >
                    <Plus size={18} color="#FFFFFF" strokeWidth={2} />
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Inter_600SemiBold",
                        color: "#FFFFFF",
                        marginLeft: 8,
                      }}
                    >
                      Add
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
