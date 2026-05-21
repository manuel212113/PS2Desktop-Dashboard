<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12 space-y-6 xl:col-span-7">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <svg class="fill-gray-800 dark:fill-white/90" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.665 3.75621C11.8762 3.65064 12.1247 3.65064 12.3358 3.75621L18.7807 6.97856L12.3358 10.2009C12.1247 10.3065 11.8762 10.3065 11.665 10.2009L5.22014 6.97856L11.665 3.75621ZM4.29297 8.19203V16.0946C4.29297 16.3787 4.45347 16.6384 4.70757 16.7654L11.25 20.0366V11.6513C11.1631 11.6205 11.0777 11.5843 10.9942 11.5426L4.29297 8.19203ZM12.75 20.037L19.2933 16.7654C19.5474 16.6384 19.7079 16.3787 19.7079 16.0946V8.19202L13.0066 11.5426C12.9229 11.5844 12.8372 11.6208 12.75 11.6516V20.037ZM13.0066 2.41456C12.3732 2.09786 11.6277 2.09786 10.9942 2.41456L4.03676 5.89319C3.27449 6.27432 2.79297 7.05342 2.79297 7.90566V16.0946C2.79297 16.9469 3.27448 17.726 4.03676 18.1071L10.9942 21.5857L11.3296 20.9149L10.9942 21.5857C11.6277 21.9024 12.3732 21.9024 13.0066 21.5857L19.9641 18.1071C20.7264 17.726 21.2079 16.9469 21.2079 16.0946V7.90566C21.2079 7.05342 20.7264 6.27432 19.9641 5.89319L13.0066 2.41456Z" fill=""/></svg>
            </div>
            <div class="flex items-end justify-between mt-5">
              <div>
                <span class="text-sm text-gray-500 dark:text-gray-400">Juegos</span>
                <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ stats.totalGames }}</h4>
              </div>
            </div>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <svg class="fill-gray-800 dark:fill-white/90" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.80443 5.60156C7.59109 5.60156 6.60749 6.58517 6.60749 7.79851C6.60749 9.01185 7.59109 9.99545 8.80443 9.99545C10.0178 9.99545 11.0014 9.01185 11.0014 7.79851C11.0014 6.58517 10.0178 5.60156 8.80443 5.60156ZM5.10749 7.79851C5.10749 5.75674 6.76267 4.10156 8.80443 4.10156C10.8462 4.10156 12.5014 5.75674 12.5014 7.79851C12.5014 9.84027 10.8462 11.4955 8.80443 11.4955C6.76267 11.4955 5.10749 9.84027 5.10749 7.79851ZM4.86252 15.3208C4.08769 16.0881 3.70377 17.0608 3.51705 17.8611C3.48384 18.0034 3.5211 18.1175 3.60712 18.2112C3.70161 18.3141 3.86659 18.3987 4.07591 18.3987H13.4249C13.6343 18.3987 13.7992 18.3141 13.8937 18.2112C13.9797 18.1175 14.017 18.0034 13.9838 17.8611C13.7971 17.0608 13.4132 16.0881 12.6383 15.3208C11.8821 14.572 10.6899 13.955 8.75042 13.955C6.81096 13.955 5.61877 14.572 4.86252 15.3208ZM3.8071 14.2549C4.87163 13.2009 6.45602 12.455 8.75042 12.455C11.0448 12.455 12.6292 13.2009 13.6937 14.2549C14.7397 15.2906 15.2207 16.5607 15.4446 17.5202C15.7658 18.8971 14.6071 19.8987 13.4249 19.8987H4.07591C2.89369 19.8987 1.73504 18.8971 2.05628 17.5202C2.28015 16.5607 2.76117 15.2906 3.8071 14.2549Z" fill=""/></svg>
            </div>
            <div class="flex items-end justify-between mt-5">
              <div>
                <span class="text-sm text-gray-500 dark:text-gray-400">Usuarios</span>
                <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ stats.totalUsers }}</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 mb-4">
            <svg class="fill-gray-800 dark:fill-white/90" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm11-4a1 1 0 10-2 0v3H8a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V8z" fill=""/></svg>
          </div>
          <div class="flex items-end justify-between">
            <div>
              <span class="text-sm text-gray-500 dark:text-gray-400">Temas</span>
              <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ stats.totalThemes }}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 xl:col-span-5">
        <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Votaciones</h3>
          <div class="space-y-4">
            <div>
              <span class="text-sm text-gray-500 dark:text-gray-400">Valoración Promedio</span>
              <div class="flex items-center gap-2 mt-1">
                <div class="flex items-center">
                  <svg v-for="n in 5" :key="n" :class="n <= Math.round(stats.averageRating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <span class="text-2xl font-bold text-gray-800 dark:text-white/90">{{ stats.averageRating }}</span>
              </div>
              <p class="text-sm text-gray-500 mt-1">Total de votos: {{ stats.totalVotes }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-12">
        <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Últimos Juegos</h3>
            <router-link to="/games" class="text-sm text-brand-500 hover:text-brand-600">Ver todos</router-link>
          </div>
          <div v-if="recentGames.length === 0" class="text-center py-8 text-gray-400">
            No hay juegos registrados
          </div>
          <div v-else class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-800">
                  <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Nombre</th>
                  <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Género</th>
                  <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Autor</th>
                  <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Creado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="game in recentGames" :key="game.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <td class="py-3 px-2 font-medium text-gray-800 dark:text-white/90">{{ game.nombre }}</td>
                  <td class="py-3 px-2 text-gray-500">{{ game.genero || '-' }}</td>
                  <td class="py-3 px-2 text-gray-500">{{ game.autor || '-' }}</td>
                  <td class="py-3 px-2 text-gray-500">{{ new Date(game.createdAt).toLocaleDateString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { getDashboardStats, getGames } from '@/composables/useApi'

const stats = ref({ totalGames: 0, totalThemes: 0, totalUsers: 0, totalVotes: 0, averageRating: 0 })
const recentGames = ref<any[]>([])

onMounted(async () => {
  try {
    const [s, g] = await Promise.all([
      getDashboardStats(),
      getGames({ limit: 10 })
    ])
    stats.value = s
    recentGames.value = g.games
  } catch (e) {
    console.error('Error loading dashboard', e)
  }
})
</script>
