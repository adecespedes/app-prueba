import React, { useEffect, useRef, useState, useCallback } from "react";
import {
	Alert,
	Text,
	View,
	StyleSheet,
	Platform,
	FlatList,
	PermissionsAndroid,
	TouchableOpacity,
	Animated,
	ActivityIndicator,
	ScrollView,
	RefreshControl,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useSms } from "../../hooks/useSms";
import SmsAndroid from "react-native-get-sms-android";
import BackgroundTimer from "react-native-background-timer";
import AppUploading from "../../components/Uploading";
import AppLoading from "../../components/Loading";
import SmsItem from "../../components/SmsItem";
// import notifee, {
//   AndroidImportance,
//   EventType,
//   AndroidStyle,
// } from "@notifee/react-native";
import { Button, Card, Modal, Portal, Dialog, Chip } from "react-native-paper";
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Dropdown } from "react-native-element-dropdown";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import { MaterialCommunityIcons as Material } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

const ListView = ({ navigation }) => {
	// const [db, setDb] = useState(SQLite.openDatabase('transfermovil.db'));
	// const [db, setDb] = useState(openDatabase({name: 'transfermovil.db'}));
	const { sms, isUploading, isLoading, flag, getSms, addSms, addRefreshSms, setCategories } = useSms();
	const [visible, setVisible] = useState(false);
	const [modal, setModal] = useState(false);
	const [listSms, setListSms] = useState([]);
	const [currentPage, setCurrentPage] = useState(5);
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = React.useState(false);

	let bodyMessage = useRef("");
	const sheetRef = useRef(null);
	const [categoriaData, setCategoriaData] = useState([]);
	const [subcategoriaData, setSubCategoriaData] = useState([]);
	const [categoria, setCategoria] = useState(null);
	const [subcategoria, setSubCategoria] = useState(null);
	const [_id, set_Id] = useState();
	const [body, setBody] = useState();
	const [value, setValue] = useState(null);
	const [isFocus, setIsFocus] = useState(false);
	const [visibleDialog, setVisibleDialog] = useState(false);
	const [QRcode, setQrcode] = useState("default");
	const [scrollOffset, setScrollOffset] = useState();
	const viewShotRef = useRef(null);
	const scrollView = useRef();

	const [notification, setNotification] = useState(undefined);
	const notificationListener = useRef();
	const responseListener = useRef();

	const snapPoints = ["55%"];

	const db = SQLite.useSQLiteContext();

	async function displayNotification() {
		if (Platform.OS === "android") {
			await Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Nuevo mensaje! 📬",
				body: bodyMessage.current,
				data: {},
			},
			trigger: { seconds: 2 },
		});

		// await notifee.requestPermission();

		// const channelId = await notifee.createChannel({
		//   id: "test",
		//   name: "message",
		//   vibration: true,
		//   importance: AndroidImportance.HIGH,
		// });

		// await notifee.displayNotification({
		//   id: "notification",
		//   title: "Nuevo mensaje",
		//   body: bodyMessage.current,
		//   android: {
		//     channelId,
		//     importance: AndroidImportance.HIGH,
		//     style: { type: AndroidStyle.BIGTEXT, text: bodyMessage.current },
		//     pressAction: {
		//       id: "notification",
		//       launchActivity: "default",
		//     },
		//     // actions: [
		//     //   {
		//     //     title: 'Ver notificación',
		//     //     pressAction: {id: 'notification', mainComponent: 'list-view'},
		//     //   },
		//     // ],
		//   },
		// });
	}

	// async function cancelNotification() {
	//   await notifee.cancelAllNotifications();
	// }

	const getData = async () => {
		setLoading(true);
		const allRows = await db.getAllAsync(
			"SELECT sms.*, subcategoria.* FROM sms LEFT JOIN subcategoria ON sms.id_subcategoria = subcategoria.id GROUP BY date ORDER BY date DESC LIMIT $limit OFFSET $offset;",
			{ $limit: currentPage, $offset: 0 },
		);
		setListSms(allRows);
		setLoading(false);
	};

	const visibleBottom = (visible, sms) => {
		sheetRef.current?.present();
		set_Id(sms._id);
		setVisible(visible);
	};

	const visibleModal = (visible, sms) => {
		setBody(sms.body);
		setQrcode(sms.json);
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
						<SmsItem sms={element} visibleBottom={visibleBottom} visibleModal={visibleModal} />
					</View>
				))}
			</>
		);
	};

	const renderLoader = () => {
		return loading ? (
			<View>
				<ActivityIndicator size="large" color="#637aff" />
			</View>
		) : null;
	};

	const loadMoreItem = () => {
		setCurrentPage(currentPage + 5);
	};

	const renderLabel = () => {
		if (value || isFocus) {
			return <Text style={[styles.label, isFocus && { color: "blue" }]}>Categoría</Text>;
		}
		return null;
	};

	const renderLabelSub = () => {
		if (value || isFocus) {
			return <Text style={[styles.label, isFocus && { color: "blue" }]}>Subcategoría</Text>;
		}
		return null;
	};

	const hideModal = () => {
		setModal(false);
	};

	const handleCategoria = async () => {
		const statement = await db.prepareAsync("UPDATE sms SET id_subcategoria = $id_categoria WHERE _id = $_id");
		try {
			let result = await statement.executeAsync({
				$id_categoria: subcategoria,
				$_id: _id,
			});
		} finally {
			await statement.finalizeAsync();
			getData();
			setVisible(false);
			sheetRef.current?.dismiss();
		}
	};

	// const handleDownloadQRCode = async () => {
	//   try {
	//     if (Platform.OS === "android") {
	//       const granted = await PermissionsAndroid.request(
	//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
	//       );
	//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
	//         Alert.alert("Permission denied");
	//       }
	//     }
	//     await viewShotRef.current.capture().then(async (uri) => {
	//       const path = RNFS.PicturesDirectoryPath + "/" + "qr" + ".png";
	//       await RNFS.moveFile(uri, path);
	//       await RNFS.scanFile(path);
	//       setVisibleDialog(true);
	//     });
	//   } catch (error) {
	//     console.log(error);
	//   }
	// };

	const hideDialog = () => {
		setVisibleDialog(false);
	};

	const subir = () => {
		scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
	};

	const onScroll = (scroll) => {
		setScrollOffset(scroll.nativeEvent.contentOffset.y);
	};

	const groupedData = listSms.reduce((acc, item) => {
		if (!acc[item.date_string]) {
			acc[item.date_string] = [];
		}
		acc[item.date_string].push(item);
		return acc;
	}, {});

	const sendData = () => {
		const filter = {
			box: "inbox",
			// read: 1,
			indexFrom: 0,
			// maxCount: 10,
			// address: "PAGOxMOVIL",
			address: "+5353396262",
		};

		console.log(SmsAndroid);

		SmsAndroid.list(
			JSON.stringify(filter),
			(fail) => {
				console.log("fail", fail);
			},
			(count, smsList) => {
				console.log("ssss");
				const list = JSON.parse(smsList);

				addSms(list);

				setTimeout(() => {
					getData();
				}, 5000);
			},
		);
	};

	const reviewData = async () => {
		const filter = {
			box: "inbox",
			// read: 1,
			indexFrom: 0,
			// maxCount: 10,
			address: "PAGOxMOVIL",
			// address: '+5353396262',
		};

		SmsAndroid.list(
			JSON.stringify(filter),
			(fail) => {
				console.log("fail", fail);
			},
			async (count, smsList) => {
				// console.log('smsList', smsList);
				const list = JSON.parse(smsList);
				let _ids = [];

				const allRows = await db.getAllAsync("SELECT _id FROM sms");

				allRows.forEach((row, index) => {
					_ids.push(row._id);
				});

				let flag = false;

				for (let i = 0; i < list.length; i++) {
					if (!_ids.includes(list[i]._id)) {
						flag = true;
						addRefreshSms(list[i]);
					}
				}

				if (flag) {
					setTimeout(() => {
						getData();
					}, 2000);
				}
			},
		);
	};

	const updateSms = () => {
		const filter = {
			box: "inbox",
			// read: 1,
			indexFrom: 0,
			// maxCount: 10,
			address: "PAGOxMOVIL",
			// address: '+5353396262',
		};

		SmsAndroid.list(
			JSON.stringify(filter),
			(fail) => {
				console.log("fail", fail);
			},
			async (count, smsList) => {
				obtenerCantidadTuplas()
					.then((cantidad) => {
						if (cantidad !== count) {
							const list = JSON.parse(smsList);
							bodyMessage.current = list[0].body;
							addRefreshSms(list[0]);
							displayNotification();

							setTimeout(() => {
								getData();
							}, 1000);
						}
					})
					.catch((error) => {
						console.log("Error al obtener la cantidad de tuplas:", error);
					});
			},
		);
	};

	const obtenerCantidadTuplas = () => {
		return new Promise(async (resolve, reject) => {
			const result = await db.getFirstAsync("SELECT COUNT(*) AS cantidad FROM sms");
			const cantidad = result["cantidad"];
			resolve(cantidad);
		});
	};

	const initDB = () => {
		obtenerCantidadTuplas()
			.then((cantidad) => {
				if (cantidad > 0) {
					reviewData();
				} else {
					sendData();
				}
			})
			.catch((error) => {
				console.log("Error al obtener la cantidad de tuplas:", error);
			});
	};

	useEffect(() => {
		getData();
	}, [currentPage]);

	useEffect(() => {
		if (categoria !== null) {
			async function setCategories() {
				let subArray = [];
				const result = await db.getAllAsync("SELECT * FROM subcategoria WHERE id_categoria = $id_categoria", {
					$id_categoria: categoria,
				});

				result.forEach((item, index) => {
					subArray.push({
						label: item.nombre,
						value: item.id,
					});
				});
				setSubCategoriaData(subArray);
			}

			setCategories();
		}
	}, [categoria]);

	// useEffect(() => {
	//   return notifee.onForegroundEvent(async ({ type, detail }) => {
	//     if (
	//       type === EventType.ACTION_PRESS &&
	//       detail.pressAction?.id === "notification"
	//     ) {
	//       navigation.jumpTo("Todos");
	//       cancelNotification();
	//     }
	//     if (
	//       type === EventType.PRESS &&
	//       detail.pressAction?.id === "notification"
	//     ) {
	//       navigation.jumpTo("Todos");
	//       cancelNotification();
	//     }
	//   });
	// }, []);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		const allRows = await db.getAllAsync(
			"SELECT sms.*, subcategoria.* FROM sms LEFT JOIN subcategoria ON sms.id_subcategoria = subcategoria.id GROUP BY date ORDER BY date DESC LIMIT $limit OFFSET $offset;",
			{ $limit: currentPage, $offset: 0 },
		);
		setListSms(allRows);
		setRefreshing(false);
	}, []);

	useEffect(() => {
		initDB();
		const categorias = [
			{ label: "Transfermovil", value: "1" },
			{ label: "Banco", value: "2" },
			{ label: "Etecsa", value: "3" },
		];

		setCategoriaData(categorias);

		// const intervalId = BackgroundTimer.setInterval(() => {
		//   updateSms();
		// }, 3000);

		// return notifee.onBackgroundEvent(async ({ type, detail }) => {
		//   if (
		//     type === EventType.ACTION_PRESS &&
		//     detail.pressAction?.id === "notification"
		//   ) {
		//     navigation.jumpTo("Todos");
		//     cancelNotification();
		//   }
		//   if (
		//     type === EventType.PRESS &&
		//     detail.pressAction?.id === "notification"
		//   ) {
		//     navigation.jumpTo("Todos");
		//     cancelNotification();
		//   }
		// });
	}, []);

	useEffect(() => {
		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			setNotification(notification);
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log(response);
		});

		return () => {
			notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
			responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	return (
		<GestureHandlerRootView className="flex-1 mx-5 my-12 bg-white">
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
							<Material name={"arrow-up"} color={"#fff"} size={24} />
						</View>
					</TouchableOpacity>
				</View>
			) : null}

			<ScrollView
				ref={scrollView}
				contentContainerStyle={styles.scrollView}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				onScroll={onScroll}
			>
				<FlashList
					data={Object.keys(groupedData)}
					renderItem={renderItem}
					estimatedItemSize={100}
					keyExtractor={(item) => item}
					contentContainerStyle={styles.contentContainer}
					ListEmptyComponent={
						<Text className="flex-1 justify-center items-center font-bold text-center text-lg">
							No existen mensajes disponibles...
						</Text>
					}
					ListFooterComponent={renderLoader}
					onEndReached={loadMoreItem}
					onEndReachedThreshold={0}
					// style={{opacity: visible ? 0.2 : 1}}
				/>
			</ScrollView>

			<BottomSheetModalProvider>
				<BottomSheetModal
					ref={sheetRef}
					snapPoints={snapPoints}
					backgroundStyle={{
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 10,
						},
						shadowOpacity: 0.53,
						shadowRadius: 13.97,
						elevation: 21,
					}}
					enablePanDownToClose={true}
					onDismiss={() => setVisible(false)}
				>
					<View style={{ marginHorizontal: 15 }}>
						<Text
							style={{
								fontSize: 15,
								fontWeight: "600",
								letterSpacing: 0.5,
								color: "#000",
							}}
						>
							Cambiar categoría
						</Text>
					</View>

					<View style={styles.containerDropdown}>
						{renderLabel()}
						<Dropdown
							style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
							placeholderStyle={styles.placeholderStyle}
							selectedTextStyle={styles.selectedTextStyle}
							inputSearchStyle={styles.inputSearchStyle}
							iconStyle={styles.iconStyle}
							data={categoriaData}
							search
							mode="modal"
							maxHeight={300}
							labelField="label"
							valueField="value"
							placeholder={!isFocus ? "Seleccionar categoría" : "..."}
							searchPlaceholder="Buscar..."
							value={categoria}
							onFocus={() => setIsFocus(true)}
							onBlur={() => setIsFocus(false)}
							onChange={(item) => {
								setCategoria(item.value);
								setIsFocus(false);
							}}
						/>
					</View>
					<View style={styles.containerDropdown}>
						{renderLabelSub()}
						<Dropdown
							style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
							placeholderStyle={styles.placeholderStyle}
							selectedTextStyle={styles.selectedTextStyle}
							inputSearchStyle={styles.inputSearchStyle}
							iconStyle={styles.iconStyle}
							data={subcategoriaData}
							search
							mode="modal"
							selectedTextProps={{ numberOfLines: 1 }}
							maxHeight={400}
							labelField="label"
							valueField="value"
							placeholder={!isFocus ? "Seleccionar subcategoría" : "..."}
							searchPlaceholder="Buscar..."
							value={subcategoria}
							onFocus={() => setIsFocus(true)}
							onBlur={() => setIsFocus(false)}
							onChange={(item) => {
								setSubCategoria(item.value);
								setIsFocus(false);
							}}
						/>
					</View>

					<View style={styles.separator} />

					<Button mode="elevated" icon="check-circle" onPress={handleCategoria}>
						Aceptar
					</Button>
				</BottomSheetModal>
			</BottomSheetModalProvider>

			<Portal>
				<Modal visible={modal} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<ViewShot ref={viewShotRef} options={{ format: "png", quality: 1.0 }}>
							<QRCode value={QRcode ? QRcode : "default"} size={200} color="black" backgroundColor="white" />
						</ViewShot>
						{/* <Button
              style={{ marginTop: 20 }}
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

			{isUploading ? <AppUploading /> : null}
			{isLoading ? <AppLoading /> : null}

			<StatusBar style="light" />
		</GestureHandlerRootView>
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
	itemButton: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "stretch",
	},
	containerDropdown: {
		backgroundColor: "white",
		padding: 16,
	},
	pickerContainer: {
		borderColor: "#000",
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 5,
	},
	confirmButton: {
		alignSelf: "center",
		justifyContent: "center",
		marginTop: 20,
		// marginLeft: '70%',
		alignItems: "center",
		flexDirection: "row",
	},
	separator: {
		height: 1,
		backgroundColor: "#00000040",
		marginVertical: 10,
	},
	containerStyle: {
		backgroundColor: "white",
		padding: 20,
		margin: 10,
	},
	contentContainer: {
		backgroundColor: "white",
		padding: 20,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	container: {
		flex: 1,
		// backgroundColor: '#fff',
		margin: 8,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	contentContainer: {
		padding: 20,
		backgroundColor: "#fff",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "stretch",
		justifyContent: "space-between",
		margin: 8,
	},
	dropdown: {
		height: 50,
		borderColor: "gray",
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	dropdownList: {
		height: 40,
		width: "20%",
		justifyContent: "center",
		alignSelf: "center",
		borderColor: "gray",
		borderWidth: 0.5,
		marginTop: 5,
		borderRadius: 20,
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: "absolute",
		backgroundColor: "white",
		left: 22,
		top: 3,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: 13,
	},
	selectedTextStyle: {
		fontSize: 13,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});

export default ListView;
