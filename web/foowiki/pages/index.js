import Link from 'next/link'
import Container from '../components/container'

export default function Home() {
    return (
        <Container>
            <h1>Hello world!</h1>
            <Link href={"/register"}>Register</Link>
        </Container>
    )
}
