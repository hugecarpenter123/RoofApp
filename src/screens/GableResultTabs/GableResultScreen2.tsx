import React from "react";
import { View, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { GableResultTabsParamList } from "../GableResultTabs";
import Svg, { Polygon } from "react-native-svg";
import RoofSimulation from "../../utils/RoofSimulation";

type GableResultScreen2Props = {
    route: RouteProp<GableResultTabsParamList, 'ResultTab2'>
}

const GableResultScreen2: React.FC<GableResultScreen2Props> = ({ route }) => {
    const gableData = route.params.result.gableResult;
    const simulation = new RoofSimulation(gableData);
    const elements = () => {
        return simulation.getPicture().map((x, index) => (
            <Polygon points={x.points} fill={x.fill} stroke={'#90550e'} strokeWidth={3} key={index}/>
        ));
    }

    return (
        <View style={styles.container}>
            <Svg style={styles.svg} viewBox={simulation.viewBox}>
                {elements()}
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
    },
    svg: {
        flex: 1,
        height: '100%',
        width: '100%',
    }
});

export default GableResultScreen2;