<template>
  <div 
    class="bg-dark-card rounded-lg overflow-hidden shadow-lg hover:shadow-neon-purple/20 transition-all duration-300 transform hover:-translate-y-1"
  >
    <div class="relative h-48">
      <img 
        :src="event.bannerUrl || '/images/default-event.jpg'" 
        :alt="event.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-4">
        <h3 class="text-xl font-bold text-white mb-1">{{ event.title }}</h3>
        <p class="text-neon-blue text-sm">{{ formatDate(event.date) }}</p>
      </div>
    </div>
    
    <div class="p-4">
      <p class="text-gray-300 mb-4 line-clamp-2">{{ event.description }}</p>
      <div class="flex items-center justify-between">
        <span class="text-neon-pink text-sm">{{ event.location }}</span>
        <button 
          class="bg-neon-purple hover:bg-neon-blue text-white px-4 py-2 rounded-full text-sm transition-colors duration-300"
          @click="$emit('view-details', event)"
        >
          Mehr Infos
        </button>
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

const props = defineProps<{
  event: Event
}>()

defineEmits<{
  (e: 'view-details', event: Event): void
}>()

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script> 