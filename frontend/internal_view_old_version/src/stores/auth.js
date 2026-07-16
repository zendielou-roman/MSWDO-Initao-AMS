  // src/stores/auth.js
  // Pinia auth store — dummy-data login only (no backend yet).
  // Matches email fuzzily (case-insensitive, trimmed) and password exactly against dummyUsers.js.
  // Also resolves which "side" of the app (admin vs staff) a user belongs to, so the router
  // can send them to the right layout and home page after login.
  
  import { defineStore } from 'pinia'
  import { dummyUsers, getUserSide } from '@/data/DummyUsers'
  
  export const useAuthStore = defineStore('auth', {
    state: () => ({
      user: null, // { id, name, email, role, status, ... } — no password kept in state
    }),
  
    getters: {
      isLoggedIn: (state) => !!state.user,
  
      // 'admin' | 'staff' | 'oic' | null
      side: (state) => (state.user ? getUserSide(state.user.role) : null),
  
      isAdmin: (state) => !!state.user && getUserSide(state.user.role) === 'admin',
      isStaff: (state) => !!state.user && getUserSide(state.user.role) === 'staff',
      isOIC: (state) => !!state.user && getUserSide(state.user.role) === 'oic',
  
      // Where a logged-in user should land — used by the router guard and the login redirect.
      homePath: (state) => {
        if (!state.user) return '/login'
        const side = getUserSide(state.user.role)
        if (side === 'admin') return '/dashboard'
        if (side === 'oic') return '/oic/dashboard'
        return '/staff/dashboard'
      },
    },
  
    actions: {
      // Returns { success: true } or { success: false, message } — LoginView shows the message.
      login(email, password) {
        const normalizedEmail = (email || '').trim().toLowerCase()
  
        const match = dummyUsers.find((u) => u.email.toLowerCase() === normalizedEmail)
  
        if (!match || match.password !== password) {
          return { success: false, message: 'Invalid email or password.' }
        }
        if (match.status === 'Inactive') {
          return { success: false, message: 'This account has been deactivated.' }
        }
  
        // Keep everything except the password in the logged-in user object.
        const { password: _password, ...safeUser } = match
        this.user = safeUser
  
        return { success: true }
      },
  
      logout() {
        this.user = null
      },
    },
  })