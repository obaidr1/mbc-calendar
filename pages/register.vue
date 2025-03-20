<template>
  <div class="min-h-screen bg-[#1a1a1a] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
          Registrieren
        </h2>
        <p class="mt-2 text-center text-sm text-gray-400">
          Oder
          <NuxtLink to="/login" class="font-medium text-pink-600 hover:text-pink-500">
            melde dich an, wenn du bereits ein Konto hast
          </NuxtLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Name</label>
            <input
              id="name"
              v-model="formData.name"
              name="name"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-pink-600/20 placeholder-gray-500 text-white bg-[#2a2a2a] rounded-t-md focus:outline-none focus:ring-pink-600 focus:border-pink-600 focus:z-10 sm:text-sm"
              placeholder="Name"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Passwort</label>
            <input
              id="password"
              v-model="formData.password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-pink-600/20 placeholder-gray-500 text-white bg-[#2a2a2a] focus:outline-none focus:ring-pink-600 focus:border-pink-600 focus:z-10 sm:text-sm"
              placeholder="Passwort"
            >
          </div>
          <div>
            <label for="confirmPassword" class="sr-only">Passwort bestätigen</label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-pink-600/20 placeholder-gray-500 text-white bg-[#2a2a2a] rounded-b-md focus:outline-none focus:ring-pink-600 focus:border-pink-600 focus:z-10 sm:text-sm"
              placeholder="Passwort bestätigen"
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                v-if="!loading"
                class="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            {{ loading ? 'Wird registriert...' : 'Registrieren' }}
          </button>
        </div>

        <p v-if="error" class="text-red-500 text-center text-sm">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const error = ref('')

const formData = reactive({
  name: '',
  password: '',
  confirmPassword: ''
})

async function handleSubmit() {
  try {
    if (formData.password !== formData.confirmPassword) {
      error.value = 'Die Passwörter stimmen nicht überein'
      return
    }

    loading.value = true
    error.value = ''

    // TODO: Implement registration API call
    // For now, we'll just redirect to login
    await navigateTo('/login')
  } catch (err: any) {
    error.value = err.message || 'Registrierung fehlgeschlagen'
  } finally {
    loading.value = false
  }
}
</script>
