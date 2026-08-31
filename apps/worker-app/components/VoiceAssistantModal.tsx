import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

interface VoiceAssistantModalProps {
  visible: boolean;
  onClose: () => void;
  onCommandRecognized: (command: string) => void;
}

export function VoiceAssistantModal({ visible, onClose, onCommandRecognized }: VoiceAssistantModalProps) {
  const [language, setLanguage] = useState<'hi' | 'mr'>('hi');
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  const simulateSpeechRecognition = (commandType: 'on_duty' | 'accept_job' | 'job_done') => {
    setIsListening(true);
    setRecognizedText('Listening... (आवाज ऐकत आहे)');

    setTimeout(() => {
      setIsListening(false);
      if (commandType === 'on_duty') {
        const text = language === 'hi' ? 'ड्यूटी चालू करें (Duty On)' : 'ड्यूटी सुरू करा (Duty On)';
        setRecognizedText(text);
        onCommandRecognized('duty_on');
      } else if (commandType === 'accept_job') {
        const text = language === 'hi' ? 'काम स्वीकारें (Accept Job)' : 'काम स्वीकारा (Accept Job)';
        setRecognizedText(text);
        onCommandRecognized('accept_job');
      } else if (commandType === 'job_done') {
        const text = language === 'hi' ? 'काम पूरा हुआ (Complete Job)' : 'काम पूर्ण झाले (Complete Job)';
        setRecognizedText(text);
        onCommandRecognized('job_done');
      }
    }, 1200);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Sahakar Voice Assistant</Text>
          <Text style={styles.subtitle}>
            {language === 'hi' ? 'आवाज़ से काम चलाएं (हिंदी)' : 'आवाजाने काम चालवा (मराठी)'}
          </Text>

          {/* Language Selector */}
          <View style={styles.langContainer}>
            <TouchableOpacity
              style={[styles.langChip, language === 'hi' && styles.langChipActive]}
              onPress={() => setLanguage('hi')}
            >
              <Text style={[styles.langText, language === 'hi' && styles.langTextActive]}>हिंदी (Hindi)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langChip, language === 'mr' && styles.langChipActive]}
              onPress={() => setLanguage('mr')}
            >
              <Text style={[styles.langText, language === 'mr' && styles.langTextActive]}>मराठी (Marathi)</Text>
            </TouchableOpacity>
          </View>

          {/* Feedback Display */}
          <View style={styles.speechBox}>
            <Text style={styles.speechText}>
              {recognizedText || 'Tap a voice command below to speak'}
            </Text>
          </View>

          {/* Quick Voice Command Triggers (INTEGRATIONS.md §9 fixed grammar) */}
          <View style={styles.commandList}>
            <TouchableOpacity
              style={styles.commandBtn}
              onPress={() => simulateSpeechRecognition('on_duty')}
            >
              <Text style={styles.commandBtnText}>
                🎤 "{language === 'hi' ? 'ड्यूटी चालू करें' : 'ड्यूटी सुरू करा'}"
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.commandBtn}
              onPress={() => simulateSpeechRecognition('accept_job')}
            >
              <Text style={styles.commandBtnText}>
                🎤 "{language === 'hi' ? 'काम स्वीकारें' : 'काम स्वीकारा'}"
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.commandBtn}
              onPress={() => simulateSpeechRecognition('job_done')}
            >
              <Text style={styles.commandBtnText}>
                🎤 "{language === 'hi' ? 'काम पूरा हुआ' : 'काम पूर्ण झाले'}"
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>Close Voice Assistant</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  content: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#0B4F4A', textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#E8A33D', fontWeight: 'bold', textAlign: 'center', marginTop: 2, marginBottom: 16 },
  langContainer: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 16 },
  langChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#F9FAFB' },
  langChipActive: { backgroundColor: '#0B4F4A', borderColor: '#0B4F4A' },
  langText: { fontSize: 12, fontWeight: 'bold', color: '#666666' },
  langTextActive: { color: '#FFFFFF' },
  speechBox: { backgroundColor: '#FBF7EF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E8A33D', minHeight: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  speechText: { fontSize: 14, fontWeight: 'bold', color: '#0B4F4A', textAlign: 'center' },
  commandList: { gap: 10, marginBottom: 20 },
  commandBtn: { backgroundColor: '#F3F4F6', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  commandBtnText: { fontSize: 14, fontWeight: 'bold', color: '#0B4F4A' },
  closeBtn: { paddingVertical: 12, alignItems: 'center' },
  closeBtnText: { color: '#C0392B', fontWeight: 'bold', fontSize: 14 },
});
