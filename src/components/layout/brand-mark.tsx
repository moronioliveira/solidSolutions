import Image from "next/image";
import Link from "next/link";
import symbol from "@/assets/brand/solid-solutions-symbol.png";

/** Símbolo oficial + nome da marca. */
export function BrandMark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/" className="brand" aria-label="Solid Solutions, página inicial" onClick={onNavigate}>
      <Image src={symbol} alt="" width={47} priority />
      <span>
        SOLID<span>SOLUTIONS</span>
      </span>
    </Link>
  );
}
