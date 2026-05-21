<template>
  <admin-layout>
    <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">Temas</h2>
          <p class="text-sm text-gray-500">Gestiona los temas visuales de PS2Desktop</p>
        </div>
        <div class="flex gap-3">
          <input v-model="search" @input="loadThemes" placeholder="Buscar temas..." class="dark:bg-dark-900 h-10 w-64 rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
          <button @click="showCreateModal = true" class="px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600">+ Nuevo Tema</button>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <svg class="animate-spin h-8 w-8 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
      </div>

      <div v-else-if="themes.length === 0" class="text-center py-12 text-gray-400">
        No hay temas registrados
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="theme in themes" :key="theme.id" class="rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md transition-shadow">
          <img v-if="theme.imageUrl" :src="theme.imageUrl" referrerpolicy="no-referrer" class="w-full h-40 object-cover rounded-lg mb-3" />
          <div class="w-full h-40 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 mb-3" v-else>
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <h4 class="font-semibold text-gray-800 dark:text-white/90">{{ theme.nombre }}</h4>
          <p class="text-sm text-gray-500 mt-1">{{ theme.autor }}</p>
          <p class="text-xs text-gray-400 mt-2 line-clamp-2">{{ theme.descripcion }}</p>
          <div class="flex flex-wrap gap-1 mt-2">
            <span v-for="c in theme.caracteristicas?.slice(0, 3)" class="px-2 py-0.5 text-xs rounded-full bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">{{ c }}</span>
          </div>
          <div class="flex gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <a v-if="theme.linkDescarga" :href="theme.linkDescarga" target="_blank" class="text-xs text-brand-500 hover:text-brand-600">Descargar</a>
            <button @click="confirmDelete(theme)" class="text-xs text-error-500 hover:text-error-600 ml-auto">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 flex items-center justify-center z-99999 p-4">
      <div class="fixed inset-0 bg-gray-400/50 backdrop-blur-[32px]" @click="showCreateModal = false"></div>
      <div class="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 w-full max-w-lg">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Nuevo Tema</h3>
        <form @submit.prevent="handleCreate">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Nombre</label>
              <input v-model="form.nombre" required class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm dark:border-gray-700 dark:text-white/90" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Autor</label>
              <input v-model="form.autor" required class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm dark:border-gray-700 dark:text-white/90" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Descripción</label>
              <textarea v-model="form.descripcion" rows="3" class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm dark:border-gray-700 dark:text-white/90"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Image URL</label>
              <input v-model="form.imageUrl" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm dark:border-gray-700 dark:text-white/90" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Link de descarga</label>
              <input v-model="form.linkDescarga" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm dark:border-gray-700 dark:text-white/90" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Características (separadas por coma)</label>
              <input v-model="caracteristicasStr" placeholder="ej: 4K, HDR, 60fps" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm dark:border-gray-700 dark:text-white/90" />
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button type="button" @click="showCreateModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50">Cancelar</button>
            <button type="submit" :disabled="creating" class="px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50">{{ creating ? 'Creando...' : 'Crear' }}</button>
          </div>
        </form>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { getThemes, deleteTheme } from '@/composables/useApi'
import { api } from '@/composables/useApi'

const themes = ref<any[]>([])
const search = ref('')
const loading = ref(true)
const showCreateModal = ref(false)
const creating = ref(false)
const caracteristicasStr = ref('')

const form = ref({ nombre: '', autor: '', descripcion: '', imageUrl: '', linkDescarga: '', videoDemo: '' })

const loadThemes = async () => {
  loading.value = true
  try {
    themes.value = await getThemes({ search: search.value || undefined })
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

const handleCreate = async () => {
  creating.value = true
  try {
    await api.post('/themes', {
      ...form.value,
      caracteristicas: caracteristicasStr.value ? caracteristicasStr.value.split(',').map(s => s.trim()) : []
    })
    showCreateModal.value = false
    form.value = { nombre: '', autor: '', descripcion: '', imageUrl: '', linkDescarga: '', videoDemo: '' }
    caracteristicasStr.value = ''
    await loadThemes()
  } catch (e: any) { alert(e.message) }
  finally { creating.value = false }
}

const confirmDelete = async (theme: any) => {
  if (confirm(`¿Eliminar tema "${theme.nombre}"?`)) {
    await deleteTheme(theme.id)
    await loadThemes()
  }
}

onMounted(loadThemes)
</script>
