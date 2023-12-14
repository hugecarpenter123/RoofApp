import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppStacks';
import GableResultScreen1 from './GableResultTabs/GableResultScreen1';
import GableResultScreen2 from './GableResultTabs/GableResultScreen2';
import GableRoofCalculator from '../utils/GableRoofCalculator';
import GableRoofResult from '../utils/GableRoofResult';
import GableResultScreen3 from './GableResultTabs/GableResultScreen3';


type GableResultTabsProps = NativeStackScreenProps<RootStackParamList, 'GableResultTabs'>
export type GableResultTabsParamList = {
    'ResultTab1': { result: GableRoofResult },
    'ResultTab2': { result: GableRoofResult },
    'ResultTab3': { result: GableRoofResult },
}
const Tab = createMaterialTopTabNavigator<GableResultTabsParamList>();

const GableResultTabs: React.FC<GableResultTabsProps> = ({ route }) => {
    const result = route.params.result;

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name="ResultTab1"
                component={GableResultScreen1}
                initialParams={{ result }}
                options={{tabBarLabel: "Wymiary"}}
            />
            <Tab.Screen
                name="ResultTab2"
                component={GableResultScreen2}
                initialParams={{ result }}
                options={{tabBarLabel: "Dach"}}
            />
            <Tab.Screen
                name="ResultTab3"
                component={GableResultScreen3}
                initialParams={{ result }}
                options={{tabBarLabel: "Krokiew"}}
            />
        </Tab.Navigator>
    );
}

export default GableResultTabs;