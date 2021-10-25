import Image from "next/image";
import { IconContext } from "react-icons";

export default function Arrow({ Mint, Icon }) {
  return (
    <button
      onClick={Mint}
      style={{
        background: "none",
        border: "none",
        padding: "5px",
        display: "flex",
        alignItems: "center"
      }}
    >
        <div>{Icon && <Icon size={50} />}</div>
    </button>
  );
}
