import authStore from "../stores/authStore"

export default function Profile() {

    const user = authStore((state)=> state.user); 

    return (
        <section className="h-screen w-full bg-red-500">
            <h1>Profile</h1>

        </section>
    )
}