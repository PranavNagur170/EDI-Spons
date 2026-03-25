import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type VisitorItemProps = {
  id: string;
  name: string;
  company: string;
  time: string;
  status: 'Approved' | 'Pending' | 'Invited' | 'Checked-in';
};

const statusStyle = {
  Approved: { backgroundColor: '#dcfce7', color: '#16a34a' },
  Pending: { backgroundColor: '#fef3c7', color: '#b45309' },
  Invited: { backgroundColor: '#dbeafe', color: '#1d4ed8' },
  'Checked-in': { backgroundColor: '#d1fae5', color: '#047857' },
};

export default function VisitorItem({ id, name, company, time, status }: VisitorItemProps) {
  return (
    <View style={styles.container} key={id}>
      <View style={styles.meta}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.company}>{company} • {time}</Text>
      </View>
      <View style={[styles.statusPill, { backgroundColor: statusStyle[status].backgroundColor }]}> 
        <Text style={[styles.statusText, { color: statusStyle[status].color }]}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  meta: { flex: 1, marginRight: 8 },
  name: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  company: { marginTop: 2, color: '#64748b' },
  statusPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 12, fontWeight: '700' },
});
