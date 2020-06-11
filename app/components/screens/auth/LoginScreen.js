import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,


} from "react-native";
import DropdownAlert from 'react-native-dropdownalert';
import Spinner from 'react-native-loading-spinner-overlay';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActionCreators } from '../../../actions';
import { TextInput } from 'react-native-gesture-handler';
import ForgetModal from '../../modal.js/forgetModal';
import ResetModal from '../../modal.js/ResetModal';
import { login } from '../../../actions/auth';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'USA',
      forgetIsModalVisible: false,
      resetIsModalVisible: false,
      email: '',
      password: '',
      forgetEmail: '',
      verficationCode: '',
      resetEmail: '',
      resetPass: ''
    }
  }

  signUpScreen = () => {
    const { navigation } = this.props;
    navigation.navigate('SignUpScreen')
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    const { email, password } = this.state;
    const { login, navigation } = this.props;
    const params = {
      login_name: email,
      login_pass: password
    }
    login(params, navigation, this.dropdown)
  }
  forgetModalVisible = (value) => {
    this.setState({
      forgetIsModalVisible: value
    })
  }

  resetModalVisible = (value) => {
    this.setState({
      resetIsModalVisible: value
    })
  }

  handleSubmitReset = () => {
    this.setState({
      resetIsModalVisible: false
    })
  }

  handleChangeForget = (name, value) => {
    this.setState({
      [name]: value
    })
  };

  handleChangeReset = (name, value) => {
    this.setState({
      [name]: value
    })
  };

  handleSubmitForget = () => {
    const { forgetEmail } = this.state
    const { forgetPassword } = this.props;
    const params = {
      email: forgetEmail
    }
    forgetPassword(params, this.dropdown).then(() => {
      this.setState({
        forgetIsModalVisible: false
      }, () => {
        this.resetModalVisible(true)
      })
    })
  }


  handleSubmitReset = () => {
    const { verficationCode, resetEmail, resetPass } = this.state
    const { resetPassword } = this.props;
    const params = {
      email: resetEmail,
      code: verficationCode,
      newpassword: resetPass
    }
    resetPassword(params, this.dropdown)
  }

  render() {
    const { forgetIsModalVisible, resetIsModalVisible } = this.state;
    const { authLoader } = this.props;
    return (
      <View style={styles.container} >
        <ImageBackground style={styles.bg_image} source={require('../../../common/bg.png')}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 0.3, justifyContent: 'flex-start' }}>
              <View style={styles.logoContainer}>
                <Image source={require('../../../common/iconpng.png')} style={styles.imageSize} />
              </View>
            </View>
            <View style={[styles.formContainer]}>
              <KeyboardAwareScrollView>
                <View style={{ marginBottom: 12 }}>
                  <View style={{ width: 300 }}>
                    {this.props.errors && getErrorMessage(this.props.errors)}
                  </View>
                  <TextInput
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={(value) => this.handleChange('email', value)}
                    name="email"
                    style={{ height: 40, marginBottom: 7, borderColor: '#B1CA27', borderWidth: 1, color: "gray", backgroundColor: "#CDDC39", borderRadius: 4 }}
                    placeholderTextColor="#FFF"
                  >
                  </TextInput>
                  <View>
                    <TextInput
                      name='password'
                      onChangeText={(value) => this.handleChange('password', value)}
                      onChange={this.handleChange}
                      placeholder="password"
                      secureTextEntry={true}
                      style={{ height: 40, marginBottom: 7, borderColor: '#B1CA27', borderWidth: 1, color: "gray", backgroundColor: "#CDDC39", borderRadius: 4 }}
                      placeholderTextColor="#FFF"
                    >
                    </TextInput>
                  </View>
                  <View >
                    <TouchableHighlight
                      style={styles.input3}
                      onPress={this.handleSubmit}
                      underlayColor='#729F3D'>
                      <Text style={{ color: '#ffff' }}>Log In</Text>
                    </TouchableHighlight>
                  </View>
                </View>
                <TouchableOpacity onPress={this.forgetScreen}>
                  <View style={{ marginBottom: 4, alignItems: "center" }}>
                    <Text onPress={() => this.forgetModalVisible(true)} style={{ color: "#393d32", fontWeight: "bold", fontSize: 10, marginBottom: 5 }}>Forget password?</Text>
                  </View>
                </TouchableOpacity>
                <View >
                  <TouchableHighlight
                    style={styles.input3}
                    onPress={this.signUpScreen}
                    underlayColor='#729F3D'>
                    <Text style={{ color: '#ffff' }}>Sign Up</Text>
                  </TouchableHighlight>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
          <ForgetModal
            isModalVisible={forgetIsModalVisible}
            handleSubmitForget={this.handleSubmitForget}
            modalVisible={this.forgetModalVisible}
            handleChangeForget={this.handleChangeForget} />
          <ResetModal
            isModalVisible={resetIsModalVisible}
            handleSubmitReset={this.handleSubmitReset}
            modalVisible={this.resetModalVisible}
            handleChangeReset={this.handleChangeReset} />
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
      </View>
    );
  };
}

function getErrorMessage(state) {
  if (state) {
    return <Text> {state.map((error_message) => <Text style={{ color: "#cac500", width: 200 }}> * {error_message.message}</Text>)}</Text>
  }
}


const styles = StyleSheet.create({
  formContainer: {
    flex: 0.4,
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
  input2: {
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#437f90',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
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
  textView: {
    color: '#FFFFFF',
  },
  imageSize: {
    height: 135,
    width: 120
  }

});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    errors: state.auth.error,
    authLoader: state.auth.authLoader
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

