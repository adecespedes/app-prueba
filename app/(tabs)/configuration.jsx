import { View, Text, StyleSheet, FlatList, ScrollView, StatusBar, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { List } from "react-native-paper";
import * as SQLite from "expo-sqlite";
import ListItems from "../../components/ListSmsItems";

const items = [
	{
		value: 1,
		label: "Transfermovil",
	},
	{
		value: 2,
		label: "Banco",
	},
	{
		value: 3,
		label: "Etecsa",
	},
];

const subcategorias = [
	{
		label: "Autenticación",
		value: 1,
	},
	{
		label: "Transferencias/Transferencias realizadas",
		value: 2,
	},
	{
		label: "Transferencias/Transferencias recibidas",
		value: 3,
	},
	{
		label: "Consultas/Consultar todas las cuentas",
		value: 8,
	},
	{
		label: "Consultas/Consultar las últimas operaciones",
		value: 9,
	},
	{
		label: "Consultas",
		value: 4,
	},
	{
		label: "Pagos/Recargar cuenta",
		value: 5,
	},
	{
		label: "Pagos/Recargar Nauta Hogar",
		value: 6,
	},
	{
		label: "Pagos/Factura telefónica",
		value: 7,
	},
];

export default function Configuration() {
	const [expanded, setExpanded] = useState(false);
	const [transfExpanded, setTransfExpanded] = useState(false);
	const [bancoExpanded, setBancoExpanded] = useState(false);
	const [etecsaExpanded, setEtecsaExpanded] = useState(false);
	const [expandedSub, setExpandedSub] = useState(false);

	const handlePress = () => {
		setExpanded(!expanded);
	};
	const handlePressTransf = () => {
		setTransfExpanded(!transfExpanded);
	};
	const handlePressBanco = () => {
		setBancoExpanded(!bancoExpanded);
	};
	const handlePressEtecsa = () => {
		setEtecsaExpanded(!etecsaExpanded);
	};
	const handlePressSub = () => {
		setExpandedSub(!expandedSub);
	};

	const renderItem = ({ item }) => {
		return (
			<Text style={{ fontSize: 15, padding: 10 }}>{item.label}</Text>
			// <>
			//   <List.Item
			//     title={item.label}
			//     titleStyle={{fontSize: 13, fontWeight: 400}}
			//   />
			// </>
		);
	};

	return (
		<SafeAreaView className="flex-1 mx-4 my-9 bg-white">
			<List.Section
				title="Configuración"
				titleStyle={{
					fontSize: 20,
					fontWeight: 700,
				}}
			>
				<List.Accordion
					title="Clasificaciones"
					description="Clasificaciones de los mensajes"
					style={{ borderRadius: 20, backgroundColor: "#E3E3E3", margin: 10 }}
					titleStyle={{ fontWeight: 700 }}
					left={(props) => <List.Icon {...props} icon="layers-outline" />}
					expanded={expanded}
					onPress={handlePress}
				>
					<List.Accordion
						title="Transfermovil"
						titleStyle={{ fontSize: 15 }}
						expanded={transfExpanded}
						onPress={handlePressTransf}
					>
						<List.Item title="Autenticación" titleStyle={{ fontSize: 13, fontWeight: 400, paddingLeft: 60 }} />
					</List.Accordion>
					<List.Accordion
						title="Banco"
						titleStyle={{ fontSize: 15 }}
						expanded={bancoExpanded}
						onPress={handlePressBanco}
					>
						<ScrollView>
							<List.Item
								title="Transferencias/Transferencias realizadas"
								titleNumberOfLines={2}
								titleStyle={{
									fontSize: 13,
									fontWeight: 400,
									paddingLeft: 60,
									marginBottom: -20,
								}}
							/>
							<List.Item
								title="Transferencias/Transferencias recibidas"
								titleNumberOfLines={2}
								titleStyle={{
									fontSize: 13,
									fontWeight: 400,
									paddingLeft: 60,
									marginBottom: -20,
								}}
							/>
							<List.Item
								title="Consultas/Consultar todas las cuentas"
								titleNumberOfLines={2}
								titleStyle={{
									fontSize: 13,
									fontWeight: 400,
									paddingLeft: 60,
									marginBottom: -20,
								}}
							/>
							<List.Item
								title="Consultas/Consultar las últimas operaciones"
								titleNumberOfLines={2}
								titleStyle={{
									fontSize: 13,
									fontWeight: 400,
									paddingLeft: 60,
									marginBottom: -20,
								}}
							/>
							<List.Item
								title="Consultas/Consultar saldo"
								titleNumberOfLines={2}
								titleStyle={{ fontSize: 13, fontWeight: 400, paddingLeft: 60 }}
							/>
						</ScrollView>
					</List.Accordion>
					<List.Accordion
						title="Etecsa"
						titleStyle={{ fontSize: 15 }}
						expanded={etecsaExpanded}
						onPress={handlePressEtecsa}
					>
						<List.Item
							title="Consultas"
							titleStyle={{
								fontSize: 13,
								fontWeight: 400,
								paddingLeft: 60,
								marginBottom: -20,
							}}
						/>
						<List.Item
							title="Pagos/Recargar cuenta"
							titleNumberOfLines={2}
							titleStyle={{
								fontSize: 13,
								fontWeight: 400,
								paddingLeft: 60,
								marginBottom: -20,
							}}
						/>
						<List.Item
							title="Pagos/Recargar Nauta Hogar"
							titleNumberOfLines={2}
							titleStyle={{
								fontSize: 13,
								fontWeight: 400,
								paddingLeft: 60,
								marginBottom: -20,
							}}
						/>
						<List.Item
							title="Pagos/Factura telefónica"
							titleNumberOfLines={2}
							titleStyle={{ fontSize: 13, fontWeight: 400, paddingLeft: 60 }}
						/>
					</List.Accordion>
				</List.Accordion>
				{/* <List.Accordion
          title="Subcategorías"
          description="Subcategorías de los mensajes"
          style={{
            borderRadius: 20,
            backgroundColor: '#E3E3E3',
            margin: 10,
          }}
          titleStyle={{fontWeight: 700}}
          left={props => <List.Icon {...props} icon="layers-outline" />}
          expanded={expandedSub}
          onPress={handlePressSub}>
          <ScrollView>
            {/* <Text style={{fontSize: 42}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text> */}
				{/* <FlatList
              data={subcategorias}
              renderItem={renderItem}
              initialNumToRender={7}
              scrollEnabled={false}
              keyExtractor={item => item.value}
              contentContainerStyle={styles.contentContainer}
            /> */}
				{/* <Text style={{fontSize: 15, fontWeight: 400}}>Autenticación</Text>
            <Text style={{fontSize: 15, fontWeight: 400, paddingTop: 20}}>
              Transferencias/Transferencias realizadas
            </Text>
            <Text style={{fontSize: 15, fontWeight: 400, paddingTop: 20}}>
              Transferencias/Transferencias recibidas
            </Text>
            <Text style={{fontSize: 15, fontWeight: 400, paddingTop: 20}}>
              Consultas/Consultar todas las cuentas
            </Text>
            <Text style={{fontSize: 15, fontWeight: 400, paddingTop: 20}}>
              Consultas/Consultar las últimas operaciones
            </Text>
            <Text style={{fontSize: 15, fontWeight: 400, paddingTop: 20}}>
              Consultas/Consultar saldo
            </Text>
            <Text style={{fontSize: 15, fontWeight: 400, paddingTop: 20}}>
              Consultas
            </Text>
            <Text style={{fontSize: 15, fontWeight: 400, paddingTop: 20}}>
              Pagos/Recargar cuenta
            </Text>
            <Text style={{fontSize: 15, fontWeight: 400, paddingTop: 20}}>
              Pagos/Recargar Nauta Hogar
            </Text>
            <Text style={{fontSize: 15, fontWeight: 400, paddingTop: 20}}>
              Pagos/Factura telefónica
            </Text> */}

				{/* <List.Item
              title="Transferencias/Transferencias realizadas"
              titleStyle={{fontSize: 13, fontWeight: 400}}
            />
            <List.Item
              title="Transferencias/Transferencias recibidas"
              titleStyle={{fontSize: 13, fontWeight: 400}}
            />
            <List.Item
              title="Consultas/Consultar todas las cuentas"
              titleStyle={{fontSize: 13, fontWeight: 400}}
            />
            <List.Item
              title="Consultas/Consultar las últimas operaciones"
              titleStyle={{fontSize: 13, fontWeight: 400}}
            />
            <List.Item
              title="Consultas/Consultar saldo"
              titleStyle={{fontSize: 13, fontWeight: 400}}
            />
            <List.Item
              title="Consultas"
              titleStyle={{fontSize: 13, fontWeight: 400}}
            />
            <List.Item
              title="Pagos/Recargar cuenta"
              titleStyle={{fontSize: 13, fontWeight: 400}}
            />
            <List.Item
              title="Pagos/Recargar Nauta Hogar"
              titleStyle={{fontSize: 13, fontWeight: 400}}
            />
            <List.Item
              title="Pagos/Factura telefónica"
              titleStyle={{fontSize: 13, fontWeight: 400}}
            /> */}
				{/* </ScrollView> */}
				{/* </List.Accordion> */}
			</List.Section>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	separator: {
		height: 1,
		backgroundColor: "#00000040",
		// marginVertical: 10,
	},
	contentContainer: {
		backgroundColor: "white",
	},
});
