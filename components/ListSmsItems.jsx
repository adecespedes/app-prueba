import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { List } from "react-native-paper";

const ListSmsItems = ({ categorias }) => {
  console.log(categorias);
  return (
    <>
      {categorias.map((item) => {
        <>
          <Text>{item}</Text>
          <List.Item title={item.nombre} />
        </>;
      })}
    </>
  );
};

export default ListSmsItems;

const styles = StyleSheet.create({});
