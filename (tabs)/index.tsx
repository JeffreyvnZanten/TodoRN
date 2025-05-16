import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Text, View } from "react-native";
import { db } from "../db";
import migrations from "../drizzle/migrations";

export default function HomeScreen() {
  const { success, error } = useMigrations(db, migrations);

  console.log("success", success);
  console.log("error", error);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
// });
