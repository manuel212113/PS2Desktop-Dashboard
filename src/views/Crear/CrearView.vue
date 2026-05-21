<template>
  <admin-layout>
    <div class="max-w-3xl mx-auto space-y-6">
      <!-- Header -->
      <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">Crear Nuevo</h2>
        <p class="text-sm text-gray-500">Añade un tema o juego a la base de datos</p>

        <!-- Toggle Tema / Juego -->
        <div class="flex gap-3 mt-5">
          <button @click="mode = 'theme'"
            :class="[mode === 'theme' ? 'bg-brand-500 text-white border-brand-500' : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700', 'px-6 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-brand-600 hover:text-white']">
            Tema OPL
          </button>
          <button @click="mode = 'game'"
            :class="[mode === 'game' ? 'bg-brand-500 text-white border-brand-500' : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700', 'px-6 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-brand-600 hover:text-white']">
            Juego
          </button>
        </div>

        <!-- Nombre -->
        <div class="mt-5">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Nombre <span class="text-error-500">*</span></label>
          <input v-model="form.nombre" placeholder="Nombre del {{ mode === 'theme' ? 'tema' : 'juego' }}"
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
        </div>

        <!-- Autor -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Autor</label>
          <input v-model="form.autor" placeholder="Nombre del autor"
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
        </div>

        <!-- Publisher (solo juego) -->
        <div v-if="mode === 'game'" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Publisher</label>
          <input v-model="form.publisher" placeholder="Publisher"
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
        </div>

        <!-- Descripción -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Descripción</label>
          <textarea v-model="form.descripcion" rows="4" placeholder="Descripción..."
            class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"></textarea>
        </div>

        <!-- Game-specific fields -->
        <div v-if="mode === 'game'" class="grid grid-cols-2 gap-4 mt-4">
          <div class="col-span-2 sm:col-span-1">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Game ID</label>
            <input v-model="form.gameId" placeholder="Ej: SLPM-65428"
              class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Género</label>
            <input v-model="form.genero" placeholder="Ej: Acción, Aventura"
              class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Región</label>
            <select v-model="form.region"
              class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90">
              <option value="">Seleccionar</option>
              <option>NTSC-U</option>
              <option>PAL</option>
              <option>NTSC-J</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Fecha lanzamiento</label>
            <input v-model="form.fechaLanzamiento" placeholder="Ej: 2004"
              class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Media type</label>
            <select v-model="form.mediaType"
              class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90">
              <option value="">Seleccionar</option>
              <option>DVD</option>
              <option>CD</option>
              <option>Digital</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Jugadores</label>
            <input v-model="form.jugadores" placeholder="Ej: 1-2"
              class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Resolución</label>
            <input v-model="form.resolucion" placeholder="Ej: 480p, 720p"
              class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
          </div>
          <div class="flex items-center">
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="form.widescreen" type="checkbox" class="rounded border-gray-300 dark:border-gray-700" />
              <span class="text-sm text-gray-700 dark:text-gray-400">Widescreen</span>
            </label>
          </div>
        </div>

        <!-- Características -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Características</label>
          <div class="flex gap-2">
            <input v-model="newCaracteristica" @keydown.enter.prevent="addCaracteristica" placeholder="Escribe y presiona Enter o Agregar"
              class="dark:bg-dark-900 h-11 flex-1 rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
            <button @click="addCaracteristica" class="px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600">Agregar</button>
          </div>
          <div v-if="form.caracteristicas.length > 0" class="flex flex-wrap gap-2 mt-3">
            <span v-for="(c, i) in form.caracteristicas" :key="i"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              {{ c }}
              <button @click="removeCaracteristica(i)" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">&times;</button>
            </span>
          </div>
        </div>

        <!-- Image URL con preview -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">URL de imagen</label>
          <input v-model="form.imageUrl" @input="previewImage" placeholder="https://..."
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
          <div v-if="imagePreview" class="mt-3 rounded-xl border border-gray-200 dark:border-gray-800 p-2 bg-gray-50 dark:bg-gray-800/50">
            <img :src="imagePreview" referrerpolicy="no-referrer" class="max-h-48 rounded-lg object-contain mx-auto" />
          </div>
        </div>

        <!-- Cover Preview (solo juegos con game_id) -->
        <div v-if="mode === 'game' && form.gameId?.trim()" class="mt-4 rounded-xl border border-gray-200 dark:border-gray-800 p-3 bg-gray-50 dark:bg-gray-800/50">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-400">Carátula ({{ form.gameId }})</span>
            <div class="flex items-center gap-2">
              <span :class="['px-2 py-0.5 text-xs rounded-full', coverStatus['2d'] === true ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' : coverStatus['2d'] === false ? 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500' : 'bg-gray-100 text-gray-400 dark:bg-gray-700']">2D{{ coverStatus['2d'] === true ? ' ✓' : coverStatus['2d'] === false ? ' ✗' : '...' }}</span>
              <span :class="['px-2 py-0.5 text-xs rounded-full', coverStatus['3d'] === true ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' : coverStatus['3d'] === false ? 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500' : 'bg-gray-100 text-gray-400 dark:bg-gray-700']">3D{{ coverStatus['3d'] === true ? ' ✓' : coverStatus['3d'] === false ? ' ✗' : '...' }}</span>
            </div>
          </div>
          <img :src="coverUrl" referrerpolicy="no-referrer" class="max-h-48 rounded-lg object-contain mx-auto" @error="coverMode === '2d' ? coverStatus['2d'] = false : coverMode === '3d' ? coverStatus['3d'] = false : null" />
          <img :src="coverUrl2d(form.gameId?.trim() || '')" referrerpolicy="no-referrer" class="hidden" @load="coverStatus['2d'] = true" @error="coverStatus['2d'] = false" />
          <img :src="coverUrl3d(form.gameId?.trim() || '')" referrerpolicy="no-referrer" class="hidden" @load="coverStatus['3d'] = true" @error="coverStatus['3d'] = false" />
          <div class="flex justify-center gap-2 mt-2">
            <button type="button" @click="coverMode = '2d'" :class="['px-3 py-1 text-xs rounded-lg border transition-colors', coverMode === '2d' ? 'bg-brand-500 text-white border-brand-500' : 'bg-transparent text-gray-500 border-gray-300 dark:border-gray-700']">2D</button>
            <button type="button" @click="coverMode = '3d'" :class="['px-3 py-1 text-xs rounded-lg border transition-colors', coverMode === '3d' ? 'bg-brand-500 text-white border-brand-500' : 'bg-transparent text-gray-500 border-gray-300 dark:border-gray-700']">3D</button>
            <button v-if="form.imageUrl?.trim()" type="button" @click="coverMode = 'fallback'" :class="['px-3 py-1 text-xs rounded-lg border transition-colors', coverMode === 'fallback' ? 'bg-brand-500 text-white border-brand-500' : 'bg-transparent text-gray-500 border-gray-300 dark:border-gray-700']">Fallback</button>
          </div>
        </div>

        <!-- Video URL -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">URL de video (opcional)</label>
          <input v-model="form.videoDemo" placeholder="https://www.youtube.com/watch?v=..."
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
        </div>

        <!-- Link de descarga -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Link de descarga</label>
          <input v-model="form.linkDescarga" placeholder="https://..."
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
        </div>

        <!-- Status -->
        <div v-if="statusMsg" :class="['mt-4 p-3 rounded-lg text-sm', statusOk ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' : 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500']">{{ statusMsg }}</div>

        <!-- Submit -->
        <button @click="handleCreate" :disabled="submitting"
          class="mt-6 w-full py-3 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ submitting ? 'Guardando...' : 'CREAR' }}
        </button>
      </div>

      <!-- ===== JSON IMPORT ===== -->
      <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Importar por JSON</h3>
        <p class="text-sm text-gray-500 mt-1">Pega un JSON (array o单个) para importar múltiples elementos</p>
        <textarea v-model="jsonImport" rows="6" placeholder='[{"tipo": "juego", "nombre": "...", "autor": "...", ...}]'
          class="dark:bg-dark-900 mt-3 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm font-mono text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"></textarea>
        <div v-if="jsonStatus" :class="['mt-3 p-3 rounded-lg text-sm', jsonStatusOk ? 'bg-success-50 text-success-600' : 'bg-error-50 text-error-600']">{{ jsonStatus }}</div>
        <button @click="handleJsonImport" :disabled="jsonImporting"
          class="mt-3 px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-gray-600 hover:bg-gray-700 disabled:opacity-50">
          {{ jsonImporting ? 'Importando...' : 'IMPORTAR JSON' }}
        </button>
      </div>

      <!-- ===== ELIMINAR ===== -->
      <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Eliminar Temas / Juegos</h3>
        <div class="flex items-center gap-4 mt-3">
          <button @click="loadDeleteItems" :disabled="loadingItems"
            class="px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-gray-600 hover:bg-gray-700 disabled:opacity-50">
            {{ loadingItems ? 'Cargando...' : 'Cargar lista' }}
          </button>
          <span class="text-sm text-gray-500">{{ deleteItems.length }} elementos</span>
        </div>
        <div v-if="deleteItems.length > 0" class="mt-4 space-y-2 max-h-96 overflow-y-auto">
          <div v-for="item in deleteItems" :key="item.id"
            class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
            <div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
              <img v-if="item.imageUrl" :src="item.imageUrl" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-lg">{{ item.tipo === 'Juego' ? '🎮' : '🎨' }}</div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 dark:text-white/90 truncate">{{ item.nombre }}</p>
              <p class="text-xs text-gray-400">{{ item.tipo }}</p>
            </div>
            <button @click="deleteItem(item)" :disabled="deletingId === item.id"
              class="px-4 py-1.5 text-xs font-medium text-white rounded-lg bg-error-500 hover:bg-error-600 disabled:opacity-50">
              {{ deletingId === item.id ? '...' : 'ELIMINAR' }}
            </button>
          </div>
        </div>
      </div>

      <!-- ===== IMPORTAR AVATARES ===== -->
      <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Importar Avatares</h3>
        <p class="text-sm text-gray-500 mt-1">Pega el JSON de avatares aquí</p>
        <textarea v-model="avatarJson" rows="5" placeholder='[{"nombre": "...", "image_url": "..."}]'
          class="dark:bg-dark-900 mt-3 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm font-mono text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"></textarea>
        <div v-if="avatarStatus" :class="['mt-3 p-3 rounded-lg text-sm', avatarStatusOk ? 'bg-success-50 text-success-600' : 'bg-error-50 text-error-600']">{{ avatarStatus }}</div>
        <button @click="handleAvatarImport" :disabled="avatarImporting"
          class="mt-3 px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-gray-600 hover:bg-gray-700 disabled:opacity-50">
          {{ avatarImporting ? 'Importando...' : 'IMPORTAR AVATARES' }}
        </button>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { api, getGames, getThemes, deleteGame, deleteTheme } from '@/composables/useApi'

