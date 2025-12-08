function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`min-h-12 min-w-60 cursor-pointer rounded-full px-8 py-3 font-medium transition-all duration-300 ${
        props.style === "primary"
          ? "bg-secondary-blue shadow-secondary-blue/50 hover:shadow-secondary-blue/70 shadow-lg hover:scale-105 hover:shadow-xl"
          : "border-secondary-blue hover:bg-secondary-blue/10 hover:border-tertiary-blue border-2 bg-transparent hover:scale-105"
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
}
export default Button;
