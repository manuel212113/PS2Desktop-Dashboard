<template>
  <admin-layout>
    <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">Usuarios</h2>
          <p class="text-sm text-gray-500">Gestiona los usuarios registrados</p>
        </div>
        <span class="text-sm text-gray-500">Total: {{ users.length }}</span>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <svg class="animate-spin h-8 w-8 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-800">
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Usuario</th>
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Email</th>
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Rol</th>
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Creado</th>
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
              <td class="py-3 px-2">
                <div class="flex items-center gap-3">
                  <img :src="user.avatarUrl || '/images/user/owner.jpg'" referrerpolicy="no-referrer" class="w-8 h-8 rounded-full object-cover" />
                  <span class="font-medium text-gray-800 dark:text-white/90">{{ user.displayName || user.email.split('@')[0] }}</span>
                </div>
              </td>
              <td class="py-3 px-2 text-gray-500">{{ user.email }}</td>
              <td class="py-3 px-2">
                <select :value="user.role" @change="changeRole(user, ($event.target as HTMLSelectElement).value)" class="text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-2 py-1 dark:text-white/90">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td class="py-3 px-2 text-gray-500">{{ new Date(user.createdAt).toLocaleDateString() }}</td>
              <td class="py-3 px-2">
                <Badge :color="user.role === 'admin' ? 'success' : 'light'" size="sm">{{ user.role }}</Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Badge from '@/components/ui/Badge.vue'
import { getUsers, updateUserRole } from '@/composables/useApi'

const users = ref<any[]>([])
const loading = ref(true)

const loadUsers = async () => {
  loading.value = true
  try { users.value = await getUsers() }
  catch (e) { console.error(e) }
  finally { loading.value = false }
}

const changeRole = async (user: any, role: string) => {
  try {
    await updateUserRole(user.id, role)
    user.role = role
  } catch (e: any) { alert(e.message) }
}

onMounted(loadUsers)
</script>
