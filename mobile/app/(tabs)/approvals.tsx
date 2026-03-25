import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type ApprovalItem = {
  id: string;
  visitor: string;
  company: string;
  purpose: string;
  time: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

const initialApprovals: ApprovalItem[] = [
  { id: '1', visitor: 'Rahul Sharma', company: 'Wipro', purpose: 'Contract Sign-off', time: '10:30 AM', status: 'Pending' },
  { id: '2', visitor: 'Pranav Nagur', company: 'Capgemini', purpose: 'Client Presentation', time: '11:15 AM', status: 'Pending' },
  { id: '3', visitor: 'Sneha Reddy', company: 'InnovaTech', purpose: 'Maintenance Review', time: '1:00 PM', status: 'Approved' },
  { id: '4', visitor: 'Karan Patel', company: 'ByteWorks', purpose: 'Vendor Meeting', time: '3:00 PM', status: 'Rejected' },
];

const statusTabs = ['All', 'Pending', 'Approved', 'Rejected'] as const;

type StatusFilter = (typeof statusTabs)[number];

export default function Approvals() {
  const [approvals, setApprovals] = useState<ApprovalItem[]>(initialApprovals);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<StatusFilter>('All');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return approvals.filter((item) => {
      const matchText =
        !q ||
        item.visitor.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q) ||
        item.purpose.toLowerCase().includes(q);

      const matchStatus = filter === 'All' || item.status === filter;
      return matchText && matchStatus;
    });
  }, [approvals, search, filter]);

  const updateStatus = (id: string, status: ApprovalItem['status']) => {
    setApprovals((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    Alert.alert('Status updated', `Request has been ${status.toLowerCase()}.`);
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Approvals</Text>

      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color="#64748b" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search visitor, company or purpose"
          placeholderTextColor="#94a3b8"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.filterRow}>
        {statusTabs.map((status) => (
          <TouchableOpacity
            key={status}
            style={[styles.filterChip, status === filter && styles.filterChipActive]}
            onPress={() => setFilter(status)}
          >
            <Text style={[styles.filterText, status === filter && styles.filterTextActive]}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        style={styles.list}
        data={filtered}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No approvals found.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.name}>{item.visitor}</Text>
              <Text style={[styles.status, item.status === 'Pending' ? styles.pending : item.status === 'Approved' ? styles.approved : styles.rejected]}>
                {item.status}
              </Text>
            </View>

            <Text style={styles.meta}>🏢 {item.company} • ⏰ {item.time}</Text>
            <Text style={styles.purpose}>📝 {item.purpose}</Text>

            {item.status === 'Pending' ? (
              <View style={styles.buttons}>
                <TouchableOpacity style={[styles.actionButton, styles.approveBtn]} onPress={() => updateStatus(item.id, 'Approved')}>
                  <Text style={styles.actionText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.rejectBtn]} onPress={() => updateStatus(item.id, 'Rejected')}>
                  <Text style={styles.actionText}>Reject</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f8fafc' },
  contentContainer: { padding: 16, paddingBottom: 120 },
  title: { fontSize: 24, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  searchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', paddingVertical: 8, paddingHorizontal: 12, marginBottom: 12 },
  searchInput: { flex: 1, marginLeft: 8, color: '#0f172a', fontSize: 16 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  filterChip: { backgroundColor: '#e2e8f0', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, marginRight: 8, marginBottom: 8 },
  filterChipActive: { backgroundColor: '#2563eb' },
  filterText: { color: '#1e293b', fontWeight: '600', fontSize: 12 },
  filterTextActive: { color: '#ffffff' },
  list: { width: '100%' },
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 4 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  name: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  status: { fontSize: 12, fontWeight: '700', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999, overflow: 'hidden', color: '#fff' },
  pending: { backgroundColor: '#f59e0b' },
  approved: { backgroundColor: '#16a34a' },
  rejected: { backgroundColor: '#ef4444' },
  meta: { color: '#64748b', marginBottom: 8 },
  purpose: { color: '#334155', marginBottom: 10 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  actionButton: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  approveBtn: { backgroundColor: '#16a34a' },
  rejectBtn: { backgroundColor: '#ef4444' },
  actionText: { color: '#ffffff', fontWeight: '700' },
  emptyText: { textAlign: 'center', color: '#64748b', marginTop: 24, paddingVertical: 16 },
});