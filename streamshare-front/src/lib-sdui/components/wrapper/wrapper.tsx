export type ConfigsWrapperSDUI = {
  class: string;
  childProps?: Record<string, unknown>;
  childrenProps?: Record<string, unknown>[];
  children: unknown[];
};

export function WrapperComponentSDUI(
  { child }: { child: React.ReactNode },
  configs: ConfigsWrapperSDUI
) {
  return <div className={configs.class}>{child}</div>;
}
