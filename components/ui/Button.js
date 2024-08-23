export default function Button({ text, onClick, type }) {
  return (
    <button
      className={`${type} font-mplus lg:px-11 pb-[3px] pt-[6px] min-w-[75px] w-full flex lg:text-lg text-sm self-center items-center justify-center text-center rounded-full`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
