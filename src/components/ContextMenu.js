import React, { useState, useEffect, useCallback } from 'react'
import { HoverMenu } from '../components/TaskBar'

// TODO: Fix issue where context menu doesnt appear if window wasn't focused
export const ContextMenu = ({ files, selected }) => {
  const [state, setState] = useState(false)
  // const [, actions] = useWindowState()

  const closeMenu = useCallback(() => {
    setTimeout(() => setState({ visible: false }), 10)
  }, [])

  const openMenu = useCallback(
    (e) => {
      e.preventDefault()

      document.addEventListener('click', () => {
        closeMenu()
      })

      setState({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        buttons: [
          {
            text: 'Open',
            onClick: () => {},
          },
          // { text: 'Rename' },
          // { text: 'Properties' },
        ],
      })
    },
    // eslint-disable-next-line
    [files, selected],
  )

  useEffect(() => {
    document.addEventListener('contextmenu', openMenu)
    return () => {
      document.removeEventListener('click', closeMenu)
      document.removeEventListener('contextmenu', openMenu)
    }
    // eslint-disable-next-line
  }, [files, selected])

  return (
    <div>
      {state.visible && (
        <div
          className="absolute z-50"
          style={{ left: state.x, top: state.y, width: 120 }}
        >
          <HoverMenu buttons={state.buttons} />
        </div>
      )}
    </div>
  )
}
