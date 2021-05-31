type AvatarPropsType = {
  selected?: boolean;
  src: string;
  handleOnClick: (index: number) => void;
  index: number;
};

type AvatarWrapperProps = {
  selected: boolean;
};

export type { AvatarPropsType, AvatarWrapperProps };
