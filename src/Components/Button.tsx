function Button(props: ButtonProps) {
  return (
    <button
      className={`min-h-12 min-w-60 rounded-4xl ${
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
}
export default Button;
