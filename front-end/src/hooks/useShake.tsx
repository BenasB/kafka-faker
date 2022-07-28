import React, { useState } from "react";

interface ShakeHook {
  shakeClass: string;
  setShaking: React.Dispatch<React.SetStateAction<boolean>>;
}

const useShake = (): ShakeHook => {
  const [shaking, setShaking] = useState<boolean>(false);

  return {
    shakeClass: shaking ? "shake-x" : "",
    setShaking,
  };
};

export default useShake;
