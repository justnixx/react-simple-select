import SimpleSelect, { Option } from '@nixxy/react-simple-select';
import '@nixxy/react-simple-select/assets/react-simple-select.css';
import { Apple, Banana, Cherry } from 'lucide-react';
import { useState } from 'react';

type SelectedOption = Option | Option[] | null;

type User = {
  first_name: string;
  last_name: string;
  avatar?: string;
};

const options: Option[] = [
  { label: 'Apple 🍎', value: 'apple' },
  { label: 'Banana 🍌', value: 'banana' },
  { label: 'Cherry 🍒', value: 'cherry' },
];

const optionsWithIcons: Option[] = [
  { label: 'Apple', value: 'apple', Icon: <Apple className="w-4 h-4" /> },
  {
    label: 'Banana',
    value: 'banana',
    Icon: <Banana className="w-4 h-4" />,
  },
  {
    label: 'Cherry',
    value: 'cherry',
    Icon: <Cherry className="w-4 h-4" />,
  },
];

const fetchUsers = async () => {
  const res = await fetch('https://reqres.in/api/users');
  const resData = await res.json();
  return resData.data.map((user: User) => ({
    label: `${user.first_name} ${user.last_name}`,
    value: `${user.first_name} ${user.last_name}`,
    Icon: user.avatar ? (
      <img
        src={user.avatar}
        style={{ height: 28, width: 28, borderRadius: 14 }}
      />
    ) : null,
  }));
};

export default function App() {
  const [singleSelected, setSingleSelected] = useState<SelectedOption>(null);
  const [multiSelected, setMultiSelected] = useState<SelectedOption>(null);
  const [withIconSelected, setWithIconSelected] =
    useState<SelectedOption>(null);
  const [asyncSelected, setAsyncSelected] = useState<SelectedOption>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-pink-600 sm:rounded-b-2xl text-pink-50">
        <div className="mx-auto px-3 sm:px-12 max-w-screen-xl container">
          <div className="flex flex-col justify-center min-h-56">
            <h1 className="font-bold text-2xl sm:text-3xl">
              React Simple Select
            </h1>
            <p className="mt-3 max-w-lg text-pink-300">
              A lightweight, customizable, and accessible React select component
              with support for multi-select, async options, and keyboard
              navigation.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 mx-auto px-3 sm:px-12 max-w-screen-xl container">
        <section>
          <h2 className="my-5 font-bold text-2xl">Single-Select Example</h2>
          <SimpleSelect
            className="w-full"
            options={options}
            onChange={setSingleSelected}
            placeholder="Choose a fruit..."
          />

          <h3 className="mt-2">Selected:</h3>
          <pre className="bg-stone-600 p-2 rounded-md overflow-x-auto text-stone-50 text-sm">
            {JSON.stringify(singleSelected, null, 2)}
          </pre>
        </section>

        <section>
          <h2 className="my-5 font-bold text-2xl">Multi-Select Example</h2>
          <SimpleSelect
            className="w-full"
            options={options}
            onChange={setMultiSelected}
            multiple
            placeholder="Choose some fruits..."
          />

          <h3 className="mt-2">Selected:</h3>
          <pre className="bg-stone-600 p-2 rounded-md overflow-x-auto text-stone-50 text-sm">
            {JSON.stringify(multiSelected, null, 2)}
          </pre>
        </section>

        <section>
          <h2 className="my-5 font-bold text-2xl">Select with Icons</h2>
          <SimpleSelect
            className="w-full"
            options={optionsWithIcons}
            onChange={setWithIconSelected}
            placeholder="Choose a fruit..."
          />

          <h3 className="mt-2">Selected:</h3>
          <pre className="bg-stone-600 p-2 rounded-md overflow-x-auto text-stone-50 text-sm">
            {JSON.stringify(withIconSelected, null, 2)}
          </pre>
        </section>

        <section>
          <h2 className="my-5 font-bold text-2xl">Async Example</h2>
          <SimpleSelect
            className="w-full"
            options={fetchUsers}
            onChange={setAsyncSelected}
            placeholder="Choose a user..."
          />

          <h3 className="mt-2">Selected:</h3>
          <pre className="bg-stone-600 p-2 rounded-md overflow-x-auto text-stone-50 text-sm">
            {JSON.stringify(asyncSelected, null, 2)}
          </pre>
        </section>
      </div>

      <hr className="my-5 border-gray-200" />

      <div className="justify-self-end py-3 h-16">
        <div className="mx-auto px-3 sm:px-12 max-w-screen-xl container">
          <p>
            👉{' '}
            <a
              className="border-b text-pink-500 hover:text-pink-400 text-sm"
              href="https://github.com/justnixx/react-simple-select?tab=readme-ov-file#react-simple-select"
            >
              Full Documentation
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
