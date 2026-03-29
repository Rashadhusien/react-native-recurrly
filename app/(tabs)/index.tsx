import { Link } from "expo-router";
import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background p-5">
      <Text className="text-xl font-bold text-accent">
        Welcome to Nativewind!
      </Text>
      <Link
        href="/onboarding"
        className="mt-4 rounded bg-primary p-4 text-center text-white"
      >
        <Text>Go to onboarding</Text>
      </Link>
      <Link
        href="/(auth)/sign-in"
        className="mt-4 rounded bg-primary p-4 text-center text-white"
      >
        <Text>Go to sign in</Text>
      </Link>
      <Link
        href="/(auth)/sign-up"
        className="mt-4 rounded bg-primary p-4 text-center text-white"
      >
        <Text>Go to sign up</Text>
      </Link>

      <Link
        href="/subscriptions/spotify"
        className="mt-4 rounded bg-primary p-4 text-center text-white"
      >
        <Text>Go to subscriptions</Text>
      </Link>
      <Link
        href={{ pathname: "/subscriptions/[id]", params: { id: "claude" } }}
        className="mt-4 rounded bg-primary p-4 text-center text-white"
      >
        <Text>Claude max subscription</Text>
      </Link>
    </SafeAreaView>
  );
}
