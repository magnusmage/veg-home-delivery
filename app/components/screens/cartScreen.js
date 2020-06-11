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
    AsyncStorage
} from "react-native";
import RadioForm from 'react-native-simple-radio-button';

var radio_props = [
    { label: 'Pre-order', value: 0 },
    { label: 'Urgent', value: 1 }
];
import ScreenHeader from '../headers/screenHeader';

class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: null,
            currentUser: null,
            isAuthenticated: false,
            orderType:0,
            totalPrice:0
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.stock) {
            this.setState({
                stock: nextProps.stock
            }, () => {
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
                            totalPrice:  totalPrices 
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


    handleRadio=(value)=>{
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

    handleCartObj = ( data) => {
      
        const { submitOrder,openCart } = this.props;
        if (this.state.isAuthenticated) {
            const user = this.state.currentUser[0];
               if(this.state.orderType===1){
            this.setState({
                totalPrice:this.state.totalPrice+50
            },()=>{
                const order = {
                    email: user.email,
                    usertype: user.type,
                    ordertype: this.state.orderType,
                    ordertotal: this.state.totalPrice,
                    data: data
                }
    
                submitOrder(order)
                openCart(false)
            })
            
        }
            const order = {
                email: user.email,
                usertype: user.type,
                ordertype: this.state.orderType,
                ordertotal: this.state.totalPrice,
                data: data
            }

            submitOrder(order)
            openCart(false)
           
        }
        else {
            console.log('you need to login')
        }

    }



  navigate=()=>{
    this.props.navigation.navigate('bottomTabs')
    // this.props.goBack()
  }


  render() {
    const { sauces,cartFlag,stockFlag } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <ScreenHeader
           name='Cart'
           navigate={this.navigate}
           />
          <ScrollView>
          {
                                this.state.stock && this.state.stock.map((product) => (
                                    <View key={product.id} style={styles.productContainer}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ height: 120, width: 90, backgroundColor: 'red' }}>
                                                <Image style={{ width: '100%', height: '100%' }} source={{ uri: `https://vbapp.magnusmage.com/admin/${product.img}` }} />
                                            </View>
                                            <View style={styles.descContainer}>
                                                <Text style={styles.text}>{product.name}</Text>
                                                <Text style={styles.text}>KG:{product.quantity}</Text>
                                                <Text style={[styles.text, { color: '#729F3D' }]}>RS.{product.price}</Text>
                                            </View>
                                        </View>
                                        <Image style={styles.cancel} source={require('../../common/cross.png')} />
                                    </View>
                                ))

                            }

                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 18, color: '#bcbcbc' }}>Delivery Type</Text>
                                <RadioForm
                                    radio_props={radio_props}
                                    formHorizontal={true}
                                    labelHorizontal={true}
                                    buttonColor={'#729F3D'}
                                    buttonSize={20}
                                    selectedButtonColor={'#729F3D'}
                                    labelStyle={{
                                        color: 'black',
                                        marginRight: 30
                                    }}
                                    animation={true}
                                    initial={0}
                                    onPress={(value) => this.handleRadio(value)}
                                />

                                <View style={{ justifyContent: "flex-end", marginTop: 20 }}>
                                    <Text style={{ fontWeight: '600', color: '#729F3D' }}>
                                        Delivery Charges Rs {this.state.orderType===1?50:0}
                                        </Text>
                                    <View>
                                        <Text style={{ fontSize: 25, fontWeight: '600', color: '#729F3D' }}>
                                            Total Rs. {this.state.totalPrice} + {this.state.orderType===1?50:0}
                                         </Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={this.submitCart}
                                        style={[styles.input3,]}
                                        underlayColor='#729F3D'>
                                        <Text style={{ color: '#ffff' }}>BUY</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
          </ScrollView>
        </View>
      </View>
    );
  };
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


export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

//   productContainerInner: {
//     flex: 9,
//   },

//   productContainer: {
//     flex: 0.3,
//     marginVertical: 10,
//     height: 200,
//     backgroundColor: 'green',
//     position: 'relative'
//   },

  productDescription: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    position: 'absolute',
    bottom: -20,

  },
  productContainerEmpty: {
    flex: 0.3,
    marginVertical: 10,
    height: 100,
    position: 'relative'
  },
  button_style: {
    color: '#fff',
    backgroundColor: '#8BC24A',
    width: 220,
    height: 45,
    margin: 0,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10
  },

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


