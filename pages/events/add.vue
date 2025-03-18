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

    <main class="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Event hinzufügen</h1>

      <form class="bg-white rounded-lg shadow-lg p-8">
        <div class="space-y-6">
          <!-- Event Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
            <input type="text" placeholder="z.B. Bachata Night" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
          </div>

          <!-- Event Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Event Typ</label>
            <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="party">Party</option>
              <option value="workshop">Workshop</option>
              <option value="festival">Festival</option>
            </select>
          </div>

          <!-- Date and Time -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Datum</label>
              <input type="date" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Uhrzeit</label>
              <input type="time" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
            </div>
          </div>

          <!-- Location -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ort</label>
            <input type="text" placeholder="z.B. Tanzschule XYZ" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-2">
            <input type="text" placeholder="Adresse" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Beschreibung</label>
            <textarea rows="4" placeholder="Beschreibe dein Event..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"></textarea>
          </div>

          <!-- Price -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Preis</label>
            <div class="relative">
              <input type="number" placeholder="0.00" class="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
              <span class="absolute left-3 top-2 text-gray-500">€</span>
            </div>
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Event Bild</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div class="space-y-2">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="text-gray-600">
                  <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-blue-600 focus-within:outline-none">
                    <span>Bild hochladen</span>
                    <input id="file-upload" name="file-upload" type="file" class="sr-only">
                  </label>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF bis zu 10MB</p>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600">
            Event erstellen
          </button>
        </div>
      </form>
    </main>

    <footer class="bg-white mt-16 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
        © {{ new Date().getFullYear() }} MBC Calendar. Alle Rechte vorbehalten.
      </div>
    </footer>
  </div>
</template> 