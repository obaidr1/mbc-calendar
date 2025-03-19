<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Hero Banner -->
    <div class="relative h-[500px] overflow-hidden">
      <div class="absolute inset-0 flex">
        <div v-for="(event, index) in displayEvents" :key="event.id"
          class="w-full flex-shrink-0 transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(${-100 * currentSlide}%)` }"
        >
          <div class="relative h-[500px]">
            <img
              :src="event.imageUrl || '/default-event.jpg'"
              :alt="event.title"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent">
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="container mx-auto">
                  <h2 class="text-4xl font-bold text-white mb-4">{{ event.title }}</h2>
                  <p class="text-lg text-gray-200 mb-6">{{ event.description }}</p>
                  <NuxtLink
                    :to="`/events/${event.id}`"
                    class="inline-flex items-center px-6 py-3 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-200"
                  >
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Dots -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          v-for="(_, index) in displayEvents"
          :key="index"
          @click="currentSlide = index"
          class="w-3 h-3 rounded-full transition-colors duration-200"
          :class="currentSlide === index ? 'bg-pink-500' : 'bg-gray-400'"
        />
      </div>

      <!-- Navigation Arrows -->
      <button
        @click="prevSlide"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/75 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        @click="nextSlide"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/75 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Rest of the content -->
    <div class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold text-white mb-8">Upcoming Events</h2>
      <!-- Event grid here -->
    </div>

    <!-- Newsletter Section -->
    <div class="bg-[#2a2a2a] py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p class="text-gray-400 mb-8">Subscribe to our newsletter to get the latest updates about events and workshops.</p>
          <form @submit.prevent="handleNewsletterSubmit" class="flex flex-col sm:flex-row gap-4">
            <input
              v-model="email"
              type="email"
              required
              placeholder="Enter your email"
              class="flex-1 px-4 py-3 bg-[#1a1a1a] border border-pink-600/20 rounded-lg text-white placeholder-gray-500 focus:border-pink-600 focus:ring-0"
            >
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}
            </button>
          </form>
          <p v-if="newsletterError" class="text-red-500 mt-4">{{ newsletterError }}</p>
          <p v-if="newsletterSuccess" class="text-green-500 mt-4">{{ newsletterSuccess }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentSlide = ref(0)
const { data: events } = await useFetch('/api/events')
const email = ref('')
const isSubmitting = ref(false)
const newsletterError = ref('')
const newsletterSuccess = ref('')

// Get featured events first, then fill with recent events up to 3
const displayEvents = computed(() => {
  if (!events.value) return []

  const featured = events.value.filter(event => event.isFeatured)
  const nonFeatured = events.value
    .filter(event => !event.isFeatured)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return [...featured, ...nonFeatured].slice(0, 3)
})

// Auto-advance slides every 5 seconds
let slideInterval
onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % displayEvents.value.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0
    ? displayEvents.value.length - 1
    : currentSlide.value - 1
}

async function handleNewsletterSubmit() {
  try {
    isSubmitting.value = true
    newsletterError.value = ''
    newsletterSuccess.value = ''

    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to subscribe')
    }

    newsletterSuccess.value = 'Successfully subscribed to newsletter!'
    email.value = ''
  } catch (error: any) {
    newsletterError.value = error.message || 'An error occurred while subscribing'
  } finally {
    isSubmitting.value = false
  }
}
</script>
