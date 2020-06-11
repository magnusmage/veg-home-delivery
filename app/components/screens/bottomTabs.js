import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './home'
import VeggiesScreen from './products/veggies';
import FruitsScreen from './products/fruits';
import BundleScreen from './products/bundles';
import FrestCutScreen from './products/freshCut';
import ExoticScreen from './products/exotic';
import CartScreen from './cartScreen';


const HomeStack = createStackNavigator({
    HomeScreen: { screen: HomeScreen },
}, {
        headerMode: 'none',
    });


const CartSTack = createStackNavigator({
    CartScreen: { screen: CartScreen },
}, {
        headerMode: 'none',
    });

const VeggieStack = createStackNavigator({
    VeggiesScreen: { screen: VeggiesScreen },
}, {
        headerMode: 'none',
    });

const FruitsStack = createStackNavigator({
    FruitsScreen: { screen: FruitsScreen },
}, {
        headerMode: 'none',
    });

const FrestCutStack = createStackNavigator({
    FrestCutScreen: { screen: FrestCutScreen },
}, {
        headerMode: 'none',
    });

const ExoticStack = createStackNavigator({
    ExoticScreen: { screen: ExoticScreen },
}, {
        headerMode: 'none',
    });

const BundleStack = createStackNavigator({
    BundleScreen: { screen: BundleScreen },
}, {
        headerMode: 'none',
    });

const bottomTabs = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({ focused, tintColor }) => (
                    <Image style={{ height: 22, width: 22, opacity: focused ? 1 : 0.7 }} source={require('../../common/Home.png')} />
                )
            },
        },
        Veggies: {
            screen: VeggieStack,
            navigationOptions: {
                tabBarLabel: "Veggies",
                tabBarIcon: ({ focused }) => (
                    <Image style={{ height: 22, width: 22, opacity: focused ? 1 : 0.7 }} source={require('../../common/Vegetables.png')} />
                )
            },
        },
        Fruits: {
            screen: FruitsStack,
            navigationOptions: {
                tabBarLabel: "Fruits",
                tabBarIcon: ({ focused, tintColor }) => (
                    <Image style={{ height: 22, width: 22, opacity: focused ? 1 : 0.7 }} source={require('../../common/Fruits.png')} />
                )
            },
        },
        'Exotic Range': {
            screen: ExoticStack,
            navigationOptions: {
                tabBarLabel: "Exotic Range",
                tabBarIcon: ({ focused, tintColor }) => (
                    <Image style={{ height: 22, width: 22, opacity: focused ? 1 : 0.7 }} source={require('../../common/Sauce.png')} />
                )
            },
        },
        'Fresh cut': {
            screen: FrestCutStack,
            navigationOptions: {
                tabBarLabel: "Fresh cut",
                tabBarIcon: ({ focused, tintColor }) => (
                    <Image style={{ height: 22, width: 22, opacity: focused ? 1 : 0.7 }} source={require('../../common/Fresh-Cut.png')} />
                )
            },
        },
        Bundles: {
            screen: BundleStack,
            navigationOptions: {
                tabBarLabel: "Bundles",
                tabBarIcon: ({ focused, tintColor }) => (
                    <Image style={{ height: 22, width: 22, opacity: focused ? 1 : 0.7 }} source={require('../../common/Sauce.png')} />
                )
            },
        },
    },
    {

        tabBarPosition: 'top',
        tabBarOptions: {
            showIcon: true,
            showLabel: true,
            activeTintColor: '#FFF',
            inactiveTintColor: '#e5e5e5',
            style: {
                backgroundColor: '#8BC24A',
                borderTopWidth: 1,
                borderTopColor: '#ccc',
                paddingBottom: 5,
                paddingTop: 3,
                height: 50
            },
            indicatorStyle: {
                backgroundColor: '#CDDC39',
            },
        },
        initialRouteName: 'Home',
    }
);

export default bottomTabs;