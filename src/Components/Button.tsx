function Button(props: ButtonProps) {
  return (
    <button
      className={`min-w-60 min-h-12 rounded-4xl ${
        props.style === "primary" ? "bg-[#004553]" : "border-2 border-[#004553]"
      }`}>
      {props.children}
    </button>
  );
}

interface ButtonProps {
  children: string;
  style: "primary" | "secondary";
}
export default Button;
