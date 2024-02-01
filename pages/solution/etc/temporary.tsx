import {useEffect, useState} from "react";
import {getTempSignupResult} from "@util/services/temporary/signup-result";
import {handleMissingTempDataError} from "@util/extend/browser/temporary-storage";

export default function SignupResultPage() {
  const [name, setName] = useState<string>();

  useEffect(() => {
    try {
      setName(getTempSignupResult().userName);
    } catch (error: any) {
      handleMissingTempDataError(error);
    }
  }, []);

  if (!name) {
    return null;
  }

  return <div>{name}님 환영해요</div>;
}
