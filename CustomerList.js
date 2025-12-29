import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://YOUR_BACKEND_URL:5000/customers';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setCustomers(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customer Loan Details</Text>
      <FlatList
        data={customers}
        keyExtractor={item => item.account_number}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Account: {item.account_number}</Text>
            <Text>Issue Date: {item.issue_date}</Text>
            <Text>Interest Rate: {item.interest_rate}%</Text>
            <Text>Tenure: {item.tenure} months</Text>
            <Text>EMI Due: ${item.emi_due}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: { backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8 },
});
