import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';

interface JobOfferCardProps {
  offer: {
    id: string;
    serviceName: string;
    address: string;
    distanceKm: number;
    totalPrice: number;
    workerPayout: number;
    timeoutSeconds?: number;
  };
  onAccept: (offerId: string) => void;
  onReject: (offerId: string, reason: string) => void;
}

export function JobOfferCard({ offer, onAccept, onReject }: JobOfferCardProps) {
  const [timeLeft, setTimeLeft] = useState(offer.timeoutSeconds || 45);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('Too far');

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleConfirmReject = () => {
    setRejectModalVisible(false);
    onReject(offer.id, rejectReason);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>NEW JOB OFFER</Text>
        </View>
        <Text style={styles.timer}>{timeLeft}s left</Text>
      </View>

      <Text style={styles.title}>{offer.serviceName}</Text>
      <Text style={styles.address}>{offer.address} ({offer.distanceKm} km away)</Text>

      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.priceLabel}>Your 88% Take-Home</Text>
          <Text style={styles.payout}>₹{offer.workerPayout.toFixed(2)}</Text>
        </View>
        <Text style={styles.totalPrice}>Customer pays ₹{offer.totalPrice.toFixed(2)}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => setRejectModalVisible(true)}
        >
          <Text style={styles.rejectText}>Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => onAccept(offer.id)}
        >
          <Text style={styles.acceptText}>Accept Job</Text>
        </TouchableOpacity>
      </View>

      {/* Reject Reason Modal (COOP_BUSINESS_LOGIC.md §1.2 feedback loop) */}
      <Modal visible={rejectModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reason for Rejection</Text>
            <Text style={styles.modalSub}>Helps Fair-Match tune future offers</Text>

            {['Too far', 'Busy on another personal work', 'Vehicle issue', 'Other'].map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.reasonOption, rejectReason === r && styles.reasonSelected]}
                onPress={() => setRejectReason(r)}
              >
                <Text style={styles.reasonText}>{r}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelModalBtn}
                onPress={() => setRejectModalVisible(false)}
              >
                <Text style={styles.cancelModalText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmRejectBtn} onPress={handleConfirmReject}>
                <Text style={styles.confirmRejectText}>Confirm Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#C67B4C',
    marginBottom: 16,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#C67B4C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  timer: {
    color: '#C67B4C',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E4B',
  },
  address: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
    marginBottom: 12,
  },
  priceContainer: {
    backgroundColor: '#F5ECD7',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 11,
    color: '#666666',
  },
  payout: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E4B',
  },
  totalPrice: {
    fontSize: 11,
    color: '#888888',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C67B4C',
    alignItems: 'center',
  },
  rejectText: {
    color: '#C67B4C',
    fontWeight: 'bold',
  },
  acceptButton: {
    flex: 2,
    backgroundColor: '#1B5E4B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FEFAF3',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E4B',
  },
  modalSub: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 16,
  },
  reasonOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  reasonSelected: {
    borderColor: '#1B5E4B',
    backgroundColor: '#F5ECD7',
  },
  reasonText: {
    fontSize: 14,
    color: '#2B2B2B',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 12,
  },
  cancelModalBtn: {
    padding: 10,
  },
  cancelModalText: {
    color: '#666666',
  },
  confirmRejectBtn: {
    backgroundColor: '#C67B4C',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  confirmRejectText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
