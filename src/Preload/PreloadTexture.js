import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function PreloadTextures({ urls }) {
    useLoader(TextureLoader, urls);

    return null;
}

export default PreloadTextures;