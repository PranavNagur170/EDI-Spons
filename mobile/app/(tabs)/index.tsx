import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { getCurrentUser, logout } from '../../services/auth';
import { useRouter } from 'expo-router';

type StatCard = { label: string; value: number | string; icon: React.ReactNode; color: string };
const statCards: StatCard[] = [
  { label: 'Meetings', value: 5, icon: <Ionicons name="calendar" size={22} color="#3182ce" />, color: '#ebf8ff' },
  { label: 'Approvals', value: 2, icon: <Ionicons name="time" size={22} color="#d69e2e" />, color: '#fef9c3' },
  { label: 'Visitors', value: 12, icon: <Ionicons name="people" size={22} color="#16a34a" />, color: '#dcfce7' },
  { label: 'Notifications', value: 4, icon: <Ionicons name="notifications" size={22} color="#6366f1" />, color: '#e0e7ff' },
];

const upcoming = [
  { name: 'Asha Mehta', time: '10:30 AM', status: 'Approved', company: 'Acme Corp' },
  { name: 'Rohan Patil', time: '11:00 AM', status: 'Pending', company: 'Freelancer' },
  { name: 'Priya Sharma', time: '3:00 PM', status: 'Invited', company: 'Job Interview' },
];

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [locked, setLocked] = useState(true);
  const [stats, setStats] = useState({
    meetings: 5,
    pendingApprovals: 2,
    visitorsToday: 12,
    notifications: 4,
    checkedIn: 7,
    overstayed: 2,
  });

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 400);
  };

  const [role, setRole] = useState<string>('Unknown');
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setRole(user.role);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.contentContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
      <View style={styles.box}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Dashboard</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sub}>Role: {role}</Text>
        <Text style={[styles.sub, { marginTop: 4 }]}>Employee login flow complete</Text>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Today’s Overview</Text>
      <View style={styles.grid}>
        {statCards.map((card) => (
          <View key={card.label} style={styles.statCard}>
            {card.icon}
            <Text style={styles.statValue}>{card.value}</Text>
            <Text style={styles.statLabel}>{card.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Upcoming Visitors</Text>
        <FlatList
          data={upcoming}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.visitorItem}>
              <View>
                <Text style={styles.visitorName}>{item.name}</Text>
                <Text style={styles.visitorInfo}>{item.company} · {item.time}</Text>
              </View>
              <Text style={[styles.visitorStatus, item.status==='Approved' ? styles.approved : item.status==='Pending' ? styles.pending : styles.invited]}>
                {item.status}
              </Text>
            </View>
          )}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Security Actions</Text>
        <View style={styles.buttonRow}>
          {['Check-in', 'Verify', 'Scan'].map((text) => (
            <TouchableOpacity style={styles.securityBtn} key={text}>
              <Text style={styles.securityTxt}>{text}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.liveRow}>
          <Text>Live Visitors Inside</Text>
          <Text style={styles.liveNumber}>{stats.checkedIn}</Text>
        </View>
        <View style={styles.statusRow}>
          <View style={[styles.smallStatus, { backgroundColor: '#fee2e2' }]}>
            <Text style={styles.smallStatusLabel}>Overstay</Text>
            <Text style={styles.smallStatusValue}>{stats.overstayed}</Text>
          </View>
          <View style={[styles.smallStatus, { backgroundColor: '#d1fae5' }]}>
            <Text style={styles.smallStatusLabel}>Checked-in</Text>
            <Text style={styles.smallStatusValue}>{stats.checkedIn}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  box: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logoutBtn: { backgroundColor: '#ef4444', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10 },
  logoutText: { color: '#ffffff', fontWeight: '700' },
  sectionTitle: { color: '#0f172a', fontSize: 18, fontWeight: '700' },
  sub: { color: '#64748b', marginVertical: 6 },
  buttonRow: { flexDirection: 'row', gap: 8, flexWrap:'wrap', marginTop: 8 },
  actionBtn: { backgroundColor: '#3b82f6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  actionBtnText: { color: '#fff', fontWeight: '600' },
  unlockBtn: { marginTop: 10, backgroundColor: '#ef4444', padding: 10, borderRadius: 10, alignSelf:'flex-end' },
  lockedBtn: { backgroundColor: '#10b981' },
  unlockText: { color:'#fff', fontWeight:'700' },
  grid: { flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between', marginTop: 8 },
  statCard: { width:'48%', borderRadius:12, padding:12, backgroundColor:'#eff6ff', marginBottom:10 },
  statValue: { fontSize:24,fontWeight:'800',marginTop:8 },
  statLabel: { color:'#475569',marginTop:4 },
  visitorItem: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:8 },
  visitorName: { fontWeight:'700', color:'#0f172a' },
  visitorInfo: { color:'#64748b' },
  visitorStatus: { fontWeight:'700', paddingHorizontal:10, paddingVertical:4, borderRadius:10, fontSize:12 },
  approved: { color:'#16a34a', backgroundColor:'#dcfce7' },
  pending: { color:'#d97706', backgroundColor:'#fef3c7' },
  invited: { color:'#2563eb', backgroundColor:'#dbeafe' },
  securityBtn: { flex:1, marginHorizontal:4, backgroundColor:'#e2e8f0', padding:10, borderRadius:10, alignItems:'center' },
  securityTxt: { color:'#1e293b', fontWeight:'700' },
  liveRow: { flexDirection:'row', justifyContent:'space-between', marginTop:14, alignItems:'center' },
  liveNumber: { fontSize:26, fontWeight:'800', color:'#1d4ed8' },
  statusRow: { flexDirection:'row', justifyContent:'space-between', marginTop:10 },
  smallStatus: { width:'48%', padding:10, borderRadius:10 },
  smallStatusLabel: { color:'#334155', fontSize:12 },
  smallStatusValue: { fontSize:20, fontWeight:'700', marginTop:4 },
  contentContainer: { paddingBottom: 110 },
});