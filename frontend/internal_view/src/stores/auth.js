import { defineStore } from 'pinia'
import { authDummyUsers } from '../data/DummyUsers'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user:
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('sagop_user') || 'null')
        : null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin',
  },
  actions: {
    login(email, password) {
      const normalizedEmail = String(email || '')
        .trim()
        .toLowerCase()
      const normalizedPassword = String(password || '').trim()

      const found = authDummyUsers.find((u) => {
        const availableLogins = [u.email]
          .filter(Boolean)
          .map((value) => String(value).trim().toLowerCase())

        const fallbackEmail = normalizedEmail.replace(/@.*$/, '')

        return (
          availableLogins.some((value) => value === normalizedEmail || value === fallbackEmail) &&
          String(u.password || '').trim() === normalizedPassword
        )
      })

      if (!found) return false
      const { password: _, ...safeUser } = found
      this.user = safeUser
      localStorage.setItem('sagop_user', JSON.stringify(safeUser))
      return true
    },
    logout() {
      this.user = null
      localStorage.removeItem('sagop_user')
    },
  },
})
