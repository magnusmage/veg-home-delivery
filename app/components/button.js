import React, {Component} from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native";
import Image from 'react-native-remote-svg'
import SvgUri from 'react-native-svg-uri';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const DURATION = 4 * 1000;

const screens = ['SignUpScreen', 'PaymentScreen', 'SubscriptionScreen'];

const Carousal = ({currentScreen, onRightPress, onLeftPress, onTabPress}) => (
  <View style={styles.formCarousal}>

  </View>
);

const styles = StyleSheet.create({
  formCarousal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  dotbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default Carousal;