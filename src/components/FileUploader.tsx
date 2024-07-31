"use client";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { convertFileToUrl } from "../lib/utils";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          className="max-h-[400px] overflow-hidden object-cover"
          src={convertFileToUrl(files[0])}
          alt="uploaded file"
          height={1000}
          width={1000}
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            alt="upload file"
            height={40}
            width={40}
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">Click to upload</span> or drag
              and drop
            </p>
            <p>SVG, PNG, JPG</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
