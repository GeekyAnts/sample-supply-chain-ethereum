import { useEffect } from "react";

import bwipjs from "bwip-js";

export const Barcode = ({ data }: { data: string }) => {
  useEffect(() => {
    try {
      let canvas = bwipjs.toCanvas(data, {
        bcid: "code128",
        text: data,
        scale: 0,
        height: 10,
        width: 10,
        includetext: false,
        textxalign: "center",
      });
    } catch (e) {
      console.log(e);
    }
  });

  return <canvas style={{ width: "80px", height: 20 }} id={data}></canvas>;
};
