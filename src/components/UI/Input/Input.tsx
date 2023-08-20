import classes from './input.module.scss';

interface PropsType {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: string;
  type: string;
  msg: string;
  error: string | undefined;
  classesCss: string;
  value: string;
}

const Input = ({
  onChange,
  data,
  type,
  msg,
  error,
  classesCss,
  value,
}: PropsType) => {
  return (
    <div className={`${classes.inputBox} ${classesCss}`}>
      <label htmlFor={data}>
        {msg}
        <input
          type={type}
          id={data}
          name={data}
          onChange={onChange}
          value={value}
        />
      </label>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;
