export default function Dashboard() {
    //context user info

    return (
        <section className="container mx-auto flex-col justify-center">
               <h1 className="text-dark-green text-2xl font-bold font-serif py-2">
                     Username
                </h1>
                <div className="container mx-auto flex-col justify-center">
                    <h3 className="font-bold">Settings</h3>        
                    <a href="#" className="text-dark-green font-bold m-2">
                        Change Password
                    </a>
                    <a href="#" className="text-dark-green font-bold m-2">
                        Delete Account / Information
                    </a>
                </div>
        </section>
    )
}