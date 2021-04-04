import React, { useState } from 'react'
import Draggable from 'react-draggable'

export const Calculator = ({ onClose, windowData }) => {
  const nodeRef = React.useRef(null)
  const width = 300
  const height = 300
  const [value, setValue] = useState(0)
  const [value2, setValue2] = useState(0)
  const [op, _setOp] = useState()
  const concatNumbers = (n) => (v) => Number(`${v}${n}`).toString()
  const [displayValue, setDisplayValue] = useState(0)

  const getClickValue = (n) => () => {
    if (op) {
      setValue2(concatNumbers(n))
      setDisplayValue(concatNumbers(n))
    } else {
      setValue(concatNumbers(n))
      setDisplayValue(concatNumbers(n))
    }
  }

  const setOp = (op) => {
    _setOp(op)
    setDisplayValue('')
  }

  const getResult = () => {
    const applySum = (sum) => {
      setDisplayValue(`${sum}`)
      setValue(`${sum}`)
      setValue2(0)
      _setOp()
    }
    if (op === '+') {
      applySum(Number(value) + Number(value2))
    }
    if (op === '-') {
      applySum(Number(value) - Number(value2))
    }
    if (op === '/') {
      applySum(Number(value) / Number(value2))
    }
    if (op === '*') {
      applySum(Number(value) * Number(value2))
    }
  }

  const clear = () => {
    setValue(0)
    setValue2(0)
    setDisplayValue('')
    _setOp('')
  }

  const sqrt = () => {
    setValue((v) => Math.sqrt(v))
    setValue2(0)
    setDisplayValue((v) => Math.sqrt(Number(v)))
    _setOp('')
  }

  const percent = () => {
    if (value && value2) {
      const perc = (value2 / 100) * value
      setValue2(perc)
      setDisplayValue(perc)
    }
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
            <div className="title-bar-text">Calculator</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize" disabled></button>
              <button aria-label="Maximize" disabled></button>
              <button aria-label="Close" onClick={onClose}></button>
            </div>
          </div>

          <div
            className="flex flex-col flex-1 items-stretch"
            style={{ margin: '4px 3px 0 7px' }}
          >
            <div className="flex justify-start items-start">
              <p className="mr-1">Edit</p>
              <p className="mr-1">View</p>
              <p className="mr-1">Help</p>
            </div>

            <div className="field-row" style={{ margin: '7px 7px 12px 0' }}>
              <input
                style={{ height: 28, textAlign: 'right' }}
                value={displayValue}
                className="w-full"
                id="text17"
                type="text"
              />
            </div>

            <div className="calc-buttons">
              <button style={{ flex: 0.88 }} className="red"></button>
              <B label="Backspace" onClick={clear} style={{ flex: 2 }} />
              <B label="CE" onClick={clear} style={{ flex: 2 }} />
              <B label="C" onClick={clear} style={{ flex: 2 }} />
            </div>

            <div className="calc-buttons">
              <B label="MC" onClick={clear} />
              <B label="7" onClick={getClickValue(7)} />
              <B label="8" onClick={getClickValue(8)} />
              <B label="9" onClick={getClickValue(9)} />
              <B label="/" onClick={() => setOp('/')} />
              <B label="sqrt" onClick={sqrt} />
            </div>

            <div className="calc-buttons">
              <B label="MR" onClick={clear} />
              <B label="4" onClick={getClickValue(4)} />
              <B label="5" onClick={getClickValue(5)} />
              <B label="6" onClick={getClickValue(6)} />
              <B label="*" onClick={() => setOp('*')} />
              <B label="%" onClick={percent} />
            </div>

            <div className="calc-buttons">
              <B label="MS" onClick={clear} />
              <B label="1" onClick={getClickValue(1)} />
              <B label="2" onClick={getClickValue(2)} />
              <B label="3" onClick={getClickValue(3)} />
              <B label="/" onClick={() => setOp('/')} />
              <B label="1/x" onClick={clear} />
            </div>

            <div className="calc-buttons">
              <B label="M+" onClick={clear} />
              <B label="0" onClick={getClickValue(0)} />
              <B label="+/-" onClick={clear} />
              <B label="." onClick={clear} />
              <B label="+" onClick={() => setOp('+')} />
              <B label="=" onClick={getResult} />
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  )
}

const B = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className={RED.includes(label) ? 'red' : ''}
    style={{ padding: 0 }}
  >
    {label}
  </button>
)

const RED = [
  'Backspace',
  'CE',
  'C',
  'MC',
  'MR',
  'MS',
  'M+',
  '+',
  '=',
  '-',
  '*',
  '/',
]
