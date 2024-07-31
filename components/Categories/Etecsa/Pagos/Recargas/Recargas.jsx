import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import TabsButtons from "../../../../TabsButtons";
import Cuenta from "./Cuenta";
import Nauta from "./Nauta";

const Recargas = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const buttons = [
    { title: "Recargar cuenta" },
    { title: "Recargar Nauta Hogar" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TabsButtons
        buttons={buttons}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <View style={{ flex: 1, marginTop: 5, alignItems: "center" }}>
        {selectedTab === 0 ? <Cuenta /> : <Nauta />}
      </View>
    </SafeAreaView>
  );
};

export default Recargas;

const styles = StyleSheet.create({});
