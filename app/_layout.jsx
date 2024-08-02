import React from "react";
import TimerProvider from "@/context/TimerContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SQLiteProvider } from "expo-sqlite";

// this will prevent the flash screen from auto hiding until loading all the assets is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded, error] = useFonts({
		"Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
	});

	useEffect(() => {
		if (error) throw error;
		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded, error]);

	if (!fontsLoaded) {
		return null;
	}

	if (!fontsLoaded && !error) {
		return null;
	}

	return (
		<PaperProvider>
			<React.Suspense>
				<SQLiteProvider useSuspense databaseName="transfermovil.db">
					<SafeAreaProvider>
						<TimerProvider>
							<Stack>
								<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
								{/* <Stack.Screen name="meditate/[id]" options={{ headerShown: false }} /> */}
								<Stack.Screen name="index" options={{ headerShown: false }} />
								{/* <Stack.Screen
            name="(modal)/adjust-meditation-duration"
            options={{ headerShown: false, presentation: "modal" }}
          /> */}
							</Stack>
						</TimerProvider>
					</SafeAreaProvider>
				</SQLiteProvider>
			</React.Suspense>
		</PaperProvider>
	);
}
