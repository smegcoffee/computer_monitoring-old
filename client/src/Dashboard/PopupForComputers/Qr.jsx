import React, { useRef, useState, useEffect } from "react";
import smct from "./../../img/smct.png";
import { QRCode } from "react-qr-svg";
import { toPng } from "html-to-image";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

function QrCode({ isOpen, onClose, qrCodeData, setQrCodeData }) {
  const qrCodeRef = useRef(null);
  const [rows, setRows] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    if (qrCodeData?.computers) {
      const qrData = qrCodeData.computers.flatMap((computer) =>
        computer.units.map((unit) => ({
          ...unit,
          computerName: computer.name,
        }))
      );
      setRows(qrData);

      const ids = qrCodeData.computers.map((comp) => comp.id);
      setId(ids);
    }
  }, [qrCodeData]);

  if (!isOpen) {
    return null; // Render nothing if isOpen is false
  }

  const downloadQRCode = () => {
    toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = `${id}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR Code image:", error);
      });
  };

  const errorDownloadQr = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      iconColor: "red",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      showCloseButton: true,
      timer: 3000,
      timerProgressBar: true,
    });
    (async () => {
      await Toast.fire({
        icon: "error",
        title: "Error downloading QR. This user hasn't set up a computer yet.",
      });
    })();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-40">
      <div
        className="bg-white shadow-md rounded-2xl"
        style={{ width: "700px", maxHeight: "100vh" }}
      >
        <div className="relative flex p-5 bg-blue-500 rounded-tr-2xl rounded-tl-2xl">
          <div className="flex-none">
            <img
              src={smct}
              alt="SMCT Logo"
              className="block h-24 m-0 w-60"
            ></img>
          </div>
          <div className="mt-8 ml-16 text-3xl font-medium text-white flex-2">
            Computer ID: {id.length === 1 ? id : "NaN"}
          </div>
          <CloseIcon
            onClick={onClose}
            className="absolute text-white cursor-pointer right-5 top-5"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-7 mb-14 size-60">
            <div
              ref={qrCodeRef}
              onClick={id.length === 1 ? downloadQRCode : errorDownloadQr}
              style={{ cursor: "pointer" }}
            >
              <QRCode value={JSON.stringify(id[0])} />
            </div>
            <h1 className="mt-3 text-base font-semibold text-center">
              Computer QR Code
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrCode;
