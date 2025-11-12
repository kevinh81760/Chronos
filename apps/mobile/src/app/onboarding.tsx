import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleButton } from '@/components/GoogleButton';
import { ChronosLogo } from '@/components/ChronosLogo';
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

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      {/* Main Content Container */}
      <View className="flex-1 justify-between px-8 pt-20 pb-12">
        
        {/* Logo Section - Centered */}
        <View className="flex-1 justify-center items-center">
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'timing',
              duration: 1200,
              delay: 300,
            }}
            className="items-center"
          >
            {/* Logo - Replace ChronosLogo with your actual logo image */}
            {/* Uncomment below and add your logo to assets/images/ */}
            {/* <Image
              source={require('../../assets/images/chronos-logo.png')}
              style={{ width: 200, height: 200 }}
              contentFit="contain"
            /> */}
            
            {/* Temporary placeholder logo */}
            <ChronosLogo size={200} />
            
            {/* App Name */}
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'timing',
                duration: 800,
                delay: 800,
              }}
            >
              <Text 
                className="text-5xl text-black mt-8 tracking-tight"
                style={{ fontFamily: 'MySL-BoldItalic' }}
              >
                Chronos
              </Text>
            </MotiView>

            {/* Tagline */}
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'timing',
                duration: 800,
                delay: 1200,
              }}
            >
              <Text 
                className="text-gray-600 text-center mt-4 text-base tracking-wide"
                style={{ fontFamily: 'Montserrat' }}
              >
                A fully automated watch{'\n'}trading marketplace
              </Text>
            </MotiView>
          </MotiView>
        </View>

        {/* Bottom Section - Sign In Button */}
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 800,
            delay: 1600,
          }}
        >
          <GoogleButton onPress={onSignInPress} loading={loading} />
          
          {/* Terms & Privacy */}
          <Text 
            className="text-gray-400 text-center mt-6 text-xs leading-5"
            style={{ fontFamily: 'Montserrat' }}
          >
            By signing in, you agree to our{'\n'}
            <Text className="text-gray-600">Terms of Service</Text> and{' '}
            <Text className="text-gray-600">Privacy Policy</Text>
          </Text>
        </MotiView>
      </View>
    </View>
  );
}

