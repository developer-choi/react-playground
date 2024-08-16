import React from 'react';
import Checkbox from '@/components/form/Checkbox';
import Radio, {RadioGroup} from '@/components/form/Radio';
import Switch from '@/components/form/Switch';

// URL: http://localhost:3000/design-system/check
// Doc: https://docs.google.com/document/d/1l3CZHTA4ja1ovUC0fiZ9-Fb72_PMXdLTx_0gNhZ39Jg/edit?usp=drivesdk
export default function Page() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
      <div>
        <Checkbox label="primary"/>
        <Checkbox color="secondary" label="secondary"/>

        <Checkbox disabled label="disabled primary"/>
        <Checkbox disabled color="secondary" label="disabled secondary"/>
      </div>

      <RadioGroup label="Radio Group" error="error text">
        <Radio name="color" label="primary" value="primary"/>
        <Radio name="color" color="secondary" label="secondary" value="secondary"/>

        <Radio disabled label="disabled primary"/>
        <Radio disabled name="value" color="secondary" label="secondary"/>
      </RadioGroup>

      <div>
        <Switch label="text"/>
        <Switch disabled label="disabled text"/>
        <Switch checked disabled label="selected & disabled text"/>
      </div>
    </div>
  );
}
