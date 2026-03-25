export type Visitor = {
  id: string;
  name: string;
  company: string;
  time: string;
  status: 'Approved' | 'Pending' | 'Invited' | 'Checked-in';
};

const visitorSeed: Visitor[] = [
  { id: '1', name: 'Asha Mehta', company: 'Acme Corp', time: '10:30 AM', status: 'Approved' },
  { id: '2', name: 'Rohan Patil', company: 'Freelancer', time: '11:00 AM', status: 'Pending' },
  { id: '3', name: 'Priya Sharma', company: 'Job Interview', time: '3:00 PM', status: 'Invited' },
  { id: '4', name: 'Vikram Joshi', company: 'ABC Services', time: '4:30 PM', status: 'Checked-in' },
  { id: '5', name: 'Nitya Rao', company: 'Zeta Labs', time: '5:15 PM', status: 'Approved' },
];

export async function fetchVisitors(): Promise<Visitor[]> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return [...visitorSeed];
}

export async function checkInVisitor(id: string): Promise<Visitor | null> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const visitor = visitorSeed.find((item) => item.id === id);
  if (!visitor) return null;
  visitor.status = 'Checked-in';
  return { ...visitor };
}

export async function searchVisitors(query: string, filter: Visitor['status'] | 'All'): Promise<Visitor[]> {
  const term = query.trim().toLowerCase();
  return fetchVisitors().then((list) =>
    list.filter((item) => {
      const matchesQuery = !term || item.name.toLowerCase().includes(term) || item.company.toLowerCase().includes(term);
      const matchesFilter = filter === 'All' || item.status === filter;
      return matchesQuery && matchesFilter;
    })
  );
}
