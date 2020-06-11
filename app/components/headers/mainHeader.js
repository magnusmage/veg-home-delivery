import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from "react-native";
import { ActionCreators } from '../../actions';

class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.mainView}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Image style={{ marginLeft: 10, width: 20, height: 30 }} source={require('../../common/menu.png')} />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 40 }}>
                            <Text style={{ color: '#FFFF', fontWeight: 'bold', fontSize: 22 }}>Veggie Box</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.9, backgroundColor: 'pink' }}>
                    <Text>Home</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 0.1,
        backgroundColor: '#8BC24A',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})

export default MainHeader;



