import React, {useState} from 'react';
import {Image} from 'react-native';

const ProgressiveImage = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  var image = isLoading
    ? require('../assets/defaultAlbum.jpg')
    : isError
    ? require('../assets/defaultAlbum.jpg')
    : {uri: props.source.uri};
  // useEffect(() => {
  //   console.log(isLoading);
  //   setIsLoading(true);
  // }, []);
  return (
    <Image
      style={props.style}
      source={image}
      onLoad={() => setIsLoading(true)}
      onLoadEnd={() => {
        setIsLoading(false);
      }}
      onError={() => {
        setIsError(true);
      }}
      resizeMode={props.resizeMode}
    />
  );
};
export default ProgressiveImage;
