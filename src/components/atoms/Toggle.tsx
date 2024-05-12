interface Props {
  label?: string;
  onChange: (e: any) => void;
  name: string;
  value: boolean;
}

export default function Toggle({ label, onChange, name, value }: Props) {
  return (
    <div className='inline-flex items-center'>
      <span className='mr-3 font-medium  dark:text-gray-300'>{label}</span>
      <label
        htmlFor={label}
        className='relative h-6 w-10 cursor-pointer [-webkit-tap-highlight-color:_transparent]'
      >
        <input
          name={name}
          type='checkbox'
          id={name ? name : label}
          className='peer sr-only'
          onChange={onChange}
          checked={value}
        />

        <span className='absolute inset-0 rounded-full bg-dark-80 transition peer-checked:bg-green-500'></span>

        <span className='absolute inset-y-0 start-0 m-1 h-4 w-4 rounded-full bg-white transition-all peer-checked:start-4'></span>
      </label>
    </div>
  );
}
