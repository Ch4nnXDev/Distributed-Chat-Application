import authStore from "../stores/authStore"

export default function Profile() {

    const user = authStore((state)=> state.user);

    return (
        <section>
            <h1>Profile</h1>

        </section>
    )
}