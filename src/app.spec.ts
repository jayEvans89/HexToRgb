import { shallowMount, VueWrapper } from '@vue/test-utils'

import App from './App.vue'

let wrapper: VueWrapper<any>

const findHexInput = () => wrapper.find('[data-test-id="hexInput"')
const findRgbaInput = () => wrapper.find('[data-test-id="rgbaInput"]')

describe('Main app', () => {
  it('should convert hex code to rgba', async () => {
    wrapper = shallowMount(App)
    const hexInput = findHexInput().element as HTMLInputElement
    hexInput.value= '#19ff02'

    await findHexInput().trigger('input')

    const rgbaInput = findRgbaInput().element as HTMLInputElement
    expect(rgbaInput.value).toBe('25, 255, 2')
  })

  it('should convert rgba code to hex', async () => {
    wrapper = shallowMount(App)
    const rgbInput = findRgbaInput().element as HTMLInputElement
    rgbInput.value = '0, 0, 0'

    await findRgbaInput().trigger('input')

    const hexInput = findHexInput().element as HTMLInputElement
    expect(hexInput.value).toBe('#000000')
  })
})
