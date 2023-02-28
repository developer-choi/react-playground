import React, {useEffect} from "react";
import axios from "axios";

export default function Page() {
  useEffect(() => {
    axios.get("https://react-playground-eosin.vercel.app/api/not-found");
    axios.get("https://react-playground-eosin.vercel.app/api/basic");
    axios.get("https://react-playground-eosin.vercel.app/api/allow-method");
    axios.get("https://react-playground-eosin.vercel.app/api/allow-origin");
  }, []);

  return null;
}
