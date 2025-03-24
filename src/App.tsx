import React, { useState } from 'react';
import { FiBattery, FiCoffee } from 'react-icons/fi';
import SimpleSelect, { Option } from './lib/SimpleSelect';

const options: Option[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
  { label: 'Option 6', value: '6' },
  { label: 'Option 7', value: '7' },
  { label: 'Option 8', value: '8' },
  { label: 'Option 9', value: '9' },
  { label: 'Option 10', value: '10' },
];

const fetchOptions = async () => {
  return new Promise<Option[]>((resolve) =>
    setTimeout(() => {
      resolve([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
      ]);
    }, 10000)
  );
};

function App() {
  const [selected, setSelected] = useState<Option | Option[] | null>(null);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 991,
        margin: '0 auto',
        fontFamily: 'fantasy',
      }}
    >
      <h1>Simple Select Demo</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        <SimpleSelect options={options} multiple onChange={setSelected} />

        <SimpleSelect
          options={[
            { label: 'Coffee', value: 'coffee', Icon: <FiCoffee /> },
            { label: 'Battery', value: 'battery', Icon: <FiBattery /> },
          ]}
          onChange={(selected) => console.log(selected)}
        />

        <SimpleSelect options={fetchOptions} />
      </div>

      <p>Selected: {JSON.stringify(selected)}</p>
    </div>
  );
}

export default App;
