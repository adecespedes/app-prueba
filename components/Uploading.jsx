import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const AppUploading = () => {
  const [progress, setProgress] = useState(0);
  const [indeterminate, setIndeterminate] = useState(true);

  useEffect(() => {
    let interval;
    const timer = setTimeout(() => {
      setIndeterminate(false);
      interval = setInterval(() => {
        setProgress((prevProgress) =>
          Math.min(1, prevProgress + Math.random() / 5)
        );
      }, 100);
    }, 300);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Progress.Circle
        style={styles.progress}
        showsText
        size={100}
        progress={progress}
        indeterminate={indeterminate}
      />
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

export default AppUploading;
