import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchVisitors, searchVisitors, checkInVisitor, Visitor } from '../../services/api';
import VisitorItem from '../../components/ui/VisitorItem';

const statusTabs = ['All', 'Approved', 'Pending', 'Invited', 'Checked-in'] as const;

type StatusFilter = (typeof statusTabs)[number];

export default function VisitorsScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<StatusFilter>('All');
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchVisitors().then((list) => {
      setVisitors(list);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    searchVisitors(query, filter === 'All' ? 'All' : filter).then((list) => {
      setVisitors(list);
      setIsLoading(false);
    });
  }, [query, filter]);

  const handleCheckIn = async (id: string) => {
    setIsLoading(true);
    const updated = await checkInVisitor(id);
    if (updated) {
      setVisitors((prev) => prev.map((item) => (item.id === id ? updated : item)));
    }
    setIsLoading(false);
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Upcoming Visitors</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#64748b" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search visitor name or company"
          value={query}
          onChangeText={setQuery}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <View style={styles.filterRow}>
        {statusTabs.map((status) => (
          <TouchableOpacity
            key={status}
            style={[styles.filterChip, filter === status && styles.filterChipActive]}
            onPress={() => setFilter(status)}
          >
            <Text style={[styles.filterText, filter === status && styles.filterTextActive]}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionHeader}>Visitor list</Text>

        {isLoading ? (
          <Text style={styles.emptyText}>Loading visitors...</Text>
        ) : visitors.length === 0 ? (
          <Text style={styles.emptyText}>No visitors match your search.</Text>
        ) : (
          <FlatList
            data={visitors}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.rowWrapper}>
                <VisitorItem {...item} />
                {item.status !== 'Checked-in' ? (
                  <TouchableOpacity style={styles.checkInBtn} onPress={() => handleCheckIn(item.id)}>
                    <Text style={styles.checkInText}>Check in</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>+ Invite Visitor</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f8fafc' },
  contentContainer: { padding: 16, paddingBottom: 120 },
  title: { fontSize: 24, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  searchInput: { flex: 1, marginLeft: 8, color: '#0f172a', fontSize: 16, minHeight: 32 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  filterChip: { backgroundColor: '#e2e8f0', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, marginBottom: 8 },
  filterChipActive: { backgroundColor: '#2563eb' },
  filterText: { color: '#1e293b', fontWeight: '600', fontSize: 12 },
  filterTextActive: { color: '#ffffff' },
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 14, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 4 },
  sectionHeader: { fontSize: 16, fontWeight: '700', marginBottom: 10, color: '#0f172a' },
  rowWrapper: { marginBottom: 12 },
  checkInBtn: { alignSelf: 'flex-end', backgroundColor: '#16a34a', borderRadius: 10, paddingVertical: 6, paddingHorizontal: 12 },
  checkInText: { color: '#ffffff', fontWeight: '700' },
  emptyText: { color: '#64748b', textAlign: 'center', paddingVertical: 16 },
  actionBar: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  actionBtn: { flex: 1, backgroundColor: '#2563eb', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  actionBtnText: { color: '#ffffff', fontWeight: '700' },
});


