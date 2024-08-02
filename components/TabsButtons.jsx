import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const TabsButtons = ({ buttons, selectedTab, setSelectedTab }) => {
	const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
	const buttonWidth = dimensions.width / buttons.length;

	const tabPositionX = useSharedValue(0);

	const onTabbarLayout = (e) => {
		setDimensions({
			height: e.nativeEvent.layout.height,
			width: e.nativeEvent.layout.width,
		});
	};

	const handlePress = (index) => {
		setSelectedTab(index);
	};

	const onTabPress = (index) => {
		tabPositionX.value = withTiming(buttonWidth * index, {}, () => {
			runOnJS(handlePress)(index);
		});
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: tabPositionX.value }],
		};
	});

	return (
		<View
			style={{
				backgroundColor: "#ADADAD",
				borderRadius: 20,
				margin: 5,
				justifyContent: "center",
			}}
		>
			<Animated.View
				style={[
					animatedStyle,
					{
						position: "absolute",
						backgroundColor: "#fff",
						borderRadius: 15,
						marginHorizontal: 5,
						height: dimensions.height - 10,
						width: buttonWidth - 10,
					},
				]}
			/>
			<View onLayout={onTabbarLayout} style={{ flexDirection: "row" }}>
				{buttons.map((button, index) => {
					const color = selectedTab === index ? "black" : "#fff";
					return (
						<Pressable key={index} style={{ flex: 1, paddingVertical: 10 }} onPress={() => onTabPress(index)}>
							<Text
								style={{
									color: color,
									alignSelf: "center",
									fontWeight: "600",
									fontSize: 12,
								}}
							>
								{button.title}
							</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
};

export default TabsButtons;

const styles = StyleSheet.create({});
