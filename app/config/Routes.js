import { createStackNavigator, createDrawerNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
// import SidebarMenu from './components/common/SidebarMenu';
import SplashScreen from "../components/SplashScreen";
import SignUpScreen from "../components/SignUpScreen"
import LoginScreen from "../components/screens/auth/LoginScreen";
import bottomTabs from "../components/screens/bottomTabs";
import sideMenuBar from "../components/screens/sideMenuBar";
import ProfileScreen from "../components/screens/ProfileScreen";
import OrderScreen from "../components/screens/orderScreen";
import ContactUsScreen from "../components/screens/contactUsScreen";
import AboutUsScreen from '../components/screens/aboutUs';
import NotificationScreen from '../components/screens/notificationScreen';
import CartScreen from '../components/screens/cartScreen';
import SubmitOrderScreen from '../components/screens/submitOrderScreen';
import SectioningScreen from '../components/screens/sectionScreen';


const DashBoard = createStackNavigator({
    CartScreen: CartScreen,
    SignUpScreen: SignUpScreen,
    LoginScreen: LoginScreen,
    SectioningScreen: SectioningScreen,
    ProfileScreen: ProfileScreen,
    OrderScreen: OrderScreen,
    NotificationScreen: NotificationScreen,
    ContactUsScreen: ContactUsScreen,
    AboutUsScreen: AboutUsScreen,
    SubmitOrderScreen: SubmitOrderScreen,
    bottomTabs: { screen: bottomTabs },
}, {
        headerMode: 'none',
        initialRouteName: 'bottomTabs'
    });

// const LoginStack = createStackNavigator({
//   WelcomeScreen: WelcomeScreen
// }, { headerMode: 'none' });


const Drawerstack = createDrawerNavigator({
    DashBoard: DashBoard,
},
    {
        // gesturesEnabled: false,
        // disableGestures:'disable',
        contentComponent: sideMenuBar,
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        SplashScreen: SplashScreen,
        App: Drawerstack,
        // Auth: LoginStack
    },
    {
        initialRouteName: 'SplashScreen',
        // transitionConfig: noTransitionConfig,
    }
));
