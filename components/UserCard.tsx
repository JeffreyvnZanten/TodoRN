import { User } from "@/types";
import { Text, View } from "react-native";

export default function UserCard({ user }: { user: User }) {
  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.age}</Text>
      <Text>{user.email}</Text>
    </View>
  );
}
