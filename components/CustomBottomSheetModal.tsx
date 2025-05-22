import { bottomSheetRef } from "@/services/bottomSheetService";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef, useEffect, useMemo } from "react";
import { Keyboard, StyleSheet } from "react-native";
import CreateTodoForm from "./CreateTodoForm";

export type BottomSheetRef = React.ComponentRef<typeof BottomSheetModal>;

const CustomBottomSheetModal = forwardRef<BottomSheetRef>((props, ref) => {
  const snapPoints = useMemo(() => ["20%", "60%"], []);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      bottomSheetRef.current?.snapToIndex(1);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      bottomSheetRef.current?.snapToIndex(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: "white" }}
      ref={ref}
      index={0}
      snapPoints={snapPoints}
    >
      <BottomSheetView style={styles.contentContainer}>
        <CreateTodoForm />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
});

export default CustomBottomSheetModal;