function transformGameId(id: string): string {
  return id.replace(/_/g, '-').replace(/\./g, '')
}
function coverUrl2d(gameId: string): string {
  return `https://raw.githubusercontent.com/xlenore/ps2-covers/main/covers/default/${transformGameId(gameId)}.jpg`
}
function coverUrl3d(gameId: string): string {
  return `https://raw.githubusercontent.com/xlenore/ps2-covers/main/covers/3d/${transformGameId(gameId)}.png`
}

const mode = ref<'theme' | 'game'>('theme')

const form = reactive({
  nombre: '', autor: '', publisher: '', descripcion: '', genero: '',
  region: '', fechaLanzamiento: '', mediaType: '', jugadores: '',
  resolucion: '', widescreen: false,
  caracteristicas: [] as string[],
  imageUrl: '', videoDemo: '', linkDescarga: '', gameId: ''
})

const newCaracteristica = ref('')
const imagePreview = ref('')
const statusMsg = ref('')
const statusOk = ref(false)
const submitting = ref(false)

const coverStatus = ref<{ '2d': boolean | null; '3d': boolean | null }>({ '2d': null, '3d': null })
const coverMode = ref<'2d' | '3d' | 'fallback'>('2d')
const coverUrl = computed(() => {
  if (coverMode.value === 'fallback') return form.imageUrl?.trim() || ''
  const id = form.gameId?.trim()
  if (!id) return ''
  return coverMode.value === '2d' ? coverUrl2d(id) : coverUrl3d(id)
})
watch(() => form.gameId, () => {
  coverStatus.value = { '2d': null, '3d': null }
  coverMode.value = '2d'
})

