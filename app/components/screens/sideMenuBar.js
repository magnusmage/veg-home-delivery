import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, FlatList, Image, Text, ScrollView, AsyncStorage, BackHandler } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import {contactData} from '../../config/ContactCredentials'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Share from 'react-native-share';
import Toast from 'react-native-easy-toast';
class SidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      currentUser: null
    }
  }

  componentWillReceiveProps() {

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


  orderSet = (name) => {
    this.props.getOrder({ email: this.state.currentUser.email });
    return this.props
      .navigation
      .dispatch(StackActions.reset(
        {
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: name }),
          ]
        }));
  }

  setNotification = (name) => {
    this.props.getNotifications({ email: this.state.currentUser.email });
    return this.props
      .navigation
      .dispatch(StackActions.reset(
        {
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: name }),
          ]
        }));
  }

  reset = (name) => {
    return this.props
      .navigation
      .dispatch(StackActions.reset(
        {
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: name }),
          ]
        }));
  }

  signOut = () => {
    AsyncStorage.removeItem('isAuthenticated');
    AsyncStorage.setItem('section',[])
    AsyncStorage.removeItem('currentUser', () => {
      this.setState({
        isAuthenticated: false,
        currentUser: null
      }, () => {
        this.dropdown.alertWithType('success', 'Log out', 'Logout successfully');
        setTimeout(() => { this.props.navigation.closeDrawer() }, 2000)
      })
    })
    this.props.setLogout();
  }

  share = () => {
    const options = {
      message: 'Veggie box message contact us to place order and other queries',
      title: 'Veggie Box',
      email: contactData.email,
      failOnCancel: () => { this.refs.toast.show('share dismissed', DURATION.LENGTH_LONG); }
    }
    Share.open(options)
      .then((res) => { console.log(res) })
      .catch((err) => { err && console.log(err); });
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground style={styles.modalHeader} source={require('../../common/bgDrawer.png')}>
          <View >
            <View style={{ alignItems: 'center' }}>
              <Image style={styles.avatar} source={require('../../common/profileAvatar.png')} />
            </View>
            <View style={{ marginLeft: 10 }}>
              {this.state.currentUser ?
                <View>
                  <Text style={{ color: '#FFFF' }}>
                    (Company) {this.state.currentUser.name}
                  </Text>
                  <Text style={{ color: '#FFFF' }}>
                    {this.state.currentUser.email}
                  </Text>
                </View> :
                null}
            </View>
          </View>
        </ImageBackground>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.menu}>
            {this.state.isAuthenticated ?
              <View>
                <TouchableOpacity style={styles.menuText}
                  onPress={() => this.reset('ProfileScreen')}
                >
                  <View style={styles.cardContainer}  >
                    <Image style={styles.iconStyle} source={require('../../common/Profile.png')} />
                    <Text style={styles.iconText}>Profile</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuText}
                  onPress={() => this.signOut()}
                >
                  <View style={styles.cardContainer}  >
                    <Image style={styles.iconStyle} source={require('../../common/Lock.png')} />
                    <Text style={styles.iconText}>Sign Out </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuText}
                  onPress={() => this.orderSet('OrderScreen')}
                >
                  <View style={styles.cardContainer}  >
                    <Image style={styles.iconStyle} source={require('../../common/Basket.png')} />
                    <Text style={styles.iconText}>My Orders</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuText}
                  onPress={() => this.setNotification('NotificationScreen')}
                >
                  <View style={styles.cardContainer}  >
                    <Image style={styles.iconStyle} source={require('../../common/Bell.png')} />
                    <Text style={styles.iconText}>Notifications </Text>
                  </View>
                </TouchableOpacity>
              </View> :
              <TouchableOpacity style={styles.menuText}
                onPress={() => this.reset('LoginScreen')}>
                <View style={styles.cardContainer}  >
                  <Image style={styles.iconStyle} source={require('../../common/Lock.png')} />
                  <Text style={styles.iconText}>Login </Text>
                </View>
              </TouchableOpacity>
            }

            {this.state.isAuthenticated && this.state.currentUser&&this.state.currentUser.type === 'HORECA' ? 
            <TouchableOpacity style={styles.menuText}
            onPress={() => this.reset('SectioningScreen')}
          >
            <View style={styles.cardContainer}  >
              <Image style={styles.iconStyle} source={require('../../common/ContactUs.png')} />
              <Text style={styles.iconText}>Sections</Text>
            </View>
          </TouchableOpacity>
          :
          null
            }

            <TouchableOpacity style={styles.menuText}
              onPress={() => this.reset('ContactUsScreen')}
            >
              <View style={styles.cardContainer}  >
                <Image style={styles.iconStyle} source={require('../../common/ContactUs.png')} />
                <Text style={styles.iconText}>Contact Us</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuText}
              onPress={() => this.reset('AboutUsScreen')}
            >
              <View style={styles.cardContainer}  >
                <Image style={styles.iconStyle} source={require('../../common/Information-1.png')} />
                <Text style={styles.iconText}>About Us</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuText} onPress={this.share}>
              <View style={styles.cardContainer} >
                <Image style={styles.iconStyle} source={require('../../common/Share.png')} />
                <Text style={styles.iconText}>Share </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
        <Toast ref="toast" position='bottom' />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  dropdownMenu: { paddingLeft: 20 },
  dropdownText: { fontWeight: '400' },
  selected: { color: '#e2cba9' },
  socialfont: { margin: 3, opacity: 0.7 },
  socialIcon: { flexDirection: 'row' },
  menuText: { borderBottomWidth: 1, borderBottomColor: '#e5e5e5', paddingHorizontal: 15, paddingVertical: 12, },
  actionButtonsContainer: { flexDirection: 'row', padding: 15, borderTopWidth: 1, borderTopColor: '#cccccc', justifyContent: 'flex-end' },
  actionsText: { fontSize: 17, fontWeight: '500' },
  modalHeader: { paddingBottom: 2, borderBottomColor: '#ccc', borderBottomWidth: 1, flex: 1, maxHeight: 150, },
  forgotPasswordBorder: { alignItems: 'flex-end', marginTop: 0, marginBottom: 20 },
  mainContainer: { backgroundColor: 'white', borderRadius: 5 },
  modalContent: { paddingVertical: 10, paddingHorizontal: 15 },
  paddingRight: { paddingRight: 25 },
  avatar: { width: 75, height: 75, marginVertical: 15 },
  iconText: { color: '#8BC24A', fontWeight: '600' },
  iconStyle: { width: 30, height: 30 },
  cardContainer: { flexDirection: 'row', alignItems: 'center' }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    orders: state.orders.orders
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);