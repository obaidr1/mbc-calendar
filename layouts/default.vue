<template>
  <div class="min-h-screen bg-dark-bg text-white">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-sm border-b border-neon-purple/20">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-8">
          <NuxtLink to="/" class="text-2xl font-bold text-neon-purple hover:text-neon-blue transition-colors">
            MBC Calendar
          </NuxtLink>
          <div class="hidden md:flex space-x-6">
            <NuxtLink to="/" class="text-white hover:text-neon-blue transition-colors">
              Home
            </NuxtLink>
            <NuxtLink to="/events" class="text-white hover:text-neon-blue transition-colors">
              Event-Kalender
            </NuxtLink>
          </div>
        </div>
        <NuxtLink 
          to="/admin/create-event" 
          class="bg-neon-purple hover:bg-neon-blue text-white px-6 py-2 rounded-full transition-colors duration-300 shadow-lg hover:shadow-neon-purple/50"
        >
          Event hinzufügen
        </NuxtLink>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="pt-20">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-dark-card mt-20 py-8">
      <div class="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} MBC Calendar. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Add any necessary setup logic here
</script> 