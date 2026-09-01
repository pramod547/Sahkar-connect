import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Modal, TextInput } from 'react-native';

export default function WelfareScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [claimCategory, setClaimCategory] = useState<'medical' | 'accident' | 'equipment' | 'other'>('medical');
  const [description, setDescription] = useState('');

  const welfareData = {
    societyFundBalance: '₹25,000.00',
    myClaims: [
      { id: 'clm-1', category: 'Medical Assistance', amount: '₹5,000.00', status: 'approved', date: '2026-08-15' },
    ],
  };

  const handleFileClaim = () => {
    setModalVisible(false);
    setDescription('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Society Welfare Fund</Text>
        <Text style={styles.headerSubtitle}>Cooperative Safety Net & Equipment Support</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.fundCard}>
          <Text style={styles.fundLabel}>Society Welfare Pool Balance</Text>
          <Text style={styles.fundBalance}>{welfareData.societyFundBalance}</Text>
          <Text style={styles.fundInfo}>
            Funded by 4% contribution from every completed job in your society.
          </Text>

          <TouchableOpacity style={styles.claimButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.claimButtonText}>+ File Welfare Claim</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>My Claims History</Text>

        {welfareData.myClaims.map((claim) => (
          <View key={claim.id} style={styles.claimCard}>
            <View>
              <Text style={styles.categoryText}>{claim.category}</Text>
              <Text style={styles.dateText}>{claim.date}</Text>
            </View>
            <View style={styles.claimRight}>
              <Text style={styles.amountText}>{claim.amount}</Text>
              <Text style={styles.statusApproved}>APPROVED</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* File Welfare Claim Modal (COOP_BUSINESS_LOGIC.md §4) */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>File Welfare Claim</Text>
            <Text style={styles.modalSub}>Reviewed & approved by your Society Admin</Text>

            <Text style={styles.inputLabel}>Claim Category</Text>
            <View style={styles.categoryContainer}>
              {(['medical', 'accident', 'equipment', 'other'] as const).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.catChip, claimCategory === cat && styles.catChipActive]}
                  onPress={() => setClaimCategory(cat)}
                >
                  <Text style={[styles.catText, claimCategory === cat && styles.catTextActive]}>
                    {cat.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Claim Description</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder="Describe the medical, accident, or equipment loss reason..."
              value={description}
              onChangeText={setDescription}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleFileClaim}>
                <Text style={styles.submitText}>Submit Claim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBF7EF' },
  header: { backgroundColor: '#0B4F4A', padding: 20, paddingTop: 40 },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: '#E8A33D', fontSize: 14 },
  content: { padding: 16 },
  fundCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E8A33D',
    marginBottom: 20,
    elevation: 3,
  },
  fundLabel: { fontSize: 12, color: '#666666', fontWeight: 'bold', textTransform: 'uppercase' },
  fundBalance: { fontSize: 28, fontWeight: 'bold', color: '#0B4F4A', marginTop: 4 },
  fundInfo: { fontSize: 12, color: '#666666', marginTop: 4, marginBottom: 16 },
  claimButton: { backgroundColor: '#0B4F4A', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  claimButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#0B4F4A', marginBottom: 12 },
  claimCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1,
  },
  categoryText: { fontSize: 14, fontWeight: 'bold', color: '#2B2B2B' },
  dateText: { fontSize: 12, color: '#888888', marginTop: 2 },
  claimRight: { alignItems: 'flex-end' },
  amountText: { fontSize: 15, fontWeight: 'bold', color: '#0B4F4A' },
  statusApproved: { fontSize: 10, fontWeight: 'bold', color: '#2E8B57', backgroundColor: '#E8F5E9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#0B4F4A' },
  modalSub: { fontSize: 12, color: '#666666', marginBottom: 16 },
  inputLabel: { fontSize: 12, fontWeight: 'bold', color: '#2B2B2B', marginTop: 10, marginBottom: 6 },
  categoryContainer: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  catChip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#F9FAFB' },
  catChipActive: { borderColor: '#0B4F4A', backgroundColor: '#0B4F4A' },
  catText: { fontSize: 10, fontWeight: 'bold', color: '#666666' },
  catTextActive: { color: '#FFFFFF' },
  textArea: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 10, textAlignVertical: 'top', height: 80, fontSize: 13 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 16 },
  cancelBtn: { padding: 10 },
  cancelText: { color: '#666666' },
  submitBtn: { backgroundColor: '#E8A33D', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  submitText: { color: '#FFFFFF', fontWeight: 'bold' },
});
