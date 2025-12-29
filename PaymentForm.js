import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";

export default function PaymentForm() {
  const [loanId, setLoanId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const submitPayment = async () => {
    if (!loanId || !amount) {
      Alert.alert("Error", "Please enter loan ID and amount");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      Alert.alert("Error", "Enter a valid payment amount");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loanId,
          amount: Number(amount),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment failed");
      }

      Alert.alert("Success", "Payment submitted successfully");
      setLoanId("");
      setAmount("");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Customer Loan Details</Text>

        <Text style={styles.section}>Make a Payment</Text>

        <TextInput
          value={loanId}
          onChangeText={setLoanId}
          placeholder="Loan Account Number"
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Amount (₹)"
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={submitPayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Submit Payment</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#FAFAFA",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
