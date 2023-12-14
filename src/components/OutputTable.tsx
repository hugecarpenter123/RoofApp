import React from 'react';
import { View, StyleSheet, Text, StyleProp, TextStyle } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { cm } from '../utils/NumberFormatter';

type OutputTable = {
    header?: string,
    headers: string[],
    data: number[][] | string[][],
}

const OutputTable: React.FC<OutputTable> = ({ header, headers, data }) => {
    const textStyle: StyleProp<TextStyle> = {
        margin: 6,
    };
    return (
        <View style={styles.container}>
            {header && <Text style={styles.sectionHeader}>{header}</Text>}
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={headers} style={styles.head} textStyle={styles.text} />
                <Rows data={data} textStyle={textStyle} />
            </Table>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 40,
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        margin: 6
    },
    sectionHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    }
});

export default OutputTable;