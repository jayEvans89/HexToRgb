<script lang="ts">
  import { onMount } from "svelte";

  let hexCode = "#ffffff";
  let rgbCode = "255, 255, 255";
  let backgroundColor = `background: ${hexCode}`;
  let darkOrLightText = "";

  $: {
    const splitNumbers = rgbCode.split(", ");
    let brightness =
      parseInt(splitNumbers[0]) * 299 +
      parseInt(splitNumbers[1]) * 587 +
      parseInt(splitNumbers[2]) * 114;
    brightness = brightness / 255000;

    // values range from 0 to 1
    // anything greater than 0.5 should be bright enough for dark text
    if (brightness >= 0.5) {
      darkOrLightText = "dark-text";
    } else {
      darkOrLightText = "light-text";
    }
  }

  onMount(() => {
    const previousHexCode = window.localStorage.getItem("hexCode");
    if (previousHexCode !== null) {
      hexCode = previousHexCode;
      convertToRGB();
    }
  });

  /**
   * Converts hexadecimal color to RGB
   */
  function convertToRGB() {
    if (hexCode.length != 7) {
      return;
    }

    backgroundColor = `background: ${hexCode}`;

    const removeHashTag = hexCode.split("#");
    const aRgbHex = removeHashTag[1].match(/.{1,2}/g);
    if (aRgbHex) {
      const aRgb = `${parseInt(aRgbHex[0], 16)}, ${parseInt(aRgbHex[1], 16)}, ${parseInt(aRgbHex[2], 16)}`;
      rgbCode = aRgb;
    }
    saveToLocalStorage();
  }

  /**
   * Converts RGB color to hexadecimal
   */
  function convertToHex() {
    const splitNumbers = rgbCode.split(", ");
    const hexNumbers = splitNumbers.map((number) => {
      const base16 = parseInt(number).toString(16);
      return base16.length == 1 ? `0${base16}` : base16;
    });
    hexCode = `#${hexNumbers.join("")}`;
    backgroundColor = `background: ${hexCode}`;
    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    window.localStorage.setItem("hexCode", hexCode);
  }
</script>

<main style={backgroundColor}>
  <h1 class="title {darkOrLightText}">Hex To Rgb</h1>
  <form>
    <div>
      <label for="hexCode" class={darkOrLightText}>Hex:</label>
      <input
        id="hexCode"
        data-testid="hexInput"
        class={darkOrLightText}
        type="string"
        bind:value={hexCode}
        on:input={convertToRGB}
      />
    </div>
    <div>
      <label for="rgbCode" class={darkOrLightText}>Rgb:</label>
      <input
        id="rgbCode"
        data-testid="rgbaInput"
        class={darkOrLightText}
        type="string"
        bind:value={rgbCode}
        on:input={convertToHex}
      />
    </div>
  </form>
</main>

<style lang="scss">
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
