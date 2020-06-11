import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableHighlight
} from "react-native";
import Modal from 'react-native-modal';
// import { ActionCreators } from '../../actions';

class ResetModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { isModalVisible, modalVisible,handleSubmitReset,handleChangeReset  } = this.props;
        return (
            <View >
                <Modal isVisible={isModalVisible}
                    animationInTiming={600}
                    animationIn="fadeIn"
                >
                    <View style={styles.mainContainer}>
                        <View style={{ flex: 1, justifyContent: 'flex-start', marginVertical: 10, alignItems: "center" }}>
                            <Text style={{marginBottom:7,color:'#FFF',fontWeight:'bold'}}>Recovery Password</Text>
                            <View style={{width:300}}>
                            <TextInput
                                keyboardType={'numeric'}  
                                onChangeText={(value)=>handleChangeReset('verficationCode',value)}
                                placeholder="Verification Code"
                                style={{ height: 40, marginBottom: 7, borderColor: '#B1CA27', borderWidth: 1, color: "gray", backgroundColor: "#FFF", borderRadius: 4 }}
                                placeholderTextColor="gray"
                            >
                            </TextInput>
                            <TextInput 
                                onChangeText={(value)=>handleChangeReset('resetEmail',value)}
                                placeholder="Email"
                                style={{ height: 40, marginBottom: 7, borderColor: '#B1CA27', borderWidth: 1, color: "gray", backgroundColor: "#FFF", borderRadius: 4 }}
                                placeholderTextColor="gray"
                            >
                            </TextInput>
                            <TextInput
                                secureTextEntry={true}
                                onChangeText={(value)=>handleChangeReset('resetPass',value)}
                                placeholder="Password"
                                style={{ height: 40, marginBottom: 7, borderColor: '#B1CA27', borderWidth: 1, color: "gray", backgroundColor: "#FFF", borderRadius: 4 }}
                                placeholderTextColor="gray"
                            >
                            </TextInput>
                            </View>
                            <View>
                                <TouchableHighlight
                                    style={[styles.input3,{marginBottom:7}]}
                                    onPress={handleSubmitReset}
                                    underlayColor='#729F3D'>
                                    <Text style={{ color: '#ffff' }}>Submit</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={styles.input3}
                                    onPress={()=>modalVisible(false)}
                                    underlayColor='#729F3D'>
                                    <Text style={{ color: '#ffff' }}>Close</Text>
                                </TouchableHighlight>
                            </View>
                            <View >
                            </View>
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    input3: {
        height: 40,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#729b20',
        backgroundColor: '#8BC24A',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
    },
    mainContainer: {
        backgroundColor: "#CDDC39",
        borderRadius: 5,
        height: 300
    },


});

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(ActionCreators, dispatch);
// }

// function mapStateToProps(state) {

// }
export default ResetModal;


// export default connect(mapStateToProps, mapDispatchToProps)(ForgetModal);

