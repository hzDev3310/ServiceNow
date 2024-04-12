import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import useAsyncStorage from "./src/hooks/useAsyncStrorage";


const ExampleComponent = () => {
  const { data, storeData, removeData } = useAsyncStorage("token");
  const [newValue, setNewValue] = useState("");

  const handleSetValue = () => {
    storeData(newValue);
    setNewValue("");
  };

  const handleRemoveValue = () => {
    removeData();
  };


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Data stored in AsyncStorage: {data}</Text>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TextInput
          style={{ borderWidth: 1, borderColor: "gray", padding: 5, marginRight: 10 }}
          value={newValue}
          onChangeText={setNewValue}
          placeholder="Enter new value"
        />
        <Button onPress={handleSetValue} title="Set Value" />
      </View>
      <Button onPress={handleRemoveValue} title="Remove Value" />
    </View>
  );
};

export default ExampleComponent;
