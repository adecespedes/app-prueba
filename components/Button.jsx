import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

export default function Button(props) {
  const filledBgColor = props.color || Colors.primary;
  const outlinedColor = Colors.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? Colors.white : Colors.primary;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...props.style,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          ...{ color: textColor },
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingBottom: 16,
    paddingVertical: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
