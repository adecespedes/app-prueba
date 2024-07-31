import {
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/Colors";
import Button from "../components/Button";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import { initDatabase } from "../utils/db";

const Welcome = () => {
  const router = useRouter();

  useEffect(() => {
    const storage = PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    ]);
    async function init() {
      await initDatabase();
    }
    init();
  }, []);
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[Colors.secondary, Colors.primary]}
    >
      <View className="flex-1">
        <View>
          <Image
            source={require("../assets/images/hero1.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: 10,
              transform: [
                { translateX: 20 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/images/hero3.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: -30,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-5deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/images/hero3.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: "absolute",
              top: 130,
              left: -50,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "15deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/images/hero2.jpg")}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: "absolute",
              top: 110,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
        </View>

        {/* content  */}

        {/* <Text
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: COLORS.white,
            }}>
            Started
          </Text> */}

        {/* <View
            style={{
              flexDirection: 'row',
              marginTop: 12,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
              }}>
              Ya tienes una cuenta ?
            </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white,
                  fontWeight: 'bold',
                  marginLeft: 4,
                }}>
                Accede
              </Text>
            </Pressable>
          </View> */}
      </View>
      <SafeAreaView className="flex-1 mx-5 my-12 justify-between">
        <View>
          <Text className="text-center text-white font-bold text-3xl">
            Transfermovil-Contabilidad
          </Text>
          <Text className="text-center text-white text-regular text-2xl mt-3">
            App para tener un control de tu contabilidad
          </Text>
        </View>

        <View>
          <CustomButton
            onPress={() => router.push("/list-view")}
            title="Empecemos"
          />
        </View>

        <StatusBar style="light"></StatusBar>
      </SafeAreaView>
    </LinearGradient>
  );
};
export default Welcome;
