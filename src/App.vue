

<template>
  <main :style="backgroundColor">
    <h1 :class="['title', darkOrLightText]">Hex To Rgb</h1>
    <form>
      <div>
        <label for="hexCode" :class="darkOrLightText">Hex:</label>
        <input id="hexCode" :class="darkOrLightText" type="string" v-model="hexCode" @input="convertToRGB" />
      </div>
      <div>
        <label for="rgbCode" :class="darkOrLightText">Rgb:</label>
        <input id="rgbCode" :class="darkOrLightText" type="string" v-model="rgbCode" @input="convertToHex" />
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const hexCode = ref('#ffffff')
const rgbCode = ref('255, 255, 255')
const backgroundColor = ref(`background: ${hexCode.value}`)

const darkOrLightText = computed(() => {
  const splitNumbers = rgbCode.value.split(', ')
  let brightness = (parseInt(splitNumbers[0]) * 299) + (parseInt(splitNumbers[1]) * 587) + (parseInt(splitNumbers[2]) * 114);
  brightness = brightness / 255000;

  // values range from 0 to 1
  // anything greater than 0.5 should be bright enough for dark text
  if (brightness >= 0.5) {
    return "dark-text";
  } else {
    return "light-text";
  }
})

onMounted(() => {
  const previousHexCode = window.localStorage.getItem('hexCode')
  if (previousHexCode !== null) {
    hexCode.value = previousHexCode
    convertToRGB()
  }
})

/**
 * Converts hexadecimal color to RGB
 */
function convertToRGB() {
  if (hexCode.value.length != 7) {
    return
  }

  backgroundColor.value = `background: ${hexCode.value}`

  const removeHashTag = hexCode.value.split('#')
  const aRgbHex = removeHashTag[1].match(/.{1,2}/g);
  if (aRgbHex) {
    const aRgb = `${parseInt(aRgbHex[0], 16)}, ${parseInt(aRgbHex[1], 16)}, ${parseInt(aRgbHex[2], 16)}`
    rgbCode.value = aRgb
    saveToLocalStorage()
  }
}

/**
 * Converts RGB color to hexadecimal
 */
function convertToHex() {
  const splitNumbers = rgbCode.value.split(', ')
  const hexNumbers = splitNumbers.map(number => {
    const base16 = parseInt(number).toString(16)
    return base16.length == 1 ? `0${base16}` : base16
  })
  hexCode.value = `#${hexNumbers.join('')}`
  backgroundColor.value = `background: ${hexCode.value}`
  saveToLocalStorage()
}

function saveToLocalStorage() {
  window.localStorage.setItem('hexCode', hexCode.value)
}
</script>

<style lang="scss" scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: 150ms ease-in-out;
}

.dark-text {
  color: #000;
}

.light-text {
  color: #fff;
}

.title {
  font-size: 80px;
  transition: 150ms ease-in-out;
  margin-top: 0;
}

form {
  margin-top: 30px;

  label {
    font-weight: bold;
    padding-right: 5px;
    font-size: 22px;
    transition: 150ms ease-in-out;
  }

  input {
    background: transparent;
    border: 1px solid;
    letter-spacing: 0.5px;
    font-size: 20px;
    transition: 150ms ease-in-out;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
}
</style>
