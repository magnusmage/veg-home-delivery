import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
// import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
import { DrawerActions,DrawerItems } from 'react-navigation';
import styles from './styles';

class DrawerScreen extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View>
        <DrawerItems {...this.props} />
      </View>
    );
  }
}

// DrawerScreen.propTypes = {
//   navigation: PropTypes.object
// };

export default DrawerScreen;