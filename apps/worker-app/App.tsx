import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { JobOfferCard } from './components/JobOfferCard';

export default function App() {
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [activeOffer, setActiveOffer] = useState<{
    id: string;
    serviceName: string;
    address: string;
    distanceKm: number;
    totalPrice: number;
    workerPayout: number;
  } | null>({
    id: 'offer-881',
    serviceName: 'Fan Installation & Repair',
    address: 'Bandra West, Mumbai',
    distanceKm: 1.2,
    totalPrice: 350.0,
    workerPayout: 308.0, // 88%
  });

  const [activeJobStatus, setActiveJobStatus] = useState<'none' | 'en_route' | 'arrived' | 'in_progress' | 'completed'>('none');

  const handleAcceptOffer = (offerId: string) => {
    setActiveOffer(null);
    setActiveJobStatus('en_route');
  };

  const handleRejectOffer = (offerId: string, reason: string) => {
    console.log(`Rejected offer ${offerId} with reason: ${reason}`);
    setActiveOffer(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SahakarWorker</Text>
        <Text style={styles.headerSubtitle}>Cooperative Member Portal</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* On Duty Toggle */}
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

        {/* Live Job Offer Bottom-sheet / Card Overlay */}
        {isOnDuty && activeOffer && activeJobStatus === 'none' && (
          <JobOfferCard
            offer={activeOffer}
            onAccept={handleAcceptOffer}
            onReject={handleRejectOffer}
          />
        )}

        {/* Active Job Progression UI */}
        {activeJobStatus !== 'none' && (
          <View style={styles.activeJobCard}>
            <Text style={styles.jobCardBadge}>ACTIVE ASSIGNMENT</Text>
            <Text style={styles.jobTitle}>Fan Installation & Repair</Text>
            <Text style={styles.jobAddress}>Bandra West, Mumbai</Text>

            <View style={styles.statusButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.statusBtn,
                  activeJobStatus === 'en_route' && styles.statusBtnActive,
                ]}
                onPress={() => setActiveJobStatus('en_route')}
              >
                <Text style={styles.statusBtnText}>1. En Route</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.statusBtn,
                  activeJobStatus === 'arrived' && styles.statusBtnActive,
                ]}
                onPress={() => setActiveJobStatus('arrived')}
              >
                <Text style={styles.statusBtnText}>2. Arrived</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.statusBtn,
                  activeJobStatus === 'in_progress' && styles.statusBtnActive,
                ]}
                onPress={() => setActiveJobStatus('in_progress')}
              >
                <Text style={styles.statusBtnText}>3. In Progress</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.statusBtnSuccess,
                  activeJobStatus === 'completed' && styles.statusBtnActiveSuccess,
                ]}
                onPress={() => setActiveJobStatus('completed')}
              >
                <Text style={styles.statusBtnSuccessText}>4. Complete Job</Text>
              </TouchableOpacity>
            </View>

            {activeJobStatus === 'completed' && (
              <View style={styles.completionBanner}>
                <Text style={styles.completionText}>✓ Job Completed! ₹308.00 added to payout ledger.</Text>
              </View>
            )}
          </View>
        )}

        {/* Cooperative Fairness Meter (design.md §4) */}
        <View style={styles.fairnessCard}>
          <Text style={styles.fairnessTitle}>Cooperative Fairness Meter</Text>
          <Text style={styles.fairnessSubtitle}>Your jobs this week vs Society Median</Text>
          <View style={styles.barContainer}>
            <View style={[styles.barFill, { width: '40%' }]} />
          </View>

          <View style={styles.meterLegend}>
            <Text style={styles.legendText}>You: 2 jobs</Text>
            <Text style={styles.legendText}>Society Median: 3 jobs</Text>
          </View>
          <Text style={styles.fairnessBadge}>High Dispatch Priority</Text>
        </View>
      </ScrollView>
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
  activeJobCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#0B4F4A',
    marginBottom: 16,
    elevation: 3,
  },
  jobCardBadge: {
    backgroundColor: '#0B4F4A',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B4F4A',
  },
  jobAddress: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 16,
  },
  statusButtonsContainer: {
    gap: 8,
  },
  statusBtn: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statusBtnActive: {
    backgroundColor: '#0B4F4A',
    borderColor: '#0B4F4A',
  },
  statusBtnText: {
    color: '#2B2B2B',
    fontWeight: 'bold',
    fontSize: 13,
  },
  statusBtnSuccess: {
    backgroundColor: '#2E8B57',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  statusBtnActiveSuccess: {
    backgroundColor: '#1E5B37',
  },
  statusBtnSuccessText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  completionBanner: {
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  completionText: {
    color: '#2E8B57',
    fontWeight: 'bold',
    fontSize: 12,
  },
  fairnessCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#147D74',
    elevation: 2,
    marginBottom: 20,
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
