import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import OrderModal from '../modal.js/orderModal';
import ScreenHeader from '../headers/screenHeader';
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

class OrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderIsModalVisible: false,
            orders: null,
            orderItems: null

        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orders && nextProps.orders) {
            this.setState({
                orders: nextProps.orders
            })
        }
    }

    orderModalVisible = (order) => {
        this.setState({
            orderItems: order,
        }, () => {
            this.orderModal2(true);
        })
    }

    orderModal2 = (value) => {
        this.setState({
            orderIsModalVisible: value
        })
    }


    navigate = () => {
        const { navigation } = this.props;
        navigation.navigate('bottomTabs')
    }

    render() {
        const { orderIsModalVisible } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#EEEEEE', width: '100%', height: '100%' }}>
                <View>
                    <ScreenHeader
                        name="Orders"
                        navigate={this.navigate}
                    />
                </View>
                <View>
                    <Image style={{ height: height, width: width, position: 'absolute', top: 0, left: 0 }} source={require('../../common/bg.png')} />
                </View>
                <View style={{ flex: 1 }}>
                    <Spinner
                        visible={this.props.orderLoading}
                        // textContent={'Loading...'}
                        textStyle={{ color: 'green' }}
                        animation='fade'
                    />
                </View>
                <ScrollView >
                    {this.state.orders && this.state.orders.map((order) => (
                        <View style={{ flex: 1, marginBottom: 7 }}>
                            <TouchableOpacity onPress={() => this.orderModalVisible(order.orderItems)}>
                                <View style={{ flex: 0.4, backgroundColor: '#FFFF', marginBottom: 7 }} >
                                    <View style={{ width: '100%' }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ color: 'gray', fontSize: 20 }} >
                                                ORDER # {order.id}
                                            </Text>
                                        </View>
                                        <View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                                                <Text>
                                                    Time
                                                </Text>
                                                <Text >
                                                    {order.date.split(" ")[1]}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10 }}>
                                                <Text>
                                                    Date
                                                 </Text>
                                                <Text style={{ marginRight: 10 }}>
                                                    {order.date.split(" ")[0]}
                                                </Text>
                                            </View>
                                            <View style={{ marginVertical: 15, alignItems: 'center' }}>
                                                <View style={styles.statusBar}>
                                                    <Text style={{ color: '#FFF', fontWeight: 'bold' }} >{order.status == 0 ? 'PENDING' : 'CONFIRMED'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <OrderModal modalVisible={this.state.orderIsModalVisible} orderItems={this.state.orderItems} orderModal2={this.orderModal2} />
                </ScrollView>
            </View>
        );
    }
}


styles = StyleSheet.create({
    statusBar: {
        height: 40,
        borderWidth: 0.5,
        borderColor: '#CDDC39',
        backgroundColor: '#CDDC39',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        alignItems: 'center'

    },
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        orders: state.orders.orders,
        orderLoading: state.orders.orderLoading
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
