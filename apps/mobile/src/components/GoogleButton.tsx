import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GoogleButtonProps {
  onPress: () => void;
  loading?: boolean;
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({ onPress, loading = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className="w-full bg-black rounded-2xl py-5 px-8 flex-row items-center justify-center shadow-lg active:opacity-80"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <>
          <Ionicons name="logo-google" size={24} color="#FFFFFF" style={{ marginRight: 12 }} />
          <Text 
            className="text-white text-lg font-bold tracking-wide"
            style={{ fontFamily: 'Montserrat' }}
          >
            Sign In with Google
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

