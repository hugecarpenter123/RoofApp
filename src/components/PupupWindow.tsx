import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export type PopupWindowDataProps = {
    imageKey: string,
    label: string,
    value: string,
    show: boolean,
    onClose: () => void,
}

type PopupWindowProps = {
    data: PopupWindowDataProps
}

const images: Record<string, any> = {
    '': null,
    'k': require('../static/images/gable-roof/k_detail2.bmp'),
    'h': require('../static/images/gable-roof/h_detail2.bmp'),
    'dk_calk': require('../static/images/gable-roof/dkc2_detail.bmp'),
    'dkgz': require('../static/images/gable-roof/okgz2_detail.bmp'),
    'sz': require('../static/images/gable-roof/sz2_detail.bmp'),
    'dkpm': require('../static/images/gable-roof/dkpd_detail.bmp'),
    'djkk': require('../static/images/gable-roof/djkk2_detail.bmp'),
    'dkw': require('../static/images/gable-roof/dkw2_detail.bmp'),
    'ds': require('../static/images/gable-roof/ds2_detail.bmp'),
    'j': require('../static/images/gable-roof/j_dlugosc_detail.bmp'),
    'kp': require('../static/images/gable-roof/kp2_detail.bmp'),
    'kr': require('../static/images/gable-roof/kr2_detail.bmp'),
    'kz': require('../static/images/gable-roof/kz2_detail.bmp'),
    'dkgp': require('../static/images/gable-roof/dkgp_detail.bmp'),
    'okgz': require('../static/images/gable-roof/okgz2_detail.bmp'),
    'opp': require('../static/images/gable-roof/opp2_detail.bmp'),
}

const PopupWindow: React.FC<PopupWindowProps> = (props) => {

    const { imageKey, label, show, onClose, value } = props.data;

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={show}
            onRequestClose={() => onClose()}
        >
            <View style={styles.container}>
                <View style={styles.content} >
                    <TouchableOpacity
                        style={styles.exit}
                        onPress={onClose}
                    >
                        <Icon name='cancel' color={'red'} size={25} />
                    </TouchableOpacity>
                    <Text style={styles.header}>{label}</Text>
                    {imageKey && <Image source={images[imageKey]} style={styles.image} />}
                    <Text style={styles.description}>{"wartość: " + value}</Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        // backgroundColor: 'orange',
        backgroundColor: 'white',
        width: '80%',
        height: 400,
        maxHeight: '90%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        padding: 10,
    },
    exit: {
        position: 'absolute',
        // backgroundColor: 'pink',
        alignSelf: 'flex-end',
        padding: 5,
        zIndex: 2,
    },
    image: {
        borderRadius: 10,
        resizeMode: 'contain',
        width: '100%',
        flex: 1,
        borderWidth: 1,
    },
    header: {
        fontSize: 25,
        marginVertical: 10,
    },
    description: {
        marginBottom: 10,
    }
})

export default PopupWindow;