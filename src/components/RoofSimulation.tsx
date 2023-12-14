import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Circle, Polygon, Rect } from 'react-native-svg';
import { Dimensions } from 'react-native/Libraries/Utilities/Dimensions';

export type Shape = {
    type: 'circle' | 'rectangle';
    x: number;
    y: number;
    size: number;
    color: string;
}

type RoofSimulationProps = {
    shapes: Shape[];
}

const RoofSimulation: React.FC<RoofSimulationProps> = ({ shapes }) => {

    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const onLayout = (event: any) => {
        const { x, y, height, width } = event.nativeEvent.layout;
    }

    const baseLength = 900;
    const height = Math.tan((35 * Math.PI) / 180) * (baseLength / 2);

    return (
        <View style={styles.container} >
            <Svg style={styles.svg} onLayout={onLayout} viewBox={`0 0 ${baseLength} ${height}`}>
                {/* {shapes.map((shape, index) => {
                    switch (shape.type) {
                        case 'circle':
                            return (
                                <Circle
                                    key={index}
                                    cx={shape.x}
                                    cy={shape.y}
                                    r={shape.size / 2}
                                    fill={shape.color}
                                />
                            );
                        case 'rectangle':
                            return (
                                <Rect
                                    key={index}
                                    x={shape.x - shape.size / 2}
                                    y={shape.y - shape.size / 2}
                                    width={shape.size}
                                    height={shape.size}
                                    fill={shape.color}
                                />
                            );
                        default:
                            return null;
                    }
                })} */}
                <Rect
                    x={0}
                    y={0}
                    width={100}
                    height={100}
                    fill='brown'
                />
                <Polygon
                    points={`0,${height} ${baseLength}, ${height} ${baseLength / 2},0`}
                    fill="blue"
                />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // backgroundColor: 'yellow'
    // },
    // svg: {
    //     // backgroundColor:'pink',
    //     flex: 1,
    // },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    svg: {
        backgroundColor: 'pink',
        height: '100%',
        width: '100%',
    }
});

export default RoofSimulation;