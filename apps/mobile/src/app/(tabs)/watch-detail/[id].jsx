import React, { useState, useRef } from "react";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Heart,
  Plus,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

// Mock watch data (in a real app, this would come from an API)
const watchData = {
  1: {
    id: 1,
    brand: "Rolex",
    model: "Submariner Date",
    reference: "126610LN",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800",
      "https://images.unsplash.com/photo-1594576722512-582bcd46fba3?w=800",
      "https://images.unsplash.com/photo-1548169874-53e85f753041?w=800",
    ],
    currentValue: 12800,
    acquisitionPrice: 8500,
    movement: "Automatic (Caliber 3235)",
    caseMaterial: "Oystersteel",
    diameter: "41mm",
    waterResistance: "300m",
    purchaseDate: "2021-06-15",
    notes: "Perfect condition, box and papers included.",
    priceHistory: [
      { date: "2024-01", value: 11200 },
      { date: "2024-02", value: 11800 },
      { date: "2024-03", value: 12100 },
      { date: "2024-04", value: 12400 },
      { date: "2024-05", value: 12800 },
    ],
  },
  "rolex-sub": {
    id: "rolex-sub",
    brand: "Rolex",
    model: "Submariner Date 41mm",
    reference: "126610LN",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800",
      "https://images.unsplash.com/photo-1594576722512-582bcd46fba3?w=800",
      "https://images.unsplash.com/photo-1548169874-53e85f753041?w=800",
    ],
    currentValue: 12800,
    movement: "Automatic (Caliber 3235)",
    caseMaterial: "Oystersteel",
    diameter: "41mm",
    waterResistance: "300m",
    isInPortfolio: false,
    isInWatchlist: false,
    priceHistory: [
      { date: "2024-01", value: 11200 },
      { date: "2024-02", value: 11800 },
      { date: "2024-03", value: 12100 },
      { date: "2024-04", value: 12400 },
      { date: "2024-05", value: 12800 },
    ],
  },
};

