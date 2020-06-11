import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
// import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../../headers/Header';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,Image
} from "react-native";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


class Bundles extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    const { getBundles } = this.props;
    getBundles();
  }

  render() {
    const { bundles } = this.props
    return (
      <View style={styles.container}>
        <View>
          <Header
            openSidebar={() => {
              this.props.navigation.openDrawer();
            }} />
             <View>
            <Image style={{ height: height, width: width, position: 'absolute', top: 0, left: 0 }} source={require('../../../common/bg.png')} />
          </View>
          {/* <Spinner
              visible={this.props.productLoading}
              textContent={'Loading...'}
              textStyle={{ color: 'green' }}
              animation='fade'
            /> */}
          <ScrollView>
            {bundles && bundles.map((bundle) => (
              <View key={bundle.id} style={styles.productContainer}>
                <ImageBackground style={{ width: '100%', height: 250 }} source={{ uri: `https://vbapp.magnusmage.com/admin/${bundle && bundle.img}` }}>
                  <View style={styles.productContainerInner}>
                  </View>
                  <View style={styles.productDescription}>
                    <TouchableOpacity>
                      <Text style={styles.button_style}>Price: Rs-{bundle.price}</Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            ))}
            <View style={styles.productContainerEmpty} />
          </ScrollView>
        </View>
      </View>
    );
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    bundles: state.products.bundles

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bundles);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  productContainerInner: {
    flex: 9,
  },

  productContainer: {
    flex: 0.3,
    marginVertical: 10,
    height: 250,
    backgroundColor: 'green',
    position: 'relative'
  },

  productDescription: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    position: 'absolute',
    bottom: -20,

  },
  button_style: {
    color: '#fff',
    backgroundColor: '#8BC24A',
    width: 220,
    height: 45,
    margin: 0,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10
  },
  productContainerEmpty: {
    flex: 0.3,
    marginVertical: 10,
    height: 100,
    position: 'relative',
    minWidth: width / 2
  },

});




