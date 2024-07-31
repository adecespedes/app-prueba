import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import TabsButtons from "../../../../TabsButtons";
import Phone from "./Phone";

const Facturas = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const buttons = [{ title: "Factura telefónica" }];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TabsButtons
        buttons={buttons}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <View style={{ flex: 1, marginTop: 5, alignItems: "center" }}>
        {selectedTab === 0 ? <Phone /> : null}
      </View>
    </SafeAreaView>
  );
};

export default Facturas;

const styles = StyleSheet.create({});
