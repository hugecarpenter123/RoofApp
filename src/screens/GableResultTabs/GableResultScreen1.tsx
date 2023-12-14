import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GableResultTabsParamList } from "../GableResultTabs";
import OutputTable from "../../components/OutputTable";
import { cm, m2, deg, baseFormat } from '../../utils/NumberFormatter';
import Icon from 'react-native-vector-icons/FontAwesome';
import PopupWindow, { PopupWindowDataProps } from "../../components/PupupWindow";

type GableResultScreen1Props = {
    route: RouteProp<GableResultTabsParamList, 'ResultTab1'>;
}

const GableResultScreen1: React.FC<GableResultScreen1Props> = ({ route }) => {
    const gableData = route.params.result.gableResult;
    const distributionData = route.params.result.distributionResult.wyniki;
    const formattedDistributionData = distributionData.map((dataArr) => dataArr.map((val) => baseFormat(val)))
    const roofArea = route.params.result.powDachu;

    const isSparPresent = gableData.hj != undefined;
    const isFinPresent = gableData.mp != undefined;
    const headers = ["Ilości krokwi", "Odstęp [cm]", "Rysowanie [cm]"]

    const [popupProps, setPopupProps] = useState<PopupWindowDataProps>(
        {
            imageKey: '',
            show: false,
            label: '',
            value: '',
            onClose: () => hidePopup()
        }

    );

    
    const hidePopup = () => {
        setPopupProps({ ...popupProps, show: false });
    }
    
    const onInfoPress = (imageKey: string, label: string, value: string): void => {
        if (!imageKey) return; // bo niektóre pola mają '', wówczas nie potrzebują wyjeśnienia
        setPopupProps({ ...popupProps, imageKey, label, value, show: true })
    }

    interface SectionProps {
        sectionTitle: string,
        data: { name: string; value: string, imageKey: string }[]; // todo: fix types
    }

    const Section: React.FC<SectionProps> = ({ sectionTitle, data }) => {
        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{sectionTitle}</Text>
                {data.map((item, index) => (
                    <View style={styles.rowContainer} key={index}>
                        <Text style={styles.rowLabel}>{item.name}</Text>
                        <TouchableOpacity
                            style={styles.infoIcon}
                            onPress={() => onInfoPress(item.imageKey, item.name, item.value)}
                        >
                            <Icon name="question-circle" size={22} color="orange" />
                        </TouchableOpacity>
                        <Text style={styles.rowValue}>{item.value}</Text>
                    </View>
                ))}
            </View>
        );
    };

    const generalData = [
        { name: 'Powierzchnia dachu', value: m2(roofArea), imageKey: '' },
        { name: 'Kąt nachylenia dachu', value: deg(gableData.kat_nachylenia!), imageKey: 'k' },
        { name: 'Wysokość od murłaty do spodu krokwi', value: cm(gableData.h!), imageKey: 'h' },
    ];
    
    const beamData = [
        { name: 'Długość krokwi', value: cm(gableData.dk_calk), imageKey: 'dk_calk' },
        { name: 'Odległość od szczytu krokwi do zamka', value: cm(gableData.zamek!.odleglosc), imageKey: 'okgz' },
        { name: 'Kąt zacięcia na łączeniu krokiew', value: deg(gableData.kat_zaciecia), imageKey: 'kz' },
        { name: 'Szerokość zacięcia', value: cm(gableData.sz), imageKey: 'sz' },
        { name: 'Długość krokwi poza murłatą', value: cm(gableData.dkpm), imageKey: 'dkpm' },
    ];
    
    const lockData = [
        { name: 'Kąt prostopadły zacięcia', value: deg(gableData.zamek!.kat1), imageKey: 'kp' },
        { name: 'Kąt równoległy zacięcia', value: deg(gableData.zamek!.kat2), imageKey: 'kr' },
    ];

    const sparData = isSparPresent ? [
        { name: 'Dłguość jętki', value: cm(gableData.djc!), imageKey: 'j' },
        { name: 'Odległość od końca krokwi do jętki', value: cm(gableData.djkk!), imageKey: 'djkk' },
    ] : null;

    const finData = isFinPresent ? [
        { name: 'Wysokość słupka z płatwą od murłaty do krokwi', value: cm(gableData.hp!), imageKey: 'ds' },
        { name: 'Odległość między płatwami (zewnętrznie)', value: cm(gableData.opp!), imageKey: 'opp' },
        { name: 'Odległość od szczytu krokwi do zamka', value: cm(gableData.dkgp!), imageKey: 'dkgp' },
    ] : null;

    return (
        <ScrollView style={styles.container}>
            <Section sectionTitle="Ogólne" data={generalData} />
            <Section sectionTitle="Krokiew" data={beamData} />
            <Section sectionTitle="Zamek" data={lockData} />
            {sparData && <Section sectionTitle="Jętka" data={sparData} />}
            {finData && <Section sectionTitle="Płatwa" data={finData} />}
            <OutputTable header="Rozstaw krokwi" headers={headers} data={formattedDistributionData} />
            <PopupWindow data={popupProps} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        // color: 'tomato'
    },
    rowContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 8,
        borderBottomWidth: 0.5,
        borderBlockColor: 'gray',
        paddingBottom: 5,
        alignItems: 'center',
    },
    rowLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        maxWidth: '60%',
    },
    infoIcon: {
        marginStart: 10,
    },
    rowValue: {
        flex: 1,
        textAlign: 'right',
        fontSize: 16,
    },
});

export default GableResultScreen1;