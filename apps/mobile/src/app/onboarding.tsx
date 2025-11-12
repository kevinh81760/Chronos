import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Video, ResizeMode } from 'expo-av';
import { useAuth } from '@/utils/auth/useAuth';

// Complete WebBrowser session on mount
WebBrowser.maybeCompleteAuthSession();

export default function OnboardingScreen() {
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();

  // Configure Google OAuth
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID,
  });

  // Handle Google Sign-In response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        handleGoogleSignIn(authentication.accessToken);
      }
    } else if (response?.type === 'error') {
      setLoading(false);
      Alert.alert('Authentication Error', 'Failed to sign in with Google. Please try again.');
    } else if (response?.type === 'dismiss' || response?.type === 'cancel') {
      // User dismissed or cancelled the auth flow
      setLoading(false);
    }
  }, [response]);

  const handleGoogleSignIn = async (accessToken: string) => {
    try {
      setLoading(true);

      // Fetch user info from Google
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const userInfo = await userInfoResponse.json();

      // Store auth data
      const authData = {
        accessToken,
        user: {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        },
        timestamp: new Date().toISOString(),
      };

      setAuth(authData);

      // Navigate to home screen
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Google sign-in error:', error);
      Alert.alert('Error', 'An error occurred during sign-in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = async () => {
    setLoading(true);
    try {
      await promptAsync();
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to initiate sign-in. Please try again.');
    }
  };

  const { width, height } = Dimensions.get('window');

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      
      {/* Full-screen background video */}
      <Video
        source={require('../../assets/images/fireplace.mov')}
        style={[
          StyleSheet.absoluteFillObject,
          {
            width: width,
            height: height,
          }
        ]}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
      />
      
      {/* Main Content Container */}
      <View className="flex-1 justify-between px-8 pt-16 pb-12">
        
        {/* Center Section - Logo and Tagline */}
        <View className="flex-1 justify-center items-center px-4">
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'timing',
              duration: 1200,
              delay: 300,
            }}
            style={{ alignItems: 'center', width: '100%', marginTop: 80 }}
          >
            <Image 
              source={require('../../assets/images/chronos.png')}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
            
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'timing',
                duration: 800,
                delay: 800,
              }}
              style={{ alignItems: 'center', width: '100%' }}
            >
              <Text 
                style={{ 
                  fontFamily: 'MySL-BoldItalic', 
                  color: '#FFFFFF',
                  fontSize: 36,
                  marginTop: 24,
                  textAlign: 'center'
                }}
              >
                Chronos
              </Text>
            </MotiView>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'timing',
              duration: 800,
              delay: 1200,
            }}
            style={{ marginTop: 160, marginLeft: 16 }}
          >
            <Text 
              className="text-white text-center leading-relaxed"
              style={{ fontFamily: 'MySL-BoldItalic', fontSize: 28, color: '#FFFFFF' }}
            >
              Chronos is a fully{'\n'}
              <Text className="italic" style={{ fontFamily: 'MySL-BoldItalic', fontSize: 28, color: '#FFFFFF' }}>automated</Text> watch{'\n'}
              trading marketplace.
            </Text>
          </MotiView>
        </View>

        {/* Bottom Section - Buttons */}
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 800,
            delay: 1600,
          }}
          style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 160 }}
        >
          {/* Log In Button */}
          <TouchableOpacity
            onPress={onSignInPress}
            disabled={loading}
            style={{
              width: 190,
              height: 62,
              borderRadius: 31,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 2,
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <Text 
              style={{ 
                fontFamily: 'Montserrat',
                fontSize: 20,
                color: '#FFFFFF',
                fontWeight: '600'
              }}
            >
              Log In
            </Text>
          </TouchableOpacity>

          {/* Join Chronos Button */}
          <TouchableOpacity
            onPress={onSignInPress}
            disabled={loading}
            style={{
              width: 190,
              height: 62,
              borderRadius: 31,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
            }}
          >
            <Text 
              style={{ 
                fontFamily: 'Montserrat',
                fontSize: 20,
                color: '#000000',
                fontWeight: '600'
              }}
            >
              Join Chronos
            </Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </View>
  );
}

