import { useEffect, useState } from "react";

type Props = {
  text: string;
};
const AutoType = ({ text }: Props) => {
  const [placeholder, setPlaceholder] = useState<string>("");
  useEffect(() => {
    setPlaceholder("")
    const typeInterVel = setInterval(() => {
      if (placeholder.length === text.length) {
        clearInterval(typeInterVel);
      }
      setPlaceholder((prev) => prev + text.charAt(prev.length));
    }, 50);

    return () => {
      clearInterval(typeInterVel);
    };
  }, [text]);

  return <> {placeholder}</>;
};

export default AutoType;
