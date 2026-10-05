import {
  CheckCircle2,
  Clock3,
  CircleX,
} from "lucide-react";

import type { ProcessingStatus } from "../../types/document";

interface DocumentStatusProps {
  status: ProcessingStatus;
}

const DocumentStatus = ({
  status,
}: DocumentStatusProps) => {
  if (status === "COMPLETED") {
    return (
      <CheckCircle2
        size={17}
        className="shrink-0 text-green-500"
      />
    );
  }

  if (status === "PROCESSING") {
    return (
      <Clock3
        size={17}
        className="shrink-0 text-yellow-500"
      />
    );
  }

  if (status === "FAILED") {
    return (
      <CircleX
        size={17}
        className="shrink-0 text-red-500"
      />
    );
  }

  return (
    <Clock3
      size={17}
      className="shrink-0 text-slate-500"
    />
  );
};

export default DocumentStatus;