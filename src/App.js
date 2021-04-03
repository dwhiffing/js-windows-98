import React, { useState } from 'react'
import { TaskBar } from './components/TaskBar'
import { Windows } from './components/Windows'
import { Icon } from './components/Icon'
import { useWindowState } from './utils/useWindowState'
import { DESKTOP_ICONS } from './constants'

import './tailwind.output.css'
import '98.css'
import { uniq } from 'lodash'

function App() {
  const [, windowActions] = useWindowState()
  const [selected, setSelected] = useState([])

  const getOnClickIcon = (item) => () => {
    if (selected.length > 0) {
      return setSelected(() => [item.name])
    }

    setSelected((selected) => uniq([...selected, item.name]))
  }

  return (
    <div>
      <div
        className="absolute top-0 left-0 right-0 bottom-0"
        onClick={({ target }) => {
          if (!target.classList.contains('icon-button')) setSelected([])
        }}
      >
        {DESKTOP_ICONS.map((item) => (
          <Icon
            key={`item-${item.name}`}
            item={item}
            selected={selected.includes(item.name)}
            onClick={getOnClickIcon(item)}
            onDoubleClick={() => {
              setSelected([])
              if (!item.onDoubleClick) return
              const prompt = item.onDoubleClick()
              prompt && windowActions.addWindow(prompt)
            }}
            textColor="white"
          />
        ))}
      </div>
      <Windows />
      <TaskBar />
    </div>
  )
}

export default App
