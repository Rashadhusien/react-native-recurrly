import { icons } from "@/constants/icons";
import { clsx } from "clsx";
import dayjs from "dayjs";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface CreateSubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (subscription: Subscription) => void;
}

const CATEGORIES = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Cloud",
  "Music",
  "Other",
];

const CATEGORY_COLORS: Record<string, string> = {
  Entertainment: "#f5c542",
  "AI Tools": "#b8d4e3",
  "Developer Tools": "#e8def8",
  Design: "#b8e8d0",
  Productivity: "#f5c542",
  Cloud: "#b8d4e3",
  Music: "#f5c542",
  Other: "#e8def8",
};

export default function CreateSubscriptionModal({
  visible,
  onClose,
  onSubmit,
}: CreateSubscriptionModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState<"Monthly" | "Yearly">("Monthly");
  const [category, setCategory] = useState("");

  const isFormValid =
    name.trim() !== "" &&
    price !== "" &&
    parseFloat(price) > 0 &&
    category !== "";

  const handleSubmit = () => {
    if (!isFormValid) return;

    const priceNum = parseFloat(price);
    const startDate = dayjs().toISOString();
    const renewalDate =
      frequency === "Monthly"
        ? dayjs().add(1, "month").toISOString()
        : dayjs().add(1, "year").toISOString();

    const newSubscription: Subscription = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      price: priceNum,
      currency: "USD",
      category,
      status: "active",
      startDate,
      renewalDate,
      icon: icons.wallet,
      billing: frequency,
      color: CATEGORY_COLORS[category] || "#e8def8",
    };

    onSubmit(newSubscription);

    // Reset form
    setName("");
    setPrice("");
    setFrequency("Monthly");
    setCategory("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 modal-overlay">
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="flex-1"
            >
              <View className="modal-container">
                {/* Header */}
                <View className="modal-header">
                  <Text className="modal-title">New Subscription</Text>
                  <Pressable onPress={onClose} className="modal-close">
                    <Text className="modal-close-text">×</Text>
                  </Pressable>
                </View>

                {/* Body */}
                <View className="modal-body">
                  {/* Name Field */}
                  <View className="auth-field">
                    <Text className="auth-label">Name</Text>
                    <TextInput
                      value={name}
                      onChangeText={setName}
                      placeholder="Enter subscription name"
                      className="auth-input"
                      autoCapitalize="words"
                    />
                  </View>

                  {/* Price Field */}
                  <View className="auth-field">
                    <Text className="auth-label">Price</Text>
                    <TextInput
                      value={price}
                      onChangeText={setPrice}
                      placeholder="0.00"
                      keyboardType="decimal-pad"
                      className="auth-input"
                    />
                  </View>

                  {/* Frequency Toggle */}
                  <View className="auth-field">
                    <Text className="auth-label">Frequency</Text>
                    <View className="picker-row">
                      <Pressable
                        onPress={() => setFrequency("Monthly")}
                        className={clsx(
                          "picker-option",
                          frequency === "Monthly" && "picker-option-active",
                        )}
                      >
                        <Text
                          className={clsx(
                            "picker-option-text",
                            frequency === "Monthly" &&
                              "picker-option-text-active",
                          )}
                        >
                          Monthly
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => setFrequency("Yearly")}
                        className={clsx(
                          "picker-option",
                          frequency === "Yearly" && "picker-option-active",
                        )}
                      >
                        <Text
                          className={clsx(
                            "picker-option-text",
                            frequency === "Yearly" &&
                              "picker-option-text-active",
                          )}
                        >
                          Yearly
                        </Text>
                      </Pressable>
                    </View>
                  </View>

                  {/* Category Selection */}
                  <View className="auth-field">
                    <Text className="auth-label">Category</Text>
                    <View className="category-scroll">
                      {CATEGORIES.map((cat) => (
                        <Pressable
                          key={cat}
                          onPress={() => setCategory(cat)}
                          className={clsx(
                            "category-chip",
                            category === cat && "category-chip-active",
                          )}
                        >
                          <Text
                            className={clsx(
                              "category-chip-text",
                              category === cat && "category-chip-text-active",
                            )}
                          >
                            {cat}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  {/* Submit Button */}
                  <Pressable
                    onPress={handleSubmit}
                    className={clsx(
                      "auth-button",
                      !isFormValid && "auth-button-disabled",
                    )}
                    disabled={!isFormValid}
                  >
                    <Text className="auth-button-text">
                      Create Subscription
                    </Text>
                  </Pressable>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
