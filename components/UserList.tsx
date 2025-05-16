import { User } from "@/types";
import { Text, View } from "react-native";
import UserCard from "./UserCard";

export default function UserList({ users }: { users: User[] | null }) {
  if (!users) {
    return (
      <View>
        <Text>Lege lijst</Text>
      </View>
    );
  } else {
    return (
      <View>
        {users?.map((user) => (
          <UserCard key={user.email} user={user} />
        ))}
      </View>
    );
  }
}
