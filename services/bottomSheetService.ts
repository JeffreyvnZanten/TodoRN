import type { BottomSheetRef } from "@/components/CustomBottomSheetModal";
import { createRef } from "react";

export const bottomSheetRef = createRef<BottomSheetRef>();

export function presentBottomSheet() {
  bottomSheetRef.current?.present();
}

export function dismissBottomSheet() {
  bottomSheetRef.current?.dismiss();
}
