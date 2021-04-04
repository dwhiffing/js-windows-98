import { shuffle } from 'lodash'
import React, { useState } from 'react'
import Draggable from 'react-draggable'

const bombs = shuffle(new Array(8 * 8).fill(0).map((n, i) => (i > 5 ? 0 : 1)))
export const Minesweeper = ({ onClose, windowData }) => {
  const nodeRef = React.useRef(null)
  const width = 200
  const height = 270
  const [grid, setGrid] = useState(
    new Array(8 * 8).fill(0).map((n, i) => ({
      bomb: !!bombs[i],
      index: i,
      active: false,
    })),
  )

  const getHint = (grid, i) => {
    const bombNeighbours = getNeighbours(grid, i).filter((c) => c && c.bomb)
    return bombNeighbours.length
  }

  const revealNeighbours = (grid, i) => {
    const neighbours = getNeighbours(grid, i)
    neighbours.forEach((cell) => {
      if (cell && !cell.bomb) {
        let isActive = cell.active
        grid = grid.map((c) =>
          c.index === cell.index ? { ...c, active: true } : c,
        )
        const thing = getHint(grid, cell.index) === 0
        if (!isActive && thing) grid = revealNeighbours(grid, cell.index)
      }
    })

    return grid
  }

  const clickTile = (i) => {
    let newGrid = grid.map((cell, _i) =>
      i === _i ? { ...cell, active: true } : cell,
    )
    newGrid = revealNeighbours(newGrid, i)

    if (grid[i].bomb) {
      console.log('lose')
    }

    setGrid(newGrid)
  }
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
            <div className="title-bar-text">Minesweeper</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize" disabled></button>
              <button aria-label="Maximize" disabled></button>
              <button aria-label="Close" onClick={onClose}></button>
            </div>
          </div>

          <div
            className="flex flex-col flex-1 items-stretch"
            style={{ margin: 4 }}
          >
            <div className="flex justify-start items-start">
              <p className="mr-1">Edit</p>
              <p className="mr-1">View</p>
              <p className="mr-1">Help</p>
            </div>

            <div className="grid grid-cols-8 gap-0 aspect-ratio-1">
              {grid.map((cell, i) => (
                <button
                  onClick={() => clickTile(i)}
                  style={{ aspectRatio: 1, minWidth: 0, padding: 0 }}
                >
                  {cell.active
                    ? cell.bomb
                      ? '*'
                      : getHint(grid, cell.index) || '.'
                    : ''}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  )
}

const getNeighbours = (grid, i) => {
  let cells = []
  const w = 8

  let x = i % w
  if (x !== 0) {
    cells = cells.concat([grid[i + (w - 1)], grid[i - 1], grid[i - (w + 1)]])
  }
  cells = cells.concat([grid[i + w], grid[i - w]])
  if (x !== w - 1) {
    cells = cells.concat([grid[i - (w - 1)], grid[i + 1], grid[i + (w + 1)]])
  }

  return cells
}
