import { useState } from 'react';

// import ReactCropper from 'react-image-crop';

const Crop: React.FC = () => {
  const [_crop, _setCrop] = useState({
    src: null,
    crop: {
      unit: '%',
      width: 200,
      aspect: 1,
    },
  });

  return <></>;
};

export default Crop;
