import React, {useEffect} from "react";
import axios from "axios";

export default function Page() {
  useEffect(() => {
    axios.get("https://react-playground-eosin.vercel.app/api/buy");
  }, []);

  return null;
}
