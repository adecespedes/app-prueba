import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import React from "react";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

const Page = () => {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: Colors.primary,
			}}
		>
			<Tabs.Screen
				name="list-view"
				options={{
					tabBarLabel: "Todos",
					tabBarIcon: ({ color }) => <MaterialIcons name="list-alt" size={24} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="categories"
				options={{
					tabBarLabel: "Categorías",
					tabBarIcon: ({ color }) => <AntDesign name="appstore-o" size={24} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="configuration"
				options={{
					tabBarLabel: "Configuración",
					tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
				}}
			/>
		</Tabs>
	);
};

export default Page;
