import { useState, type JSX, type ReactNode } from "react";
import style from "../AdminPage.module.css";

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={style.section}>
      <div className={style.sectionHeader}>
        <h3 className={style.sectionTitle}>{title}</h3>
        <button
          className={style.toggleBtn}
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? "Свернуть" : "Развернуть"}
        >
          {isOpen ? "▲" : "▼"}
        </button>
      </div>

      <div className={`${style.fade} ${!isOpen ? style.hidden : ""}`}>
        {children}
      </div>
    </div>
  );
}
