import React, { useEffect } from "react";
import { View, StatusBar, Image, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "./AppStacks";

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>;

const SplashScreen: React.FC<SplashScreenProps> = ({ route, navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('MainScreen');
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Image source={require('../static/images/splash-screen.png')} style={styles.backgroundImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default SplashScreen;