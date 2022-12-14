export interface TransitionProps {
  type?: string;
  delay?: number;
  duration?: number;
  endAnimation?: boolean;
}

export interface OptionsProps extends TransitionProps {
  componentChildren: any;
  callback: () => void;
}

export interface ContextProps {
  changeAnimationOptions: (options: OptionsProps) => void;
}

export interface HookProps {
  startTransition: (options: TransitionProps, callback?: () => void) => void;
}
