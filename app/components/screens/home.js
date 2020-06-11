import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../headers/Header';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  TouchableHighlight
} from "react-native";
import CartModal from '../modal.js/cartModal';
import Slideshow from 'react-native-image-slider-show';

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderData: null,
      loading: true
    }
  }

  componentDidMount() {
    const { getSlider } = this.props;
    getSlider({ type: 'USER' }).then(() => {
      this.setSliders()
    })
  }

  setSliders = () => {
    const { slider } = this.props;
    let sliderArray = []
    slider && slider.map((slider) => {
      sliderArray.push({ url: `https://vbapp.magnusmage.com/admin/${slider.img}`, caption: slider.name })
    })
    this.setState({
      sliderData: sliderArray
    })
  }

  render() {
    const { sliderData } = this.state
    const { cartFlag } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Image style={{ height: height, width: width, position: 'absolute', top: 0, left: 0 }} source={require('../../common/bg.png')} />
        </View>
        <View style={{ height: height }}>
          <Header
            openSidebar={() => {
              this.props.navigation.openDrawer();
            }} />

          {sliderData ?
            <Slideshow
              dataSource={sliderData}
              //  {[
              //   { url: 'http://placeimg.com/640/480/any' },
              //   { url: 'http://placeimg.com/640/480/any' },
              //   { url: 'http://placeimg.com/640/480/any' }
              // ]}
              arrowSize={0}
              captionStyle={
                {
                  color: 'white',
                  fontWeight: '600'
                }

              }
            /> :
            <Slideshow
              dataSource={[{ url: require('../../common/slider.jpg'), caption: 'Happiness Delieverd' }]}
              arrowSize={0}
              captionStyle={
                {
                  color: 'white',
                  fontWeight: '600'
                }

              }
            />}
          <View style={{ flex: 1 }}>
            <Spinner
              visible={this.props.homeloading}
              // textContent={'Loading...'}
              textStyle={{ color: 'green' }}
              animation='fade'
            />
          </View>

          <ScrollView>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('VeggiesScreen')} style={styles.productContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={styles.imageStyle} source={require('../../common/home-images/Vegetables.png')} />
                  <View style={styles.textContainer}>
                    <Text style={styles.pName} >
                      Vegetables
                   </Text>
                    <Text style={styles.dName}>
                      Good quality fresh vegetables
                   </Text>
                  </View>
                </View>
                <Image style={styles.forwardArrow} source={require('../../common/forward-arrow.png')} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('FruitsScreen')} style={styles.productContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={styles.imageStyle} source={require('../../common/home-images/Fruits.png')} />
                  <View style={styles.textContainer}>
                    <Text style={styles.pName} >
                      Fruits
                   </Text>
                    <Text style={styles.dName}>
                      Fresh fruits
                   </Text>
                  </View>
                </View>
                <Image style={styles.forwardArrow} source={require('../../common/forward-arrow.png')} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('FrestCutScreen')} style={styles.productContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={styles.imageStyle} source={require('../../common/home-images/Fresh-Cut2.png')} />
                  <View style={styles.textContainer}>
                    <Text style={styles.pName} >
                      Fresh Cut
                   </Text>
                    <Text style={styles.dName}>
                      Healthy fresh cut vegetables
                   </Text>
                  </View>
                </View>
                <Image style={styles.forwardArrow} source={require('../../common/forward-arrow.png')} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('ExoticScreen')} style={styles.productContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={styles.imageStyle} source={require('../../common/home-images/Sauce.png')} />
                  <View style={styles.textContainer}>
                    <Text style={styles.pName} >
                      Exotic Range
                   </Text>
                    <Text style={styles.dName}>
                      Fresh exotic
                   </Text>
                  </View>
                </View>
                <Image style={styles.forwardArrow} source={require('../../common/forward-arrow.png')} />
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('BundleScreen')} style={styles.productContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={styles.imageStyle} source={require('../../common/home-images/Bundles.png')} />
                  <View style={styles.textContainer}>
                    <Text style={styles.pName} >
                      Bundles
                   </Text>
                    <Text style={styles.dName}>
                      Healthy fresh bundles
                   </Text>
                  </View>
                </View>
                <Image style={styles.forwardArrow} source={require('../../common/forward-arrow.png')} />
              </View>
            </TouchableOpacity> */}
            <View style={styles.productContainer}>
            </View>
          </ScrollView>
        </View>
        <CartModal isModalVisible={cartFlag} navigation={this.props.navigation} />
      </View>
    );
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    slider: state.orders.slider,
    homeloading: state.orders.homeloading,
    cartFlag: state.orders.cartFlag
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },


  productContainer: {
    flex: 0.3,
    marginVertical: 5,
    paddingTop: 10,
    height: 100,
    backgroundColor: '#FFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageStyle: {
    height: 85,
    width: 100
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  pName: {
    fontSize: 15
  },
  dName: {
    fontSize: 15,
    color: '#8BC24A',
    fontWeight: '600'
  },

  forwardArrow: {
    height: 40,
    width: 40,
    paddingRight: 5
  },
  spinnerTextStyle: {
    color: 'pink'
  },

});