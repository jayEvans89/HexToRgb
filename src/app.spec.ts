import { act, fireEvent, render, screen } from '@testing-library/svelte'

import App from './App.svelte'

const findHexInput = () => screen.findByTestId('hexInput')
const findRgbInput = () => screen.findByTestId('rgbaInput')

describe('Main app', () => {
  it('should convert hex code to rgba', async () => {
    render(App)
    const hexInput = await findHexInput() as HTMLInputElement

    await act(() => fireEvent.input(hexInput, {
      target: {
        value: '#19ff02'
      }
    }))

    const rgbInput = await findRgbInput() as HTMLInputElement
    expect(rgbInput.value).toBe('25, 255, 2')
  })

  it('should convert rgba code to hex', async () => {
    render(App)
    const rgbInput = await findRgbInput() as HTMLInputElement

    await act(() => fireEvent.input(rgbInput, {
      target: {
        value: '0, 0, 0'
      }
    }))

    const hexInput = await findHexInput() as HTMLInputElement
    console.log(hexInput.value)
    expect(hexInput.value).toBe('#000000')
  })
})
