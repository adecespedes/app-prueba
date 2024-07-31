import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import TabsButtons from "../../../TabsButtons";
import Realizadas from "./Realizadas";
import Recibidas from "./Recibidas";

const Transferencias = ({ transRealizadas, transRecibidas }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const buttons = [{ title: "Realizadas" }, { title: "Recibidas" }];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TabsButtons
        buttons={buttons}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <View style={{ flex: 1, marginTop: 5, alignItems: "center" }}>
        {selectedTab === 0 ? (
          <Realizadas transRealizadas={transRealizadas} />
        ) : (
          <Recibidas transRecibidas={transRecibidas} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Transferencias;

const styles = StyleSheet.create({});
