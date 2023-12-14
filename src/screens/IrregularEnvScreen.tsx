import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import React from "react";
import { View, Text } from 'react-native'
import { RootStackParamList } from "./AppStacks";

type IrregularEnvScreenProps = NativeStackScreenProps<RootStackParamList, 'IrregularEnvelopeScreen'>

const IrregularEnvScreen: React.FC<IrregularEnvScreenProps> = ({ route, navigation }) => {
    return (
        <View>
            <Text>IrregularEnvScreen</Text>
        </View>
    );
}

export default IrregularEnvScreen;