const jsonImport = ref('')
const jsonStatus = ref('')
const jsonStatusOk = ref(false)
const jsonImporting = ref(false)

const deleteItems = ref<{ id: string; nombre: string; tipo: string; imageUrl: string }[]>([])
const loadingItems = ref(false)
const deletingId = ref<string | null>(null)

const avatarJson = ref('')
const avatarStatus = ref('')
const avatarStatusOk = ref(false)
const avatarImporting = ref(false)

function addCaracteristica() {
  const t = newCaracteristica.value.trim()
  if (t) { form.caracteristicas.push(t); newCaracteristica.value = '' }
}

function removeCaracteristica(i: number) {
  form.caracteristicas.splice(i, 1)
}

function previewImage() {
  imagePreview.value = form.imageUrl?.trim() || ''
}

async function handleCreate() {
  if (!form.nombre.trim()) {
    statusMsg.value = 'El nombre es obligatorio'; statusOk.value = false
    return
  }
  submitting.value = true; statusMsg.value = 'Guardando...'; statusOk.value = true
  try {
    const payload = {
      nombre: form.nombre.trim(),
      autor: form.autor.trim() || null,
      descripcion: form.descripcion.trim() || null,
      caracteristicas: form.caracteristicas,
      imageUrl: form.imageUrl.trim() || null,
      videoDemo: form.videoDemo.trim() || null,
      linkDescarga: form.linkDescarga.trim() || null,
      ...(mode.value === 'game' ? {
        gameId: form.gameId.trim() || null,
        publisher: form.publisher.trim() || null,
        genero: form.genero.trim() || null,
        fechaLanzamiento: form.fechaLanzamiento.trim() || null,
        region: form.region || null,
        mediaType: form.mediaType || null,
        jugadores: form.jugadores.trim() || null,
        resolucion: form.resolucion.trim() || null,
        widescreen: form.widescreen
      } : {})
    }

    if (mode.value === 'theme') {
      await api.post('/themes', payload)
    } else {
      await api.post('/games', payload)
    }

    statusMsg.value = `✓ ${mode.value === 'theme' ? 'Tema' : 'Juego'} «${form.nombre}» creado correctamente`
    statusOk.value = true
    Object.assign(form, { nombre: '', autor: '', publisher: '', descripcion: '', genero: '', region: '', fechaLanzamiento: '', mediaType: '', jugadores: '', resolucion: '', widescreen: false, caracteristicas: [], imageUrl: '', videoDemo: '', linkDescarga: '', gameId: '' })
    imagePreview.value = ''
  } catch (e: any) {
    statusMsg.value = 'Error: ' + (e.message || 'Error desconocido')
    statusOk.value = false
  } finally {
    submitting.value = false
  }
}

