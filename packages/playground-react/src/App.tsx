/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {IconPicker, type IconLibrary} from '@arkn/react-icon-picker'
import './App.css'

const ICON_LIBRARIES: IconLibrary[] = [
  'antd', 'carbon', 'fa', 'fluent',
  'ionicons4', 'ionicons5', 'material', 'tabler'
]

type InputSize = 'small' | 'medium' | 'large'

const App: React.FC = () => {
  // States
  const [selection, setSelection] = useState<any>(null)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [clearable, setClearable] = useState<boolean>(false)
  const [multipleSelection, setMultipleSelection] = useState<boolean>(false)
  const [selectedLibraries, setSelectedLibraries] = useState<IconLibrary[]>(['fa'])
  const [inputSize, setInputSize] = useState<InputSize>('medium')

  // Logique métier
  const isSelected = (lib: IconLibrary) => selectedLibraries.includes(lib)

  const toggleSelectedLibraries = (lib: IconLibrary) => {
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
    <section className="container">
      <h2>D E M O</h2>

      <h4>Icon libraries to display</h4>
      <div className="buttons">
        {ICON_LIBRARIES.map((lib) => (
          <div
            key={lib}
            className={`button ${isSelected(lib) ? 'selected' : ''}`}
            onClick={() => toggleSelectedLibraries(lib)}>
            {lib}
          </div>
        ))}
      </div>

      <h4>Input sizes</h4>
      <div className="buttons">
        {(['small', 'medium', 'large'] as InputSize[]).map((size) => (
          <div
            key={size}
            className={`button ${inputSize === size ? 'selected' : ''}`}
            onClick={() => setInputSize(size)}>
            {size.charAt(0).toUpperCase() + size.slice(1)}
          </div>
        ))}
      </div>

      <h4>Other options</h4>
      <div className="buttons">
        <div
          className={`button ${multipleSelection ? 'selected' : ''}`}
          onClick={toggleMultipleSelection}>
          Multiple selection
        </div>
        <div
          className={`button ${darkMode ? 'selected' : ''}`}
          onClick={toggleDarkMode}>
          Dark mode
        </div>
        <div
          className={`button ${clearable ? 'selected' : ''} ${multipleSelection ? 'disabled' : ''}`}
          onClick={toggleClearable}>
          Make clearable
        </div>
      </div>

      <hr />

      <IconPicker
        value={selection}
        onChange={setSelection}
        valueType="svg"
        iconLibrary={selectedLibraries}
        multiple={multipleSelection}
        clearable={clearable}
        selectedIconBgColor="#6495ED"
        selectedIconColor="white"
        placeholder="Select icon(s)"
        style={{ width: '350px', marginTop: '15px' }}
        inputSize={inputSize}
        theme={darkMode ? 'dark' : 'light'}
      />
    </section>
  )
}

export default App