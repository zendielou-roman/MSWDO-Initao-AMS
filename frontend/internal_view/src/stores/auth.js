// src/stores/auth.js
import { defineStore } from 'pinia'
import { roleConfig } from '@/config/roleConfig'
import { mockUsers } from '@/data/mockUsers'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('mswdo_user')) || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    canApprove: (state) => (state.user ? roleConfig[state.user.role].canApprove : false),
    sidebarItems: (state) => (state.user ? roleConfig[state.user.role].sidebar : []),
    roleLabel: (state) => (state.user ? roleConfig[state.user.role].label : ''),
  },

  actions: {
    // Synchronous mock login — matches LoginView.vue's `const result = auth.login(...)` call.
    // Swap the inside for a real Axios POST later; keep the same { success, message } shape
    // so LoginView.vue doesn't need to change when the backend is ready.
    login(email, password) {
      const found = mockUsers.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
      )

      if (!found) {
        return { success: false, message: 'Invalid email or password.' }
      }

      const { password: _pw, ...safeUser } = found
      this.user = safeUser
      localStorage.setItem('mswdo_user', JSON.stringify(safeUser))
      return { success: true }
    },

    logout() {
      this.user = null
      localStorage.removeItem('mswdo_user')
    },
  },
})
