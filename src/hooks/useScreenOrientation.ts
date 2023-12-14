import React, { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

type ScreenOrienationHookResult = {
    isPortrait: boolean;
}

declare module 'react-native' {
    interface Dimensions {
      removeEventListener(type: 'change', listener: (window: ScaledSize) => void): void;
    }
  }

function useScreenOrientation(): ScreenOrienationHookResult {
    const [isPortrait, setIsPortrait] = useState<boolean>(Dimensions.get('window').width < Dimensions.get('window').height);

    useEffect(() => {
        const handleOrientationChange = ({ window }: { window: ScaledSize }) => {
          const newIsPortrait = window.width < window.height;
          setIsPortrait(newIsPortrait);
        };
    
        const subscription = Dimensions.addEventListener('change', handleOrientationChange);
    
        return () => {
          subscription.remove();
        };
      }, []);

    return {
        isPortrait
    }
}

export default useScreenOrientation;