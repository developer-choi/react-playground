import Button from '@component/atom/button/Button';
import React, {useState} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

// https://console.cloud.google.com/security/recaptcha?referrer=search&project=react-playground-1668411260723
export default function Page() {
  const [visible, setVisible] = useState(false);

  const onChange = (value: any) => {
    console.log(value);
  };

  const toggle = () => {
    setVisible(prevState => !prevState);
  };

  return (
    <>
      <Button onClick={toggle}>Visible</Button>
      {!visible ? null :
        //@ts-ignore
        <ReCAPTCHA
          sitekey="6LeMpAUjAAAAAJKRCk6f5kiR4yhNRmNPU4lu5WQM"
          onChange={onChange}
          size="normal"
        />
      }
    </>
  );
}
