/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { IconPicker } from '@arkn/react-icon-picker'
import './App.css'

// Iconify collection prefixes - see https://icon-sets.iconify.design for the full list.
const ICON_LIBRARIES = [
  'ant-design', 'carbon', 'fa', 'fluent',
  'ion', 'material-symbols', 'tabler'
]

type InputSize = 'small' | 'medium' | 'large'

const App: React.FC = () => {
  // States
  const [selection, setSelection] = useState<any>(null)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [clearable, setClearable] = useState<boolean>(false)
  const [multipleSelection, setMultipleSelection] = useState<boolean>(false)
  const [selectedLibraries, setSelectedLibraries] = useState<string[]>(['tabler'])
  const [inputSize, setInputSize] = useState<InputSize>('medium')

  // Logique métier
  const isSelected = (lib: string) => selectedLibraries.includes(lib)

  const toggleSelectedLibraries = (lib: string) => {
    setSelectedLibraries(prev =>
      prev.includes(lib)
        ? prev.filter(l => l !== lib)
        : [...prev, lib]
    )
  }

  const toggleMultipleSelection = () => {
    setSelection(null)
    setMultipleSelection(!multipleSelection)
    if (!multipleSelection) {
      setClearable(false)
    }
  }

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const toggleClearable = () => {
    if (multipleSelection) return
    setClearable(!clearable)
  }

  return (
    <div className={`playground ${darkMode ? 'dark' : ''}`}>
      <section className="playground-card">
        <p className="eyebrow">@arkn/react-icon-picker</p>
        <h1>Playground</h1>

        <div className="control-group">
          <p className="control-label">Libraries</p>
          <div className="chips">
            {ICON_LIBRARIES.map((lib) => (
              <button
                key={lib}
                type="button"
                className={`chip ${isSelected(lib) ? 'selected' : ''}`}
                onClick={() => toggleSelectedLibraries(lib)}>
                {lib}
              </button>
            ))}
          </div>
        </div>

        <div className="control-row">
          <div className="control-group">
            <p className="control-label">Size</p>
            <div className="chips">
              {(['small', 'medium', 'large'] as InputSize[]).map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`chip ${inputSize === size ? 'selected' : ''}`}
                  onClick={() => setInputSize(size)}>
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <p className="control-label">Options</p>
            <div className="chips">
              <button
                type="button"
                className={`chip ${multipleSelection ? 'selected' : ''}`}
                onClick={toggleMultipleSelection}>
                Multiple
              </button>
              <button
                type="button"
                className={`chip ${darkMode ? 'selected' : ''}`}
                onClick={toggleDarkMode}>
                Dark mode
              </button>
              <button
                type="button"
                className={`chip ${clearable ? 'selected' : ''} ${multipleSelection ? 'disabled' : ''}`}
                disabled={multipleSelection}
                onClick={toggleClearable}>
                Clearable
              </button>
            </div>
          </div>
        </div>

        <div className="picker-stage">
          <IconPicker
            value={selection}
            onChange={setSelection}
            iconLibrary={selectedLibraries}
            multiple={multipleSelection}
            clearable={clearable}
            placeholder="Select icon(s)"
            style={{ width: '100%', maxWidth: '320px' }}
            inputSize={inputSize}
            theme={darkMode ? 'dark' : 'light'}
          />
        </div>
      </section>
    </div>
  )
}

export default App
