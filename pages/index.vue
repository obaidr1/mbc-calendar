<template>
  <div>
    <!-- Hero Section with Background Image -->
    <div class="relative min-h-screen">
      <!-- Background Image with Blur Effect -->
      <div class="absolute inset-0">
        <img 
          src="/images/hero-bg.jpg" 
          alt="Background" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-dark-bg/70 backdrop-blur-sm"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div class="max-w-4xl mx-auto text-center mb-20">
          <h1 class="text-6xl font-bold text-white mb-6 animate-fade-in">
            Bachata Calendar Munich
          </h1>
          <p class="text-xl text-gray-300 mb-8 animate-slide-up">
            Entdecke die besten Bachata-Events in München
          </p>
          <NuxtLink 
            to="/events" 
            class="inline-block bg-neon-purple hover:bg-neon-blue text-white px-8 py-3 rounded-full transition-colors duration-300"
          >
            Zu den Events
          </NuxtLink>
        </div>

        <!-- Featured Events Section -->
        <div class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-8 text-center">Featured Events</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EventCard
              v-for="event in featuredEvents"
              :key="event.id"
              :event="event"
              @view-details="viewEventDetails"
              class="animate-fade-in"
            />
          </div>
        </div>

        <!-- Newsletter Section -->
        <div class="max-w-2xl mx-auto bg-dark-card/80 backdrop-blur-md rounded-2xl p-8 border border-neon-purple/20">
          <h2 class="text-2xl font-bold text-white mb-4 text-center">Newsletter</h2>
          <p class="text-gray-300 mb-6 text-center">
            Bleibe auf dem Laufenden über die neuesten Bachata-Events in München
          </p>
          <form @submit.prevent="subscribeToNewsletter" class="space-y-4">
            <div class="flex flex-col md:flex-row gap-4">
              <input 
                v-model="newsletter.name"
                type="text" 
                placeholder="Dein Name"
                class="flex-1 bg-dark-hover border border-neon-purple/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple"
                required
              />
              <input 
                v-model="newsletter.email"
                type="email" 
                placeholder="Deine Email"
                class="flex-1 bg-dark-hover border border-neon-purple/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple"
                required
              />
            </div>
            <button 
              type="submit"
              class="w-full bg-neon-blue hover:bg-neon-purple text-white px-6 py-3 rounded-full transition-colors duration-300 flex items-center justify-center"
              :disabled="isSubscribing"
            >
              <span v-if="isSubscribing">Wird angemeldet...</span>
              <span v-else>Newsletter abonnieren</span>
            </button>
          </form>
          <p v-if="subscriptionMessage" class="mt-4 text-center" :class="subscriptionSuccess ? 'text-green-400' : 'text-red-400'">
            {{ subscriptionMessage }}
          </p>
        </div>
      </div>
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
}

interface Newsletter {
  name: string
  email: string
}

// Featured Events
const { data: eventsData } = await useFetch<Event[]>('/api/events')
const featuredEvents = computed(() => {
  const events = eventsData.value || []
  // Get the next 3 upcoming events
  return events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)
})

// Newsletter Form
const newsletter = ref<Newsletter>({
  name: '',
  email: ''
})
const isSubscribing = ref(false)
const subscriptionMessage = ref('')
const subscriptionSuccess = ref(false)

async function subscribeToNewsletter() {
  try {
    isSubscribing.value = true
    // Here you would typically make an API call to subscribe the user
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    subscriptionMessage.value = 'Erfolgreich zum Newsletter angemeldet!'
    subscriptionSuccess.value = true
    newsletter.value = { name: '', email: '' }
  } catch (error) {
    subscriptionMessage.value = 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.'
    subscriptionSuccess.value = false
  } finally {
    isSubscribing.value = false
  }
}

function viewEventDetails(event: Event) {
  // Implement event details view logic
  console.log('View details for event:', event)
}
</script> 