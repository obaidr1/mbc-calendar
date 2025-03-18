<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <div class="relative h-[60vh] rounded-2xl overflow-hidden mb-16 bg-dark-bg">
      <div class="absolute inset-0 flex items-center justify-center text-center">
        <div class="max-w-3xl px-4">
          <h1 class="text-5xl font-bold text-white mb-6 animate-fade-in">
            Entdecke unsere Events
          </h1>
          <p class="text-xl text-gray-300 mb-8 animate-slide-up">
            Erlebe unvergessliche Momente bei unseren exklusiven Veranstaltungen
          </p>
          <div class="flex justify-center space-x-4">
            <button class="bg-neon-purple hover:bg-neon-blue text-white px-8 py-3 rounded-full transition-colors duration-300">
              Alle Events
            </button>
            <button class="border-2 border-neon-blue text-neon-blue hover:bg-neon-blue/10 px-8 py-3 rounded-full transition-colors duration-300">
              Mehr Infos
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Section -->
    <div class="bg-dark-card rounded-xl p-6 mb-12">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="flex-1 w-full">
          <label class="block text-sm font-medium text-gray-300 mb-2">Kalenderwoche</label>
          <input 
            type="week" 
            v-model="selectedWeek"
            class="w-full bg-dark-hover border border-neon-purple/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple"
          />
        </div>
        <div class="flex-1 w-full">
          <label class="block text-sm font-medium text-gray-300 mb-2">Ort</label>
          <select 
            v-model="selectedLocation"
            class="w-full bg-dark-hover border border-neon-purple/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple"
          >
            <option value="">Alle Orte</option>
            <option v-for="location in locations" :key="location" :value="location">
              {{ location }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Events Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        @view-details="viewEventDetails"
        class="animate-fade-in"
      />
    </div>
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