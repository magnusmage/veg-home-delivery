import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Storage from '../../lib/requests/storage';
// import Spinner from 'react-native-loading-spinner-overlay';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  AsyncStorage
} from 'react-native';
// import OrderModal from '../modal.js/orderModal';
import ScreenHeader from '../headers/screenHeader';
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

class OrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderIsModalVisible: false,
      orders: null,
      orderItems: null,
      section: '',
      sectionArray: []
    }
  }

  componentDidMount() {

    AsyncStorage.getItem('section', (err, result) => {
      this.setState({
        sectionArray: JSON.parse(result)
      })
    });

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orders && nextProps.orders) {
      this.setState({
        orders: nextProps.orders
      })
    }

  }

  sectionArray = () => {
    const array = this.state.sectionArray
    array.push(this.state.section);
    this.setState({ sectionArray: array }, () => {
      this.setStorage()
    });
  }

  setStorage = async () => {
    try {
      await AsyncStorage.setItem('section', JSON.stringify(this.state.sectionArray));
      this.setState({ section: '' })
    } catch (error) {
    }
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  };
  navigate = (route) => {
    const { navigation } = this.props;
    navigation.navigate(route);
  }

  handleDelete = (sectionIndex) => {
    const array = Object.assign([], this.state.sectionArray)
    array.splice(sectionIndex, 1)
    this.setState({
      sectionArray: array
    }, () => {
      this.setStorage();
    })
  }
  render() {
    const { orderIsModalVisible } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#EEEEEE', width: '100%', height: '100%' }}>
        <View>
          <ScreenHeader
            name="Sections"
            navigate={() => this.navigate('bottomTabs')}
          />
        </View>
        <View>
          <Image style={{ height: height, width: width, position: 'absolute', top: 0, left: 0 }} source={require('../../common/bg.png')} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
          <TextInput
            placeholder="Add Section"
            onChangeText={(value) => this.handleChange('section', value)}
            name="section"
            style={{ width: '90%', height: 40, marginBottom: 7, borderColor: '#B1CA27', borderWidth: 1, color: "gray", backgroundColor: "#CDDC39", borderRadius: 4 }}
            placeholderTextColor="#FFF"
          />
          <TouchableOpacity onPress={this.sectionArray}>
            <Text style={{ color: '#B1CA27', fontWeight: 'bold' }} > + Add</Text>
          </TouchableOpacity>
        </View>

        <ScrollView >
          {this.state.sectionArray && this.state.sectionArray.map((section, index) => (
            <View style={{ flex: 1, marginBottom: 7 }}>
              <TouchableOpacity onPress={() => this.orderModalVisible(order.orderItems)}>
                <View style={{ flex: 0.4, backgroundColor: '#FFFF', marginBottom: 7 }} >
                  <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => this.handleDelete(index)}>
                    <Image style={styles.cancel} source={require('../../common/cross.png')} />
                  </TouchableOpacity>
                  <View style={{ marginVertical: 15, alignItems: 'center' }}>
                    <View style={styles.statusBar}>
                      <Text style={{ color: '#FFF', fontWeight: 'bold' }} >{section}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}


styles = StyleSheet.create({
  statusBar: {
    height: 40,
    borderWidth: 0.5,
    borderColor: '#CDDC39',
    backgroundColor: '#CDDC39',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    alignItems: 'center'
  },
  cancel: {
    marginRight: 7,
    marginTop: 7,
    height: 30,
    width: 30,
  },
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    orders: state.orders.orders,
    orderLoading: state.orders.orderLoading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
