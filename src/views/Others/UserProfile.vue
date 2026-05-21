<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div v-if="loading" class="flex justify-center py-12">
      <svg class="animate-spin h-8 w-8 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
    </div>
    <div v-else class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Perfil</h3>
      <ProfileCard :user="user" :avatars="avatars" @updated="onProfileUpdated" />
      <PersonalInfoCard :user="user" />
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ProfileCard from '../../components/profile/ProfileCard.vue'
import PersonalInfoCard from '../../components/profile/PersonalInfoCard.vue'
import { getCurrentUser, getAvatars } from '@/composables/useApi'

const currentPageTitle = ref('User Profile')
const loading = ref(true)
const user = ref<any>(null)
const avatars = ref<any[]>([])

async function loadProfile() {
  loading.value = true
  try {
    const [u, a] = await Promise.all([getCurrentUser(), getAvatars()])
    user.value = u
    avatars.value = a
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function onProfileUpdated(updated: any) {
  user.value = updated
  localStorage.setItem('user', JSON.stringify(updated))
}

onMounted(loadProfile)
</script>