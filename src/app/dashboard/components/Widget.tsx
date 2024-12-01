'use client';
import { Card } from '@/components/Card';
import { getCallbackRoute } from '@/utils/getCallbackRoute';
import { WidgetType } from '@/types/widget.types';
import { useIsWebProvider } from '@/hooks';

export const Widget = ({
  title,
  description,
  reference,
  anchor,
  widget: MxWidget,
  props = {}
}: WidgetType) => {
  const { isWebProvider } = useIsWebProvider();
  const callbackRoute = anchor
    ? getCallbackRoute({ anchor, isWebProvider })
    : '';

  return (
    <div className="p-6 rounded-xl 
                  bg-light-secondary dark:bg-dark-secondary
                  border border-light-accent/10 dark:border-dark-accent/10">
      <h3 className="text-lg font-medium mb-4 text-light-text dark:text-dark-text">
        {title}
      </h3>
      <div className="text-light-muted dark:text-dark-muted">
        <MxWidget callbackRoute={callbackRoute} {...props} />
      </div>
    </div>
  );
};
