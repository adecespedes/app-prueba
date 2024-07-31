const { withAndroidManifest } = require("@expo/config-plugins");

module.exports = function androidManifestPlugin(config) {
  return withAndroidManifest(config, async (config) => {
    let androidManifest = config.modResults.manifest;
    console.warn(androidManifest);

    // add the tools to apply permission remove
    androidManifest.$ = {
      ...androidManifest.$,
      "xmlns:tools": "http://schemas.android.com/tools",
    };

    // add remove property to the audio record permission
    const permissions = androidManifest["uses-permission"] || [];
    androidManifest["uses-permission"] = [
      ...permissions,
      {
        $: {
          "android:name": "android.permission.READ_SMS",
        },
      },
    ];

    // androidManifest["uses-permission"] = androidManifest["uses-permission"].map(
    //   (perm) => {
    //     if (perm.$["android:name"] === "android.permission.READ_SMS") {
    //       perm.$["tools:node"] = "remove";
    //     }
    //     return perm;
    //   }
    // );

    return config;
  });
};
