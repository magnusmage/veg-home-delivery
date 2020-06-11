import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  CheckBox,
  TouchableHighlight,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DropdownAlert from 'react-native-dropdownalert';
import ScreenHeader from './headers/screenHeader';
import Spinner from 'react-native-loading-spinner-overlay';

import { ActionCreators } from '../actions';
// import Country from './countryPicker';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
var radio_props = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' }
];

var radio_props2 = [
  { label: 'Residential', value: 'USER' },
  { label: 'Horeca', value: 'HORECA' }
];

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'SignUpScreen',
      user: {
        email: '',
        name: '',
        password: '',
        phone: '',
        address: '',
        gender: 'MALE',
        citizen: '',
        type: 'USER',
        sectioningModal: false
      }
    }
  }

  handleChange = (name, value) => {
    const { user } = this.state;
    this.setState({
      value: 'MALE',
      user: {
        ...user,
        [name]: value
      }
    })
  };

  handleSubmit = () => {
    const { user } = this.state;
    const { signUp, navigation } = this.props;
    const body = {
      email: user.email,
      password: user.password,
      name: user.name,
      mobile: user.phone,
      address: user.address,
      type: user.type,
      gender: user.gender
    };
    signUp(body, this.props.navigation, this.dropdown);
  };

  handleRadio = (value) => {
    const { user } = this.state
    this.setState({
      user: {
        ...user,
        gender: value
      }
    })

  }

  handleRadio2 = (value) => {
    const { user } = this.state
    this.setState({
      user: {
        ...user,
        type: value
      }
    })
  }

  navigate = () => {
    this.props.navigation.navigate('LoginScreen')
  }

  // handleSectioningModal(route) {
  //   this.props.navigation.navigate(route)

  // }

  render() {
    const { response, authLoader } = this.props;
    return (
      <View style={styles.container}>
        {/* <ScreenHeader 
          name='SignUp'
          navigate={this.navigate}
          /> */}
        <ImageBackground style={styles.bg_image} source={require('../common/bg.png')}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 0.3, justifyContent: 'center' }}>
              <View style={styles.logoContainer}>
                <Image source={require('../common/iconpng.png')} style={styles.imageSize} />
              </View>

            </View>
            <View style={{ flex: 0.7, justifyContent: "flex-start" }}>
              <KeyboardAwareScrollView>
                <View style={{ width: 300 }} >
                  <TextInput
                    onChangeText={(value) => this.handleChange('email', value)}
                    placeholder="Email"
                    style={{ height: 40, borderColor: '#B1CA27', borderWidth: 1, color: "gray", backgroundColor: "#CDDC39", borderRadius: 4, marginBottom: 7 }}
                    placeholderTextColor="#FFF"
                  >
                  </TextInput>
                  <TextInput
                    onChangeText={(value) => this.handleChange('name', value)}
                    placeholder="Name"
                    style={{ height: 40, borderColor: '#B1CA27', borderWidth: 1, color: "gray", backgroundColor: "#CDDC39", borderRadius: 4, marginBottom: 7 }}
                    placeholderTextColor="#FFF"
                  >
                  </TextInput>
                  <TextInput
                    onChangeText={(value) => this.handleChange('password', value)}
                    placeholder="*****"
                    style={{ height: 40, borderColor: '#B1CA27', borderWidth: 1, color: "gray", backgroundColor: "#CDDC39", borderRadius: 4, marginBottom: 7 }}
                    placeholderTextColor="#FFF"
                    secureTextEntry={true}
                  >
                  </TextInput>
                  <TextInput
                    onChangeText={(value) => this.handleChange('phone', value)}
                    placeholder="Phone Number"
                    style={{ height: 40, borderColor: '#B1CA27', borderWidth: 1, color: "gray", backgroundColor: "#CDDC39", borderRadius: 4, marginBottom: 7 }}
                    placeholderTextColor="#FFF"
                  >
                  </TextInput>
                  <TextInput
                    onChangeText={(value) => this.handleChange('address', value)}
                    placeholder="Address"
                    style={{ height: 40, borderColor: '#B1CA27', borderWidth: 1, color: "gray", backgroundColor: "#CDDC39", borderRadius: 4, marginBottom: 7 }}
                    placeholderTextColor="#FFF"
                  >
                  </TextInput>
                  <View style={{ flexDirection: 'row', justifyContent: "flex-start", backgroundColor: "#CDDC39", marginBottom: 7 }} >
                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', paddingLeft: 20 }}>
                      <RadioForm
                        radio_props={radio_props}
                        formHorizontal={true}
                        labelHorizontal={true}
                        buttonColor={'#729F3D'}
                        buttonSize={20}
                        selectedButtonColor={'#729F3D'}
                        labelStyle={{
                          color: '#FFFF',
                          marginRight: 30
                        }}
                        animation={true}
                        initial={0}
                        buttonWrapStyle={{ marginRight: 10 }}
                        onPress={(value) => this.handleRadio(value)}
                      />
                    </View>

                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: "flex-start", backgroundColor: "#CDDC39" }} >
                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', paddingLeft: 20 }}>
                      <RadioForm
                        radio_props={radio_props2}
                        formHorizontal={true}
                        labelHorizontal={true}
                        buttonColor={'#729F3D'}
                        buttonSize={20}
                        selectedButtonColor={'#729F3D'}
                        labelStyle={{
                          color: '#FFFF',
                          marginRight: 30
                        }}
                        animation={true}
                        initial={0}
                        buttonWrapStyle={{ marginRight: 10 }}
                        onPress={(value) => this.handleRadio2(value)}

                      // onPress={(value) => { this.setState({ value: value }) }}
                      />
                    </View>
                  </View>

                  {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {this.state.typing === 'HORECA' ?
                      <TouchableOpacity onPress={() => this.handleSectioningModal('SectioningScreen')} >
                        <Text style={{ color: '#729F3D', fontSize: 20 }}>
                          Add Sectioning</Text></TouchableOpacity>
                      :
                      null
                    }
                  </View> */}

                  <View style={{ marginVertical: 15 }}>
                    <TouchableHighlight
                      style={styles.input3}
                      onPress={this.handleSubmit}
                      underlayColor='#729F3D'>
                      <Text style={{ color: '#ffff' }}>Sign up</Text>
                    </TouchableHighlight>
                  </View>
                  <View style={{ marginVertical: 5 }}>
                    <TouchableHighlight
                      style={{ alignItems: 'center', color: '#8BC24A', borderBottomColor: '#8BC24A' }}
                      onPress={this.navigate}
                      underlayColor='transparent'
                    >
                      <Text style={{ color: '#8BC24A', fontWeight: '600' }}>Back to Login</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
        </ImageBackground>
        <Spinner
          visible={authLoader}
          // textContent={'Loading...'}
          textStyle={{ color: 'green' }}
          animation='fade'
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
      </View >
    );
  };
}

function getErrorMessage(state, params) {
  if (state) {
    {
      return <Text> {state.errors.map((error_message) => error_message.param === params && <Text style={{ color: "#cac500" }}> * {error_message.message}</Text>)}</Text>
    }
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 0.7,
    alignItems: 'center',
  },
  InnerView: {
    marginVertical: 4,
  },
  bg_image: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 0.2,
    backgroundColor: 'yellow',
    marginVertical: '4%',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
  },
  textView: {
    color: '#FFFFFF',
  },
  imageSize: {
    height: 135,
    width: 120
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    response: state.auth.SignupError,
    authLoader: state.auth.signUpLoader
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
