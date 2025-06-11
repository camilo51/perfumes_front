import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Perfumes",
    template: "%s | Perfumes",
  }
}

export default function Home() {
  return (
    <div>
      Main
    </div>
  );
}
