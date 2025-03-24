# React Simple Select

A lightweight, customizable, and accessible React select component with support for multi-select, async options, and keyboard navigation.

## Features

- ✅ Supports both **single** and **multi-select**
- ✅ **Async options** support (fetch data dynamically)
- ✅ Keyboard navigation (**Arrow keys, Enter, Escape**)
- ✅ **Custom icons** for options
- ✅ **Fully customizable styles** (default SCSS provided)
- ✅ **Click outside to close**

## Installation

```sh
yarn add @nixxy/react-simple-select
```

or

```sh
npm install @nixxy/react-simple-select
```

## Usage

```tsx
import SimpleSelect, { Option } from '@nixxy/react-simple-select';
import '@nixxy/react-simple-select/dist/style.css';

const options: Option[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

export default function Example() {
  return (
    <SimpleSelect options={options} onChange={(value) => console.log(value)} />
  );
}
```

### Multi-Select Example

```tsx
<SimpleSelect
  options={options}
  multiple
  onChange={(values) => console.log(values)}
/>
```

### Async Options Example

```tsx
const fetchOptions = async () => {
  return new Promise<Option[]>((resolve) =>
    setTimeout(() => {
      resolve([
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
      ]);
    }, 10000)
  );
};

<SimpleSelect options={fetchOptions} />;
```

## Props

| Prop          | Type                                     | Default       | Description                                 |
| ------------- | ---------------------------------------- | ------------- | ------------------------------------------- |
| `options`     | `Option[]` or `() => Promise<Option[]>`  | `[]`          | The list of options (static or async)       |
| `multiple`    | `boolean`                                | `false`       | Enables multi-select mode                   |
| `onChange`    | `(selected: Option or Option[]) => void` | `undefined`   | Callback triggered when selection changes   |
| `placeholder` | `string`                                 | `"Select..."` | Placeholder text when no option is selected |
| `className`   | `string`                                 | `""`          | Additional class names for styling          |

## Keyboard Navigation

- **Arrow Down**: Move to the next option
- **Arrow Up**: Move to the previous option
- **Enter**: Select the focused option
- **Escape**: Close the dropdown

## Custom Styling

You can customize the component using the `className` prop:

```tsx
import { FiCoffee } from 'react-icons/fi';

<SimpleSelect
  className="custom-select"
  options={[{ value: 'coffee', label: 'Coffee', Icon: <FiCoffee /> }]}
/>;
```

### **Overriding Styles**

If you want full control over the styles, you can **skip importing** the default CSS and write your own:

```css
/* Base styles */
.nx-simple-select {
  /* Custom styles */
}

.nx-simple-select .options {
  /* Custom dropdown styles */
}

/* Hide dropdown icon */
.nx-simple-select .select-icon {
  display: none;
}

/* Add a background image to .nx-simple-select */
.nx-simple-select {
  background-image: url('your-image.png');
}
```

The default styles are primarily for testing, so you’re free to customize them however you like.

---

## License

MIT

## Contributing

Feedback and contributions are welcome! Open an issue or submit a PR.
