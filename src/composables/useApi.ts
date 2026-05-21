const API_BASE = '/api'

function getToken(): string | null {
  return localStorage.getItem('token')
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/signin'
    }
    const error = await response.json().catch(() => ({ message: 'Error' }))
    throw new Error(error.message || `HTTP ${response.status}`)
  }

  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, data?: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: <T>(endpoint: string, data?: unknown) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
}

export function login(email: string, password: string) {
  return api.post<{ token: string; user: any }>('/auth/login', { email, password })
}

export function register(email: string, password: string) {
  return api.post<{ token: string; user: any }>('/auth/register', { email, password })
}

export function googleLogin(credential: string) {
  return api.post<{ token: string; user: any }>('/auth/google-login', { credential })
}

export function getCurrentUser() {
  return api.get<{ id: string; email: string; avatarUrl: string; displayName: string; role: string }>('/auth/me')
}

export function updateProfile(displayName: string, avatarUrl: string) {
  return api.put<{ id: string; email: string; avatarUrl: string; displayName: string; role: string }>('/auth/profile', { displayName, avatarUrl })
}

export function getDashboardStats() {
  return api.get<{
    totalGames: number
    totalThemes: number
    totalUsers: number
    totalVotes: number
    averageRating: number
  }>('/dashboard/stats')
}

export function getGames(params?: { limit?: number; offset?: number; search?: string; sortBy?: string; genre?: string }) {
  const query = new URLSearchParams()
  if (params?.limit) query.set('limit', String(params.limit))
  if (params?.offset) query.set('offset', String(params.offset))
  if (params?.search) query.set('search', params.search)
  if (params?.sortBy) query.set('sortBy', params.sortBy)
  if (params?.genre) query.set('genre', params.genre)
  const qs = query.toString()
  return api.get<{ games: any[]; total: number }>(`/games${qs ? `?${qs}` : ''}`)
}

export function getGame(id: string) {
  return api.get<any>(`/games/${id}`)
}

export function updateGame(id: string, data: any) {
  return api.put<any>(`/games/${id}`, data)
}

export function deleteGame(id: string) {
  return api.delete(`/games/${id}`)
}

export function getThemes(params?: { search?: string; sortBy?: string }) {
  const query = new URLSearchParams()
  if (params?.search) query.set('search', params.search)
  if (params?.sortBy) query.set('sortBy', params.sortBy)
  const qs = query.toString()
  return api.get<any[]>(`/themes${qs ? `?${qs}` : ''}`)
}

export function deleteTheme(id: string) {
  return api.delete(`/themes/${id}`)
}

export function getUsers() {
  return api.get<any[]>('/users')
}

export function updateUserRole(id: string, role: string) {
  return api.put(`/users/${id}/role`, { role })
}

export function vote(itemId: string, itemType: string, value: number) {
  return api.post('/votes', { itemId, itemType, value })
}

export function toggleFavorite(itemId: string, itemType: string) {
  return api.post('/favorites/toggle', { itemId, itemType })
}

export function getFavorites() {
  return api.get<{ itemId: string; itemType: string }[]>('/favorites')
}

export function checkFavorite(itemType: string, itemId: string) {
  return api.get<{ isFavorite: boolean }>(`/favorites/check/${itemType}/${itemId}`)
}

export function getDownloads() {
  return api.get<any[]>('/downloads')
}

export function getAvatars() {
  return api.get<{ id: string; nombre: string; imageUrl: string }[]>('/avatars')
}
