import { BounceLoader } from "react-spinners";

export const Loader = () => (
    <div className="fullScreen">
        <BounceLoader
            style={{ 'margin': '-75px 0 0 -75px', 'position': 'absolute', 'top': '50%', 'left': '50%' }}
            size={150}
            color={"black"}
            loading={true}
        />
    </div>
)