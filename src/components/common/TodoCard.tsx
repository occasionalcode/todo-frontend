import { EllipsisVertical } from "lucide-react";
import type { todo } from "node:test";
import { Button } from "../ui/button";
import { PurpleProgress } from "../ui/PurpleProgres";
import type { TodoByTabIdData } from "../../types/todo";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

type Props = {
  todo: TodoByTabIdData;
  progressPercent: number;
};
export function TodoCard({ todo, progressPercent }: Props) {
  const { todotabId } = useParams({ from: "/_auth/todotab/$todotabId/" });
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(progressPercent), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="size-80 rounded-2xl border bg-white text-[#9333EA] px-4 py-5  flex flex-col justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex justify-center items-center gap-2">
              <h3 className="text-2xl font-semibold text-gray-900">
                {todo.title}
              </h3>
              <Badge className="bg-[#7551FF] text-xs h-fit">
                {todo.status}
              </Badge>
            </div>
            <p className="text-sm">{todo.description ?? "No description"}</p>
          </div>
          <EllipsisVertical size={20} strokeWidth={2.25} />
        </div>
        <div className="flex justify-center gap-2 w-full  items-center ">
          <div className="flex flex-col p-1 items-center justify-center  border  rounded-md text-[#2A3774] w-full ">
            <p className="font-semibold text-xl ">{todo.ongoingCount}</p>
            <h4 className="text-sm">Ongoing</h4>
          </div>
          <div className="flex flex-col items-center justify-center p-1 text-white border  rounded-md bg-[#8651FE] w-full ">
            <p className="font-semibold text-xl">{todo.finishedCount}</p>
            <h4 className="text-sm">Finished</h4>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Progress</h4>
          <div className="flex gap-2 items-center justify-center">
            {/* <div className="bg-[#8651FE]  rounded-3xl h-3 w-full"></div> */}
            <PurpleProgress className="h-3" value={progress} />
            <p>{progress}%</p>
          </div>
        </div>
      </div>
      <Button
        onClick={() => navigate({ to: `/todotab/${todotabId}/tab/${todo.id}` })}
        className="bg-[#9333EA] hover:bg-[#8851ff]"
      >
        Go
      </Button>
    </div>
  );
}
