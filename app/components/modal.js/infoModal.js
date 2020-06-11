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
    AsyncStorage,
    Platform
} from "react-native";
import Modal from 'react-native-modal';
import DropdownAlert from 'react-native-dropdownalert';

class InfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const { isModalVisible, modalClose } = this.props;
        return (

            <Modal isVisible={isModalVisible}
                animationInTiming={600}
            >
                <View style={styles.mainContainer}>
                    <TouchableOpacity onPress={modalClose} style={{ alignItems: 'flex-end' }}>
                        <Image style={{ width: 30, height: 30 }} source={require('../../common/close-button.png')} />
                    </TouchableOpacity>
                    <View>
                        <Text>
                            * Pre order booking(for next day) from 6pm to 9pm
                        </Text>
                        <Text>
                            * Urgent orders and delievery from 9am to 6pm. We have the follwoing
                            delivery slots: 10 am to 1 pm ,2pm to 5pm.
                        </Text>
                        <Text>
                            * Break 1pm to 2pm.
                        </Text>
                        <Text>
                            * Break 1pm to 2pm.
                        </Text>
                        <Text>
                            *Urgent orders will be delivered from 60 minutes prior
                            from order placement
                        </Text>
                        <Text>
                            * Pre order delivery charges: Rs 39
                        </Text>
                        <Text>
                            * Urgent order delivery charges: Rs 99
                        </Text>
                    </View>
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


export default connect(mapStateToProps, mapDispatchToProps)(InfoModal);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 0.5,
        backgroundColor: "#F4F4F4",
        borderRadius: 5,
        height: 'auto',
        // flexDirection:'row'
        padding: 10,
    },

});
