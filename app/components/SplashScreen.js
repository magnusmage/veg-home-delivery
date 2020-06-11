import React, { Component } from 'react';
import { Text, StyleSheet, View, ImageBackground, Dimensions, Image, NetInfo } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
// import Image from 'react-native-remote-svg'
// import { colors } from "../config/theme";
import PropTypes from "prop-types";
// import { Log } from "../config/Log";
//Constants
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const DURATION = 2 * 1000;
console.disableYellowBox = true
import DropdownAlert from 'react-native-dropdownalert';


class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ''
    }
  }

  // static propTypes = {
  //   navigation: PropTypes.object,
  // };

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.props.navigation.navigate('App');
  //   }, DURATION);
  // }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    NetInfo.isConnected.fetch().done(
      (isConnected) => {
        if (isConnected) {
          setTimeout(() => {
            this.props.navigation.navigate('App');
          }, DURATION);
        }
        else {
          this.dropdown.alertWithType('warn', 'Warning', 'Internet is not Connected');

        }
        this.setState({
          status: isConnected
        });
      }
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (isConnected) => {
    this.setState({ status: isConnected });
  }

  render() {
    return (
      <View>
        <ImageBackground source={require('../common/bg.png')} style={localStyle.bg_image}>
          <View style={localStyle.container}>
            <View style={{ flex: 0.9 }}>
              <View style={localStyle.logoContainer}>
                <Image style={localStyle.imageSize} source={require('../common/iconpng.png')} />
              </View>
            </View>
          </View>
        </ImageBackground>
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
    );
  };
}

const localStyle = StyleSheet.create({
  bg_image: {
    width: '100%',
    height: '100%'
  },

  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageSize: {
    height: 140,
    width: 140,
    resizeMode:'contain'
  }

});

export default SplashScreen;