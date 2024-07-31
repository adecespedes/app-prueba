import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import TabsButtons from "../../TabsButtons";
import Transferencias from "./Transferencias/Transferencias";
import Consultas from "./Consultas/Consultas";
import Configuraciones from "./Configuraciones/Configuraciones";

const Banco = ({ transRealizadas, transRecibidas, operaciones, cuentas }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const buttons = [
    { title: "Transferencias" },
    { title: "Consultas" },
    { title: "Configuraciones" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TabsButtons
        buttons={buttons}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <View style={{ flex: 1, marginTop: 5, alignItems: "center" }}>
        {selectedTab === 0 ? (
          <Transferencias
            transRealizadas={transRealizadas}
            transRecibidas={transRecibidas}
          />
        ) : selectedTab === 1 ? (
          <Consultas operaciones={operaciones} cuentas={cuentas} />
        ) : (
          <Configuraciones operaciones={operaciones} cuentas={cuentas} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Banco;

const styles = StyleSheet.create({});
