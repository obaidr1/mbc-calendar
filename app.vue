<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <NuxtLink to="/" class="flex items-center text-2xl font-bold text-primary">
              MBC Calendar
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/events" class="text-gray-700 hover:text-primary">Event-Kalender</NuxtLink>
            <NuxtLink to="/events/add" class="text-gray-700 hover:text-primary">Event hinzufügen</NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Bachata Calendar Munich</h1>
      <p class="text-xl text-gray-600 mb-12">Entdecke die besten Bachata-Events in München</p>

      <NuxtLink to="/events" class="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 mb-16">
        Zu den Events
      </NuxtLink>

      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Featured Events</h2>
        <!-- Featured events will be added here -->
      </section>

      <section class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Newsletter</h2>
        <p class="text-gray-600 mb-8">Bleibe auf dem Laufenden über die neuesten Bachata-Events in München</p>
        
        <form class="space-y-4">
          <div>
            <input type="text" placeholder="Dein Name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
          </div>
          <div>
            <input type="email" placeholder="Deine Email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
          </div>
          <button type="submit" class="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600">
            Newsletter abonnieren
          </button>
        </form>
      </section>
    </main>

    <footer class="bg-white mt-16 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
        © {{ new Date().getFullYear() }} MBC Calendar. Alle Rechte vorbehalten.
      </div>
    </footer>
  </div>
</template>
