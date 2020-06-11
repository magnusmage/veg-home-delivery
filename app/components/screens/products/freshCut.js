import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import Header from '../../headers/Header';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
  Image
} from "react-native";
import StockModal from '../../modal.js/stockModal';
import Spinner from 'react-native-loading-spinner-overlay';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


class Fruits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
  }

  async componentDidMount() {
    await AsyncStorage.getItem('currentUser', (err, result) => {
      this.setState({
        currentUser: JSON.parse(result)
      }, () => {
        this.getProduct();
      })
    })
  }

  getProduct = () => {
    const user = this.state.currentUser;
    const { getVeggies } = this.props;
    getVeggies({ type: 'FRESHCUT' }, 'freshCut', user && user.type)
  }

  setProduct = (product) => {
    this.setState({
      product: product
    }, () => {
      this.openStockModal()
    })
  }

  openStockModal = () => {
    const { openStockVeggies, openStockExotic, openStockFruits, openStockFreshCut } = this.props;
    openStockVeggies(false)
    openStockExotic(false)
    openStockFruits(false)
    openStockFreshCut(true)
  }

  render() {
    const { freshCut, cartFlag, stockFlag } = this.props;
    const { product, currentUser } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Header
            openSidebar={() => {
              this.props.navigation.openDrawer();
            }} />
            <View>
            <Image style={{ height: height, width: width, position: 'absolute', top: 0, left: 0 }} source={require('../../../common/bg.png')} />
          </View>
          <Spinner
              visible={this.props.productLoading}
              // textContent={'Loading...'}
              textStyle={{ color: 'green' }}
              animation='fade'
            />
          <ScrollView>
            {freshCut && freshCut.map((product) => (
              <TouchableOpacity key={product.id} onPress={() => this.setProduct(product)} style={styles.productContainer}>
                <ImageBackground style={{ width: '100%', height: 200 }} source={{ uri: `https://vbapp.magnusmage.com/admin/${product.img}` }}>
                  <View style={styles.productContainerInner}>
                  </View>
                  <View style={styles.productDescription}>
                    <View>
                      <View style={styles.priceContainer}>
                        <Text style={styles.button_style}>{product.name}</Text>
                        {currentUser && currentUser.type == 'COMPANY' ? null : <Text style={styles.button_style}> Rs-{product.price}</Text>}
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
            <View style={styles.productContainerEmpty}>
            </View>
          </ScrollView>
        </View>
        <StockModal isModalVisible={stockFlag} product={product} />
      </View>
    );
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    freshCut: state.products.freshCut,
    productLoading:state.products.productLoading,
    stockFlag: state.orders.stockFlagFreshCut
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Fruits);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  productContainerInner: {
    flex: 9,
  },

  productContainer: {
    flex: 0.3,
    marginVertical: 10,
    height: 200,
    backgroundColor: 'green',
    position: 'relative'
  },

  productDescription: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    position: 'absolute',
    bottom: -20,

  },
  button_style: {
    color: '#fff',
    // backgroundColor: '#8BC24A',
    // width: 220,
    // height: 45,
    margin: 0,
    fontWeight: 'bold',
    textAlign: 'center',
    // paddingTop: 10
  },
  productContainerEmpty: {
    flex: 0.3,
    marginVertical: 10,
    height: 100,
    position: 'relative'
  },
  priceContainer: {
    backgroundColor: '#8BC24A',
    padding: 10,
    alignItems: 'center',
    minWidth: width / 2
  }
});


