import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  img: string;
  name: string;
}

export default function AvatarContainer({
  img,
  name,
  ...props
}: AvatarContainerProps) {
  const getInitials = (name: string) => {
    const allNames = name.trim().split(" ");
    const initials = allNames.reduce((acc, curr, index) => {
      if (index === 0 || index === allNames.length - 1) {
        acc = `${acc}${curr.charAt(0).toUpperCase()}`;
      }
      return acc;
    }, "");
    return initials;
  };

  const initials = getInitials(name);

  return (
    <div {...props} className="flex items-center gap-2 text-primary">
      <Avatar>
        <AvatarImage src={img} alt="Avatar" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <span className="text-primary-foreground">{name}</span>
    </div>
  );
}
