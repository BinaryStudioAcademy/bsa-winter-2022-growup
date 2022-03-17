import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import ReactCropper, { Cropper } from 'react-cropper';

import 'cropperjs/dist/cropper.css';

type Props = {
  setError: (msg: string) => void;
  onSave: (file: Blob) => void;
  isLoading?: boolean;
};

export const Demo: React.FC<Props> = ({
  setError,
  onSave,
  isLoading = false,
}) => {
  const [image, setImage] = useState<string>('');
  const [_cropData, setCropData] = useState<string>('#');

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size > 1024 * 1024) {
        setError('File is too big. Max size - 1mb');
        return;
      }

      setError('');
      const reader = new FileReader();
      reader.addEventListener('load', () => setImage(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const [cropper, setCropper] = useState<Cropper>();

  const getCropData = (e: FormEvent): void => {
    e.preventDefault();

    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());

      cropper.getCroppedCanvas().toBlob((blob) => {
        if (blob) onSave(blob);
      });
    }
  };

  return (
    <>
      <Form.Control
        placeholder="image"
        type="file"
        onChange={onSelectFile}
        accept="image/*"
      />
      {!!image.length && (
        <ReactCropper
          style={{ height: 400, width: '100%' }}
          zoomTo={0.5}
          initialAspectRatio={1}
          aspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={200}
          minCropBoxWidth={200}
          background
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance: Cropper): void => {
            setCropper(instance);
          }}
          responsive
          guides
        />
      )}

      <div className="d-flex">
        <button
          onClick={getCropData}
          className="btn btn-outline-gu-purple flex-fill border-2 fw-bold"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Save'}
        </button>
      </div>
    </>
  );
};

export default Demo;
