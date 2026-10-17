import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Code2, Globe, MousePointer2, Smartphone, Zap, Search, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import law from "@/assets/law.jpg";
import dental from "@/assets/dental.jpg";

export const projects = [
  { name: "Almeida & Ferraz", category: "Landing page", image: law, kind: "law", brand: "almeida & ferraz", nav: "Escritório · Atuação · Contato", tag: "ADVOCACIA ESTRATÉGICA ↗", alt: "Escritório de advocacia contemporâneo — Almeida & Ferraz", headline: <>Estratégia jurídica<br />de alto impacto.</>, description: "Landing page premium para escritório de advocacia corporativa, com foco em autoridade, áreas de atuação e geração de contatos qualificados." },
  { name: "Clínica Odonto", category: "Landing page", image: dental, kind: "dental", brand: "clínica odonto", nav: "Serviços · Clínica · Agendar", tag: "AGENDE PELO WHATSAPP ↗", alt: "Atendimento odontológico moderno — Clínica Odonto", headline: <>Cuidado para<br />o seu sorriso.</>, description: "Landing page para clínica odontológica orientada à conversão, com especialidades em destaque e agendamento direto pelo WhatsApp." },
];

export function ProjectGrid({ filter = "Todos" }: { filter?: string }) {
  return <div className="projects-grid">{projects.filter(p => filter === "Todos" || p.category === filter).map(project => <Link to="/projetos" search={{ projeto: project.name }} key={project.name} className="project" aria-label={`Conhecer ${project.name}`}>
    <div className={`project-art ${project.kind}`}><div className="project-screen"><div className="project-browser"><i /><i /><i /><span>{project.name.toLowerCase().replaceAll(" ", "")}.demo</span></div><div className="mock-nav"><strong>{project.brand}</strong><span>{project.nav}</span></div><div className="mock-photo"><img src={project.image} alt={project.alt} width={1280} height={768} loading="lazy" /><div className="mock-overlay"><h3>{project.headline}</h3><span>{project.tag}</span></div></div></div></div>
    <div className="project-meta"><div><h3>{project.name}</h3><p>{project.category} · Design & desenvolvimento</p></div><ArrowUpRight /></div>
  </Link>)}</div>;
}

export function ProjectsSection() {
  return <section className="section site-container"><div className="section-heading"><div><span className="eyebrow">01 / PROJETOS SELECIONADOS</span><h2>Ideias que ganham<br />forma. E presença.</h2></div><Link to="/projetos" className="text-cta">Explore os projetos <ArrowUpRight size={16} /></Link></div><ProjectGrid /><p className="concept-note">PROJETOS SELECIONADOS · Landing pages desenvolvidas pela Solid Solutions.</p></section>;
}

const services = [
  { icon: Globe, name: "Sites institucionais", description: "Sua empresa apresentada à altura do que ela entrega. Uma presença digital que constrói confiança e abre novas oportunidades.", items: ["Identidade visual sob medida", "Experiência em qualquer dispositivo", "Estrutura preparada para SEO"] },
  { icon: MousePointer2, name: "Landing pages", description: "Uma página. Um objetivo claro. Transformamos sua oferta em uma experiência pensada para gerar contatos e oportunidades.", items: ["Design orientado à conversão", "Jornada objetiva e estratégica", "Integração com suas campanhas"] },
  { icon: Code2, name: "Desenvolvimento web", description: "Do primeiro detalhe à última linha de código. Tecnologia bem construída para tornar seu projeto rápido, sólido e escalável.", items: ["Código moderno e organizado", "Performance como prioridade", "Integrações para seu negócio"] },
];
export function SolutionsSection() {
  return <section className="solutions-section"><div className="section site-container"><span className="eyebrow">02 / O QUE FAZEMOS</span><h2>Design que atrai.<br />Tecnologia que entrega.</h2><div className="solutions-grid">{services.map(service => <article className="solution" key={service.name}><service.icon /><h3>{service.name}</h3><p>{service.description}</p><ul>{service.items.map(item => <li key={item}><Check />{item}</li>)}</ul><Link to="/contato" className="text-cta">Vamos tirar do papel <ArrowUpRight size={15} /></Link></article>)}</div></div></section>;
}

export function ProcessSection() {
  const steps = [{ title: "Entender", text: "Ouvimos suas ideias, entendemos seu negócio e definimos o que seu site precisa conquistar." }, { title: "Criar", text: "Transformamos a estratégia em uma identidade digital única, com cada detalhe no lugar certo." }, { title: "Desenvolver", text: "Damos vida ao design com código, performance e uma experiência fluida em todas as telas." }, { title: "Lançar", text: "Revisamos, testamos e colocamos seu projeto no ar. Pronto para o próximo capítulo." }];
  return <section className="section site-container"><span className="eyebrow">03 / DO PRIMEIRO CONTATO AO SITE NO AR</span><h2>Sem complicar.<br />Sem deixar nada ao acaso.</h2><div className="process-grid">{steps.map((step, index) => <article className="process-step" key={step.title}><span>0{index + 1} /</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>;
}

export function ContactBand() { return <section className="contact-band"><div className="site-container contact-band-inner"><div><span className="eyebrow">SEU PRÓXIMO PASSO COMEÇA AQUI</span><h2>Vamos criar<br /><span>algo sólido?</span></h2><p>Sua ideia merece mais do que um site. Merece uma presença digital que faça a diferença para o seu negócio.</p></div><Button asChild className="primary-cta"><Link to="/contato">Conte sobre seu projeto <ArrowUpRight /></Link></Button></div></section>; }

export function CapabilityBand() { return <div className="capability-band"><div className="site-container capability-inner"><span>CONSTRUÍDO PARA IR ALÉM</span><span><Layers /> DESIGN SOB MEDIDA</span><span><Zap /> ALTA PERFORMANCE</span><span><Smartphone /> RESPONSIVO</span><span><Search /> SEO READY</span></div></div>; }