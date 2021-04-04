import { shuffle } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import Draggable from 'react-draggable'
const getNewGrid = (size = 8, numBombs = 8) => {
  const bombs = shuffle(
    new Array(size * size).fill(0).map((n, i) => (i > numBombs - 1 ? 0 : 1)),
  )
  return new Array(size * size).fill(0).map((n, i) => ({
    bomb: !!bombs[i],
    index: i,
    active: false,
    flag: false,
  }))
}

export const Minesweeper = ({ onClose, windowData }) => {
  const nodeRef = React.useRef(null)
  const width = 200
  const height = 280
  const [clickState, setClickState] = useState(0)
  const [gameState, setGameState] = useState(1)
  const [grid, setGrid] = useState(getNewGrid())

  const getHint = (grid, i) => {
    const bombNeighbours = getNeighbours(grid, i).filter((c) => c && c.bomb)
    return bombNeighbours.length
  }
  const listener = useCallback((event) => {
    event.preventDefault()
    const target = +event.target.dataset.index
    setGrid((g) =>
      g.map((c) => (c.index === target ? { ...c, flag: !c.flag } : c)),
    )
  }, [])

  const clickListener = useCallback((event) => {
    setClickState(event.type === 'pointerdown' ? 1 : 0)
  }, [])

  useEffect(() => {
    if (grid.every((c) => !c.bomb || c.flag)) {
      setGameState(2)
    }
  }, [grid])

  useEffect(() => {
    document.addEventListener('contextmenu', listener)
    document.addEventListener('pointerdown', clickListener)
    document.addEventListener('pointerup', clickListener)

    return () => {
      document.removeEventListener('contextmenu', listener)
      document.removeEventListener('pointerdown', clickListener)
      document.removeEventListener('pointerup', clickListener)
    }
  }, [listener, clickListener])

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
      setGameState(0)
      return setGrid((g) => g.map((c) => ({ ...c, active: true })))
    }

    setGrid(newGrid)
  }

  const newGame = () => {
    setGameState(1)
    setGrid(getNewGrid())
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
            style={{
              margin: 4,
            }}
          >
            <div className="flex justify-start items-start">
              <p onClick={newGame} className="mr-1">
                New
              </p>
              {/* <p className="mr-1">View</p>
              <p className="mr-1">Help</p> */}
            </div>

            <p style={{ textAlign: 'center', marginBottom: 10, fontSize: 22 }}>
              {gameState === 1
                ? clickState === 1
                  ? ':O'
                  : ':)'
                : gameState === 0
                ? 'Dx'
                : ':D'}
            </p>

            <div
              className="grid grid-cols-8 gap-0 aspect-ratio-1"
              style={{
                pointerEvents: gameState === 1 ? 'auto' : 'none',
              }}
            >
              {grid.map((cell, i) => (
                <button
                  className={cell.active ? 'revealed' : ''}
                  onClick={() => clickTile(i)}
                  data-index={i}
                  style={{
                    aspectRatio: 1,
                    minWidth: 0,
                    padding: 0,
                    pointerEvents: cell.active ? 'none' : '',
                  }}
                >
                  {cell.active
                    ? cell.bomb
                      ? '*'
                      : getHint(grid, cell.index) || ''
                    : cell.flag
                    ? 'x'
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
