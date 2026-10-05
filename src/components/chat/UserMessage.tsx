import type { Message } from "../../types/message";

interface UserMessageProps {
  message: Message;
}

const UserMessage = ({
  message,
}: UserMessageProps) => {
  return (
    <div className="flex justify-end">

      <div className="max-w-[75%] rounded-2xl rounded-br-md bg-indigo-600 px-4 py-3">

        <p className="text-sm leading-relaxed text-white">
          {message.content}
        </p>

      </div>

    </div>
  );
};

export default UserMessage;