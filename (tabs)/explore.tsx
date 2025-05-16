import UserList from "@/components/UserList";
import { testData } from "@/db/repository";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { User } from "../types";

export default function TabTwoScreen() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("TabTwoScreen");

  useEffect(() => {
    const loadData = async () => {
      // await insertData();
      const result = await testData();
      setUsers(result);
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <View>
      <UserList users={users} />
    </View>
  );
}

// const styles = StyleSheet.create({
//   headerImage: {
//     color: "#808080",
//     bottom: -90,
//     left: -35,
//     position: "absolute",
//   },
//   titleContainer: {
//     flexDirection: "row",
//     gap: 8,
//   },
// });
