import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-container section">
      <span className="eyebrow">404 / PÁGINA NÃO ENCONTRADA</span>
      <h1>Parece que este caminho mudou.</h1>
      <p className="not-found-description">
        A página que você procura não está disponível. Volte para o início e continue
        explorando a Solid Solutions.
      </p>
      <Link href="/" className="text-cta">
        Voltar para o início
      </Link>
    </main>
  );
}
