import Quote from "../components/Quote";
import Auth from "../components/Auth";

export default function Signup() {
    return (
        <>
            <div className="min-h-screen flex font-sans">
                <Quote />
                <Auth type="signin" />
            </div>
        </>
    );
}