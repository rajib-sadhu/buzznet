import { SiSpinrilla } from "react-icons/si";

const LoadingAnimation = () => {
    return (
        <div className='h-screen grid place-content-center'>
            <SiSpinrilla className="text-3xl animate-spin"  />
        </div>
    );
};

export default LoadingAnimation;