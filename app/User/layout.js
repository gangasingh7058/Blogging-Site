import UserNavbar from "@/Components/User_Navbar"

export default function({ children }){
    return <div>
            <UserNavbar />
            {children}
    </div>
}