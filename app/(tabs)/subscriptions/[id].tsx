import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SubscriptionDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-accent">SubscriptionDetails</Text>
      <Text className="text-lg text-foreground">{id}</Text>
      <Link
        href="/"
        className="mt-4 rounded bg-primary p-4 text-center text-white"
      >
        <Text>home</Text>
      </Link>
    </View>
  );
};

export default SubscriptionDetails;
