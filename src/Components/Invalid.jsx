
import { Link } from "react-router-dom";
export function UserInvalid(){
    return(
        <div className="d-flex justify-content-center mt-4">
            <div className="bg-dark text-white p-3">
                <h2>Invalid Credentials</h2>

                <Link to="/login">Try Again</Link>

            </div>
        </div>
    )
}