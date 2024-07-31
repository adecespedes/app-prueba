import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CategoriesItem from "../../../CategoriesItem";
import AppLoading from "../../../Loading";
import * as SQLite from "expo-sqlite";
import { Chip } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";

const CambioLimites = () => {
  // const [db, setDb] = useState(SQLite.openDatabase('transfermovil.db'));
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollOffset, setScrollOffset] = useState();
  const scrollView = useRef();

  const renderItem = ({ item }) => {
    return (
      <>
        <Chip
          style={{
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
          textStyle={{ fontSize: 12 }}
        >
          {item}
        </Chip>
        {groupedData[item].map((element) => (
          <View style={{ marginBottom: 20 }} key={element._id}>
            <CategoriesItem item={element} />
          </View>
        ))}
      </>
    );
  };

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const db = await SQLite.openDatabaseAsync("transfermovil.db");
      const allRows = await db.getAllAsync(
        "SELECT sms.*, subcategoria.* FROM sms LEFT JOIN subcategoria ON sms.id_subcategoria = subcategoria.id WHERE sms.id_subcategoria = 12 GROUP BY date ORDER BY date DESC;"
      );
      setData(allRows);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const subir = () => {
    scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const onScroll = (scroll) => {
    setScrollOffset(scroll.nativeEvent.contentOffset.y);
  };

  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.date_string]) {
      acc[item.date_string] = [];
    }
    acc[item.date_string].push(item);
    return acc;
  }, {});

  return (
    <>
      {scrollOffset > 2500 ? (
        <View style={styles.containerFab}>
          <TouchableOpacity
            onPress={subir}
            style={[
              styles.itemContainer,
              {
                zIndex: 20,
                backgroundColor: "#A5ACFF",
              },
            ]}
          >
            <View>
              <FontAwesome6 name="arrow-up" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <ScrollView
        ref={scrollView}
        contentContainerStyle={styles.scrollView}
        onScroll={onScroll}
      >
        <FlatList
          data={Object.keys(groupedData)}
          renderItem={renderItem}
          initialNumToRender={7}
          scrollEnabled={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={
            <Text className="flex-1 justify-center items-center font-bold text-center text-xl">
              No hay mensajes disponibles para esta categoría....
            </Text>
          }
        />
      </ScrollView>
      {isLoading ? <AppLoading /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  containerFab: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  itemContainer: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    right: 25,
    borderRadius: 100,
    zIndex: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  contentContainer: {
    padding: 16,
    gap: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    margin: 8,
  },
});

export default CambioLimites;