export default function WatchDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const scrollViewRef = useRef(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1Y");

  const watch = watchData[id];

  if (!watch) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Inter_500Medium",
            color: "#8E8E93",
          }}
        >
          Watch not found
        </Text>
      </View>
    );
  }

  const valueChange = watch.acquisitionPrice
    ? watch.currentValue - watch.acquisitionPrice
    : 0;
  const changePercent = watch.acquisitionPrice
    ? (valueChange / watch.acquisitionPrice) * 100
    : 0;
  const isPositive = valueChange >= 0;

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveImageIndex(index);
  };

  const addToPortfolio = () => {
    console.log("Add to portfolio:", watch.id);
  };

  const addToWatchlist = () => {
    console.log("Add to watchlist:", watch.id);
  };

  const addNote = () => {
    console.log("Add note for watch:", watch.id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 20,
          paddingBottom: 16,
          backgroundColor: "#FFFFFF",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#F0F0F0" : "transparent",
            borderRadius: 20,
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <ArrowLeft size={24} color="#000000" strokeWidth={2} />
        </Pressable>

        <Text
          style={{
            fontSize: 18,
            fontFamily: "Inter_600SemiBold",
            color: "#000000",
            flex: 1,
            textAlign: "center",
            marginHorizontal: 16,
          }}
        >
          Watch Details
        </Text>

        <Pressable
          onPress={addToWatchlist}
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#F0F0F0" : "transparent",
            borderRadius: 20,
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <Heart size={24} color="#8E8E93" strokeWidth={2} />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Carousel */}
        <View style={{ backgroundColor: "#FAFBFC", marginBottom: 24 }}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {watch.images.map((imageUri, index) => (
              <View
                key={index}
                style={{
                  width,
                  height: 350,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 40,
                  paddingVertical: 40,
                }}
              >
                <Image
                  source={{ uri: imageUri }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 12,
                  }}
                  contentFit="contain"
                  transition={200}
                />
              </View>
            ))}
          </ScrollView>

          {/* Image Indicators */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: 20,
              gap: 8,
            }}
          >
            {watch.images.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    index === activeImageIndex ? "#000000" : "#E5E7EB",
                }}
              />
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {/* Watch Info */}
          <View style={{ marginBottom: 20 }}>
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
                fontSize: 28,
                fontFamily: "Inter_700Bold",
                color: "#000000",
                marginBottom: 8,
                lineHeight: 36,
              }}
            >
              {watch.model}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter_400Regular",
                color: "#8E8E93",
                marginBottom: 20,
              }}
            >
              Ref. {watch.reference}
            </Text>

            <Text
              style={{
                fontSize: 34,
                fontFamily: "Inter_700Bold",
                color: "#000000",
                marginBottom: 8,
              }}
            >
              ${watch.currentValue.toLocaleString()}
            </Text>

            {watch.acquisitionPrice && (
              <View
                style={{
                  backgroundColor: isPositive ? "#E8F5E8" : "#FFEBEB",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "flex-start",
                }}
              >
                {isPositive ? (
                  <TrendingUp size={16} color="#34C759" strokeWidth={2} />
                ) : (
                  <TrendingDown size={16} color="#FF3B30" strokeWidth={2} />
                )}
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter_600SemiBold",
                    color: isPositive ? "#34C759" : "#FF3B30",
                    marginLeft: 6,
                  }}
                >
                  {isPositive ? "+" : ""}${valueChange.toLocaleString()} (
                  {changePercent.toFixed(2)}%)
                </Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              marginBottom: 30,
            }}
          >
            {!watch.isInPortfolio && (
              <Pressable
                onPress={addToPortfolio}
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: pressed ? "#2FB34A" : "#34C759",
                  borderRadius: 12,
                  paddingVertical: 16,
                  paddingHorizontal: 20,
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
                  Add to Portfolio
                </Text>
              </Pressable>
            )}

            <Pressable
              onPress={addNote}
              style={({ pressed }) => ({
                backgroundColor: pressed ? "#F0F0F0" : "#F8F9FA",
                borderRadius: 12,
                paddingVertical: 16,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#E5E7EB",
                flex: watch.isInPortfolio ? 1 : 0.7,
              })}
            >
              <FileText size={18} color="#8E8E93" strokeWidth={2} />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Inter_600SemiBold",
                  color: "#8E8E93",
                  marginLeft: 8,
                }}
              >
                Add Note
              </Text>
            </Pressable>
          </View>

          {/* Specifications */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "#F0F0F0",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Inter_600SemiBold",
                color: "#000000",
                marginBottom: 20,
              }}
            >
              Specifications
            </Text>

            <View style={{ gap: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter_400Regular",
                    color: "#8E8E93",
                  }}
                >
                  Movement
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter_600SemiBold",
                    color: "#000000",
                  }}
                >
                  {watch.movement}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter_400Regular",
                    color: "#8E8E93",
                  }}
                >
                  Case Material
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter_600SemiBold",
                    color: "#000000",
                  }}
                >
                  {watch.caseMaterial}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter_400Regular",
                    color: "#8E8E93",
                  }}
                >
                  Diameter
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter_600SemiBold",
                    color: "#000000",
                  }}
                >
                  {watch.diameter}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter_400Regular",
                    color: "#8E8E93",
                  }}
                >
                  Water Resistance
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter_600SemiBold",
                    color: "#000000",
                  }}
                >
                  {watch.waterResistance}
                </Text>
              </View>
            </View>
          </View>

          {/* Purchase Info (if owned) */}
          {watch.acquisitionPrice && (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 20,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: "#F0F0F0",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Inter_600SemiBold",
                  color: "#000000",
                  marginBottom: 20,
                }}
              >
                Purchase Information
              </Text>

              <View style={{ gap: 16 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Inter_400Regular",
                      color: "#8E8E93",
                    }}
                  >
                    Purchase Price
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Inter_600SemiBold",
                      color: "#000000",
                    }}
                  >
                    ${watch.acquisitionPrice.toLocaleString()}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Inter_400Regular",
                      color: "#8E8E93",
                    }}
                  >
                    Purchase Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Inter_600SemiBold",
                      color: "#000000",
                    }}
                  >
                    {new Date(watch.purchaseDate).toLocaleDateString()}
                  </Text>
                </View>
                {watch.notes && (
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Inter_400Regular",
                        color: "#8E8E93",
                        marginBottom: 8,
                      }}
                    >
                      Notes
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Inter_400Regular",
                        color: "#000000",
                        lineHeight: 24,
                      }}
                    >
                      {watch.notes}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
