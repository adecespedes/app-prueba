import { useRef, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import customParseFormat from "dayjs/plugin/customParseFormat";
const utc = require("dayjs/plugin/utc");
const duration = require("dayjs/plugin/duration");
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(utc);

dayjs.locale("es");

import * as SQLite from "expo-sqlite";

export function useSms() {
	const [sms, setSms] = useState([]);
	const [isUploading, setIsUploading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// const [flag, setFlag] = useState(false);
	let flag = useRef(false);

	const fetchSms = (tx) => {
		tx.executeSql(
			"SELECT sms.*, subcategoria.* FROM sms LEFT JOIN subcategoria ON sms.id_subcategoria = subcategoria.id ORDER BY _id DESC;",
			[],
			(_, { rows: { _array } }) => {
				setSms([]);
				setSms(_array);
				setTimeout(() => {
					setIsLoading(false);
				}, 2000);
			},
		);
	};

	const getSms = (db) => {
		setIsLoading(true);
		db.transaction(fetchSms);
	};

	const setCategories = async () => {
		const db = await SQLite.openDatabaseAsync("transfermovil.db");
		const wordTransfermovil = "autenticado";
		const wordRealized = "Transferencia";
		const wordReceived = "El titular del telefono";
		const wordOperaciones = "Ultimas operaciones";
		const wordLimites = "Consulta de Limites";
		const wordCuentas = "Nombre Cuenta";
		const wordRecharge = "acreditar";
		const wordSaldo = "consulta de saldo";

		const allRows = await db.getAllAsync("SELECT * FROM sms");
		allRows.forEach(async (row, index) => {
			const statement = await db.prepareAsync(
				"UPDATE sms SET id_subcategoria = $id_categoria, user = $user, json = $json, no_transferencia = $no_transferencia WHERE _id = $_id",
			);
			try {
				const word = row.body;
				if (word.includes(wordTransfermovil)) {
					let result = await statement.executeAsync({
						$id_categoria: 1,
						$user: "admin",
						$_id: row._id,
					});
					console.log("Actualizando");
				} else if (word.includes(wordRealized)) {
					let texto = {};
					let txt = word;
					txt = txt.split(":");
					const beneficiario = txt[2].split(" ");
					const ordenante = txt[3].split(" ");
					const monto = txt[4].split(" ");
					const transaction = txt[5].split(" ");
					const saldo = txt[6];

					texto = {
						banco: txt[0],
						beneficiario: beneficiario[1],
						ordenante: ordenante[1],
						monto: monto[1] + " " + monto[2],
						saldo: saldo,
						transaccion: transaction[1],
					};
					let result = await statement.executeAsync({
						$id_categoria: 2,
						$user: "admin",
						$json: JSON.stringify(texto),
						$no_transferencia: transaction[1],
						$_id: row._id,
					});
					console.log("Actualizando");
				} else if (word.includes(wordReceived)) {
					let texto = {};
					let txt = word;
					txt = txt.split(" ");

					texto = {
						tarjeta: txt[13],
						monto: txt[15] + " " + txt[16],
						transaccion: txt[19],
					};

					let result = await statement.executeAsync({
						$id_categoria: 3,
						$user: "admin",
						$json: JSON.stringify(texto),
						$no_transferencia: txt[19],
						$_id: row._id,
					});
					console.log("Actualizando");
				} else if (word.includes(wordOperaciones)) {
					let result = await statement.executeAsync({
						$id_categoria: 9,
						$user: "admin",
						$_id: row._id,
					});
					console.log("Actualizando");
				} else if (word.includes(wordLimites)) {
					let result = await statement.executeAsync({
						$id_categoria: 11,
						$user: "admin",
						$_id: row._id,
					});
					console.log("Actualizando");
				} else if (word.includes(wordCuentas)) {
					let result = await statement.executeAsync({
						$id_categoria: 8,
						$user: "admin",
						$_id: row._id,
					});
					console.log("Actualizando");
				} else if (word.includes(wordRecharge)) {
					let result = await statement.executeAsync({
						$id_categoria: 5,
						$user: "admin",
						$_id: row._id,
					});
					console.log("Actualizando");
				} else if (word.includes(wordSaldo)) {
					let result = await statement.executeAsync({
						$id_categoria: 10,
						$user: "admin",
						$_id: row._id,
					});
					console.log("Actualizando");
				} else {
					let result = await statement.executeAsync({
						$id_categoria: 0,
						$user: "user",
						$_id: row._id,
					});
					console.log("Actualizando");
				}
			} finally {
				await statement.finalizeAsync();
				setIsUploading(false);
			}
		});
	};

	const funcDateValue = (
		value = null,
		serverFormat = "M/DD/YYYY hh:mm:ss A",
		displayFormat = "DD/MM/YYYY hh:mm:ss A",
		fallbackValue = "----",
	) => {
		const fecha = dayjs(value).format("LL");
		return fecha;
	};

	const addSms = async (listSms) => {
		setIsUploading(true);
		const db = await SQLite.openDatabaseAsync("transfermovil.db");
		const items = [
			{
				nombre: "Transfermovil",
			},
			{
				nombre: "Banco",
			},
			{
				nombre: "Etecsa",
			},
		];
		const subcategorias = [
			{
				id_categoria: 1,
				nombre: "Autenticación",
			},
			{
				id_categoria: 2,
				nombre: "Transferencias/Transferencias realizadas",
			},
			{
				id_categoria: 2,
				nombre: "Transferencias/Transferencias recibidas",
			},
			{
				id_categoria: 3,
				nombre: "Consultas",
			},
			{
				id_categoria: 3,
				nombre: "Pagos/Recargar cuenta",
			},
			{
				id_categoria: 3,
				nombre: "Pagos/Recargar Nauta Hogar",
			},
			{
				id_categoria: 3,
				nombre: "Pagos/Factura telefónica",
			},
			{
				id_categoria: 2,
				nombre: "Consultas/Consultar todas las cuentas",
			},
			{
				id_categoria: 2,
				nombre: "Consultas/Consultar las últimas operaciones",
			},
			{
				id_categoria: 2,
				nombre: "Consultas/Consultar saldo",
			},
			{
				id_categoria: 2,
				nombre: "Configuraciones/Consulta de limites",
			},
			{
				id_categoria: 2,
				nombre: "Configuraciones/Cambio de limites",
			},
		];

		const statement = await db.prepareAsync(
			"INSERT INTO sms (_id, thread_id, address, date, date_string, date_sent, protocol, read, status, type, reply_path_present, body, service_center, locked, error_code, sub_id, creator, seen, deletable, sim_slot, hidden, app_id) VALUES ($_id,$thread_id,$address,$date,$date_string,$date_sent,$protocol,$read,$status,$type,$reply_path_present,$body,$service_center,$locked,$error_code,$sub_id,$creator,$seen,$deletable,$sim_slot,$hidden,$app_id)",
		);
		try {
			listSms.forEach(async (item) => {
				let result = await statement.executeAsync({
					$_id: item._id,
					$thread_id: item.thread_id,
					$address: item.address,
					$date: item.date,
					$date_string: funcDateValue(item.date),
					$date_sent: item.date_sent,
					$protocol: item.protocol,
					$read: item.read,
					$status: item.status,
					$type: item.type,
					$reply_path_present: item.reply_path_present,
					$body: item.body,
					$service_center: item.service_center,
					$locked: item.locked,
					$error_code: item.error_code,
					$sub_id: item.sub_id,
					$creator: item.creator,
					$seen: item.seen,
					$deletable: item.deletable,
					$sim_slot: item.sim_slot,
					$hidden: item.hidden,
					$app_id: item.app_id,
				});
				console.log("Insertando sms");
			});
		} finally {
			await statement.finalizeAsync();
		}

		const statement2 = await db.prepareAsync("INSERT INTO categoria (nombre) VALUES ($nombre)");
		try {
			items.forEach(async (item) => {
				let result = await statement2.executeAsync({
					$nombre: item.nombre,
				});
				console.log("Insertando categoria");
			});
		} finally {
			await statement2.finalizeAsync();
		}

		const statement3 = await db.prepareAsync(
			"INSERT INTO subcategoria (nombre, id_categoria) VALUES ($nombre,$id_categoria)",
		);
		try {
			subcategorias.forEach(async (item) => {
				let result = await statement3.executeAsync({
					$nombre: item.nombre,
					$id_categoria: item.id_categoria,
				});
				console.log("Insertando subcategoria");
			});
		} finally {
			await statement3.finalizeAsync();
			setCategories();
		}
	};

	const addRefreshSms = async (item) => {
		setIsLoading(true);
		const db = await SQLite.openDatabaseAsync("transfermovil.db");
		const statement = await db.prepareAsync(
			"INSERT INTO sms (_id, thread_id, address, date, date_string, date_sent, protocol, read, status, type, reply_path_present, body, service_center, locked, error_code, sub_id, creator, seen, deletable, sim_slot, hidden, app_id) VALUES ($_id,$thread_id,$address,$date,$date_string,$date_sent,$protocol,$read,$status,$type,$reply_path_present,$body,$service_center,$locked,$error_code,$sub_id,$creator,$seen,$deletable,$sim_slot,$hidden,$app_id)",
		);
		try {
			let result = await statement.executeAsync({
				$_id: item._id,
				$thread_id: item.thread_id,
				$address: item.address,
				$date: item.date,
				$date_string: funcDateValue(item.date),
				$date_sent: item.date_sent,
				$protocol: item.protocol,
				$read: item.read,
				$status: item.status,
				$type: item.type,
				$reply_path_present: item.reply_path_present,
				$body: item.body,
				$service_center: item.service_center,
				$locked: item.locked,
				$error_code: item.error_code,
				$sub_id: item.sub_id,
				$creator: item.creator,
				$seen: item.seen,
				$deletable: item.deletable,
				$sim_slot: item.sim_slot,
				$hidden: item.hidden,
				$app_id: item.app_id,
			});
			console.log("Insertando sms");
		} finally {
			await statement.finalizeAsync();
		}

		const statement2 = await db.prepareAsync(
			"UPDATE sms SET id_subcategoria = $id_categoria, user = $user, json = $json, no_transferencia = $no_transferencia WHERE _id = $_id",
		);
		try {
			const wordTransfermovil = "autenticado";
			const wordRealized = "Transferencia";
			const wordReceived = "El titular del telefono";
			const wordOperaciones = "Ultimas operaciones";
			const wordLimites = "Consulta de Limites";
			const wordCuentas = "Nombre Cuenta";
			const wordRecharge = "acreditar";
			const wordSaldo = "consulta de saldo";
			const word = item.body;
			if (word.includes(wordTransfermovil)) {
				let result = await statement2.executeAsync({
					$id_categoria: 1,
					$user: "admin",
					$_id: item._id,
				});
				console.log("Actualizando");
			} else if (word.includes(wordRealized)) {
				let texto = {};
				let txt = word;
				txt = txt.split(":");
				const beneficiario = txt[2].split(" ");
				const ordenante = txt[3].split(" ");
				const monto = txt[4].split(" ");
				const transaction = txt[5].split(" ");
				const saldo = txt[6];

				texto = {
					banco: txt[0],
					beneficiario: beneficiario[1],
					ordenante: ordenante[1],
					monto: monto[1] + " " + monto[2],
					saldo: saldo,
					transaccion: transaction[1],
				};
				let result = await statement2.executeAsync({
					$id_categoria: 2,
					$user: "admin",
					$json: JSON.stringify(texto),
					$no_transferencia: transaction[1],
					$_id: item._id,
				});
				console.log("Actualizando");
			} else if (word.includes(wordReceived)) {
				let texto = {};
				let txt = word;
				txt = txt.split(" ");

				texto = {
					tarjeta: txt[13],
					monto: txt[15] + " " + txt[16],
					transaccion: txt[19],
				};

				let result = await statement2.executeAsync({
					$id_categoria: 3,
					$user: "admin",
					$json: JSON.stringify(texto),
					$no_transferencia: txt[19],
					$_id: item._id,
				});
				console.log("Actualizando");
			} else if (word.includes(wordOperaciones)) {
				let result = await statement2.executeAsync({
					$id_categoria: 9,
					$user: "admin",
					$_id: item._id,
				});
				console.log("Actualizando");
			} else if (word.includes(wordLimites)) {
				let result = await statement.executeAsync({
					$id_categoria: 11,
					$user: "admin",
					$_id: row._id,
				});
				console.log("Actualizando");
			} else if (word.includes(wordCuentas)) {
				let result = await statement2.executeAsync({
					$id_categoria: 8,
					$user: "admin",
					$_id: item._id,
				});
				console.log("Actualizando");
			} else if (word.includes(wordRecharge)) {
				let result = await statement2.executeAsync({
					$id_categoria: 5,
					$user: "admin",
					$_id: item._id,
				});
				console.log("Actualizando");
			} else if (word.includes(wordSaldo)) {
				let result = await statement2.executeAsync({
					$id_categoria: 10,
					$user: "admin",
					$_id: item._id,
				});
				console.log("Actualizando");
			} else {
				let result = await statement2.executeAsync({
					$id_categoria: 0,
					$user: "user",
					$_id: item._id,
				});
				console.log("Actualizando");
			}
		} finally {
			await statement2.finalizeAsync();
			setIsLoading(false);
		}
	};

	return {
		sms,
		isUploading,
		isLoading,
		flag,
		getSms,
		addSms,
		addRefreshSms,
		setCategories,
	};
}