async function handleJsonImport() {
  const json = jsonImport.value.trim()
  if (!json) { jsonStatus.value = 'Pega el JSON primero'; jsonStatusOk.value = false; return }
  jsonImporting.value = true; jsonStatus.value = 'Importando...'; jsonStatusOk.value = true
  try {
    const parsed = JSON.parse(json); const items = Array.isArray(parsed) ? parsed : [parsed]
    let ok = 0, err = 0
    for (const item of items) {
      try {
        const tipo = item.tipo || 'tema'
        const nombre = item.nombre || 'Sin nombre'

        if (tipo === 'juego') {
          await api.post('/games', {
            nombre, autor: item.autor || null, publisher: item.publisher || null,
            descripcion: item.descripcion || null, genero: item.genero || null,
            fechaLanzamiento: item.fecha_lanzamiento || null, region: item.region || null,
            mediaType: item.media_type || null, jugadores: item.jugadores || null,
            resolucion: item.resolucion || null, widescreen: !!item.widescreen,
            caracteristicas: item.caracteristicas || [],
            videoDemo: item.video_demo || null, linkDescarga: item.link_descarga || null,
            imageUrl: item.image_url || null, gameId: item.game_id || null
          })
        } else {
          await api.post('/themes', {
            nombre, autor: item.autor || null, descripcion: item.descripcion || null,
            caracteristicas: item.caracteristicas || [],
            videoDemo: item.video_demo || null, linkDescarga: item.link_descarga || null,
            imageUrl: item.image_url || null
          })
        }
        ok++
      } catch { err++ }
    }
    jsonStatus.value = `✓ Importados ${ok} elementos${err > 0 ? `, ${err} errores` : ''}`
    jsonStatusOk.value = true
  } catch (e: any) {
    jsonStatus.value = 'Error al importar: ' + (e.message || 'JSON inválido')
    jsonStatusOk.value = false
  } finally { jsonImporting.value = false }
}

