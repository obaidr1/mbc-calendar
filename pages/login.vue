<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6">Admin Login</h1>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block mb-2">Passwort</label>
        <input
          type="password"
          v-model="password"
          required
          class="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {{ loading ? 'Wird eingeloggt...' : 'Einloggen' }}
      </button>

      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
const password = ref('')
const error = ref('')
const loading = ref(false)
const { login } = useAuth()

async function handleLogin() {
  try {
    loading.value = true
    error.value = ''

    const success = await login(password.value)

    if (success) {
      await navigateTo('/events')
    } else {
      error.value = 'Falsches Passwort'
    }
  } catch (e) {
    error.value = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
    console.error('Login error:', e)
  } finally {
    loading.value = false
  }
}
</script>
