export default function TesteLayout({children}: {children: React.ReactNode}) {
    return (
        <div style={{backgroundColor:'white'}}  className="teste-layout">
            <h1 className="titulo">Teste Layout</h1>
            <div>{children}</div>
        </div>
    );
}
        