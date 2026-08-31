import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isOnDuty, setIsOnDuty] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SahakarWorker</Text>
        <Text style={styles.headerSubtitle}>Cooperative Member Portal</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.dutyCard}>
          <View>
            <Text style={styles.dutyTitle}>Duty Status</Text>
            <Text style={styles.dutySubtitle}>
              {isOnDuty ? 'Receiving job offers in 8km radius' : 'Off-duty'}
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#147D74' }}
            thumbColor={isOnDuty ? '#E8A33D' : '#f4f3f4'}
            onValueChange={setIsOnDuty}
            value={isOnDuty}
          />
        </View>

        {/* FairnessMeter Widget (design.md §4) */}
        <View style={styles.fairnessCard}>
          <Text style={styles.fairnessTitle}>Cooperative Fairness Meter</Text>
          <Text style={styles.fairnessSubtitle}>Your jobs this week vs Society Median</Text>
          <View style={styles.barContainer}>
            <View style={[styles.barFill, { width: '40%' }]} />
          </View>

          <View style={styles.meterLegend}>
            <Text style={styles.legendText}>You: 2 jobs</Text>
            <Text style={styles.legendText}>Median: 3 jobs</Text>
          </View>
          <Text style={styles.fairnessBadge}>High Dispatch Priority</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7EF',
  },
  header: {
    backgroundColor: '#0B4F4A',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#E8A33D',
    fontSize: 14,
  },
  content: {
    padding: 16,
  },
  dutyCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  dutyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2B2B2B',
  },
  dutySubtitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  fairnessCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#147D74',
    elevation: 2,
  },
  fairnessTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B4F4A',
  },
  fairnessSubtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 12,
  },
  barContainer: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#147D74',
  },
  meterLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#4B5563',
  },
  fairnessBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8A33D',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
});
