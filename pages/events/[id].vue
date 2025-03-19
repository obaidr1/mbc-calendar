<template>
  <div class="min-h-screen bg-[#1a1a1a] py-6 sm:py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="pending" class="text-center text-white">
        Loading...
      </div>
      <div v-else-if="error" class="text-center text-red-500">
        {{ error }}
      </div>
      <div v-else-if="event" class="bg-[#2a2a2a] rounded-lg overflow-hidden">
        <!-- Event Image -->
        <div v-if="event.imageUrl" class="relative h-64 sm:h-96">
          <img
            :src="event.imageUrl"
            :alt="event.title"
            class="w-full h-full object-cover"
          >
        </div>

        <!-- Event Content -->
        <div class="p-6 sm:p-8">
          <h1 class="text-3xl sm:text-4xl font-bold text-white mb-4">{{ event.title }}</h1>

          <!-- Event Type Badge -->
          <div class="inline-block px-4 py-1 bg-pink-600/20 text-pink-400 rounded-full text-sm mb-6">
            {{ event.type }}
          </div>

          <!-- Event Details -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div class="space-y-2">
              <div class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(event.date) }}
              </div>
              <div class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ event.time }}
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ event.venue }}
              </div>
              <div class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ formatPrice(event.price) }}
              </div>
            </div>
          </div>

          <!-- Event Description -->
          <div class="prose prose-invert max-w-none mb-8">
            <p class="text-gray-300 whitespace-pre-line">{{ event.description }}</p>
          </div>

          <!-- Event Address -->
          <div class="bg-[#1a1a1a] p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-white mb-2">Location</h3>
            <p class="text-gray-400">{{ event.address }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: event, pending, error } = await useFetch(`/api/events/${route.params.id}`)

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
