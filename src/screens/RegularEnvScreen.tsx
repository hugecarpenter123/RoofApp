import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import React from "react";
import { View, Text } from 'react-native'
import { RootStackParamList } from "./AppStacks";

type RegularEnvScreenProps = NativeStackScreenProps<RootStackParamList, 'RegularEnvelopeScreen'>

const RegularEnvScreen: React.FC<RegularEnvScreenProps> = ({ route, navigation }) => {
    return (
        <View>
            <Text>Dach Kopertowy foremny</Text>
        </View>
    );
}

export default RegularEnvScreen;