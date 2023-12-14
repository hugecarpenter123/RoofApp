import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import { Image, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { RootStackParamList } from "./AppStacks";

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'MainScreen'>

const MainScreen: React.FC<MainScreenProps> = ({ route, navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('GableScreen')}
                    activeOpacity={0.8}
                >
                    <ImageBackground source={require('../static/images/gable-roof.png')} style={styles.backgroundImage} />
                    <Text style={styles.buttonText}>Dach Dwuspadowy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('RegularEnvelopeScreen')}
                    activeOpacity={0.8}
                >
                    <ImageBackground source={require('../static/images/envelope-roof.jpg')} style={styles.backgroundImage} />
                    <Text style={styles.buttonText}>Dach Kopertowy Foremny</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('IrregularEnvelopeScreen')}
                    activeOpacity={0.8}
                >
                    <ImageBackground source={require('../static/images/irregular-envelope-roof.jpg')} style={styles.backgroundImage} />
                    <Text style={styles.buttonText}>Dach Kopertowy Nieregularny</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'black',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        opacity: 1,
        borderRadius: 10,
    },
    button: {
        margin: 10,
        height: 250,
        overflow: 'hidden',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        textAlignVertical: 'center',
    },
});

export default MainScreen;