import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

export default function PayoutsScreen() {
  const payoutSummary = {
    pendingTotal: '₹616.00',
    paidTotal: '₹3,450.00',
    history: [
      { id: 'pay-1', date: '2026-08-30', service: 'Fan Installation', amount: '₹308.00', status: 'pending' },
      { id: 'pay-2', date: '2026-08-29', service: 'Switchboard Repair', amount: '₹308.00', status: 'pending' },
      { id: 'pay-3', date: '2026-08-25', service: 'House Rewiring', amount: '₹1,056.00', status: 'paid' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payout Ledger</Text>
        <Text style={styles.headerSubtitle}>Direct 88% Take-Home Earnings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Pending Payout</Text>
            <Text style={styles.summaryValuePending}>{payoutSummary.pendingTotal}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Paid Out (Total)</Text>
            <Text style={styles.summaryValuePaid}>{payoutSummary.paidTotal}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Earnings</Text>

        {payoutSummary.history.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <View>
              <Text style={styles.serviceName}>{item.service}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>{item.amount}</Text>
              <Text
                style={[
                  styles.statusBadge,
                  item.status === 'paid' ? styles.statusPaid : styles.statusPending,
                ]}
              >
                {item.status.toUpperCase()}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 Payouts are transferred automatically to your registered bank account every Tuesday per Society rules.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBF7EF' },
  header: { backgroundColor: '#0B4F4A', padding: 20, paddingTop: 40 },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: '#E8A33D', fontSize: 14 },
  content: { padding: 16 },
  summaryContainer: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  summaryBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  summaryLabel: { fontSize: 12, color: '#666666' },
  summaryValuePending: { fontSize: 20, fontWeight: 'bold', color: '#E8A33D', marginTop: 4 },
  summaryValuePaid: { fontSize: 20, fontWeight: 'bold', color: '#2E8B57', marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#0B4F4A', marginBottom: 12 },
  historyCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1,
  },
  serviceName: { fontSize: 14, fontWeight: 'bold', color: '#2B2B2B' },
  dateText: { fontSize: 12, color: '#888888', marginTop: 2 },
  amountContainer: { alignItems: 'flex-end' },
  amountText: { fontSize: 16, fontWeight: 'bold', color: '#0B4F4A' },
  statusBadge: { fontSize: 10, fontWeight: 'bold', marginTop: 2, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  statusPaid: { backgroundColor: '#E8F5E9', color: '#2E8B57' },
  statusPending: { backgroundColor: '#FEF3C7', color: '#D97706' },
  infoBox: { backgroundColor: '#FFFFFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', marginTop: 16 },
  infoText: { fontSize: 12, color: '#666666' },
});
