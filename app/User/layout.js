import UserNavbar from "@/Components/User_Navbar"

export default function Layout({ children }){
    return <div>
            <UserNavbar />
            {children}
    </div>
}