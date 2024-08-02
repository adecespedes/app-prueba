import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import TabsButtons from "../../../TabsButtons";
import Limites from "./Limites";
import CambioLimites from "./CambioLimites";

const Configuraciones = ({ transRealizadas, transRecibidas }) => {
	const [selectedTab, setSelectedTab] = useState(0);
	const buttons = [{ title: "Consulta de limites" }, { title: "Cambio de limites" }];

	return (
		<SafeAreaView className="flex-1 bg-white">
			<TabsButtons buttons={buttons} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
			<View style={{ flex: 1, marginTop: 5, alignItems: "center" }}>
				{selectedTab === 0 ? (
					<Limites transRealizadas={transRealizadas} />
				) : (
					<CambioLimites transRecibidas={transRecibidas} />
				)}
			</View>
		</SafeAreaView>
	);
};

export default Configuraciones;

const styles = StyleSheet.create({});
