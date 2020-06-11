import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    AsyncStorage,
    Platform,
    Dimensions
} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import ScreenHeader from '../headers/screenHeader';
import InfoModal from '../modal.js/infoModal';
import SectionModal from '../modal.js/sectionModal';
import DropdownAlert from 'react-native-dropdownalert';

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

var radio_props = [
    { label: 'Pre-order', value: 0 },
    { label: 'Urgent', value: 1 }
];

class SubmitOrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ label: 'Pre-order', value: 0 },
            { label: 'Urgent', value: 1 }],
            stock: null,
            currentUser: null,
            isAuthenticated: false,
            orderType: 0,
            totalPrice: 0,
            promoCode: '',
            infoModalFlag: false,
            sectionModal: false,
            changeAddress: false
        }
    }

    componentDidMount = () => {
        const { stock, promoCode } = this.props;
        if (stock) {
            this.setState({
                stock: stock,
                promoCode: promoCode
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
                            totalPrice: this.state.orderType === 0 ? totalPrices + 39 : 99
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
            }, () => {
                if (this.state.currentUser && this.state.currentUser.type === 'HORECA') {
                    AsyncStorage.getItem('section', (err, result) => {
                        this.setState({
                            section: JSON.parse(result)
                        })
                    });
                }
            })
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.promoCode !== this.state.promoCode) {
            this.setState({ promoCode: nextProps.promoCode })
        }
    }

    navigate = () => {
        const { navigation } = this.props;
        navigation.navigate('bottomTabs')
    }


    handleRadio = (value) => {
        const { totalPrice } = this.state;
        this.setState({
            orderType: value
        }, () => {
            if (this.state.orderType === 1) {
                this.setState({
                    totalPrice: totalPrice + 99
                })
            } else {
                this.setState({
                    totalPrice: totalPrice - 99
                })
            }
        })
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
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
        const { submitOrder, openCart, navigation } = this.props;
        const { address, notes, orderType, totalPrice, currentUser, promoCode, selectedSection } = this.state;
        if (this.state.isAuthenticated) {
            const order = {
                email: currentUser.email,
                usertype: currentUser.type,
                promo: promoCode,
                address: address ? address:currentUser.address ,
                notes: notes,
                ordertype: orderType,
                ordertotal: totalPrice,
                section: selectedSection,
                data: data
            }
            submitOrder(order, this.dropdown, navigation)
        }

        else {
            this.dropdown.alertWithType('warn', 'Warning', 'you need to login');
            setTimeout(() => { openCart(false) }, 3000)
        }
    }

    modalClose = () => {
        const { openCart } = this.props;
        openCart(false);
    }

    modalCloseInfo = () => {
        const { infoModalFlag } = this.state;
        this.setState({
            infoModalFlag: !infoModalFlag
        })
    }

    getPromo = () => {
        this.props.getPromo({ promo: this.state.promoCode }).then(() => {
            var totalPrices = 0
            this.state.stock.map((product) => {
                totalPrices += product.quantity * product.price
            })
            this.setState({
                promoCode: this.props.promoCode.discount,
                totalPrice: this.props.promoCode.discount ? Math.ceil(this.state.totalPrice - (totalPrices * this.props.promoCode.discount / 100)) : this.state.totalPrice
            })
        })
    }

    handleSectionModal = (value) => {
        this.setState({ sectionModal: value })
    }

    selectSection = (value) => {
        this.setState({ selectedSection: value, sectionModal: false })
    }

    hangeChangeAddress=()=>{
        this.setState({changeAddress:!this.state.changeAddress})
    }

    render() {
        const { stock, orderType, infoModalFlag,changeAddress} = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <View>
                    <Image style={{ height: height, width: width, position: 'absolute', top: 0, left: 0 }} source={require('../../common/bg.png')} />
                </View>
                <ScreenHeader
                    name=" Submit Order"
                    navigate={this.navigate}
                />
                <View style={{ flex: 1, position: 'absolute' }}>
                    <Spinner
                        visible={this.props.submitCartLoading}
                        // textContent={'Loading...'}
                        textStyle={{ color: 'green' }}
                        animation='fade'
                    />
                </View>
                <ScrollView style={{ flex: 1 }}>
                    {
                        stock && stock.map((product) => (
                            <View key={product.id} style={styles.productContainer}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ height: 120, width: 90, backgroundColor: 'red' }}>
                                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: `https://vbapp.magnusmage.com/admin/${product.img}` }} />
                                    </View>
                                    <View style={styles.descContainer}>
                                        <Text style={styles.text}>{product.name}</Text>
                                        <Text style={styles.text}>KG:{product.quantity}</Text>
                                        <Text style={[styles.text, { color: '#729F3D' }]}>Per-Kg: Rs.{product.price}</Text>
                                    </View>
                                </View>
                                {/* <Image style={styles.cancel} source={require('../../common/cross.png')} /> */}
                            </View>
                        ))
                    }
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 13, flexDirection: 'row' }}>
                        <View style={{ alignItems: 'center', marginRight: 20, flexDirection: 'row', }}>
                            <TouchableOpacity onPress={() => this.handleRadio(0)} style={{ marginRight: 10 }}>
                                {this.state.orderType === 0 ?
                                    <Icon name="ios-radio-button-on" size={30} color="#729F3D" />
                                    :
                                    <Icon name="ios-radio-button-off" size={30} color="#729F3D" />
                                }
                            </TouchableOpacity>
                            <Text>Pre-order</Text>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.handleRadio(1)} style={{ marginRight: 10 }}>
                                {this.state.orderType === 1 ?
                                    <Icon name="ios-radio-button-on" size={30} color="#729F3D" />
                                    :
                                    <Icon name="ios-radio-button-off" size={30} color="#729F3D" />
                                }
                            </TouchableOpacity>
                            <Text>Urgent</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: "flex-end", marginTop: 20, alignItems: 'center' }}>
                        <Text style={{ fontWeight: '600', color: '#729F3D' }}>
                            Delivery Charges Rs {orderType === 1 ? 99 : 39}
                        </Text>
                        <TouchableOpacity onPress={this.modalCloseInfo}>
                            <Image style={{ height: 40, width: 40 }} source={require('../../common/Information-1.png')} />
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontSize: 25, fontWeight: '600', color: '#729F3D' }}>
                                Total Rs. {this.state.totalPrice}
                            </Text>
                        </View>
                        {this.state.currentUser && this.state.currentUser.type === 'HORECA' ?
                        //     <TouchableOpacity onPress={() => this.handleSectionModal(true)}>
                        //         <Text style={{ fontSize: 15, color: '#729F3D', fontWeight: 'bold' }}>
                        //             Select Section (Optional)
                        // </Text>
                        //     </TouchableOpacity>
                        <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
                        <TouchableOpacity
                            onPress={() => this.handleSectionModal(true)}
                            style={[styles.input3,]}
                            underlayColor='#729F3D'>
                            <Text style={{ color: '#ffff' }}>Select Section (Optional)</Text>
                        </TouchableOpacity>
                    </View>
                            : null
                        }

                        {/* {this.state.promoCode ?
                            <View>
                                <Text style={{ fontSize: 15, fontWeight: '600', color: '#729F3D' }}>
                                Discount Availed
                            </Text>
                            </View>
                            : null} */}
                    </View>

                    <TouchableOpacity onPress={()=>this.hangeChangeAddress()} style={{alignItems:'center'}}>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: '#729F3D' }}>
                            Change Delivery Address (Optional)
                        </Text>
                    </TouchableOpacity>
                    {changeAddress?
                    <TextInput
                        placeholder="Address"
                        onChangeText={(value) => this.handleChange('address', value)}
                        name="address"
                        style={{ height: 40, marginBottom: 7, borderColor: 'transparent', borderWidth: 1, color: "gray", backgroundColor: "white", borderRadius: 4, margin: 10 }}
                        placeholderTextColor="black"
                    />:

                    null}

                    {this.props.promoCode && this.props.promoCode.discount ?
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: '#729F3D' }}>Discount Availed:{this.props.promoCode && this.props.promoCode.discount}%</Text>
                    </View>
                    :
                        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                           <View style={{width:'60%'}}>
                           <TextInput
                                placeholder="Enter Promo code"
                                onChangeText={(value) => this.handleChange('promoCode', value)}
                                name="promoCode"
                                promoCode={this.state.promoCode}
                                style={{ height: 40, marginBottom: 7, borderColor: 'transparent', borderWidth: 1, color: "gray", backgroundColor: "white", borderRadius: 4, margin: 10 }}
                                placeholderTextColor="black"
                            />
                           </View>
                            {/* <TouchableOpacity onPress={this.getPromo} style={{ height:'50%',backgroundColor:'#729F3D' }}>
                                <Text style={{ color: '#FFFF' }}>Avail discount</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity
                            onPress={this.getPromo}
                            style={[styles.input4]}
                            underlayColor='#729F3D'>
                            <Text style={{ color: '#ffff' }}>Avail discount</Text>
                        </TouchableOpacity>
                        </View>}

                    <View style={styles.textAreaContainer} >
                        <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder="Notes"
                            placeholderTextColor="grey"
                            numberOfLines={10}
                            multiline={true}
                            name='notes'
                            onChangeText={(value) => this.handleChange('notes', value)}
                        />
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <TouchableOpacity
                            onPress={this.submitCart}
                            style={[styles.input4]}
                            underlayColor='#729F3D'>
                            <Text style={{ color: '#ffff' }}>BUY</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <InfoModal isModalVisible={infoModalFlag} modalClose={this.modalCloseInfo} />
                <SectionModal isModalVisible={this.state.sectionModal} modalClose={this.handleSectionModal} sectionArray={this.state.section} selectSection={this.selectSection} />
                <DropdownAlert
                    ref={ref => this.dropdown = ref}
                    showCancel
                    defaultContainer={{
                        paddingHorizontal: 8,
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
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        stock: state.orders.stock,
        promoCode: state.orders.promoCode,
        submitCartLoading: state.orders.submitCartLoading
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SubmitOrderScreen);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 0.5,
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
    input4: {
        height: 35,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#729b20',
        backgroundColor: '#8BC24A',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
    },
    textAreaContainer: {
        backgroundColor: 'white',
        margin: 10
    },
    textArea: {
        // height: 150,
        justifyContent: "flex-start"
    }
});
