import { Link } from "expo-router";
import { Text, View } from "react-native";

const SignIn = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl font-bold">SignIn</Text>
      <Link href="/(auth)/sign-up" className="text-blue-500">
        create Account
      </Link>
    </View>
  );
};

export default SignIn;
