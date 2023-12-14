import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import React, { useMemo, useState, useEffect, version } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, Switch } from 'react-native'
import { RootStackParamList } from "./AppStacks";
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import GableRoofCalculator from "../utils/GableRoofCalculator";
import RafterDistribution from "../utils/RafterDistribution";
import GableRoofResult from "../utils/GableRoofResult";
import useScreenOrientation from "../hooks/useScreenOrientation";

type GableScreenProps = NativeStackScreenProps<RootStackParamList, 'GableScreen'>

const GableScreen: React.FC<GableScreenProps> = ({ route, navigation }) => {
    const { isPortrait } = useScreenOrientation();

    const images = {
        verticalBase: require('../static/images/gable-roof/dach_baza_vertical.bmp'),
        verticalJ: require('../static/images/gable-roof/dach_j_vertical.bmp'),
        verticalP: require('../static/images/gable-roof/dach_p_vertical.bmp'),
        verticalPJ: require('../static/images/gable-roof/dach_pj_vertical.bmp')
    }

    const [hkSelectedId, setHkSelectedId] = useState<string>('k');
    const [imageSource, setImageSource] = useState(images.verticalBase);
    const [jSwtichState, SetJSwtichState] = useState(false);
    const [pSwtichState, SetPSwtichState] = useState(false);
    const [formValues, setFormValues] = useState({
        k: '30',
        h: '',
        d: '800',
        p: '30',
        g: '14',
        hj: '',
        mp: '',
        p2: '1000', // :d_calk
        w: '7', // :s_krokwi
        dMin: '50', // :d_min 
        dMax: '150' // :d_max
    });


    useEffect(() => {
        if (!jSwtichState && !pSwtichState) {
            setImageSource(images.verticalBase)
        } else if (jSwtichState && pSwtichState) {
            setImageSource(images.verticalPJ)
        } else if (jSwtichState) {
            setImageSource(images.verticalJ)
        } else if (pSwtichState) {
            setImageSource(images.verticalP)
        }

    }, [jSwtichState, pSwtichState])


    const handleInputChange = (key: string, value: string) => {
        if (!isCorrectNumber(value)) return;
        setFormValues({ ...formValues, [key]: value });
    };

    const hkRadioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: 'h',
            label: 'H',
            value: 'h'
        },
        {
            id: 'k',
            label: 'Kąt',
            value: 'k'
        }
    ]), []);

    const toggleJSwitch = () => {
        SetJSwtichState((previousState) => !previousState);
    };


    const togglePSwitch = () => {
        SetPSwtichState((previousState) => !previousState);
    };

    const isCorrectNumber = (input: string): boolean => {
        const floatRegex = /^\d*\.?\d*$/;
        return floatRegex.test(input);
    }
    const onSubmit = (): void => {
        // todo: validation
        if (false) {
            console.log("jakiś błąd")
        }
        console.log("there works")
        const gableArgs = {
            p: parseFloat(formValues.p),
            d: parseFloat(formValues.d),
            g: parseFloat(formValues.g),
            h: hkSelectedId == 'h' ? parseFloat(formValues.h) : undefined,
            k: hkSelectedId == 'k' ? parseFloat(formValues.k) : undefined,
            hj: jSwtichState ? parseFloat(formValues.hj) : undefined,
            mp: pSwtichState ? parseFloat(formValues.mp) : undefined,
        }
        console.log("there works2")
        const gableResult = new GableRoofCalculator(gableArgs);
        console.log("there works3")

        const rafterDistrubutionArgs = {
            p: parseFloat(formValues.p2), // długość murłaty
            s: parseFloat(formValues.w), // szerokość krokwi
            d_min: parseFloat(formValues.dMin), // min rozstaw
            d_max: parseFloat(formValues.dMax), // max rozstaw
        }

        const distributionResult = new RafterDistribution(rafterDistrubutionArgs);
        const result = new GableRoofResult({ gableResult, distributionResult });

        navigation.navigate('GableResultTabs', { result })
    }

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <Image
                    source={imageSource}
                    style={styles.imageStretch}
                />
                <View style={styles.inputWrapper}>
                    <View style={styles.inputContainer}>
                        <RadioGroup
                            radioButtons={hkRadioButtons}
                            onPress={setHkSelectedId}
                            selectedId={hkSelectedId}
                            layout="row"
                            containerStyle={styles.radioGroup}
                        />
                        {hkSelectedId === 'h'
                            ? <TextInput
                                style={styles.input}
                                placeholder={'h'}
                                keyboardType='numeric'
                                value={formValues.h}
                                onChangeText={(text) => handleInputChange('h', text)}
                            />
                            : <TextInput
                                style={styles.input}
                                placeholder={'kąt'}
                                keyboardType='numeric'
                                value={formValues.k}
                                onChangeText={(text) => handleInputChange('k', text)}
                            />
                        }
                        {/* <TextInput
                            style={styles.input}
                            placeholder={hkSelectedId === 'h' ? 'h' : 'kąt'}
                            keyboardType='numeric'
                            value={formValues.h}
                            onChangeText={(text) => handleInputChange('h', text)}
                        /> */}
                        <TextInput
                            style={styles.input}
                            placeholder={'d'}
                            keyboardType='numeric'
                            value={formValues.d}
                            onChangeText={(text) => handleInputChange('d', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={'p'}
                            keyboardType='numeric'
                            value={formValues.p}
                            onChangeText={(text) => handleInputChange('p', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={'g'}
                            keyboardType='numeric'
                            value={formValues.g}
                            onChangeText={(text) => handleInputChange('g', text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.switchContainer}>
                            <Text>Jętka</Text>
                            <Switch
                                onValueChange={toggleJSwitch}
                                value={jSwtichState}
                            />
                        </View>
                        {jSwtichState && <TextInput
                            style={styles.input}
                            placeholder={'hj'}
                            keyboardType='numeric'
                            value={formValues.hj}
                            onChangeText={(text) => handleInputChange('hj', text)}
                        />}

                        <View style={styles.switchContainer}>
                            <Text>Płatwa</Text>
                            <Switch
                                onValueChange={togglePSwitch}
                                value={pSwtichState}
                            />
                        </View>
                        {pSwtichState && <TextInput
                            style={styles.input}
                            placeholder={'mp'}
                            keyboardType='numeric'
                            value={formValues.mp}
                            onChangeText={(text) => handleInputChange('mp', text)}
                        />}

                    </View>
                </View>

                {/* Tutaj zmienić layout ze względu na orientację (nie seksualną) */}
                <View style={isPortrait ? styles.verticalContainer : styles.horizontalContainer}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={require('../static/images/gable-roof/rozstaw_vertical.png')}
                            style={isPortrait ? styles.imageBottomVertical : styles.imageBottomHorizontal}
                        />
                    </View>

                    <View style={styles.inputWrapper}>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={'p'}
                                keyboardType='numeric'
                                value={formValues.p2}
                                onChangeText={(text) => handleInputChange('p2', text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={'w'}
                                keyboardType='numeric'
                                value={formValues.w}
                                onChangeText={(text) => handleInputChange('w', text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={'Min. rozstaw (d)'}
                                keyboardType='numeric'
                                value={formValues.dMin}
                                onChangeText={(text) => handleInputChange('dMin', text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={'Max. rozstaw (d)'}
                                keyboardType='numeric'
                                value={formValues.dMax}
                                onChangeText={(text) => handleInputChange('dMax', text)}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={onSubmit}
                    style={styles.submitButton}
                >
                    <Text style={styles.buttonText}>Oblicz</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
    },
    container: {
        // paddingBottom: 20,
        alignItems: 'center',
        // backgroundColor: 'wheat'
    },
    submitButton: {
        backgroundColor: 'tomato',
        width: '30%',
        paddingHorizontal: 20,
        paddingVertical: 5,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    imageStretch: {
        width: '100%',
        resizeMode: 'stretch',
        height: 250,
        marginBottom: 20,
    },
    verticalContainer: {
        width: '100%',
    },
    horizontalContainer: {
        flexDirection: 'row-reverse',
        flex: 1,
        alignItems: 'center',
        marginVertical: 10,
    },
    imageWrapper: {
        flex: 1,
    },
    imageBottomVertical: {
        width: '100%',
        resizeMode: 'contain',
        height: 250,
        marginVertical: 10,
    },
    imageBottomHorizontal: {
        // flex: 1,
        width: '100%',
        resizeMode: 'contain',
        height: 250,
    },
    inputWrapper: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
    },
    inputContainer: {
        flex: 1,
        paddingHorizontal: 10,
        // backgroundColor: 'brown',
    },
    input: {
        marginBottom: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        // backgroundColor: 'gold'
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'purple'
    },
    radioGroup: {
        marginBottom: 10,
    },
})

export default GableScreen;