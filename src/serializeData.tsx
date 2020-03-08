import React from 'react';
import serialize from 'serialize-javascript';

interface SerilizeData
  extends React.DetailedHTMLProps<
    React.ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement
  > {
  name: string;
  data: any;
}

export const SerilizeData: React.FC<SerilizeData> = ({
  data,
  name,
  ...props
}) => {
  return (
    <script
      defer
      {...props}
      dangerouslySetInnerHTML={{
        __html: `window._${name.toUpperCase()}_ = ${serialize(data)}`,
      }}
    />
  );
};

export const getSerilizedData = (name: string, remove: boolean = true): any => {
  const data = window[`_${name.toUpperCase()}_`];
  if (remove) {
    delete window[`_${name.toUpperCase()}_`];
  }
  return data;
};