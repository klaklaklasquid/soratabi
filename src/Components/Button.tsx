function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`min-h-12 min-w-60 rounded-full px-8 py-3 font-medium transition-all duration-300 ${props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${
        props.style === "primary"
          ? "bg-secondary-blue shadow-secondary-blue/50 shadow-lg" +
            (props.disabled
              ? ""
              : " hover:shadow-secondary-blue/70 hover:scale-105 hover:shadow-xl")
          : "border-secondary-blue border-2 bg-transparent" +
            (props.disabled
              ? ""
              : " hover:bg-secondary-blue/10 hover:border-tertiary-blue hover:scale-105")
      } ${props.className}`}
    >
      {props.children}
    </button>
  );
}

interface ButtonProps {
  children: string;
  style: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
export default Button;
