<template>
  <div class="min-h-screen bg-[#1a1a1a]">
    <!-- Admin Topbar -->
    <div v-if="isAdmin" class="bg-pink-600 text-white py-2">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span class="font-medium">Admin View</span>
        </div>
        <button @click="logout" class="text-white hover:text-gray-200 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>

    <div class="py-6 sm:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Page Header -->
        <div class="mb-6 sm:mb-8">
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold text-white mb-2">Events</h1>
            <p class="text-gray-400">Finde alle Tanz-Events in deiner Nähe</p>
          </div>
        </div>

        <!-- Week Filter -->
        <div class="mb-6 sm:mb-8 bg-[#2a2a2a] rounded-lg p-3 sm:p-4 flex items-center justify-between">
          <button
            @click="previousWeek"
            class="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div class="text-center px-2">
            <h2 class="text-sm sm:text-base text-white font-semibold mb-1">{{ formatWeekRange(selectedWeekStart) }}</h2>
            <button
              @click="resetToCurrentWeek"
              class="text-xs sm:text-sm text-pink-400 hover:text-pink-300 transition-colors"
            >
              Aktuelle Woche
            </button>
          </div>
          <button
            @click="nextWeek"
            class="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Events Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div v-for="event in events" :key="event.id" class="bg-[#2a2a2a] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200">
            <div class="relative">
              <NuxtLink :to="`/events/${event.id}`">
                <!-- Event Image -->
                <div v-if="event.imageUrl" class="relative h-40 sm:h-48">
                  <img
                    :src="event.imageUrl"
                    :alt="event.title"
                    class="w-full h-full object-cover"
                  >
                  <div v-if="isAdmin" class="absolute top-2 right-2">
                    <button
                      @click.prevent="toggleFeatured(event)"
                      class="p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                      :class="{ 'text-yellow-400': event.isFeatured }"
                      title="Toggle featured status"
                    >
                      <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Event Content -->
                <div class="p-3 sm:p-4 lg:p-6">
                  <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 line-clamp-2">{{ event.title }}</h2>

                  <!-- Event Type Badge -->
                  <div class="inline-block px-2.5 py-1 bg-pink-600/20 text-pink-400 rounded-full text-xs sm:text-sm mb-3 sm:mb-4">
                    {{ event.type }}
                  </div>

                  <!-- Event Details -->
                  <div class="space-y-2 text-sm sm:text-base text-gray-400">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span class="line-clamp-1">{{ formatDate(event.date) }}</span>
                    </div>
                    <div class="flex items-center">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{{ event.time }}</span>
                    </div>
                    <div class="flex items-center">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span class="line-clamp-1">{{ event.venue }}</span>
                    </div>
                    <div class="flex items-center">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{{ formatPrice(event.price) }}</span>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  role: string;
}

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  price: number;
  imageUrl: string | null;
  isFeatured: boolean;
  isRepeating: boolean;
  repeatUntil: string | null;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

const { data: allEvents, refresh } = await useFetch('/api/events')
const { isAdmin, logout } = useAuth()
const error = ref('')

// Week filter state
const selectedWeekStart = ref(getStartOfWeek(new Date()))

// Filter events by selected week
const events = computed(() => {
  if (!allEvents.value) return []

  const weekEnd = new Date(selectedWeekStart.value)
  weekEnd.setDate(weekEnd.getDate() + 6)

  return allEvents.value.filter((event: Event) => {
    const eventDate = new Date(event.date)
    return eventDate >= selectedWeekStart.value && eventDate <= weekEnd
  })
})

// Week navigation functions
function previousWeek() {
  const newDate = new Date(selectedWeekStart.value)
  newDate.setDate(newDate.getDate() - 7)
  selectedWeekStart.value = newDate
}

function nextWeek() {
  const newDate = new Date(selectedWeekStart.value)
  newDate.setDate(newDate.getDate() + 7)
  selectedWeekStart.value = newDate
}

function resetToCurrentWeek() {
  selectedWeekStart.value = getStartOfWeek(new Date())
}

function getStartOfWeek(date: Date) {
  const newDate = new Date(date)
  const day = newDate.getDay()
  const diff = newDate.getDate() - day + (day === 0 ? -6 : 1) // Adjust for Sunday
  newDate.setDate(diff)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}

function formatWeekRange(startDate: Date) {
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 6)

  const startDay = startDate.getDate()
  const startMonth = startDate.toLocaleString('de-DE', { month: 'short' })
  const endDay = endDate.getDate()
  const endMonth = endDate.toLocaleString('de-DE', { month: 'short' })
  const year = startDate.getFullYear()

  if (startMonth === endMonth) {
    return `${startDay}. - ${endDay}. ${startMonth} ${year}`
  }
  return `${startDay}. ${startMonth} - ${endDay}. ${endMonth} ${year}`
}

async function toggleFeatured(event: any) {
  try {
    error.value = ''
    const response = await fetch(`/api/events/${event.id}/feature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isFeatured: !event.isFeatured })
    })

    if (!response.ok) {
      throw new Error('Failed to update featured status')
    }

    await refresh()
  } catch (error: any) {
    console.error('Error toggling featured status:', error)
    error.value = error.message || 'Failed to update featured status'
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>
