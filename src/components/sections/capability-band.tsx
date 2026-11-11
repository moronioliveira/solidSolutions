import { Layers, Search, Smartphone, Zap } from "lucide-react";
import { capabilities } from "@/content/home";

const icons = { layers: Layers, zap: Zap, smartphone: Smartphone, search: Search };

export function CapabilityBand() {
  return (
    <div className="capability-band">
      <ul className="site-container capability-inner">
        <li className="capability-title">Construído para ir além</li>
        {capabilities.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.label}>
              <Icon aria-hidden="true" /> {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
