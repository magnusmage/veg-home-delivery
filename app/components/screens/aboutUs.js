import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { contactData } from '../../config/ContactCredentials'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView, Platform,
    ScrollView
} from "react-native";
import { ActionCreators } from '../../actions';
import Communications from 'react-native-communications';
import ScreenHeader from '../headers/screenHeader';


class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    navigate = () => {
        this.props.navigation.navigate('bottomTabs')
    }
    render() {
        return (
            <View style={styles.container} >
                <View style={{ flex: 1, backgroundColor: '#EEEEEE', width: '100%', height: '100%' }}>
                    <View style={{ flex: 0.07, backgroundColor: '#8BC24A', justifyContent: 'center' }}>
                        <ScreenHeader
                            name="About Us"
                            navigate={this.navigate}
                        />
                    </View>
                    <View style={{ flex: 0.93, marginBottom: 7 }}>
                        <View style={{ flex: 0.31, backgroundColor: '#d9d9db', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 105, height: 125 }} source={require('../../common/iconpng.png')} />
                            <Text style={{ marginTop: 5 }}>Veggie Box</Text>
                            <Text>v 1.5</Text>
                        </View>
                        <View style={{ flex: 0.75, justifyContent: "flex-start", backgroundColor: '#d9d9db', marginTop: 15 }}>
                            <TouchableOpacity onPress={() => Communications.email([contactData.email], null, null, null, null)} style={[styles.shadow, { backgroundColor: '#FFFF', flex: 0.2 }]}>
                                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                    <Image style={{ width: 50, height: 50 }} source={require('../../common/Mail.png')}></Image>
                                    <View style={{ justifyContent: 'center', marginBottom: 15, marginLeft: 10, marginVertical: 15 }}>
                                        <View >
                                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Tab to send email</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <View style={{ flex: 0.8 }}>
                                <ScrollView>
                                    <View style={[styles.shadow, { backgroundColor: '#FFFF', marginTop: 15 }]}>
                                        <View style={{ marginLeft: 10, marginRight: 10 }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#8BC24A' }}>
                                                Company Summary
                                            </Text>
                                            <Text style={{ marginBottom: 5 }}>
                                                Veggie box provides fresh fruits and vegetables to the customers at their convenience. Our main aim is customer satisfaction and retention through our quality service. We provide our products at your door making your life disciplined and hassle free. Our customers living in housing societies who do not have direct access to the informal vegetable and fruit market, thus opting in B and C grade products will have entry to the online store through our application. We are providing relief to our customers from going and standing in long queues for their requirements.
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[styles.shadow, { backgroundColor: '#FFFF', marginTop: 15 }]}>
                                        <View style={{ marginLeft: 10, marginRight: 10 }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#8BC24A' }}>
                                                Our Mission
                                            </Text>
                                            <Text style={{ marginBottom: 5 }}>
                                                Our aim is to channelize the fruits and vegetables from the market to direct customer through home delivery with freshness and good quality thus eliminating the limitations of existing traditional supply chain.
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[styles.shadow, { backgroundColor: '#FFFF', marginTop: 15 }]}>
                                        <View style={{ marginLeft: 10, marginRight: 10 }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#8BC24A' }}>
                                                About Veggie Box
                                            </Text>
                                            <Text style={{ marginBottom: 5 }}>
                                                Idea came into being when young entrepreneurs identified the problems of their age fellows and felt the dependency of house hold women to bring necessities especially veggies & fruits at home. Introducing the use of technology we are making people smart, independent and their life easy and hassle free. Presenting you a platform where we provide fresh vegetables, fruits and our signature homemade sauces (aiming to extend more products) to you at your own convenience. We also aim to minimize the gap between the farmers and consumer by providing you with the best quality products at your door step.
                                                We have got the best farms on board and we ensure the best quality by providing “A plus veggies & fruits” and our signature homemade sauces which you would have never tasted before at a very competitive rate.
                                            </Text>
                                            <Text style={{ marginBottom: 5 }}>
                                                Veggie Box user interface provides you the list of fresh veggies, fruits and our signature homemade sauces where you just need to select product, mentioned quantity and add into your cart and confirm your order. Your billing history would be saved in your account where you can review it anytime you want. We will deliver your order with best quality and customer care.
                                                We are also catering the major problem of society which is buying veggies & fruits from market where the customer always find “B & C Grade” quality mixed together on their shelves as a strategy to charge high and get maximum profit from customer by providing low standard goods . Most of the customers do not know the quality and while relying on the shop keeper they end up buying nonstandard goods which is the main reason of their dissatisfaction.
                                            </Text>
                                            <Text >
                                                Through our services we ensure the quality of our products by segregation of our stock on various steps and deliver the “A plus Grade veggies and fruits” to our customer because our core value is providing standardized and fresh veggies & fruits to our valued customers.
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[styles.shadow, { backgroundColor: '#FFFF', marginTop: 15 }]}>
                                        <View style={{ marginLeft: 10, marginRight: 10 }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#8BC24A' }}>
                                                Delievery Policy
                                            </Text>
                                            <Text style={{ marginBottom: 5 }}>
                                                We at veggie box have the following delivery schedules.
                                            </Text>
                                            <Text style={{ marginBottom: 5 }}>
                                                Pre order booking (for next day) from 6 pm to 9 am.
                                            </Text>
                                            <Text >
                                                Urgent orders and delivery from 9 am to 6 pm
                                            </Text>
                                            <Text >
                                                We have the following delivery slots:
                                            </Text>
                                            <Text >
                                                9 am to 1 pm
                                            </Text>
                                            <Text >
                                                2 pm to 6 pm.
                                            </Text>
                                            <Text >
                                                Break 1pm to 2 pm
                                            </Text>
                                            <Text >
                                                Urgent orders will be delivered in 60 minutes prior form order placement.
                                            </Text>
                                            <Text >
                                                Pre order delivery charges: Rs 0
                                            </Text>
                                            <Text >
                                                Urgent order delivery charges: Rs 50
                                            </Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };
}

function getErrorMessage(state) {
    if (state) {
        return <Text> {state.map((error_message) => <Text style={{ color: "#cac500", width: 200 }}> * {error_message.message}</Text>)}</Text>
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);

