import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class ScreenHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  navigateToBottomTabs=()=>{
      this.props.navigation.navigate('LoginScreen');
  }

  render() {
    return (
      <View style={[styles.header,this.props.style]}>
        <View style={styles.leftMenu}>
          <TouchableOpacity onPress={() => this.props.navigate()}>
            <Image source={require('../../common/back-arrow.png')} style={[styles.menu]} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
          <Text style={{ marginRight: 10, fontSize: 20, fontWeight: '600',color: '#FFFF' }}>{this.props.name}</Text>
          {/* <View style={{ fontSize: 16, padding: 0, height: 28, flex: 1, borderBottomColor: '#000', borderBottomWidth: 1, }}></View>
          <FontAwesome name="search" style={[styles.menu, { fontSize: 24, color: '#000' }]} /> */}
        </TouchableOpacity>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#8BC24A',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ebebeb',
  },
  leftMenu: {
    flex: 0.1,
  },
  middle: {
    flex: 0.9,
    paddingHorizontal: 5
  },
  rightSearch: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  pageTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600'
  },
  cart: {
    marginLeft: 15,
  },
  menu:{
      width:20,
      height:15


  }
});
