import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import TabsButton from "../../components/TabsButtons";
import Transfermovil from "../../components/Categories/Transfermovil/Transfermovil";
import Banco from "../../components/Categories/Banco/Banco";
import Etecsa from "../../components/Categories/Etecsa/Etecsa";

const Categories = () => {
	const [selectedTab, setSelectedTab] = useState(0);
	const buttons = [{ title: "Transfermovil" }, { title: "Banco" }, { title: "Etecsa" }];

	return (
		<SafeAreaView className="flex-1 bg-white my-8">
			<TabsButton buttons={buttons} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
			<View style={{ flex: 1, alignItems: "center" }}>
				{selectedTab === 0 ? <Transfermovil /> : selectedTab === 1 ? <Banco /> : <Etecsa />}
			</View>
			{/* {isLoading ? <AppLoading /> : null} */}
		</SafeAreaView>
	);
};

export default Categories;

const styles = StyleSheet.create({});
