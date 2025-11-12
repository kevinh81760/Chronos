import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

/**
 * Chronos Logo Component - Placeholder/Fallback
 * Replace this with your actual logo by using Image component with real logo file
 */
export const ChronosLogo: React.FC<{ size?: number }> = ({ size = 200 }) => {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
        {/* Outer circle */}
        <Circle cx="100" cy="100" r="90" stroke="#000000" strokeWidth="3" fill="none" />
        
        {/* Clock hands - representing Chronos/Time */}
        {/* Hour hand */}
        <Path
          d="M100 100 L100 50"
          stroke="#000000"
          strokeWidth="6"
          strokeLinecap="round"
        />
        
        {/* Minute hand */}
        <Path
          d="M100 100 L140 100"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Center dot */}
        <Circle cx="100" cy="100" r="8" fill="#000000" />
        
        {/* Hour markers - 12, 3, 6, 9 */}
        <Circle cx="100" cy="20" r="4" fill="#000000" />
        <Circle cx="180" cy="100" r="4" fill="#000000" />
        <Circle cx="100" cy="180" r="4" fill="#000000" />
        <Circle cx="20" cy="100" r="4" fill="#000000" />
        
        {/* Inner circle accent */}
        <Circle cx="100" cy="100" r="70" stroke="#000000" strokeWidth="1" fill="none" opacity="0.3" />
      </Svg>
    </View>
  );
};

