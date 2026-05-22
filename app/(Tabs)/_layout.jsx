import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabIconComponent = ({ focused, icon, title }) => {
  if (focused) {
    return (
      <View className="flex-col pt-4  min-w-[170px]  justify-center items-center min-h-16 rounded-lg">
        {icon}
        <Text className="text-xs mt-2 text-[#6A3EA1]  font-bold">{title}</Text>
      </View>
    );
  }
  return (
    <View className="flex-col pt-4  min-w-[170px] justify-center items-center min-h-16  rounded-lg">
      {icon}
      <Text className="text-xs text-[#827D89] mt-2 ">{title}</Text>
    </View>
  );
};
const TabLayout = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 8,
        },
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderRadius: 50,
          position: "absolute",
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: insets.bottom,
          borderWidth: 1,
          height: 65,
        },
      }}
    >
      <Tabs.Screen
        name="notes"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIconComponent
              focused={focused}
              icon={
                <FontAwesome
                  name={focused ? "sticky-note" : "sticky-note-o"}
                  size={24}
                  color={focused ? "#6A3EA1" : "#827D89"}
                />
              }
              title={"My Notes"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <TabIconComponent
              focused={focused}
              icon={
                <FontAwesome6
                  name={ "edit"}
                  size={24}
                  color={focused ? "#6A3EA1" : "#827D89"}
                />
              }
              title={"Create One"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
