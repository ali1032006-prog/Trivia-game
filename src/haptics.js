import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

// Phone buzz for right / wrong / timeout. Does nothing on the web.
export function buzz(kind) {
  if (Platform.OS === "web") return;
  const type = {
    success: Haptics.NotificationFeedbackType.Success,
    error: Haptics.NotificationFeedbackType.Error,
    warning: Haptics.NotificationFeedbackType.Warning,
  }[kind];
  Haptics.notificationAsync(type).catch(() => {});
}
