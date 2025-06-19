// components/CustomToast.tsx

import { Check } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export function Toast({ title, description }: Props) {
  return (
    <div className="flex items-center gap-4 p-2 bg-white border w-80 py-5 rounded-2xl justify-start">
      <div className="flex justify-center items-center bg-[#f1e3ff] p-2 rounded-full">
        <div className="flex justify-center items-center bg-[#ead4ff] p-1.5 rounded-full">
          <div className="flex justify-center items-center bg-[#be78ff] p-1 rounded-full">
            <Check className="text-white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-purple-800 font-medium">{title}</p>
        <p className="text-purple-950 text-sm">{description}</p>
      </div>
    </div>
  );
}
