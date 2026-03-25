import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function History() {
  const data = [
    {
      visit_id: 1,
      visitor_name: "Rahul Sharma",
      company: "TCS",
      check_in_time: "10:00 AM",
      check_out_time: "11:30 AM",
    },
    {
      visit_id: 2,
      visitor_name: "Priya Mehta",
      company: "Infosys",
      check_in_time: "12:00 PM",
      check_out_time: null,
    },
  ];

  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(item) => item.visit_id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.visitor_name}</Text>
          <Text style={styles.text}>🏢 {item.company}</Text>
          <Text style={styles.text}>🕒 In: {item.check_in_time}</Text>
          <Text style={styles.text}>
            🚪 Out: {item.check_out_time || "Still inside"}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a',
    padding: 15,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: '#94a3b8',
    marginTop: 5,
  },
});