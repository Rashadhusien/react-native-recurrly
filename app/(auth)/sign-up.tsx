import { Link } from "expo-router";
import { Text, View } from "react-native";

const SignUp = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl font-bold">SignUp</Text>
      <Link href="/(auth)/sign-in" className="text-blue-500">
        Sign in
      </Link>
    </View>
  );
};

export default SignUp;
