import { useState } from "react";

export function Switch({ checked = false, onChange, w = "w-14" }) {
  const [isOn, setIsOn] = useState(checked);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    if (onChange) {
      onChange(!isOn);
    }
  };

  return (
    <button
      onClick={toggleSwitch}
      className={`relative ${w} h-6 flex items-center rounded-full p-1 transition-colors ${
        isOn ? "bg-purple-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
          isOn ? "translate-x-4" : "translate-x-0"
        }`}
      ></span>
    </button>
  );
}
