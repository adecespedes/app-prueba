import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import TabsButtons from "../../../TabsButtons";
import AllCuentas from "./AllCuentas";
import LastOperation from "./LastOperation";
import Saldo from "./Saldo";

const Consultas = ({ operaciones, cuentas }) => {
	const [selectedTab, setSelectedTab] = useState(0);
	const buttons = [{ title: "Saldo" }, { title: "Todas las cuentas" }, { title: "Ultimas operaciones" }];

	return (
		<SafeAreaView className="flex-1 bg-white">
			<TabsButtons buttons={buttons} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
			<View style={{ flex: 1, marginTop: 5, alignItems: "center" }}>
				{selectedTab === 0 ? <Saldo /> : selectedTab === 1 ? <AllCuentas /> : <LastOperation />}
			</View>
		</SafeAreaView>
	);
};

export default Consultas;

const styles = StyleSheet.create({});

// import React, {useEffect, useState, useRef} from 'react';
// import {
//   View,
//   useWindowDimensions,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   Animated,
//   I18nManager,
//   TouchableOpacity,
// } from 'react-native';
// import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
// import AllCuentas from './AllCuentas';
// import LastOperation from './LastOperation';
// import Styles from '../../../../../../common/Styles';
// // import MyTabBar from '../../../../../../components/MyTabBar';

// const TABS = [
//   {
//     title: 'Todas las cuentas',
//     name: 'Todas las cuentas',
//     key: 'cuentas',
//     icon: 'home',
//     iconActive: 'home-outline',
//   },
//   {
//     title: 'Ultimas operaciones',
//     name: 'Ultimas operaciones',
//     key: 'operaciones',
//     icon: 'home',
//     iconActive: 'home-outline',
//   },
// ];

// function MyTabBar({navigationState, position, jumpTo, tabs}) {
//   const layoutWidth = useRef(0);

//   return (
//     <View
//       style={Styles.tabsContainer}
//       onLayout={e => (layoutWidth.current = e.nativeEvent.layout.width)}>
//       {navigationState.routes.map((route, index) => {
//         const isFocused = navigationState.index === index;
//         const onPress = () => !isFocused && jumpTo(route.key);

//         let inputRange = navigationState.routes.map((_, i) => i);
//         if (route.key === 'autenticacion') inputRange = [0, 1];
//         const translateX = (isText = false) =>
//           Animated.multiply(
//             position.interpolate({
//               inputRange,
//               outputRange: inputRange.map(i => {
//                 const diff = i - index;
//                 const x = layoutWidth.current / tabs.length;

//                 const value = diff > 0 ? x : diff < 0 ? -x : 0;
//                 return !isText ? value : -value;
//               }),
//             }),
//             I18nManager.isRTL ? -1 : 1,
//           );

//         return (
//           <TouchableOpacity
//             key={`${route.name}_${index}`}
//             style={{flex: 1, overflow: 'hidden'}}
//             onPress={onPress}>
//             <View style={Styles.iconTextContainer}>
//               {/* <Ionicons name={tabs[index].icon} size={20} color="grey" /> */}
//               <Text style={{color: 'grey'}}>{route.title}</Text>
//             </View>

//             <Animated.View
//               style={[
//                 Styles.tabBgColor,
//                 {overflow: 'hidden', transform: [{translateX: translateX()}]},
//               ]}>
//               <Animated.View
//                 style={[
//                   Styles.iconTextContainer,
//                   {transform: [{translateX: translateX(true)}]},
//                 ]}>
//                 {/* <Ionicons name={tabs[index].iconActive} size={20} /> */}
//                 <Text style={{color: 'black'}}>{route.title}</Text>
//               </Animated.View>
//             </Animated.View>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const renderCustomTabView = props => <MyTabBar {...props} tabs={TABS} />;

// export default function Consultas({operaciones, cuentas}) {
//   const layout = useWindowDimensions();

//   const [index, setIndex] = useState(0);
//   // const [routes] = useState([
//   //   {key: 'cuentas', title: 'Todas las cuentas'},
//   //   {key: 'operaciones', title: 'Ultimas operaciones'},
//   // ]);

//   const [routes] = useState(
//     TABS.map(tab => ({key: tab.key, title: tab.title})),
//   );

//   const renderScene = ({route}) => {
//     switch (route.key) {
//       case 'cuentas':
//         return <AllCuentas cuentas={cuentas} />;
//       case 'operaciones':
//         return <LastOperation operaciones={operaciones} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(240, 240, 240)'}}>
//       <TabView
//         renderTabBar={renderCustomTabView}
//         navigationState={{index, routes}}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         initialLayout={{width: layout.width}}
//       />
//     </SafeAreaView>
//     // <TabView
//     //   renderTabBar={props => (
//     //     <TabBar
//     //       {...props}
//     //       renderLabel={({route, focused, color}) => (
//     //         <Text style={{color, fontSize: 12}}>{route.title}</Text>
//     //       )}
//     //       tabStyle={{width: 'auto'}}
//     //     />
//     //   )}
//     //   navigationState={{index, routes}}
//     //   renderScene={renderScene}
//     //   onIndexChange={setIndex}
//     //   initialLayout={{width: layout.width}}
//     // />
//   );
// }
