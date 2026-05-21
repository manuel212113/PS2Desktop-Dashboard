<template>
  <admin-layout>
    <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">Juegos</h2>
          <p class="text-sm text-gray-500">Gestiona los juegos de PS2Desktop</p>
        </div>
        <div class="flex gap-3">
          <input v-model="search" @input="loadGames" placeholder="Buscar juegos..." class="dark:bg-dark-900 h-10 w-64 rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
          <button @click="showCreateModal = true" class="px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600">+ Nuevo</button>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <svg class="animate-spin h-8 w-8 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
      </div>

      <div v-else-if="games.length === 0" class="text-center py-12 text-gray-400">
        No hay juegos registrados
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-800">
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Nombre</th>
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Género</th>
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Autor</th>
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Región</th>
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Valoración</th>
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="game in games" :key="game.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
              <td class="py-3 px-2">
                <div class="flex items-center gap-3">
                  <img v-if="game.imageUrl" :src="game.imageUrl" referrerpolicy="no-referrer" class="w-10 h-10 rounded-lg object-cover" />
                  <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400" v-else>🎮</div>
                  <div>
                    <p class="font-medium text-gray-800 dark:text-white/90">{{ game.nombre }}</p>
                    <p class="text-xs text-gray-400">{{ game.gameId || '-' }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-2 text-gray-500">{{ game.genero || '-' }}</td>
              <td class="py-3 px-2 text-gray-500">{{ game.autor || '-' }}</td>
              <td class="py-3 px-2 text-gray-500">{{ game.region || '-' }}</td>
              <td class="py-3 px-2">
                <div class="flex items-center gap-1">
                  <svg v-for="n in 5" :key="n" :class="n <= Math.round(game.averageRating || 0) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <span class="text-xs text-gray-400 ml-1">({{ game.votesCount || 0 }})</span>
                </div>
              </td>
              <td class="py-3 px-2">
                <div class="flex items-center gap-2">
                  <button @click="openEdit(game)" class="text-brand-500 hover:text-brand-600 transition-colors" title="Editar">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </button>
                  <button @click="confirmDelete(game)" class="text-error-500 hover:text-error-600 transition-colors" title="Eliminar">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="total > limit" class="flex items-center justify-between mt-4">
        <p class="text-sm text-gray-500">{{ offset + 1 }}-{{ Math.min(offset + limit, total) }} de {{ total }}</p>
        <div class="flex gap-2">
          <button @click="prevPage" :disabled="offset === 0" class="px-3 py-1 text-sm rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800">Anterior</button>
          <button @click="nextPage" :disabled="offset + limit >= total" class="px-3 py-1 text-sm rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800">Siguiente</button>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 flex items-center justify-center z-99999 p-4">
      <div class="fixed inset-0 bg-gray-400/50 backdrop-blur-[32px]" @click="showCreateModal = false"></div>
      <div class="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Nuevo Juego</h3>
        <form @submit.prevent="handleCreate">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 sm:col-span-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Nombre</label>
              <input v-model="form.nombre" required class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Game ID</label>
              <input v-model="form.gameId" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Autor</label>
              <input v-model="form.autor" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Publisher</label>
              <input v-model="form.publisher" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Género</label>
              <input v-model="form.genero" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Región</label>
              <select v-model="form.region" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90">
                <option value="">Seleccionar</option>
                <option>NTSC-U</option>
                <option>PAL</option>
                <option>NTSC-J</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Jugadores</label>
              <input v-model="form.jugadores" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Resolución</label>
              <input v-model="form.resolucion" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Descripción</label>
              <textarea v-model="form.descripcion" rows="3" class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90"></textarea>
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Image URL</label>
              <input v-model="form.imageUrl" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Link de descarga</label>
              <input v-model="form.linkDescarga" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div v-if="form.gameId?.trim()" class="col-span-2 border rounded-xl p-3 bg-gray-50 dark:bg-gray-800/50">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-400">Carátula</span>
                <div class="flex items-center gap-2">
                  <span :class="['px-2 py-0.5 text-xs rounded-full', formCoverStatus['2d'] === true ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' : formCoverStatus['2d'] === false ? 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500' : 'bg-gray-100 text-gray-400 dark:bg-gray-700']">2D{{ formCoverStatus['2d'] === true ? ' ✓' : formCoverStatus['2d'] === false ? ' ✗' : '...' }}</span>
                  <span :class="['px-2 py-0.5 text-xs rounded-full', formCoverStatus['3d'] === true ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' : formCoverStatus['3d'] === false ? 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500' : 'bg-gray-100 text-gray-400 dark:bg-gray-700']">3D{{ formCoverStatus['3d'] === true ? ' ✓' : formCoverStatus['3d'] === false ? ' ✗' : '...' }}</span>
                </div>
              </div>
              <img :src="formCoverUrl" referrerpolicy="no-referrer" class="max-h-48 rounded-lg object-contain mx-auto" @error="formCoverMode === '2d' ? formCoverStatus['2d'] = false : formCoverMode === '3d' ? formCoverStatus['3d'] = false : null" />
              <img :src="coverUrl2d(form.gameId?.trim() || '')" referrerpolicy="no-referrer" class="hidden" @load="formCoverStatus['2d'] = true" @error="formCoverStatus['2d'] = false" />
              <img :src="coverUrl3d(form.gameId?.trim() || '')" referrerpolicy="no-referrer" class="hidden" @load="formCoverStatus['3d'] = true" @error="formCoverStatus['3d'] = false" />
              <div v-if="form.gameId?.trim()" class="flex justify-center gap-2 mt-2">
                <button type="button" @click="formCoverMode = '2d'" :class="['px-3 py-1 text-xs rounded-lg border transition-colors', formCoverMode === '2d' ? 'bg-brand-500 text-white border-brand-500' : 'bg-transparent text-gray-500 border-gray-300 dark:border-gray-700']">2D</button>
                <button type="button" @click="formCoverMode = '3d'" :class="['px-3 py-1 text-xs rounded-lg border transition-colors', formCoverMode === '3d' ? 'bg-brand-500 text-white border-brand-500' : 'bg-transparent text-gray-500 border-gray-300 dark:border-gray-700']">3D</button>
                <button v-if="form.imageUrl?.trim()" type="button" @click="formCoverMode = 'fallback'" :class="['px-3 py-1 text-xs rounded-lg border transition-colors', formCoverMode === 'fallback' ? 'bg-brand-500 text-white border-brand-500' : 'bg-transparent text-gray-500 border-gray-300 dark:border-gray-700']">Fallback</button>
              </div>
            </div>
            <div class="col-span-2">
              <label class="flex items-center gap-2">
                <input v-model="form.widescreen" type="checkbox" class="rounded border-gray-300 dark:border-gray-700" />
                <span class="text-sm text-gray-700 dark:text-gray-400">Widescreen</span>
              </label>
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button type="button" @click="showCreateModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/[0.03]">Cancelar</button>
            <button type="submit" :disabled="creating" class="px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50">{{ creating ? 'Creando...' : 'Crear' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center z-99999 p-4">
      <div class="fixed inset-0 bg-gray-400/50 backdrop-blur-[32px]" @click="showEditModal = false"></div>
      <div class="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Editar Juego</h3>
        <form @submit.prevent="handleEdit">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 sm:col-span-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Nombre</label>
              <input v-model="editForm.nombre" required class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Game ID</label>
              <input v-model="editForm.gameId" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Autor</label>
              <input v-model="editForm.autor" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Publisher</label>
              <input v-model="editForm.publisher" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Género</label>
              <input v-model="editForm.genero" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Región</label>
              <select v-model="editForm.region" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90">
                <option value="">Seleccionar</option>
                <option>NTSC-U</option>
                <option>PAL</option>
                <option>NTSC-J</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Jugadores</label>
              <input v-model="editForm.jugadores" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Resolución</label>
              <input v-model="editForm.resolucion" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Descripción</label>
              <textarea v-model="editForm.descripcion" rows="3" class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90"></textarea>
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Image URL</label>
              <input v-model="editForm.imageUrl" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Link de descarga</label>
              <input v-model="editForm.linkDescarga" class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90" />
            </div>
            <div v-if="editForm.gameId?.trim()" class="col-span-2 border rounded-xl p-3 bg-gray-50 dark:bg-gray-800/50">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-400">Carátula</span>
                <div class="flex items-center gap-2">
                  <span :class="['px-2 py-0.5 text-xs rounded-full', editCoverStatus['2d'] === true ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' : editCoverStatus['2d'] === false ? 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500' : 'bg-gray-100 text-gray-400 dark:bg-gray-700']">2D{{ editCoverStatus['2d'] === true ? ' ✓' : editCoverStatus['2d'] === false ? ' ✗' : '...' }}</span>
                  <span :class="['px-2 py-0.5 text-xs rounded-full', editCoverStatus['3d'] === true ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' : editCoverStatus['3d'] === false ? 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500' : 'bg-gray-100 text-gray-400 dark:bg-gray-700']">3D{{ editCoverStatus['3d'] === true ? ' ✓' : editCoverStatus['3d'] === false ? ' ✗' : '...' }}</span>
                </div>
              </div>
              <img :src="editCoverUrl" referrerpolicy="no-referrer" class="max-h-48 rounded-lg object-contain mx-auto" @error="editCoverMode === '2d' ? editCoverStatus['2d'] = false : editCoverMode === '3d' ? editCoverStatus['3d'] = false : null" />
              <img :src="coverUrl2d(editForm.gameId?.trim() || '')" referrerpolicy="no-referrer" class="hidden" @load="editCoverStatus['2d'] = true" @error="editCoverStatus['2d'] = false" />
              <img :src="coverUrl3d(editForm.gameId?.trim() || '')" referrerpolicy="no-referrer" class="hidden" @load="editCoverStatus['3d'] = true" @error="editCoverStatus['3d'] = false" />
              <div class="flex justify-center gap-2 mt-2">
                <button type="button" @click="editCoverMode = '2d'" :class="['px-3 py-1 text-xs rounded-lg border transition-colors', editCoverMode === '2d' ? 'bg-brand-500 text-white border-brand-500' : 'bg-transparent text-gray-500 border-gray-300 dark:border-gray-700']">2D</button>
                <button type="button" @click="editCoverMode = '3d'" :class="['px-3 py-1 text-xs rounded-lg border transition-colors', editCoverMode === '3d' ? 'bg-brand-500 text-white border-brand-500' : 'bg-transparent text-gray-500 border-gray-300 dark:border-gray-700']">3D</button>
                <button v-if="editForm.imageUrl?.trim()" type="button" @click="editCoverMode = 'fallback'" :class="['px-3 py-1 text-xs rounded-lg border transition-colors', editCoverMode === 'fallback' ? 'bg-brand-500 text-white border-brand-500' : 'bg-transparent text-gray-500 border-gray-300 dark:border-gray-700']">Fallback</button>
              </div>
            </div>
            <div class="col-span-2">
              <label class="flex items-center gap-2">
                <input v-model="editForm.widescreen" type="checkbox" class="rounded border-gray-300 dark:border-gray-700" />
                <span class="text-sm text-gray-700 dark:text-gray-400">Widescreen</span>
              </label>
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button type="button" @click="showEditModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/[0.03]">Cancelar</button>
            <button type="submit" :disabled="editing" class="px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50">{{ editing ? 'Guardando...' : 'Guardar' }}</button>
          </div>
        </form>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { api, getGames, deleteGame, updateGame } from '@/composables/useApi'

function transformGameId(id: string): string {
  return id.replace(/_/g, '-').replace(/\./g, '')
}
function coverUrl2d(gameId: string): string {
  return `https://raw.githubusercontent.com/xlenore/ps2-covers/main/covers/default/${transformGameId(gameId)}.jpg`
}
function coverUrl3d(gameId: string): string {
  return `https://raw.githubusercontent.com/xlenore/ps2-covers/main/covers/3d/${transformGameId(gameId)}.png`
}

const games = ref<any[]>([])
const search = ref('')
const loading = ref(true)
const limit = 20
const offset = ref(0)
const total = ref(0)

// Create
const showCreateModal = ref(false)
const creating = ref(false)
const form = ref({
  nombre: '', gameId: '', autor: '', publisher: '', descripcion: '',
  genero: '', region: '', jugadores: '', resolucion: '',
  imageUrl: '', linkDescarga: '', videoDemo: '', widescreen: false,
  fechaLanzamiento: '', mediaType: '', caracteristicas: [] as string[]
})
const formCoverStatus = ref<{ '2d': boolean | null; '3d': boolean | null }>({ '2d': null, '3d': null })
const formCoverMode = ref<'2d' | '3d' | 'fallback'>('2d')
const formCoverUrl = computed(() => {
  if (formCoverMode.value === 'fallback') return form.value.imageUrl || ''
  const id = form.value.gameId?.trim()
  if (!id) return ''
  return formCoverMode.value === '2d' ? coverUrl2d(id) : coverUrl3d(id)
})
watch(() => form.value.gameId, () => {
  formCoverStatus.value = { '2d': null, '3d': null }
  formCoverMode.value = '2d'
})

// Edit
const showEditModal = ref(false)
const editing = ref(false)
const editingId = ref<string | null>(null)
const editForm = ref({
  nombre: '', gameId: '', autor: '', publisher: '', descripcion: '',
  genero: '', region: '', jugadores: '', resolucion: '',
  imageUrl: '', linkDescarga: '', videoDemo: '', widescreen: false,
  fechaLanzamiento: '', mediaType: '', caracteristicas: [] as string[]
})
const editCoverStatus = ref<{ '2d': boolean | null; '3d': boolean | null }>({ '2d': null, '3d': null })
const editCoverMode = ref<'2d' | '3d' | 'fallback'>('2d')
const editCoverUrl = computed(() => {
  if (editCoverMode.value === 'fallback') return editForm.value.imageUrl || ''
  const id = editForm.value.gameId?.trim()
  if (!id) return ''
  return editCoverMode.value === '2d' ? coverUrl2d(id) : coverUrl3d(id)
})
watch(() => editForm.value.gameId, () => {
  editCoverStatus.value = { '2d': null, '3d': null }
  editCoverMode.value = '2d'
})

const loadGames = async () => {
  loading.value = true
  try {
    const res = await getGames({ limit, offset: offset.value, search: search.value || undefined })
    games.value = res.games
    total.value = res.total
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

const handleCreate = async () => {
  creating.value = true
  try {
    await api.post('/games', form.value)
    showCreateModal.value = false
    form.value = { nombre: '', gameId: '', autor: '', publisher: '', descripcion: '', genero: '', region: '', jugadores: '', resolucion: '', imageUrl: '', linkDescarga: '', videoDemo: '', widescreen: false, fechaLanzamiento: '', mediaType: '', caracteristicas: [] }
    await loadGames()
  } catch (e: any) { alert(e.message) }
  finally { creating.value = false }
}

const openEdit = async (game: any) => {
  editingId.value = game.id
  editForm.value = {
    nombre: game.nombre || '',
    gameId: game.gameId || '',
    autor: game.autor || '',
    publisher: game.publisher || '',
    descripcion: game.descripcion || '',
    genero: game.genero || '',
    region: game.region || '',
    jugadores: game.jugadores || '',
    resolucion: game.resolucion || '',
    imageUrl: game.imageUrl || '',
    linkDescarga: game.linkDescarga || '',
    videoDemo: game.videoDemo || '',
    widescreen: game.widescreen || false,
    fechaLanzamiento: game.fechaLanzamiento || '',
    mediaType: game.mediaType || '',
    caracteristicas: game.caracteristicas || []
  }
  editCoverStatus.value = { '2d': null, '3d': null }
  editCoverMode.value = '2d'
  showEditModal.value = true
}

const handleEdit = async () => {
  if (!editingId.value) return
  editing.value = true
  try {
    await updateGame(editingId.value, editForm.value)
    showEditModal.value = false
    editingId.value = null
    await loadGames()
  } catch (e: any) { alert(e.message) }
  finally { editing.value = false }
}

const confirmDelete = async (game: any) => {
  if (confirm(`¿Eliminar "${game.nombre}"?`)) {
    try {
      await deleteGame(game.id)
      await loadGames()
    } catch (e: any) { alert(e.message) }
  }
}

const nextPage = () => { offset.value += limit; loadGames() }
const prevPage = () => { offset.value = Math.max(0, offset.value - limit); loadGames() }

onMounted(loadGames)
</script>
