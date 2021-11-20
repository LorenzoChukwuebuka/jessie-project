<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body {
  background-color: rgb(16, 32, 41) !important;
  color: ghostwhite;
  font-family: Arial, Helvetica, sans-serif;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background-color: rgb(16, 32, 41) !important;

  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
