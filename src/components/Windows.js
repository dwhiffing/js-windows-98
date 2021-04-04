import React from 'react'
import { PathWindow } from '../components/PathWindow'
import { Calculator } from './Calculator'
import { Prompt, ProgressPrompt } from './Prompt'
import { useWindowState } from '../utils/useWindowState'

export const Windows = () => {
  const [windows, actions] = useWindowState()
  return windows.map((data, index) => {
    const props = {
      windowData: data,
      zIndex: index,
      isActive: data.index === windows[windows.length - 1].index,
      onClose: () => actions.removeWindow(data.index),
    }
    if (data.type === 'path')
      return <PathWindow key={`window-${data.index}`} {...props} />

    if (data.type === 'prompt' || data.type === 'confirm-delete-prompt')
      return <Prompt key={`window-${data.index}`} {...props} />

    if (data.type === 'progress-prompt' || data.type === 'delete-prompt')
      return <ProgressPrompt key={`window-${data.index}`} {...props} />

    if (data.type === 'calculator')
      return <Calculator key={`window-${data.index}`} {...props} />

    return null
  })
}
