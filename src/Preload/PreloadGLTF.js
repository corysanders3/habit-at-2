import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function PreloadGLTFs({ urls, onPreloadComplete }) {
    useLoader(GLTFLoader, urls);

    return null;
}

export default PreloadGLTFs;