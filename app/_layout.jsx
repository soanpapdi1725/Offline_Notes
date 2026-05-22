import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {Provider} from "react-redux"
import "./global.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistorNotes } from "../Store/store";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistorNotes}>
        <SafeAreaProvider>
          <StatusBar barStyle={"dark-content"} />
          <Stack>
            <Stack.Screen name="(Tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="Task/[id]" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;
