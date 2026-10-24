// Simple browser-persistent auth store
export interface User {
	id: string;
	name: string;
	email: string;
	avatar: string;
	createdAt: string;
}

export function getCurrentUser(): User | null {
	if (typeof window === 'undefined') return null;
	const saved = localStorage.getItem('copyweb_auth_user');
	if (!saved) return null;
	try {
		return JSON.parse(saved);
	} catch {
		return null;
	}
}

export function setCurrentUser(user: User | null): void {
	if (typeof window === 'undefined') return;
	if (user) {
		localStorage.setItem('copyweb_auth_user', JSON.stringify(user));
	} else {
		localStorage.removeItem('copyweb_auth_user');
	}
	window.dispatchEvent(new Event('copyweb_auth_change'));
}

export function getAllRegisteredUsers(): Array<{ email: string; passwordHash: string; user: User }> {
	if (typeof window === 'undefined') return [];
	const list = localStorage.getItem('copyweb_registered_users');
	if (!list) return [];
	try {
		return JSON.parse(list);
	} catch {
		return [];
	}
}

export function registerUser(name: string, email: string, password: string): { success: boolean; message: string; user?: User } {
	if (typeof window === 'undefined') return { success: false, message: 'Client only' };
	const users = getAllRegisteredUsers();
	const cleanEmail = email.trim().toLowerCase();
	
	if (users.some(u => u.email === cleanEmail)) {
		return { success: false, message: 'An account with this email already exists.' };
	}
	
	const newUser: User = {
		id: 'usr_' + Math.random().toString(36).substring(2, 9),
		name: name.trim(),
		email: cleanEmail,
		avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name.trim())}`,
		createdAt: new Date().toISOString()
	};
	
	users.push({
		email: cleanEmail,
		passwordHash: password, // For client demonstration
		user: newUser
	});
	
	localStorage.setItem('copyweb_registered_users', JSON.stringify(users));
	setCurrentUser(newUser);
	return { success: true, message: 'Account created successfully!', user: newUser };
}

export function authenticateUser(email: string, password: string): { success: boolean; message: string; user?: User } {
	if (typeof window === 'undefined') return { success: false, message: 'Client only' };
	const users = getAllRegisteredUsers();
	const cleanEmail = email.trim().toLowerCase();
	
	// Default mock admin / demo account if empty
	if (users.length === 0 && cleanEmail === 'demo@copyweb.com' && password === 'password123') {
		const demoUser: User = {
			id: 'usr_demo',
			name: 'Demo Shopper',
			email: 'demo@copyweb.com',
			avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=DemoShopper',
			createdAt: new Date().toISOString()
		};
		setCurrentUser(demoUser);
		return { success: true, message: 'Logged in as Demo Shopper', user: demoUser };
	}
	
	const matched = users.find(u => u.email === cleanEmail && u.passwordHash === password);
	if (!matched) {
		return { success: false, message: 'Invalid email or password.' };
	}
	
	setCurrentUser(matched.user);
	return { success: true, message: 'Welcome back!', user: matched.user };
}

export function logoutUser(): void {
	setCurrentUser(null);
}
