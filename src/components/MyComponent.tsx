import React from "react";
import { Text } from "react-native";

export interface MyComponentProps {
  title?: string;
  selected?: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  selected = false,
}) => {
  return <Text style={{ color: selected ? "orange" : "blue" }}>{title}</Text>;
};
