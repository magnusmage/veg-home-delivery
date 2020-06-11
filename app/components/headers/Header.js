import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { StyleSheet, Image, Text, View, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
import CartModal from  '../headers/Header';


 class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebarMenu: false,
      showSearchSuggestionScreen: false,
      count:0
    }
  }


  componentWillReceiveProps=(nextProps)=>{
    
  if(nextProps.stock){
    const stocks=nextProps.stock;
    const count=stocks.length
    this.setState({
      count:count
    })
  }
    
  }

  openCartModal = () => {
    const { openCart } = this.props;
    openCart(true)
  }


  render() {
    return (
      <View style={styles.header}>
        <View style={styles.leftMenu}>
          <TouchableOpacity onPress={() => this.props.openSidebar()}>
            <FontAwesome name="bars" style={[styles.menu, { fontSize: 24, color: '#FFF' }]} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
          <Text style={{ marginRight: 10, fontSize: 20, fontWeight: '600', color: '#FFFF' }}>Veggie Box</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.openCartModal} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
          <IconBadge
            MainElement={
              <Image style={{ height: 40, width: 40, margin: 6 }} source={require('../../common/shopping-cart.png')} />
            }
            BadgeElement={
              <Text style={{ color: '#FFF' }}>{this.state.count}</Text>
            }
            IconBadgeStyle={
              {
                width: 20,
                height: 20,
                backgroundColor: '#729F3D'
              }
            }
          Hidden={this.state.count==0}
          />
        </TouchableOpacity>
      </View >
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    stock:state.orders.stock,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#8BC24A',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ebebeb'
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
});


