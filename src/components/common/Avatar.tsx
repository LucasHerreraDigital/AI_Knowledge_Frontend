interface AvatarProps {
  name: string;
  plan?: string;
}

const Avatar = ({ name }: AvatarProps) => {
  return (
    <div className="flex items-center gap-3 p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
        {name.charAt(0).toUpperCase()}
      </div>

      <div>
        <h3 className="font-medium text-text-primary">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default Avatar;