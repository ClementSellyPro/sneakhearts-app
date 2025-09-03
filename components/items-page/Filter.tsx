import { Dispatch, SetStateAction } from "react";

interface filterProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Filter({ setIsOpen }: filterProps) {
  function toggleOpenFilter() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div onClick={toggleOpenFilter} className="fixed inset-0 bg-black/25">
      <div
        className="fixed top-0 right-0 w-2/6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative top-0 h-screen bg-white">
          <h3>Filtrer et trier</h3>
        </div>
      </div>
    </div>
  );
}