async function loadDeleteItems() {
  loadingItems.value = true
  try {
    const [themesRes, gamesRes] = await Promise.all([
      getThemes(), getGames({ limit: 999 })
    ])
    const items: { id: string; nombre: string; tipo: string; imageUrl: string }[] = []
    for (const t of themesRes) items.push({ id: t.id, nombre: t.nombre, tipo: 'Tema', imageUrl: t.imageUrl || '' })
    for (const g of (gamesRes as any).games || []) items.push({ id: g.id, nombre: g.nombre, tipo: 'Juego', imageUrl: g.imageUrl || '' })
    deleteItems.value = items
  } catch (e: any) {
    console.error(e)
  } finally { loadingItems.value = false }
}

async function deleteItem(item: { id: string; nombre: string; tipo: string }) {
  if (!confirm(`¿Eliminar ${item.tipo} «${item.nombre}»?`)) return
  deletingId.value = item.id
  try {
    if (item.tipo === 'Tema') await deleteTheme(item.id)
    else await deleteGame(item.id)
    deleteItems.value = deleteItems.value.filter(i => i.id !== item.id)
  } catch (e: any) {
    alert('Error: ' + (e.message || ''))
  } finally { deletingId.value = null }
}

async function handleAvatarImport() {
  const json = avatarJson.value.trim()
  if (!json) { avatarStatus.value = 'Pega el JSON primero'; avatarStatusOk.value = false; return }
  avatarImporting.value = true; avatarStatus.value = 'Importando avatares...'; avatarStatusOk.value = true
  try {
    const items = JSON.parse(json)
    const arr = Array.isArray(items) ? items : [items]
    let ok = 0, err = 0
    for (const item of arr) {
      try {
        const nombre = item.nombre || item.id || 'Sin nombre'
        const imageUrl = item.image_url || item.sony_url || null
        if (imageUrl) {
          await api.post('/avatars', { nombre, imageUrl })
          ok++
        } else { err++ }
      } catch { err++ }
    }
    avatarStatus.value = `✓ Importados ${ok} avatar${ok !== 1 ? 'es' : ''}${err > 0 ? `, ${err} errores` : ''}`
    avatarStatusOk.value = true
    avatarJson.value = ''
  } catch (e: any) {
    avatarStatus.value = 'Error al importar: ' + (e.message || '')
    avatarStatusOk.value = false
  } finally { avatarImporting.value = false }
}
</script>
