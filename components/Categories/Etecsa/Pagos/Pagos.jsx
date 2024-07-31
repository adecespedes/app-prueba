import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import TabsButtons from "../../../TabsButtons";
import Recargas from "./Recargas/Recargas";
import Facturas from "./Facturas/Facturas";

const Pagos = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const buttons = [{ title: "Recargas" }, { title: "Facturas" }];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TabsButtons
        buttons={buttons}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <View style={{ flex: 1, marginTop: 5, alignItems: "center" }}>
        {selectedTab === 0 ? <Recargas /> : <Facturas />}
      </View>
    </SafeAreaView>
  );
};

export default Pagos;

const styles = StyleSheet.create({});
