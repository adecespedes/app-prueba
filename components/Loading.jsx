import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const AppLoading = () => {
	const [progress, setProgress] = useState(0);
	const [indeterminate, setIndeterminate] = useState(true);

	useEffect(() => {
		let interval;
		const timer = setTimeout(() => {
			setIndeterminate(false);
			interval = setInterval(() => {
				setProgress((prevProgress) => Math.min(1, prevProgress + Math.random() / 5));
			}, 500);
		}, 1500);
		return () => {
			clearTimeout(timer);
			clearInterval(interval);
		};
	}, []);

	return (
		<View style={[StyleSheet.absoluteFillObject, styles.container]}>
			<Progress.CircleSnail style={styles.progress} size={100} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10,
	},
	circles: {
		flexDirection: "row",
		alignItems: "center",
	},
	progress: {
		margin: 10,
	},
});

export default AppLoading;
