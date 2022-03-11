interface IProfileSettingStep {
  isDisablePrevious?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

export type { IProfileSettingStep };
