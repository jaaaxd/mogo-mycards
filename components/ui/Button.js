export default function Button({ text, onClick, type }) {
  return (
    <button
      className={`${type} font-topic px-6 pb-[2px] pt-[7px] min-w-[75px] flex text-lg self-center items-center justify-center text-center rounded-full`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
