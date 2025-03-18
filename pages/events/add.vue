<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <NuxtLink to="/" class="flex items-center text-2xl font-bold text-primary">
              MBC Calendar
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/events" class="text-gray-700 hover:text-primary">Event-Kalender</NuxtLink>
            <NuxtLink to="/events/add" class="text-gray-700 hover:text-primary">Event hinzufügen</NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Event hinzufügen</h1>

      <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-lg p-8">
        <div class="space-y-6">
          <!-- Event Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
            <input 
              v-model="eventData.title" 
              type="text" 
              required
              placeholder="z.B. Bachata Night" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
          </div>

          <!-- Event Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Event Typ</label>
            <select 
              v-model="eventData.type"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="party">Party</option>
              <option value="workshop">Workshop</option>
              <option value="festival">Festival</option>
            </select>
          </div>

          <!-- Date and Time -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Datum</label>
              <input 
                v-model="eventData.date" 
                type="date" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Uhrzeit</label>
              <input 
                v-model="eventData.time" 
                type="time" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
            </div>
          </div>

          <!-- Location -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ort</label>
            <input 
              v-model="eventData.venue" 
              type="text" 
              required
              placeholder="z.B. Tanzschule XYZ" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-2"
            >
            <input 
              v-model="eventData.address" 
              type="text" 
              required
              placeholder="Adresse" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Beschreibung</label>
            <textarea 
              v-model="eventData.description" 
              rows="4" 
              required
              placeholder="Beschreibe dein Event..." 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            ></textarea>
          </div>

          <!-- Price -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Preis</label>
            <div class="relative">
              <input 
                v-model="eventData.price" 
                type="number" 
                required
                step="0.01"
                min="0"
                placeholder="0.00" 
                class="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
              <span class="absolute left-3 top-2 text-gray-500">€</span>
            </div>
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Event Bild</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div class="space-y-2">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="text-gray-600">
                  <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-blue-600 focus-within:outline-none">
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
                <img v-if="previewUrl" :src="previewUrl" class="mt-4 mx-auto max-h-48 rounded-lg">
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            :disabled="isSubmitting"
            class="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? 'Wird erstellt...' : 'Event erstellen' }}
          </button>

          <!-- Error Message -->
          <p v-if="error" class="text-red-600 text-center mt-4">{{ error }}</p>
        </div>
      </form>
    </main>

    <footer class="bg-white mt-16 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
        © {{ new Date().getFullYear() }} MBC Calendar. Alle Rechte vorbehalten.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface EventData {
  title: string
  type: string
  date: string
  time: string
  venue: string
  address: string
  description: string
  price: number
  image?: File
}

const router = useRouter()
const eventData = ref<EventData>({
  title: '',
  type: 'party',
  date: '',
  time: '',
  venue: '',
  address: '',
  description: '',
  price: 0
})

const isSubmitting = ref(false)
const error = ref('')
const previewUrl = ref('')

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    eventData.value.image = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

async function handleSubmit() {
  try {
    isSubmitting.value = true
    error.value = ''

    // Create FormData
    const formData = new FormData()
    formData.append('title', eventData.value.title)
    formData.append('type', eventData.value.type)
    formData.append('date', eventData.value.date)
    formData.append('time', eventData.value.time)
    formData.append('venue', eventData.value.venue)
    formData.append('address', eventData.value.address)
    formData.append('description', eventData.value.description)
    formData.append('price', eventData.value.price.toString())
    
    if (eventData.value.image) {
      formData.append('image', eventData.value.image)
    }

    // Send request to API using fetch instead of useFetch
    const response = await fetch('/api/events', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Ein Fehler ist aufgetreten')
    }

    // Redirect to events page on success
    router.push('/events')
  } catch (e) {
    console.error('Form Error:', e)
    error.value = e instanceof Error ? e.message : 'Ein unerwarteter Fehler ist aufgetreten'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.text-primary {
  color: #6B21A8;
}
.bg-primary {
  background-color: #6B21A8;
}
.hover\:text-primary:hover {
  color: #6B21A8;
}
.hover\:bg-primary:hover {
  background-color: #581C87;
}
.focus\:ring-primary:focus {
  --tw-ring-color: #6B21A8;
}
button.bg-primary:hover {
  background-color: #581C87;
}
</style> 