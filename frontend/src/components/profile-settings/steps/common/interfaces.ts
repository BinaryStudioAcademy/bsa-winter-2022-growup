interface IProfileSettingStep {
  isDisablePrevious?: boolean;
  onNext?: () => void;
}

export type { IProfileSettingStep };
