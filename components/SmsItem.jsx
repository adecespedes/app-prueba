import React, { useState, memo } from "react";
// import {Text} from 'react-native';
import {
  Button,
  Card,
  Modal,
  Portal,
  Text,
  PaperProvider,
} from "react-native-paper";
import dayjs from "dayjs";
import "dayjs/locale/es";
import customParseFormat from "dayjs/plugin/customParseFormat";
const utc = require("dayjs/plugin/utc");
const duration = require("dayjs/plugin/duration");
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(utc);

dayjs.locale("es");

const SmsItem = ({ sms, visibleBottom, visibleModal, groupedData }) => {
  const showModal = () => {
    visibleBottom(true, sms);
  };
  const showQr = () => {
    visibleModal(true, sms);
  };

  const funcDateValue = (
    value = null,
    serverFormat = "M/DD/YYYY hh:mm:ss A",
    displayFormat = "DD/MM/YYYY hh:mm:ss A",
    fallbackValue = "----"
  ) => {
    const fecha = dayjs(value).format("LL h:mm A");
    return fecha;
  };

  // return <Text>{`• ${sms.body}`}</Text>;
  return (
    <Card>
      <Card.Title
        titleStyle={{ fontWeight: 800, fontSize: 12 }}
        subtitleStyle={{ fontWeight: 700, fontSize: 11 }}
        title={funcDateValue(sms.date)}
        subtitle={`Categoria: ${
          sms.id_categoria === 1
            ? "Transfermovil"
            : sms.id_categoria === 2
            ? "Banco"
            : sms.id_categoria === 3
            ? "Etecsa"
            : "---"
        }`}
        subtitleNumberOfLines={2}
      />
      <Card.Title
        subtitleStyle={{ fontWeight: 700, fontSize: 11, marginTop: -35 }}
        subtitle={`Subcategoria: ${sms.nombre === null ? "---" : sms.nombre}`}
        subtitleNumberOfLines={2}
      />
      <Card.Content style={{ marginTop: -25 }}>
        <Text style={{ fontSize: 13 }} variant="titleLarge">
          {sms.body}
        </Text>
        {/* <Text variant="bodyMedium">Card content</Text> */}
      </Card.Content>
      {/* <Card.Cover source={{uri: 'https://picsum.photos/700'}} /> */}
      <Card.Actions>
        {sms.id_subcategoria === 2 || sms.id_subcategoria === 3 ? (
          <Button
            labelStyle={{ fontSize: 11 }}
            mode="elevated"
            buttonColor="#E3E3E3"
            icon="qrcode"
            onPress={showQr}
          >
            Generar
          </Button>
        ) : (
          ""
        )}

        {sms.user === "user" ? (
          <Button
            labelStyle={{ fontSize: 11 }}
            mode="elevated"
            buttonColor="#E3E3E3"
            icon="tools"
            onPress={showModal}
          >
            Cambiar categoría
          </Button>
        ) : (
          ""
        )}

        {/* <Button icon="qrcode" mode="contained-tonal">
          Ok
        </Button> */}
      </Card.Actions>
    </Card>
  );
};

export default memo(SmsItem);
