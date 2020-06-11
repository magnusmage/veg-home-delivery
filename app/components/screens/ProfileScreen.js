import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../headers/Header';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from "react-native";
import { ActionCreators } from '../../actions';
import ScreenHeader from '../headers/screenHeader';
import Storage from '../../lib/requests/storage'


class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'USA',
      forgetIsModalVisible: false,
      resetIsModalVisible: false,
      currentUser:{}
    }
  }

  componentDidMount(){

    AsyncStorage.getItem('isAuthenticated', (err, result) => {
      this.setState({
        isAuthenticated:result
      })
    });

    AsyncStorage.getItem('currentUser', (err, result) => {
      this.setState({
        currentUser:JSON.parse(result)
      })
    });
  }


  signUpScreen = () => {
    const { navigation } = this.props;
    navigation.navigate('SignUpScreen')
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

  handleSubmitForget = () => {
    this.setState({
      forgetIsModalVisible: false
    }, () => {
      this.resetModalVisible(true)
    })
  }

  handleSubmitReset = () => {
    this.setState({
      resetIsModalVisible: false
    })
  }

  navigate=()=>{
    this.props.navigation.navigate('bottomTabs')
  }

  render() {
    const {currentUser} = this.state;
    return (
      <View style={styles.container} >
        <View style={{ flex: 1, backgroundColor: '#EEEEEE', width: '100%', height: '100%' }}>
          <ScreenHeader 
          name='Profile'
          navigate={this.navigate}
          />
            {/* <Header
          openSidebar={() => {
            this.props.navigation.openDrawer();
          }} /> */}
         
              <View style={{ flex: 0.93, marginBottom: 7 }}>
              <View style={{ flex: 0.25, backgroundColor: '#FFFF', marginBottom: 7, justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ marginTop: 20 }}>
                  <Image source={require('../../common/profileAvatar.png')} style={{ width: 100, height: 100 }} />
                </View>
              </View>
              <View style={{ flex: 0.136, backgroundColor: '#FFFF', marginBottom: 7, justifyContent: 'center' }}>
                <View style={{ marginLeft: 20 }}>
                  <Text>
                    Name:
              </Text>
                  <Text style={{ fontSize: 22, color: '#6C6C6C' }}>
                   {currentUser.name}
              </Text>
                </View>
              </View>
              <View style={{ flex: 0.136, backgroundColor: '#FFFF', marginBottom: 7, justifyContent: 'center' }}>
                <View style={{ marginLeft: 20 }}>
                  <Text>
                    Email:
              </Text>
                  <Text style={{ fontSize: 22, color: '#6C6C6C' }}>
                  {currentUser.email}
              </Text>
                </View>
              </View>
              <View style={{ flex: 0.136, backgroundColor: '#FFFF', marginBottom: 7, justifyContent: 'center' }}>
                <View style={{ marginLeft: 20 }}>
                  <Text>
                    Contact no:
              </Text>
                  <Text style={{ fontSize: 22, color: '#6C6C6C' }}>
                    {currentUser.mobile}
              </Text>
                </View>
              </View>
              <View style={{ flex: 0.136, backgroundColor: '#FFFF', marginBottom: 7, justifyContent: 'center' }}>
                <View style={{ marginLeft: 20 }}>
                  <Text>
                    Gender:
              </Text>
                  <Text style={{ fontSize: 22, color: '#6C6C6C' }}>
                    {currentUser.gender}
              </Text>
                </View>
              </View>
              <View style={{ flex: 0.136, backgroundColor: '#FFFF', marginBottom: 7, justifyContent: 'center' }}>
                <View style={{ marginLeft: 20 }}>
                  <Text>
                    Address:
              </Text>
                  <Text style={{ fontSize: 22, color: '#6C6C6C' }}>
                  {currentUser.address}
              </Text>
                </View>
              </View>
            </View> 
        </View>
      </View>
    );
  };
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
    errors: state.auth.error
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

