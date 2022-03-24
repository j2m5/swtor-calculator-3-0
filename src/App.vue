<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background-color: #111015;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a2a4a3;
  input, select {
    background-color: #111015;
    border: 1px solid #6799b4;
    border-radius: 3px;
    color: #a2a4a3;
    cursor: pointer;
    outline: none;
    padding: 3px;
  }
  button {
    background-color: #111015;
    border: 1px solid #6799b4;
    border-radius: 3px;
    color: #a2a4a3;
    outline: none;
    cursor: pointer;
    padding: 5px;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    &:hover:not(:disabled) {
      background-color: #0d3348;
    }
  }
  #usingAugments {
    display: none;
  }
  label[for=usingAugments]:before {
    content: '';
    color: #6799b4;
    cursor: pointer;
    display: inline-block;
    margin-right: 7px;
    position: relative;
    top: -1px;
    text-align: center;
    width: 15px;
    height: 15px;
    background: #111015;
    border: 1px solid #6799b4;
    vertical-align: middle;
  }
  #usingAugments:checked + label[for=usingAugments]:before {
    content: '✓';
  }
}

.navigation {
  a {
    color: #a2a4a3;
    &.router-link-exact-active {
      color: #a2a4a3;
    }
  }
}
</style>
