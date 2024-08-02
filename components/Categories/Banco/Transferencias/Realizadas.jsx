import React, { useEffect, useState, useRef } from "react";
import {
	Alert,
	Text,
	View,
	StyleSheet,
	TextInput,
	Platform,
	FlatList,
	PermissionsAndroid,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import CategoriesItem from "../../../CategoriesItem";
import { Button, Card, Modal, Portal, Dialog, Chip } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
// import RNFS from 'react-native-fs';
import AppLoading from "../../../Loading";
import { FontAwesome6 } from "@expo/vector-icons";

import * as SQLite from "expo-sqlite";

const Realizadas = () => {
	const [modal, setModal] = useState(false);
	const [visibleDialog, setVisibleDialog] = useState(false);
	const [QRcode, setQrcode] = useState("default");
	// const [db, setDb] = useState(SQLite.openDatabase('transfermovil.db'));
	const [data, setData] = useState([]);
	const qrCodeRef = useRef(null);
	const viewShotRef = useRef(null);
	const [isLoading, setIsLoading] = useState(true);
	const [scrollOffset, setScrollOffset] = useState();
	const scrollView = useRef();

	const visibleModal = (visible, sms) => {
		// const json = JSON.parse(sms.json);

		setQrcode(sms.json);

		// const banco = json['banco'];
		// const beneficiario = json['beneficiario'];
		// const ordenante = json['ordenante'];
		// const monto = json['monto'];
		// const transaction = json['transaccion'];
		// const saldo = json['saldo'];

		// setQrcode(`Banco - ${banco}
		//   Beneficiario - ${beneficiario}
		//   Ordenante - ${ordenante}
		//   Monto - ${monto}
		//   Saldo restante - ${saldo}
		//   Nro. Transaccion - ${transaction}`);

		setModal(visible);
	};

	const renderItem = ({ item }) => {
		return (
			<>
				<Chip
					style={{
						justifyContent: "center",
						alignSelf: "center",
						alignItems: "center",
						marginBottom: 10,
					}}
					textStyle={{ fontSize: 12 }}
				>
					{item}
				</Chip>
				{groupedData[item].map((element) => (
					<View style={{ marginBottom: 20 }} key={element._id}>
						<CategoriesItem item={element} visibleModal={visibleModal} />
					</View>
				))}
			</>
		);
	};

	const hideDialog = () => setVisibleDialog(false);
	const hideModal = () => {
		setModal(false);
	};

	// const handleDownloadQRCode = async () => {
	//   try {
	//     if (Platform.OS === 'android') {
	//       const granted = await PermissionsAndroid.request(
	//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
	//       );
	//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
	//         Alert.alert('Permission denied');
	//       }
	//     }
	//     await viewShotRef.current.capture().then(async uri => {
	//       const path = RNFS.PicturesDirectoryPath + '/' + 'qr' + '.png';
	//       await RNFS.moveFile(uri, path);
	//       await RNFS.scanFile(path);
	//       setVisibleDialog(true);
	//     });
	//   } catch (error) {
	//     console.log(error);
	//   }
	// };

	useEffect(() => {
		setIsLoading(true);
		async function fetchData() {
			const db = await SQLite.openDatabaseAsync("transfermovil.db");
			const allRows = await db.getAllAsync(
				"SELECT sms.*, subcategoria.* FROM sms LEFT JOIN subcategoria ON sms.id_subcategoria = subcategoria.id WHERE sms.id_subcategoria = 2 GROUP BY date ORDER BY date DESC;",
			);
			setData(allRows);
			setIsLoading(false);
		}
		fetchData();
	}, []);

	const subir = () => {
		scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
	};

	const onScroll = (scroll) => {
		setScrollOffset(scroll.nativeEvent.contentOffset.y);
	};

	const groupedData = data.reduce((acc, item) => {
		if (!acc[item.date_string]) {
			acc[item.date_string] = [];
		}
		acc[item.date_string].push(item);
		return acc;
	}, {});

	return (
		<>
			{scrollOffset > 2500 ? (
				<View style={styles.containerFab}>
					<TouchableOpacity
						onPress={subir}
						style={[
							styles.itemContainer,
							{
								zIndex: 20,
								backgroundColor: "#A5ACFF",
							},
						]}
					>
						<View>
							<FontAwesome6 name="arrow-up" size={24} color="white" />
						</View>
					</TouchableOpacity>
				</View>
			) : null}
			<ScrollView ref={scrollView} contentContainerStyle={styles.scrollView} onScroll={onScroll}>
				<FlatList
					data={Object.keys(groupedData)}
					renderItem={renderItem}
					initialNumToRender={7}
					scrollEnabled={false}
					keyExtractor={(item) => item}
					contentContainerStyle={styles.contentContainer}
					ListEmptyComponent={
						<Text className="flex-1 justify-center items-center font-bold text-center text-xl">
							No hay mensajes disponibles para esta categoría....
						</Text>
					}
				/>
			</ScrollView>
			<Portal>
				<Modal visible={modal} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<ViewShot ref={viewShotRef} options={{ format: "png", quality: 1.0 }}>
							<QRCode value={QRcode ? QRcode : "default"} size={200} color="black" backgroundColor="white" />
						</ViewShot>
						{/* <Button
              style={{marginTop: 20}}
              mode="elevated"
              icon="download"
              onPress={handleDownloadQRCode}
            >
              Descargar
            </Button> */}
					</View>
				</Modal>
				<Dialog visible={visibleDialog} onDismiss={hideDialog}>
					{/* <Dialog.Title>Alert</Dialog.Title> */}
					<Dialog.Content>
						<Text variant="bodyMedium">Descarga completada</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideDialog}>Aceptar</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			{isLoading ? <AppLoading /> : null}
		</>
	);
};

const styles = StyleSheet.create({
	containerFab: {
		position: "absolute",
		bottom: 0,
		right: 0,
	},
	itemContainer: {
		width: 45,
		height: 45,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 40,
		right: 25,
		borderRadius: 100,
		zIndex: 10,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	containerStyle: {
		backgroundColor: "white",
		padding: 20,
		margin: 10,
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		margin: 8,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	contentContainer: {
		padding: 16,
		gap: 16,
		backgroundColor: "#fff",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "stretch",
		justifyContent: "space-between",
		margin: 8,
	},
});

export default Realizadas;
