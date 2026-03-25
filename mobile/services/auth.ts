export type UserRole = 'security' | 'supervisor' | 'admin';

export type AuthSession = {
  mobile: string;
  role: UserRole;
};

let currentSession: AuthSession | null = null;
const otpStore = new Map<string, string>();

const roleMap: Record<string, UserRole> = {
  '9000000000': 'admin',
  '9000000001': 'supervisor',
};

const defaultRole: UserRole = 'security';

export function getCurrentUser(): AuthSession | null {
  return currentSession;
}

export function logout(): void {
  currentSession = null;
  otpStore.clear();
}

export async function sendOtp(mobile: string): Promise<{ success: boolean; message: string; otp?: string }> {
  if (!/^[0-9]{10}$/.test(mobile)) {
    return { success: false, message: 'Enter a valid 10-digit mobile number' };
  }

  const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
  otpStore.set(mobile, otp);
  console.log('[AUTH] sendOtp - Mobile:', mobile, 'OTP:', otp, 'Stored:', otpStore.get(mobile));

  // Simulate SMS delivery delay
  await new Promise((resolve) => setTimeout(resolve, 650));

  return { success: true, message: 'OTP sent successfully', otp };
}

export async function verifyOtp(mobile: string, otp: string): Promise<{ success: boolean; message: string; session?: AuthSession }> {
  console.log('[AUTH] verifyOtp - Mobile:', mobile, 'OTP entered:', otp);
  console.log('[AUTH] otpStore contents:', Array.from(otpStore.entries()));
  
  if (!otpStore.has(mobile)) {
    console.log('[AUTH] Mobile not found in otpStore');
    return { success: false, message: 'No OTP request found. Please request OTP again.' };
  }

  const expected = otpStore.get(mobile);
  console.log('[AUTH] Expected OTP:', expected, 'Match:', otp === expected);
  
  if (otp !== expected) {
    return { success: false, message: 'Incorrect OTP. Please try again.' };
  }

  // Simulate role lookup
  await new Promise((resolve) => setTimeout(resolve, 650));

  const role = roleMap[mobile] ?? defaultRole;
  const session: AuthSession = { mobile, role };
  currentSession = session;
  otpStore.delete(mobile);

  return { success: true, message: 'Login successful', session };
}
