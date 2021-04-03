import React from 'react'
import Draggable from 'react-draggable'

export const AddProgramsMenu = ({ onClose, windowData }) => {
  const nodeRef = React.useRef(null)
  const width = 400
  const height = 400

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds={{ left: 0, top: 0 }}
      defaultPosition={{
        x: window.innerWidth / 2 - width / 2,
        y: window.innerHeight / 2 - height / 2,
      }}
      handle=".title-bar"
    >
      <div ref={nodeRef} onClick={windowData.onClick} className="prompt-wrap">
        <div className="window flex flex-col" style={{ width, height }}>
          <div className="title-bar">
            <div className="title-bar-text">Add Programs</div>
            <div className="title-bar-controls">
              <button aria-label="Close" onClick={onClose}></button>
            </div>
          </div>

          <div className="window-body flex flex-1">
            <div className="">
              <p>Free space</p>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  )
}
