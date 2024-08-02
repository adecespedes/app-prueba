import React, { memo } from "react";
import { Text, View, Animated } from "react-native";
import { Button, Card } from "react-native-paper";
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

const CategoriesItem = ({ item, visibleModal }) => {
	const funcDateValue = (
		value = null,
		serverFormat = "M/DD/YYYY hh:mm:ss A",
		displayFormat = "DD/MM/YYYY hh:mm:ss A",
		fallbackValue = "----",
	) => {
		const fecha = dayjs(value).format("LL h:mm A");
		return fecha;
	};

	const showQr = () => {
		visibleModal(true, item);
	};

	return (
		<Card style={{ margin: 5 }}>
			<Card.Title
				titleStyle={{ fontWeight: 800, fontSize: 12 }}
				subtitleStyle={{ fontWeight: 700, fontSize: 11 }}
				title={funcDateValue(item.date)}
				subtitleNumberOfLines={2}
			/>
			<Card.Content>
				<Text style={{ fontSize: 13 }} variant="titleLarge">
					{item.body}
				</Text>
				{/* <Text variant="bodyMedium">Card content</Text> */}
			</Card.Content>
			{/* <Card.Cover source={{uri: 'https://picsum.photos/700'}} /> */}
			<Card.Actions>
				{item.id_subcategoria === 2 || item.id_subcategoria === 3 ? (
					<Button labelStyle={{ fontSize: 11 }} mode="elevated" buttonColor="#E3E3E3" icon="qrcode" onPress={showQr}>
						Generar
					</Button>
				) : (
					""
				)}

				{/* <Button icon="qrcode" mode="contained-tonal">
          Ok
        </Button> */}
			</Card.Actions>
		</Card>
	);
};

export default memo(CategoriesItem);
