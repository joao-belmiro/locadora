
interface Location {
    id: number,
    cliente: Client;
    filmes: any[];
    dataLocacao: Date;
    dataEntrega: Date;
    usuarioLocacao: User;
    status: 'alugado' | 'entregue';
}