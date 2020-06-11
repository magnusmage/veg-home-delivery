import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    AsyncStorage,
    Platform
} from "react-native";
import Modal from 'react-native-modal';
import DropdownAlert from 'react-native-dropdownalert';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ label: 'Pre-order', value: 0 },
            { label: 'Urgent', value: 1 }],
            stock: null,
            currentUser: null,
            isAuthenticated: false,
            orderType: 0,
            totalPrice: 0
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.stock !== this.state.stock) {
            this.setState({
                stock: nextProps.stock
            },
                () => {
                    const data = []
                    var totalPrices = 0
                    this.state.stock.map((product) => {
                        data.push({
                            id: product.id,
                            quantity: product.quantity,
                            type: product.type,
                            peritemprice: product.price
                        })
                        totalPrices += product.quantity * product.price
                        this.setState({
                            totalPrice: totalPrices
                        })
                    })
                })
        }



        AsyncStorage.getItem('isAuthenticated', (err, result) => {
            this.setState({
                isAuthenticated: result
            })
        });

        AsyncStorage.getItem('currentUser', (err, result) => {
            this.setState({
                currentUser: JSON.parse(result)
            })
        });

    }


    handleRadio = (value) => {
        this.setState({
            orderType: value
        })

    }

    submitCart = () => {
        const data = []
        this.state.stock.map((product) => {
            data.push({
                id: product.id,
                quantity: product.quantity,
                type: product.type,
                peritemprice: product.price
            })
        })
        this.handleCartObj(data)
    }

    handleCartObj = (data) => {

        const { openCart, setFinalOrder, navigation } = this.props;
        const order = {
            // email: user.email,
            // usertype: user.type,
            // ordertype: this.state.orderType,
            ordertotal: this.state.totalPrice,
            data: data
        }
        // submitOrder(order)
        setFinalOrder(order, navigation);
        openCart(false)
    }

    modalClose = () => {
        const { openCart } = this.props;
        openCart(false);
    }

    handleDelete = (e, index) => {
        const stock = Object.assign([], this.state.stock)
        stock.splice(index, 1)
        this.setState({
            stock: stock
        },
            () => {
                this.props.setStockItems(this.state.stock)
                const data = []
                var totalPrices = 0
                if (this.state.stock.length === 0) {
                    this.setState({
                        totalPrice: 0
                    })
                } else {
                    this.state.stock.map((product) => {
                        data.push({
                            id: product.id,
                            quantity: product.quantity,
                            type: product.type,
                            peritemprice: product.price
                        })
                        totalPrices += product.quantity * product.price
                        this.setState({
                            totalPrice: totalPrices
                        })
                    })
                }
            })
    }

    render() {
        const { isModalVisible } = this.props;
        const { stock } = this.state;
        return (
            <Modal isVisible={isModalVisible}
                animationInTiming={600}
                onRequestClose={this.modalClose}
            >
                <View style={styles.mainContainer}>
                    <TouchableOpacity onPress={this.modalClose} style={{ alignItems: 'flex-end' }}>
                        <Image style={{ width: 30, height: 30 }} source={require('../../common/close-button.png')} />
                    </TouchableOpacity>
                    <ScrollView>
                        {
                            stock && stock.map((product, index) => (
                                <View key={product.id} style={styles.productContainer}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ height: 120, width: 90, backgroundColor: 'red' }}>
                                            <Image style={{ width: '100%', height: '100%' }} source={{ uri: `https://vbapp.magnusmage.com/admin/${product.img}` }} />
                                        </View>
                                        <View style={styles.descContainer}>
                                            <Text style={[styles.text]}>{product.name}</Text>
                                            <Text style={styles.text}>KG:{product.quantity}</Text>
                                            <Text style={[styles.text, { color: '#729F3D' }]}>Per-Kg: Rs.{product.price}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={(e) => this.handleDelete(e, index)}>
                                        <Image style={styles.cancel} source={require('../../common/cross.png')} />
                                    </TouchableOpacity>
                                </View>
                            ))
                        }


                    </ScrollView>
                    <View style={{ marginTop: 10 }}>
                        {stock && stock.length === 0 ?
                            <View style={{ justifyContent: "flex-end", marginTop: 20, alignItems: 'center' }}>
                                <View>
                                    <Text style={{ fontSize: 25, fontWeight: '600', color: '#729F3D' }}>
                                        Total Rs. 0
                                </Text>
                                </View>
                            </View>
                            :
                            <View>
                                <View style={{ justifyContent: "flex-end", marginTop: 20, alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 25, fontWeight: '600', color: '#729F3D' }}>
                                            Total Rs. {this.state.totalPrice}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        }

                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={this.submitCart}
                            style={[styles.input3]}
                            underlayColor='#729F3D'>
                            <Text style={{ color: '#ffff' }}>Confirm to buy order</Text>
                        </TouchableOpacity>
                    </View>
                    <DropdownAlert
                        ref={ref => this.dropdown = ref}
                        showCancel
                        // cancelBtnImageSrc={require('../../../common/images/cancel.png')}
                        defaultContainer={{
                            paddingHorizontal: 8,
                            // marginTop: Platform.OS === 'android' ? 0 : 10,
                            flexDirection: 'row'
                        }}
                        errorColor="red"
                        messageStyle={{
                            fontSize: 20,
                            color: '#FFF',
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />
                </View>
            </Modal>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    console.log(state)
    return {
        stock: state.orders.stock
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 0.7,
        backgroundColor: "#F4F4F4",
        borderRadius: 5,
        height: 'auto',
        // flexDirection:'row'
        padding: 10,
    },

    productContainer: {
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFF',
    },
    descContainer: {
        flexDirection: 'column',
        marginLeft: 10,
        justifyContent: 'space-around',
    },
    cancel: {
        marginRight: 7,
        marginTop: 7,
        height: 30,
        width: 30
    },
    text: {
        fontSize: 13,
        fontWeight: '600',
        color: '#bcbcbc'
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

});
