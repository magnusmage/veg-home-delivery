import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast from 'react-native-easy-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,Image
} from 'react-native';
import { ActionCreators } from '../../actions';
import ScreenHeader from '../headers/screenHeader';
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

class NotificationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    orderModalVisible = (value) => {
        this.setState({
            orderIsModalVisible: value
        })
    }

    navigate = () => {
        this.props.navigation.navigate('bottomTabs')
    }

    changeNotificationStatus = (id, email) => {
        const { changeNotificationStatus } = this.props;
        changeNotificationStatus(id, email).then(() => {
            this.refs.toast.show('your status has been updated', DURATION.LENGTH_LONG);
        })
    }

    render() {
        const { notifications } = this.props;
        return (
            <View style={styles.mainContainer}>
                <View>
                    <ScreenHeader name="Notifications" navigate={this.navigate} />
                </View>
                <View>
                    <Image style={{ height: height, width: width, position: 'absolute', top: 0, left: 0 }} source={require('../../common/bg.png')} />
                </View>
                <View style={{ flex: 1 }}>
                    <Spinner
                        visible={this.props.notificationLoading}
                        textContent={'Loading...'}
                        textStyle={{ color: 'green' }}
                        animation='fade'
                    />
                </View>
                <ScrollView >
                    <View style={styles.scrollerWrapper}>
                        {notifications && notifications.map((notification) => (
                            <TouchableOpacity onPress={() => { this.changeNotificationStatus(notification.id, notification.CustomerEmail) }} key={notification.id}>
                                <View style={styles.cardWrapper}>
                                    <View key={notification.id} style={{ width: '100%' }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={[styles.message, { fontWeight: notification.status == 0 ? 'bold' : '400' }]} >{notification.message} </Text>
                                        </View>
                                        <View>
                                            <View style={styles.timeContainer}>
                                                <Text style={{ fontWeight: notification.status == 0 ? 'bold' : '400' }}>Time</Text>
                                                <Text style={{ fontWeight: notification.status == 0 ? 'bold' : '400' }}>{notification.timeDate.split(" ")[1]}</Text>
                                            </View>
                                            <View style={styles.timeContainer}>
                                                <Text style={{ fontWeight: notification.status == 0 ? 'bold' : '400' }}> Date</Text>
                                                <Text style={{ fontWeight: notification.status == 0 ? 'bold' : '400' }}>{notification.timeDate.split(" ")[0]}</Text>
                                            </View>
                                            <View style={{ marginVertical: 15, alignItems: 'center' }}>
                                                <View style={styles.statusBar}>
                                                    <Text style={[{ fontWeight: notification.status == 0 ? 'bold' : '400' }, styles.statusText]}>{notification.status == 0 ? "Unread notification" : "Read notification"}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <Toast ref="toast" position='bottom' />
            </View>
        );
    }
}


styles = StyleSheet.create({
    statusBar: { height: 40, borderWidth: 0.5, borderColor: '#CDDC39', backgroundColor: '#CDDC39', alignItems: 'center', justifyContent: 'center', width: '95%', alignItems: 'center' },
    mainContainer: { flex: 1, backgroundColor: '#EEEEEE', width: '100%', height: '100%' },
    scrollerWrapper: { flex: 1, marginBottom: 7 },
    cardWrapper: { flex: 0.4, backgroundColor: '#FFFF', marginBottom: 7 },
    message: { color: 'gray', fontSize: 20, textAlign: 'center', },
    timeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginLeft: 10, marginRight: 10 },
    statusText: { color: '#FFF', fontWeight: 'bold' }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        notifications: state.orders.notifications,
        notificationLoading:state.orders.notificationLoading
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
