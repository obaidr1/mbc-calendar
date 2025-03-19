<template>
  <div class="min-h-screen bg-[#1a1a1a] text-white">
    <!-- Header -->
    <nav class="bg-[#2a2a2a] border-b border-pink-600/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-white">
              MBC Calendar
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-8">
            <NuxtLink to="/about" class="text-gray-300 hover:text-pink-500 transition-colors">About</NuxtLink>
            <NuxtLink to="/events" class="text-gray-300 hover:text-pink-500 transition-colors">Event-Kalender</NuxtLink>
            <NuxtLink to="/events/add" class="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors">
              Event hinzufügen
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="min-h-[calc(100vh-8rem)]">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-[#2a2a2a] border-t border-pink-600/20 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold text-white mb-4">MBC Calendar</h3>
            <p class="text-gray-400">Your go-to platform for dance events and workshops.</p>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/events" class="text-gray-400 hover:text-pink-500">Events</NuxtLink></li>
              <li><NuxtLink to="/events/add" class="text-gray-400 hover:text-pink-500">Add Event</NuxtLink></li>
              <li><NuxtLink to="/about" class="text-gray-400 hover:text-pink-500">About</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white mb-4">Contact</h3>
            <p class="text-gray-400">Email: info@mbccalendar.com</p>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-pink-600/20 text-center text-gray-400">
          © {{ new Date().getFullYear() }} MBC Calendar. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.bg-primary {
  background-color: #FF1B6B;
}
.text-primary {
  color: #FF1B6B;
}
.hover\:text-primary:hover {
  color: #FF1B6B;
}
.focus\:ring-primary:focus {
  --tw-ring-color: #FF1B6B;
}
.border-primary {
  border-color: #FF1B6B;
}
</style>

<script setup lang="ts">
// Add any necessary setup logic here
</script>
