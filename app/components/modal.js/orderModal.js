import React, { Component } from 'react';
// import { Table, Row, Rows } from 'react-native-table-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableHighlight,
    ScrollView
} from "react-native";
import Modal from 'react-native-modal';
// import { ScrollView } from 'react-native-gesture-handler';
import { ActionCreators } from '../../actions';

class OrderModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            // modalVisible:false
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.orderModal&&nextProps.orderModal) {
    //         this.setState({
    //             modalVisible:nextProps.orderModal
    //         },()=>{
    //             console.log(this.state.modalVisible)
    //             if (nextProps.orderItems && nextProps.orderItems) {
    //                 this.setState({
    //                     items: nextProps.orderItems
    //                 })
    //             }
    //         })  
    //     }
    // }

    render() {
        return (
            <View >
                <Modal isVisible={this.props.modalVisible}
                    animationInTiming={600}
                >
                    <View style={styles.mainContainer}>
                        <ScrollView>
                            <View style={[styles.container, styles.shadow]}>
                                <View style={{ width: '50%', paddingLeft: 10, paddingTop: 5 }}>
                                    <Text>Name</Text>
                                </View>
                                <View style={{ width: '50%', paddingTop: 5 }}>
                                    <Text>Quantity</Text>
                                </View>
                            </View>
                            {this.props.orderItems&&this.props.orderItems.map((item) => (
                                <View style={[styles.container, { marginTop: 10 }]}>
                                    <View style={{ width: '50%', paddingLeft: 10, paddingTop: 5 }}>
                                        <Text>{item.name.split('-')[0]}</Text>
                                    </View>
                                    <View style={{ width: '50%', paddingTop: 5 }}>
                                        <Text>{item.quantity}</Text>
                                    </View>
                                </View>
                            ))}

                        </ScrollView>
                        <View style={{ alignItems: 'center', marginVertical: 20 }}>
                            <TouchableHighlight
                                style={styles.input3}
                                onPress={() => this.props.orderModal2(false)}
                                underlayColor='#729F3D'>
                                <Text style={{ color: '#ffff' }}>Close</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }
}





const styles = StyleSheet.create({

    mainContainer: {
        flex: 0.7,
        backgroundColor: "#F4F4F4",
        borderRadius: 5,
        height: 'auto',
        // flexDirection:'row'
        padding: 10,
    },

    container: {
        height: 50,
        backgroundColor: '#FFFF',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    header: {
        height: 50,
        backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    heading: {
        // flexDirection:'row',
        // justifyContent:'space-around'
    },
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
    shadow: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
        // background color must be set
        backgroundColor: "#FFFF" // invisible color
    }
});


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    console.log(state)
    return {
        // orderItems: state.order.orderItems,
        // orderModal: state.order.orderModal
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(OrderModal);


