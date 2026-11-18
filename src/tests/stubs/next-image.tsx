import type { ImgHTMLAttributes } from "react";

type StaticImage = { src: string; width?: number; height?: number };

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string | StaticImage;
  priority?: boolean;
  fill?: boolean;
  placeholder?: string;
  quality?: number;
  sizes?: string;
}

/**
 * Substituto de `next/image` nos testes: o otimizador de imagens do Next não roda no jsdom.
 * Mantém o essencial para os testes (src e alt) e falha, como o Next, se faltar o alt.
 */
export default function Image({ src, alt, priority, fill, placeholder, quality, ...props }: ImageProps) {
  void priority;
  void fill;
  void placeholder;
  void quality;
  if (alt === undefined) throw new Error("next/image exige a propriedade alt");
  const url = typeof src === "string" ? src : src.src;
  return <img src={url} alt={alt} {...props} />;
}
