import type { ReactNode } from "react";

interface ModalTitleProps {
  isEdit:     boolean;
  icon:       ReactNode;
  addLabel:   string;
  editLabel:  string;
}

function ModalTitle({ isEdit, icon, addLabel, editLabel }: ModalTitleProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isEdit ? "bg-amber-500" : "bg-indigo-500"}`}>
        <span style={{ color: "#fff", fontSize: 14, display: "flex" }}>
          {icon}
        </span>
      </div>
      <span className="text-base font-semibold">
        {isEdit ? editLabel : addLabel}
      </span>
    </div>
  );
}

export default ModalTitle;
