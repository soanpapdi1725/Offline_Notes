import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FrameForScreens = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 mx-3" style={{ paddingTop: insets.top}}>
      {children}
    </View>
  );
};

export default FrameForScreens;

const styles = StyleSheet.create({});
