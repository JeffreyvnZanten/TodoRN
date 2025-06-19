import CustomBottomSheetModal from "@/components/CustomBottomSheetModal";
import FloatingActionButton from "@/components/FloatingActionButton";
import Header from "@/components/Header";
import { performLogin } from "@/services/loginService";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  bottomSheetRef,
  presentBottomSheet,
} from "../services/bottomSheetService";
import Page from "./Page";

const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    performLogin();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <SafeAreaView style={styles.container}>
            <StatusBar />
            <Header />
            <Page />
          </SafeAreaView>
          <CustomBottomSheetModal ref={bottomSheetRef} />
          <FloatingActionButton handlePress={presentBottomSheet} />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#007AFF",
  },
});
