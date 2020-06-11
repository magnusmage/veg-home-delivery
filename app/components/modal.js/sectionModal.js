import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Modal from 'react-native-modal';

class SectionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { isModalVisible, modalClose,sectionArray,selectSection } = this.props;
    return (

      <Modal isVisible={isModalVisible}
        animationInTiming={600}
      >
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={() => modalClose(false)} style={{ alignItems: 'flex-end' }}>
            <Image style={{ width: 30, height: 30 }} source={require('../../common/close-button.png')} />
          </TouchableOpacity>
          <ScrollView >
            {sectionArray && sectionArray.map((section) => (
              <View key ={section} style={{ flex: 1, marginBottom: 7 }}>
                <TouchableOpacity onPress={() => selectSection(section)}>
                  <View style={{ flex: 0.4, backgroundColor: '#FFFF', marginBottom: 7 }} >
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
      </Modal>

    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SectionModal);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.5,
    backgroundColor: "#F4F4F4",
    borderRadius: 5,
    height: 'auto',
    // flexDirection:'row'
    padding: 10,
  },
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

});
