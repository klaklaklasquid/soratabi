function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`min-h-12 min-w-60 cursor-pointer rounded-4xl ${
        props.style === "primary"
          ? "bg-secondary-blue"
          : "border-secondary-blue border-2"
      }`}
    >
      {props.children}
    </button>
  );
}

interface ButtonProps {
  children: string;
  style: "primary" | "secondary";
  onClick?: () => void;
}
export default Button;
