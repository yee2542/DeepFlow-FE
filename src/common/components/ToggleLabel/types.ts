type ToggleLabelProps = {
  selected?: boolean;
  onLabelClick: (label: string) => void;
  label: string;
};

type ToggleLabelWrapperProps = {
  selected: boolean;
};

export type { ToggleLabelProps, ToggleLabelWrapperProps };
