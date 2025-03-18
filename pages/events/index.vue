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

    <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900">Event-Kalender</h1>
        <NuxtLink to="/events/add" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Event hinzufügen
        </NuxtLink>
      </div>

      <!-- Event Filter -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Datum</label>
            <input type="date" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ort</label>
            <input type="text" placeholder="München" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Kategorie</label>
            <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="">Alle</option>
              <option value="party">Party</option>
              <option value="workshop">Workshop</option>
              <option value="festival">Festival</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Event List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Event Card (Placeholder) -->
        <div v-for="i in 6" :key="i" class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="aspect-w-16 aspect-h-9 bg-gray-200"></div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Bachata Night</h3>
                <p class="text-gray-600">München, Deutschland</p>
              </div>
              <span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">Party</span>
            </div>
            <div class="mb-4">
              <div class="flex items-center text-gray-600 mb-2">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Freitag, 22. März 2024</span>
              </div>
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>21:00 - 03:00</span>
              </div>
            </div>
            <NuxtLink :to="`/events/${i}`" class="block w-full text-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600">
              Details
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-white mt-16 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
        © {{ new Date().getFullYear() }} MBC Calendar. Alle Rechte vorbehalten.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Event {
  id: number
  title: string
  description: string
  date: Date
  location: string
  bannerUrl?: string
  creatorName: string
  creatorEmail: string
}

const selectedWeek = ref('')
const selectedLocation = ref('')
const events = ref<Event[]>([])

// Fetch events
const { data: eventsData } = await useFetch<Event[]>('/api/events')
events.value = eventsData.value || []

// Computed properties
const locations = computed(() => {
  return [...new Set(events.value.map(event => event.location))]
})

const filteredEvents = computed(() => {
  let filtered = events.value

  if (selectedWeek.value) {
    const weekStart = new Date(selectedWeek.value)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 7)
    
    filtered = filtered.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate >= weekStart && eventDate < weekEnd
    })
  }

  if (selectedLocation.value) {
    filtered = filtered.filter(event => event.location === selectedLocation.value)
  }

  return filtered
})

// Methods
function viewEventDetails(event: Event) {
  // Implement event details view logic
  console.log('View details for event:', event)
}
</script> 