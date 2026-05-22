import { StyleSheet, Text, View } from "react-native";

const Empty = ({ tag }) => {
  return (
    <View className="my-[200px] items-center justify-center">
      <Text className="text-4xl font-header font-bold text-center">
        {tag === "None" ? "No Notes Added" : `No Notes related to ${tag}`}
      </Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({});
