import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { contactData } from '../../config/ContactCredentials';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { ActionCreators } from '../../actions';
import Communications from 'react-native-communications';
import ScreenHeader from '../headers/screenHeader';


class ContactUsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  navigate = () => {
    this.props.navigation.navigate('bottomTabs')
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={{ flex: 1, backgroundColor: '#EEEEEE', width: '100%', height: '100%' }}>
          <View style={{ flex: 0.07, backgroundColor: '#8BC24A', justifyContent: 'center' }}>
            <ScreenHeader
              name='About Us'
              navigate={this.navigate}
            />
          </View>
          <View style={{ flex: 0.93, marginBottom: 7 }}>
            <View style={{ flex: 0.31, backgroundColor: '#d9d9db', justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ width: 105, height: 125 }} source={require('../../common/iconpng.png')} />
              <Text style={{ marginTop: 5 }}>Veggie Box</Text>
              <Text>v 1.5</Text>
            </View>
            <View style={{ flex: 0.62, justifyContent: "center" }}>
              <TouchableOpacity onPress={() => Communications.email([contactData.email], null, null, null, null)} style={{ flex: 0.2, flexDirection: 'row', marginLeft: 10 }}>
                <Image style={{ width: 50, height: 50 }} source={require('../../common/Mail.png')}></Image>
                <View style={{ justifyContent: 'center', marginBottom: 15, marginLeft: 10 }}>
                  <View >
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Tab to send email</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Communications.phonecall(contactData.phone, true)} style={{ flex: 0.2, flexDirection: 'row', marginLeft: 10 }}>
                <Image style={{ width: 50, height: 50 }} source={require('../../common/Phone.png')}></Image>
                <View style={{ justifyContent: 'center', marginBottom: 15, marginLeft: 10 }}>
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Tab to call</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Communications.text(contactData.phone)} style={{ flex: 0.2, flexDirection: 'row', marginLeft: 10 }}>
                <Image style={{ width: 50, height: 50 }} source={require('../../common/Message.png')}></Image>
                <View style={{ justifyContent: 'center', marginBottom: 15, marginLeft: 10 }}>
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Tab to send sms</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsScreen);

