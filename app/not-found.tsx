import SimpleButton from "@/components/Buttons/SimpleButton"

export default function Custom404() {
    return (
        <main className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
            <h1 className="font-bold text-2xl">Error 404</h1>
            <p>Pagina no encontrada :(</p>
            <SimpleButton link="/" label="Inicio" />
        </main>
    )
}