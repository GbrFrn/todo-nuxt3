<template>
  <div class="w-full min-h-screen bg-gray-100">
    <section class="text-center pt-7">
      <h1 class="text-4xl text-gray-800">What are we doing today?</h1>
    </section>
    <section
      class="w-9/12 flex mx-auto mt-10 bg-white items-center justify-center rounded-lg shadow-lg p-5"
    >
      <form @submit.prevent>
        <input
          type="text"
          class="py-2 px-4 rounded-md border-blue-200 focus:outline-blue-500"
          placeholder="Add your todo"
        />
        <button
          class="bg-blue-500 hover:bg-blue-900 text-white rounded-md py-2 px-4 ml-3"
        >
          Add Todo
        </button>
      </form>
    </section>
  </div>
</template>
