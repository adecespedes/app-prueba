import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import TabsButtons from "../../TabsButtons";
import Pagos from "./Pagos/Pagos";
import Consultas from "./Consultas/Consultas";

const Etecsa = () => {
	const [selectedTab, setSelectedTab] = useState(0);
	const buttons = [{ title: "Consultas" }, { title: "Pagos" }];

	return (
		<SafeAreaView className="flex-1 bg-white">
			<TabsButtons buttons={buttons} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
			<View style={{ flex: 1, marginTop: 5, alignItems: "center" }}>
				{selectedTab === 0 ? <Consultas /> : <Pagos />}
			</View>
		</SafeAreaView>
	);
};

export default Etecsa;

const styles = StyleSheet.create({});
