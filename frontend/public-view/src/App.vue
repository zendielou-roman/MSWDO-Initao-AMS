<script setup>
import { ref, provide, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import CitizenCharter from './components/CitizenCharter.vue'
import AccomplishmentsSection from './components/AccomplishmentsSection.vue'
import NewsUpdates from './components/News&Updates.vue'
import ActiveOperations from './components/ActiveOperations.vue'
import AboutUs from './components/AboutUs.vue'
import OrganizationalChart from './components/OrganizationalChart.vue'
import ContactUs from './components/ContactUs.vue'
import ContactPage from './components/Contactpage.vue'
import SiteFooter from './components/Footer.vue'
import ServiceDetail from './components/ServiceDetail.vue'

const route = useRoute()
const router = useRouter()

// 'home' shows the normal page, 'contact' shows the standalone contact page
const currentView = ref(route.path === '/contact' ? 'contact' : 'home')

const isHomeView = computed(() => route.path === '/' && currentView.value === 'home')
const isContactView = computed(() => route.path === '/contact' || currentView.value === 'contact')

async function goToContact() {
  currentView.value = 'contact'
  await router.push('/contact')
  window.scrollTo(0, 0)
}

async function goToHome(sectionId = null) {
  currentView.value = 'home'

  if (route.path !== '/' || sectionId) {
    await router.push(sectionId ? { path: '/', hash: `#${sectionId}` } : '/')
  }

  await nextTick()
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

  if (sectionId) {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// child components (like the complaint banner button) can call this
// via: const goToContact = inject('goToContact')
provide('goToContact', goToContact)
provide('goToHome', goToHome)
</script>

<template>
  <div class="page">
    <SiteHeader />
    <NavBar />

    <template v-if="isHomeView">
      <section id="home"><HeroSection /></section>
      <section id="services"><ServicesSection /></section>
      <section id="charter"><CitizenCharter /></section>
      <section id="accomplishments"><AccomplishmentsSection /></section>
      <section id="news"><NewsUpdates /></section>
      <section id="operations"><ActiveOperations /></section>
      <section id="about"><AboutUs /></section>
      <section id="orgchart"><OrganizationalChart /></section>
      <section id="contact"><ContactUs /></section>
    </template>

    <template v-else-if="isContactView">
      <ContactPage />
    </template>

    <template v-else>
      <router-view />
    </template>

    <SiteFooter />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: 'Segoe UI', Roboto, Arial, sans-serif;
}
.page {
  min-height: 100vh;
  background: #e6eaf2;
}
</style>
