<template>
  <div class="min-h-screen bg-[#1a1a1a] py-6 sm:py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-6 sm:mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-white mb-2">Event hinzufügen</h1>
        <p class="text-gray-400">Fülle das Formular aus, um dein Event zu erstellen</p>
      </div>

      <!-- Event Form -->
      <form @submit.prevent="handleSubmit" class="bg-[#2a2a2a] rounded-lg p-4 sm:p-8">
        <div class="space-y-4 sm:space-y-6">
          <!-- Event Name -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Event Name</label>
            <input
              v-model="eventData.title"
              type="text"
              required
              placeholder="z.B. Bachata Night"
              class="w-full px-4 py-3 bg-[#1a1a1a] border border-pink-600/20 rounded-lg text-white placeholder-gray-500 focus:border-pink-600 focus:ring-0"
            >
          </div>

          <!-- Event Type -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Event Typ</label>
            <select
              v-model="eventData.type"
              required
              class="w-full px-4 py-3 bg-[#1a1a1a] border border-pink-600/20 rounded-lg text-white focus:border-pink-600 focus:ring-0"
            >
              <option value="party">Party</option>
              <option value="workshop">Workshop</option>
              <option value="festival">Festival</option>
            </select>
          </div>

          <!-- Date and Time -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Datum</label>
              <input
                v-model="eventData.date"
                type="date"
                required
                class="w-full px-4 py-3 bg-[#1a1a1a] border border-pink-600/20 rounded-lg text-white focus:border-pink-600 focus:ring-0"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Uhrzeit</label>
              <input
                v-model="eventData.time"
                type="time"
                required
                class="w-full px-4 py-3 bg-[#1a1a1a] border border-pink-600/20 rounded-lg text-white focus:border-pink-600 focus:ring-0"
              >
            </div>
          </div>

          <!-- Location -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Location Name</label>
              <input
                v-model="eventData.venue"
                type="text"
                required
                placeholder="z.B. Tanzschule XYZ"
                class="w-full px-4 py-3 bg-[#1a1a1a] border border-pink-600/20 rounded-lg text-white placeholder-gray-500 focus:border-pink-600 focus:ring-0"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Adresse</label>
              <input
                v-model="eventData.address"
                type="text"
                required
                placeholder="Straße, Hausnummer, PLZ, Stadt"
                class="w-full px-4 py-3 bg-[#1a1a1a] border border-pink-600/20 rounded-lg text-white placeholder-gray-500 focus:border-pink-600 focus:ring-0"
              >
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Beschreibung</label>
            <textarea
              v-model="eventData.description"
              rows="4"
              required
              placeholder="Beschreibe dein Event..."
              class="w-full px-4 py-3 bg-[#1a1a1a] border border-pink-600/20 rounded-lg text-white placeholder-gray-500 focus:border-pink-600 focus:ring-0 resize-none"
            ></textarea>
          </div>

          <!-- Price -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Preis</label>
            <div class="relative">
              <input
                v-model="eventData.price"
                type="number"
                required
                step="0.01"
                min="0"
                placeholder="0.00"
                class="w-full pl-8 pr-4 py-3 bg-[#1a1a1a] border border-pink-600/20 rounded-lg text-white placeholder-gray-500 focus:border-pink-600 focus:ring-0"
              >
              <span class="absolute left-3 top-3.5 text-gray-500">€</span>
            </div>
          </div>

          <!-- Repeat Options -->
          <div class="space-y-4">
            <div class="flex items-center">
              <input
                v-model="eventData.isRepeating"
                type="checkbox"
                class="h-4 w-4 text-pink-600 focus:ring-pink-600 border-gray-600 rounded bg-[#1a1a1a]"
              >
              <label class="ml-2 block text-sm text-gray-300">Event wiederholen</label>
            </div>

            <div v-if="eventData.isRepeating" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Wiederholen bis</label>
                <input
                  v-model="eventData.repeatUntil"
                  type="date"
                  required
                  :min="eventData.date"
                  class="w-full px-4 py-3 bg-[#1a1a1a] border border-pink-600/20 rounded-lg text-white focus:border-pink-600 focus:ring-0"
                >
              </div>
              <p class="text-sm text-gray-400">Das Event wird wöchentlich bis zum ausgewählten Datum wiederholt.</p>
            </div>
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Event Bild</label>
            <div class="border-2 border-dashed border-pink-600/20 rounded-lg p-4 sm:p-8 text-center">
              <div class="space-y-2">
                <div v-if="!previewUrl" class="space-y-2">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="text-gray-400">
                    <label for="file-upload" class="relative cursor-pointer text-pink-500 hover:text-pink-400 focus-within:outline-none">
                      <span>Bild hochladen</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        @change="handleFileUpload"
                        accept="image/*"
                        class="sr-only"
                      >
                    </label>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF bis zu 10MB</p>
                </div>
                <div v-else class="relative">
                  <img :src="previewUrl" class="mx-auto max-h-48 rounded-lg" alt="Preview">
                  <button
                    type="button"
                    @click="removeImage"
                    class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end pt-6">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full sm:w-auto bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'Wird erstellt...' : 'Event erstellen' }}
            </button>
          </div>

          <!-- Error Message -->
          <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  middleware: ['auth']
})

const { isAdmin } = useAuth()

const isSubmitting = ref(false)
const error = ref('')

const eventData = reactive({
  title: '',
  type: 'party',
  date: '',
  time: '',
  venue: '',
  address: '',
  description: '',
  price: 0,
  image: null as File | null,
  isRepeating: false,
  repeatUntil: ''
})

const previewUrl = ref('')

// Redirect if not admin
onMounted(() => {
  if (!isAdmin.value) {
    navigateTo('/login')
  }
})

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    if (file.size > 10 * 1024 * 1024) {
      error.value = 'Das Bild darf nicht größer als 10MB sein'
      return
    }
    eventData.image = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

function removeImage() {
  eventData.image = null
  previewUrl.value = ''
  const input = document.getElementById('file-upload') as HTMLInputElement
  if (input) input.value = ''
}

async function handleSubmit() {
  try {
    isSubmitting.value = true
    error.value = ''

    const formData = new FormData()

    // Append all form fields
    formData.append('title', eventData.title)
    formData.append('type', eventData.type)
    formData.append('date', eventData.date)
    formData.append('time', eventData.time)
    formData.append('venue', eventData.venue)
    formData.append('address', eventData.address)
    formData.append('description', eventData.description)
    formData.append('price', eventData.price.toString())
    formData.append('isRepeating', eventData.isRepeating.toString())
    formData.append('repeatUntil', eventData.repeatUntil)

    // Append image if selected
    if (eventData.image) {
      formData.append('image', eventData.image)
    }

    const response = await fetch('/api/events', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create event')
    }

    // Reset form
    Object.assign(eventData, {
      title: '',
      type: 'party',
      date: '',
      time: '',
      venue: '',
      address: '',
      description: '',
      price: 0,
      image: null,
      isRepeating: false,
      repeatUntil: ''
    })
    previewUrl.value = ''

    // Navigate to events page
    await navigateTo('/events')
  } catch (error: any) {
    error.value = error.message || 'An error occurred while creating the event'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.bg-primary {
  background-color: #6B21A8;
}
.bg-primary-dark {
  background-color: #581C87;
}
.text-primary {
  color: #6B21A8;
}
.hover\:bg-primary-dark:hover {
  background-color: #581C87;
}
.focus\:ring-primary:focus {
  --tw-ring-color: #6B21A8;
}
</style>
