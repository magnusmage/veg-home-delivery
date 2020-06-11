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
    Image
} from "react-native";
import Modal from 'react-native-modal';

class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qtd: 0,
            items: []
        }
    }

    componentDidMount() {
        this.setState({
            items: this.props.stock
        })
    }

    increment = () => {
        this.setState({
            qtd: this.state.qtd + 0.25
        })
    }
    decrement = () => {

        if (this.state.qtd > 0) {
            this.setState({
                qtd: this.state.qtd - 0.25
            })
        }
    }

    addStock = (product) => {
        const item = {
            id: product.id,
            quantity: JSON.stringify(this.state.qtd),
            type: product.ptype,
            peritemprice: product.price,
            img: product.img,
            name: product.name,
            price: product.price
        }

        this.setState({
            qtd: 0,
            items: [...this.state.items, item]
        }, () => {
            this.sendStock()
        })
    }


    sendStock = () => {
        const { openStockVeggies, openStockExotic, openStockFruits, openStockFreshCut, setStockItems } = this.props;
        setStockItems(this.state.items)
        openStockVeggies(false)
        openStockExotic(false)
        openStockFruits(false)
        openStockFreshCut(false)
    }

    modalClose = () => {
        const { openStockVeggies, openStockExotic, openStockFruits, openStockFreshCut } = this.props;
        openStockVeggies(false)
        openStockExotic(false)
        openStockFruits(false)
        openStockFreshCut(false)
    }

    render() {
        const { isModalVisible, product } = this.props;
        return (
            <View >
                <Modal isVisible={isModalVisible}
                    animationInTiming={600}
                >
                    <View style={styles.mainContainer}>
                        <View style={{ flex: 0.4 }}>
                            <TouchableOpacity onPress={this.modalClose} style={{ alignItems: 'flex-end', padding: 10 }}>
                                <Image style={{ width: 30, height: 30 }} source={require('../../common/close-button.png')} />
                            </TouchableOpacity>
                            <View style={{ flex: 1, backgroundColor: 'pink' }}>
                                <Image style={{ width: '100%', height: '100%' }} source={{ uri: `https://vbapp.magnusmage.com/admin/${product.img}` }} />
                            </View>
                        </View>

                        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#729F3D' }}>
                                {product.name}
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#729F3D' }}>
                                Rs {product.price} of 1kg
                       </Text>
                        </View>
                        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ marginBottom: 10, fontSize: 14, color: '#729F3D' }}>
                                In stock
                        </Text>
                            <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: '600', color: '#729F3D' }}>
                                Select your quantity
                        </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={this.decrement} style={{ backgroundColor: '#729F3D', height: 50, width: 50, alignItems: 'center' }}>
                                    <View style={{ paddingTop: 7 }}  >
                                        <Text style={{ fontSize: 30, color: '#FFFF', fontWeight: '600' }}>
                                            -
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ height: 50, width: 50, alignItems: 'center' }}>
                                    <Text style={{ paddingTop: 7, fontSize: 20, fontWeight: '600' }}>
                                        {this.state.qtd}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={this.increment} style={{ backgroundColor: '#729F3D', height: 50, width: 50, alignItems: 'center' }}>
                                    <View style={{ paddingTop: 7 }}  >
                                        <Text style={{ fontSize: 30, color: '#FFFF', fontWeight: '600' }}>
                                            +
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <View style={{ alignItems: 'center', paddingTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this.addStock(product)}
                                    style={[styles.input3,]}
                                    underlayColor='#729F3D'>
                                    <Text style={{ color: '#ffff' }}>ADD TO CART</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </Modal>
            </View >
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        stock: state.orders.stock
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Stock);


const styles = StyleSheet.create({
    mainContainer: {
        flex: 0.7,
        backgroundColor: "#F4F4F4",
        borderRadius: 5,
        height: 'auto',
        padding: 10,
    },

    productContainer: {
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    descContainer: {
        flexDirection: 'column',
        marginLeft: 10,
        justifyContent: 'space-around'
    },
    cancel: {
        marginRight: 7,
        marginTop: 7,
        height: 30,
        width: 30
    },
    text: {
        fontSize: 18,
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

