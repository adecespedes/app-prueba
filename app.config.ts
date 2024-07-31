const APP_ID = "com.anonymous.myapp";
const BUILD_NUMBER = 1;
const VERSION = "1.0.0";

export default {
  expo: {
    name: "my-app",
    slug: "my-app",
    version: VERSION,
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    ios: {
      supportsTablet: false,
      bundleIdentifier: APP_ID,
      buildNumber: `${BUILD_NUMBER}`,
      config: { usesNonExemptEncryption: false },
    },

    android: {
      package: APP_ID,
      versionCode: BUILD_NUMBER,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: [
        // "android.permissions.WRITE_EXTERNAL_STORAGE",
        // "android.permissions.READ_EXTERNAL_STORAGE",
        "android.permissions.READ_SMS",
        // "android.permissions.RECEIVE_SMS",
      ],
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-router",
      ["./sms-config-plugins.js"],
      // [
      //   "expo-build-properties",
      //   {
      //     android: {
      //       buildToolsVersion: "34.0.0",
      //       compileSdkVersion: 34,
      //       minSdkVersion: 26,
      //       targetSdkVersion: 34,
      //     },
      //     ios: { deploymentTarget: "13.4" },
      //   },
      // ],
    ],

    experiments: {
      typedRoutes: true,
    },

    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "3277e9a3-1159-4926-8e13-7ad9d1ce6ee2",
      },
    },
  },
};
