import { Vortex } from "react-loader-spinner";

export default function Loading() {
    return (
        <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['#121212', '#00ffa6', '#121212', '#00ffa6', '#00ffa6', '#121212']}
        />
    )
}