<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

    <div class="bg-gray-800 rounded-lg shadow-xl p-6">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="px-6 py-3 text-left text-sm font-semibold">Title</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Venue</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Featured</th>
              <th class="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.id" class="border-b border-gray-700 hover:bg-gray-700/50">
              <td class="px-6 py-4">{{ event.title }}</td>
              <td class="px-6 py-4">{{ formatDate(event.date) }}</td>
              <td class="px-6 py-4">{{ event.venue }}</td>
              <td class="px-6 py-4">
                <button
                  @click="toggleFeatured(event)"
                  class="transition-colors duration-200"
                  :class="event.isFeatured ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </button>
              </td>
              <td class="px-6 py-4">
                <button
                  @click="deleteEvent(event.id)"
                  class="text-red-500 hover:text-red-400 transition-colors duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: events, refresh } = await useFetch('/api/events')

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const toggleFeatured = async (event) => {
  try {
    await $fetch(`/api/events/${event.id}/feature`, {
      method: 'PATCH',
      body: { isFeatured: !event.isFeatured }
    })
    await refresh()
  } catch (error) {
    console.error('Error toggling featured status:', error)
  }
}

const deleteEvent = async (id) => {
  if (!confirm('Are you sure you want to delete this event?')) return

  try {
    await $fetch(`/api/events/${id}`, {
      method: 'DELETE'
    })
    await refresh()
  } catch (error) {
    console.error('Error deleting event:', error)
  }
}
</script>
