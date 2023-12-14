import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "./SplashScreen";
import MainScreen from "./MainScreen";
import GableScreen from "./GableScreen";
import RegularEnvScreen from "./RegularEnvScreen";
import IrregularEnvScreen from "./IrregularEnvScreen";
import GableResultTabs from "./GableResultTabs";
import GableRoofCalculator from "../utils/GableRoofCalculator";
import GableRoofResult from "../utils/GableRoofResult";

export type RootStackParamList = {
    'SplashScreen': undefined,
    'MainScreen': undefined,
    'GableScreen': undefined,
    'RegularEnvelopeScreen': undefined,
    'IrregularEnvelopeScreen': undefined,
    'GableResultTabs': {result: GableRoofResult},
    'RegularEnvelopeResultTabs': undefined,
    'IrregularEnvelopeResultTabs': undefined,
}
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStacks: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName='SplashScreen'
        >
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MainScreen"
                component={MainScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="GableScreen"
                component={GableScreen}
                options={{title: "Dach dwuspadowy"}}
            />
            <Stack.Screen
                name="RegularEnvelopeScreen"
                component={RegularEnvScreen}
                options={{title: "Dach kopertowy foremny"}}
            />
            <Stack.Screen
                name="IrregularEnvelopeScreen"
                component={IrregularEnvScreen}
                options={{title: "Dach kopertowy"}}
            />

            <Stack.Screen
                name="GableResultTabs"
                component={GableResultTabs}
                options={{title: "Wymiary dachu"}}
            />
            {/* <Stack.Screen
                name="RegularEnvelopeResultTabs"
                component={RegularEnvScreen}
            />
            <Stack.Screen
                name="IrregularEnvelopeResultTabs"
                component={IrregularEnvScreen}
            /> */}
        </Stack.Navigator>
    );
}

export default AppStacks;