interface Button {
  title: string;
  action: () => void;
  loading?: boolean;
  disabled?: boolean;
  color?: string;
  icon?: string;
}

export default Button;
