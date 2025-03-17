<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Event erstellen</h1>
    
    <form @submit.prevent="createEvent" class="space-y-4">
      <div>
        <label class="block mb-2">Titel</label>
        <input v-model="event.title" required class="w-full p-2 border rounded" />
      </div>
      
      <div>
        <label class="block mb-2">Beschreibung</label>
        <textarea v-model="event.description" required class="w-full p-2 border rounded" rows="4"></textarea>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block mb-2">Datum & Uhrzeit</label>
          <input type="datetime-local" v-model="event.date" required class="w-full p-2 border rounded" />
        </div>
        
        <div>
          <label class="block mb-2">Ort</label>
          <input v-model="event.location" required class="w-full p-2 border rounded" />
        </div>
      </div>
      
      <div>
        <label class="block mb-2">Banner-Bild</label>
        <input type="file" @change="handleImageUpload" accept="image/*" class="w-full p-2 border rounded" />
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block mb-2">Name</label>
          <input v-model="event.creatorName" required class="w-full p-2 border rounded" />
        </div>
        
        <div>
          <label class="block mb-2">E-Mail</label>
          <input type="email" v-model="event.creatorEmail" required class="w-full p-2 border rounded" />
        </div>
      </div>
      
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Event erstellen
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const event = ref({
  title: '',
  description: '',
  date: '',
  location: '',
  bannerUrl: '',
  creatorName: '',
  creatorEmail: ''
})

async function handleImageUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    // Hier implementieren wir später den Image-Upload
    // Vorübergehend speichern wir nur den Dateinamen
    event.value.bannerUrl = file.name
  }
}

async function createEvent() {
  try {
    await $fetch('/api/events', {
      method: 'POST',
      body: event.value
    })
    navigateTo('/events')
  } catch (error) {
    console.error('Error creating event:', error)
  }
}
</script> 