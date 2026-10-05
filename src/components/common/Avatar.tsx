interface AvatarProps {
  name: string;
  plan?: string;
}

const Avatar = ({ name, plan }: AvatarProps) => {
  return (
    <div className="flex items-center gap-3 p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-700 font-bold text-white">
        {name.charAt(0).toUpperCase()}
      </div>

      <div>
        <h3 className="font-medium text-white">
          {name}
        </h3>

        <p className="text-sm text-slate-400">
          {plan}
        </p>
      </div>
    </div>
  );
};

export default Avatar;