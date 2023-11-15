
import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Alert, StyleSheet, Pressable } from 'react-native';

const App = () => {
  const [morningUsage, setMorningUsage] = useState('');
  const [afternoonUsage, setAfternoonUsage] = useState('');
  const [eveningUsage, setEveningUsage] = useState('');
  const [renewableEnergy, setRenewableEnergy] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [billAmount, setBillAmount] = useState(0);
  const [totalUsageCharge, setTotalUsageCharge] = useState('');
  const [salesTax, setSalesTax] = useState('');
  const [morningCharge, setMorningCharge] = useState('');
  const [afternoonCharge, setAfternoonCharge] = useState('');
  const [eveningCharge, setEveningCharge] = useState('');
  const [environmentalRebate, setEnvironmentalRebate] = useState('');
  const [totalRegulatoryCharges, setTotalRegulatoryCharges] = useState('');

  const calculateBill = () => {
    if (!morningUsage || !afternoonUsage || !eveningUsage) {
      Alert.alert('Error', 'Please enter values for all usage fields.');
      return;
    }

    const morningCharge = parseFloat(morningUsage) * 0.132;
    const afternoonCharge = parseFloat(afternoonUsage) * 0.065;
    const eveningCharge = parseFloat(eveningUsage) * 0.094;
    const totalUsageCharge = morningCharge + afternoonCharge + eveningCharge;
    const salesTax = totalUsageCharge * 0.13;
    const environmentalRebate = renewableEnergy ? (totalUsageCharge * 0.08) : 0;
    const totalRegulatoryCharges = salesTax - environmentalRebate;
    const totalBillAmount = totalUsageCharge + totalRegulatoryCharges;

    setMorningCharge(morningCharge.toFixed(2));
    setAfternoonCharge(afternoonCharge.toFixed(2));
    setEveningCharge(eveningCharge.toFixed(2));
    setTotalUsageCharge(totalUsageCharge.toFixed(2));
    setSalesTax(salesTax.toFixed(2));
    setEnvironmentalRebate(environmentalRebate.toFixed(2));
    setTotalRegulatoryCharges(totalRegulatoryCharges.toFixed(2));
    setBillAmount(totalBillAmount.toFixed(2));
    setShowResults(true); // Show the calculation results
  };

  const resetFields = () => {
    setMorningUsage('');
    setAfternoonUsage('');
    setEveningUsage('');
    setRenewableEnergy(false);
    setBillAmount(0);
    setShowResults(false); // Hide the calculation results when fields are reset
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Morning Usage (kwh)</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Enter morning usage'
        value={morningUsage}
        onChangeText={setMorningUsage}
      />

      <Text style={styles.label}>Afternoon Usage (kwh)</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Enter afternoon usage'
        value={afternoonUsage}
        onChangeText={setAfternoonUsage}
      />

      <Text style={styles.label}>Evening Usage (kwh)</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Enter evening usage'
        value={eveningUsage}
        onChangeText={setEveningUsage}
      />
      
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Renewable Energy?     </Text>
        <Switch
          value={renewableEnergy}
          onValueChange={setRenewableEnergy}
        />
      </View>


    <View style={styles.buttonContainer}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'lightgray' : '#2196F3',
            borderRadius: 5,
            padding: 10,
            width: '40%',
          },
        ]}
        onPress={calculateBill}
      >
        <Text style={styles.buttonText}>Calculate</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'lightgray' : '#FFC107',
            borderRadius: 5,
            padding: 10,
            width: '40%',
          },
        ]}
        onPress={resetFields}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </Pressable>
    </View>

    {
      showResults && (
        <View style={styles.resultContainer}>
          <Text style={[styles.resultTitle, { backgroundColor: 'yellow' }]}>Charge Breakdown</Text>
          <Text style={styles.result}>Morning Usage Charge: ${morningCharge}</Text>
          <Text style={styles.result}>Afternoon Usage Charge: ${afternoonCharge}</Text>
          <Text style={styles.result}>Evening Usage Charge: ${eveningCharge}</Text>
          <Text style={[styles.result, { color: 'blue' ,fontWeight: 'bold'}]}>Total Usage Charges (kwh): ${totalUsageCharge}</Text>
          <Text style={styles.result}>Sales Tax: ${salesTax}</Text>
          <Text style={styles.result}>Environmental Rebate: ${environmentalRebate}</Text>
          <Text style={styles.result}>Total Regulatory Charges Charge: ${totalRegulatoryCharges}</Text>
          <Text style={[styles.resultTitle, { backgroundColor: 'yellow' }]}>You Must Pay: ${billAmount}</Text>
        </View>
      )
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  switchLabel: {
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },  
  result: {
    marginTop: 20,
    fontSize: 18,
  },
  resultContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  resultContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'yellow',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  result: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;
